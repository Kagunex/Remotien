import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID =
  process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
const MODEL_ID =
  process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

const SCENES_NARRATION = [
  {
    file: 'public/audio/voiceover/scene-01.wav',
    text: 'Setiap hari kita kirim pesan, nonton video, sampai buka website—dan semuanya muncul dalam hitungan detik. Pernah kepikiran nggak, gimana data bisa melesat dari satu layar ke layar lain?',
  },
  {
    file: 'public/audio/voiceover/scene-02.wav',
    text: 'Internet itu bukan awan ajaib di langit, melainkan jutaan jaringan yang saling terhubung lewat kabel serat optik bawah laut, menara seluler, hingga satelit di seluruh dunia.',
  },
  {
    file: 'public/audio/voiceover/scene-03.wav',
    text: 'Saat kamu mengetik nama website, komputer butuh alamat angka yang disebut IP Address. Di sinilah DNS bekerja seperti buku kontak raksasa untuk mencarikan alamat server tujuan.',
  },
  {
    file: 'public/audio/voiceover/scene-04.wav',
    text: 'Setelah alamat ketemu, aturan TCP/IP memecah permintaanmu menjadi potongan kecil bernama paket data. Setiap paket diberi label tujuan dan nomor urut supaya nggak tertukar.',
  },
  {
    file: 'public/audio/voiceover/scene-05.wav',
    text: 'Paket-paket itu lalu melompat dari router rumah ke jaringan penyedia internet atau ISP. Setiap router membaca label tujuan dan memilihkan jalur tercepat, meski rutenya berbeda-beda.',
  },
  {
    file: 'public/audio/voiceover/scene-06.wav',
    text: 'Begitu tiba di pusat data, server—komputer super tangguh yang bekerja non-stop—langsung memproses permintaanmu, menyiapkan data yang diminta, lalu mengirimkannya balik.',
  },
  {
    file: 'public/audio/voiceover/scene-07.wav',
    text: 'Ribuan paket balasan mendarat kembali di ponselmu. Browser lalu menyusun ulang potongan teks, gambar, dan video sesuai nomor urutnya hingga tampil utuh di layar.',
  },
  {
    file: 'public/audio/voiceover/scene-08.wav',
    text: 'Jadi, internet bukan sihir. DNS, paket data, router, ISP, dan server bekerja serempak dalam sekejap mata. Itulah perjalanan luar biasa di balik satu sentuhan jarimu.',
  },
];

function convertMp3ToWav(mp3Buffer, outputFile) {
  const result = spawnSync(
    'ffmpeg',
    [
      '-hide_banner',
      '-loglevel', 'error',
      '-y',
      '-i', 'pipe:0',
      '-ar', '44100',
      '-ac', '1',
      '-c:a', 'pcm_s16le',
      outputFile,
    ],
    {
      input: mp3Buffer,
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    }
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `FFmpeg conversion failed: ${result.stderr || 'Unknown error'}`
    );
  }

  if (!fs.existsSync(outputFile) || fs.statSync(outputFile).size === 0) {
    throw new Error(`WAV output was not created: ${outputFile}`);
  }
}

async function generateVoiceovers() {
  if (!API_KEY) {
    console.warn(
      '⚠️ ELEVENLABS_API_KEY tidak ditemukan. Menggunakan file WAV yang sudah ada.'
    );
    return;
  }

  console.log(
    `🎙️ Generating 8 scene voiceovers via ElevenLabs (Model: ${MODEL_ID}, Voice: ${VOICE_ID})...`
  );

  for (const scene of SCENES_NARRATION) {
    const url =
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}` +
      '?output_format=mp3_44100_128';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: scene.text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.78,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(
        `ElevenLabs API error (${response.status}) on ${scene.file}: ${errText}`
      );
    }

    const mp3Buffer = Buffer.from(await response.arrayBuffer());

    if (mp3Buffer.length === 0) {
      throw new Error(`Empty MP3 response for ${scene.file}`);
    }

    fs.mkdirSync(path.dirname(scene.file), { recursive: true });

    convertMp3ToWav(mp3Buffer, scene.file);

    console.log(
      `✅ Saved ${scene.file} (${(fs.statSync(scene.file).size / 1024).toFixed(1)} KB)`
    );
  }
}

generateVoiceovers().catch((err) => {
  console.error('❌ Voiceover generation failed:', err);
  process.exit(1);
});
