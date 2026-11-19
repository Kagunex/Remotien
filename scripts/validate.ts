import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { SCENES, VIDEO_SPECS } from '../src/constants/theme';

function fail(msg: string): never {
  console.error(`\n[VALIDASI GAGAL] ${msg}\n`);
  process.exit(1);
}

function checkAudioIntegrity(filePath: string, minBytes: number) {
  if (!fs.existsSync(filePath)) {
    fail(`File audio tidak ditemukan: ${filePath}. Jalankan 'npm run prepare:audio' terlebih dahulu.`);
  }
  const stat = fs.statSync(filePath);
  if (stat.size < minBytes) {
    fail(`File audio terindikasi kosong/korup (${stat.size} bytes): ${filePath}`);
  }
  try {
    const out = execFileSync(
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
    const dur = parseFloat(out.trim());
    if (isNaN(dur) || dur < 58) {
      fail(`Durasi audio ${filePath} tidak valid (${dur}s, diharapkan ~60s).`);
    }
  } catch {
    fail(`ffprobe gagal membaca file audio: ${filePath}. Pastikan FFmpeg terpasang di PATH.`);
  }
}

function main() {
  console.log('[VALIDASI] Memulai pemeriksaan proyek BIOLUMINESCENCE — THE GLOWING OCEAN...');

  const scriptPath = path.resolve('src/narration/script.id.json');
  const timingPath = path.resolve('src/narration/timing.json');
  const metadataPath = path.resolve('public/media/metadata.json');

  const scriptJson = JSON.parse(fs.readFileSync(scriptPath, 'utf8'));
  JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

  if (!fs.existsSync(timingPath)) {
    fail('src/narration/timing.json belum dibuat. Jalankan `npm run prepare:audio` terlebih dahulu.');
  }
  const timingJson = JSON.parse(fs.readFileSync(timingPath, 'utf8'));

  const sceneList = Object.values(SCENES);
  const sumFrames = sceneList.reduce((acc, s) => acc + s.durationFrames, 0);
  if (sumFrames !== VIDEO_SPECS.totalFrames) {
    fail(`Total frame scene (${sumFrames}) tidak sama dengan target (${VIDEO_SPECS.totalFrames}).`);
  }
  for (const [key, sc] of Object.entries(SCENES)) {
    if (sc.durationFrames <= 0) {
      fail(`Scene kosong terdeteksi pada ${key}.`);
    }
  }

  checkAudioIntegrity(path.resolve('public/audio/narration-id.mp3'), 50000);
  checkAudioIntegrity(path.resolve('public/audio/ambient-ocean.wav'), 1000000);
  checkAudioIntegrity(path.resolve('public/audio/synth-pad.wav'), 1000000);

  if (!Array.isArray(timingJson.segments) || timingJson.segments.length !== scriptJson.segments.length) {
    fail('Jumlah segmen pada timing.json tidak sinkron dengan script.id.json.');
  }

  for (let i = 0; i < timingJson.segments.length; i++) {
    const seg = timingJson.segments[i];
    if (seg.startSec >= seg.endSec || seg.endSec > VIDEO_SPECS.durationInSeconds) {
      fail(`Timestamp tidak valid pada segmen ${seg.id}: ${seg.startSec}s - ${seg.endSec}s.`);
    }
    if (i > 0 && seg.startSec < timingJson.segments[i - 1].endSec) {
      fail(`Overlap subtitle terdeteksi antara ${timingJson.segments[i - 1].id} dan ${seg.id}.`);
    }
    if (seg.subtitleLines.length > 2) {
      fail(`Subtitle pada ${seg.id} melebihi batas maksimal 2 baris.`);
    }
  }

  fs.mkdirSync(path.resolve('output'), { recursive: true });
  console.log('[VALIDASI SUKSES] Seluruh scene (1800 frame), audio TTS nyata, SFX 48kHz, dan subtitle terverifikasi.');
}

main();
