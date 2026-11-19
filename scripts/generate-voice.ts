import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import dotenv from 'dotenv';
import scriptData from '../src/narration/script.id.json';

dotenv.config();

const OUTPUT_DIR = path.resolve('public/audio');
const TEMP_DIR = path.resolve('.tmp-audio');
const FINAL_NARRATION = path.join(OUTPUT_DIR, 'narration-id.mp3');
const TIMING_FILE = path.resolve('src/narration/timing.json');

interface TTSProvider {
  name: string;
  synthesize(text: string, outPath: string): Promise<void>;
}

class ElevenLabsProvider implements TTSProvider {
  name = 'elevenlabs';
  async synthesize(text: string, outPath: string): Promise<void> {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';
    if (!apiKey) throw new Error('ELEVENLABS_API_KEY tidak ditemukan.');

    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.65,
          similarity_boost: 0.8,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`ElevenLabs HTTP ${res.status}: ${await res.text()}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outPath, buffer);
  }
}

class OpenAITTSProvider implements TTSProvider {
  name = 'openai';
  async synthesize(text: string, outPath: string): Promise<void> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY tidak ditemukan.');

    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1-hd',
        voice: 'onyx',
        input: text,
        speed: 0.94,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI TTS HTTP ${res.status}: ${await res.text()}`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outPath, buffer);
  }
}

class EdgeNeuralTTSProvider implements TTSProvider {
  name = 'edge-tts';
  async synthesize(text: string, outPath: string): Promise<void> {
    execFileSync(
      'edge-tts',
      [
        '--voice',
        'id-ID-ArdiNeural',
        '--rate=-6%',
        '--pitch=-4Hz',
        '--text',
        text,
        '--write-media',
        outPath,
      ],
      { stdio: 'pipe' }
    );
  }
}

function getProvider(): TTSProvider {
  const preferred = (process.env.TTS_PROVIDER || '').toLowerCase();
  if (preferred === 'elevenlabs' || process.env.ELEVENLABS_API_KEY) {
    return new ElevenLabsProvider();
  }
  if (preferred === 'openai' || process.env.OPENAI_API_KEY) {
    return new OpenAITTSProvider();
  }
  return new EdgeNeuralTTSProvider();
}

function getAudioDurationSec(filePath: string): number {
  const stdout = execFileSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      filePath,
    ],
    { encoding: 'utf8' }
  );
  return parseFloat(stdout.trim());
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  const provider = getProvider();
  console.log(`[TTS] Menggunakan provider: ${provider.name}`);

  const timingEntries: Array<{
    id: string;
    scene: string;
    startSec: number;
    endSec: number;
    actualDurationSec: number;
    subtitleLines: string[];
  }> = [];

  const segmentFiles: Array<{ file: string; delayMs: number }> = [];

  for (const seg of scriptData.segments) {
    const rawSegPath = path.join(TEMP_DIR, `${seg.id}.mp3`);
    console.log(`[TTS] Mensintesis ${seg.id}: "${seg.text}"`);

    try {
      await provider.synthesize(seg.text, rawSegPath);
    } catch (err) {
      console.error(`\n[ERROR] Gagal membuat TTS dengan provider "${provider.name}".`);
      console.error('Detail:', (err as Error).message);
      console.error(
        'Solusi: Pastikan ELEVENLABS_API_KEY / OPENAI_API_KEY terpasang di .env, atau install Python package `pip install edge-tts` untuk id-ID-ArdiNeural.'
      );
      process.exit(1);
    }

    const stat = fs.statSync(rawSegPath);
    if (stat.size < 2048) {
      throw new Error(`File audio ${seg.id} terlalu kecil (${stat.size} bytes) — terindikasi korup.`);
    }

    const actualDur = getAudioDurationSec(rawSegPath);

    segmentFiles.push({
      file: rawSegPath,
      delayMs: Math.round(seg.startSec * 1000),
    });

    timingEntries.push({
      id: seg.id,
      scene: seg.scene,
      startSec: seg.startSec,
      endSec: Number((seg.startSec + actualDur).toFixed(3)),
      actualDurationSec: Number(actualDur.toFixed(3)),
      subtitleLines: seg.subtitleLines,
    });
  }

  const inputs: string[] = [];
  const filterParts: string[] = [];
  const mixLabels: string[] = [];

  segmentFiles.forEach((item, idx) => {
    inputs.push('-i', item.file);
    filterParts.push(
      `[${idx}:a]aresample=48000,adelay=${item.delayMs}|${item.delayMs}[a${idx}]`
    );
    mixLabels.push(`[a${idx}]`);
  });

  const filterComplex = `${filterParts.join(';')};${mixLabels.join('')}amix=inputs=${
    segmentFiles.length
  }:normalize=0,apad=whole_dur=60[out]`;

  execFileSync(
    'ffmpeg',
    [
      '-y',
      ...inputs,
      '-filter_complex',
      filterComplex,
      '-map',
      '[out]',
      '-ar',
      '48000',
      '-ac',
      '2',
      '-b:a',
      '256k',
      FINAL_NARRATION,
    ],
    { stdio: 'pipe' }
  );

  fs.writeFileSync(
    TIMING_FILE,
    JSON.stringify(
      {
        provider: provider.name,
        sampleRate: 48000,
        totalDurationSec: 60,
        segments: timingEntries,
      },
      null,
      2
    )
  );

  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  console.log(`[SUKSES] Audio narasi nyata dibuat: ${FINAL_NARRATION}`);
  console.log(`[SUKSES] Timing sinkronisasi disimpan: ${TIMING_FILE}`);
}

main();
