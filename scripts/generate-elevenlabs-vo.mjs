import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

const SCENES_NARRATION = [
  {
    file: 'public/audio/voiceover/scene-01.wav',
    text: 'Setiap hari, kita menggunakan internet. Mengirim pesan, menonton video, atau membuka website. Semuanya terasa instan. Tapi, sebenarnya… bagaimana informasi bisa berpindah dari satu perangkat ke perangkat lain?',
  },
  {
    file: 'public/audio/voiceover/scene-02.wav',
    text: 'Internet adalah jaringan dari banyak jaringan yang menghubungkan perangkat di seluruh dunia. Perangkat-perangkat ini bisa saling bertukar data melalui berbagai jalur komunikasi.',
  },
  {
    file: 'public/audio/voiceover/scene-03.wav',
    text: 'Ketika kamu mengetik alamat website, DNS membantu mencari alamat IP server yang dituju. Bayangkan DNS seperti buku kontak yang membantu menemukan alamat sebuah tempat.',
  },
  {
    file: 'public/audio/voiceover/scene-04.wav',
    text: 'Browser kemudian mengirim permintaan. Informasi digital dibawa melalui jaringan dalam unit-unit data yang disebut paket. Paket-paket ini membantu data dikirim dan diteruskan di jaringan.',
  },
  {
    file: 'public/audio/voiceover/scene-05.wav',
    text: 'Router membaca informasi tujuan paket, lalu meneruskannya ke jaringan berikutnya. Perjalanan data bisa melewati beberapa perangkat jaringan, dan tidak selalu melalui jalur yang sama.',
  },
  {
    file: 'public/audio/voiceover/scene-06.wav',
    text: 'Permintaan itu sampai ke server, yaitu komputer yang menyediakan data atau layanan. Server memproses permintaan, lalu mengirimkan respons kembali melalui jaringan.',
  },
  {
    file: 'public/audio/voiceover/scene-07.wav',
    text: 'Perangkatmu menerima data tersebut. Browser memproses bagian-bagian yang diperlukan, lalu menyusun tampilan halaman web—teks, gambar, dan elemen lainnya—di layar.',
  },
  {
    file: 'public/audio/voiceover/scene-08.wav',
    text: 'Jadi, internet bukan sihir. Ada DNS, router, server, dan banyak jaringan yang bekerja bersama agar informasi bisa sampai ke tujuan. Sekarang, kamu tahu sedikit tentang dunia di balik satu sentuhan.',
  },
];

async function generateVoiceovers() {
  if (!API_KEY) {
    throw new Error('ELEVENLABS_API_KEY tidak ditemukan di GitHub Secrets.');
  }

  console.log(`🎙️ Generating ${SCENES_NARRATION.length} voiceovers...`);
  console.log(`Model: ${MODEL_ID} | Voice: ${VOICE_ID}`);

  for (const scene of SCENES_NARRATION) {
    console.log(`\n⏳ Generating ${scene.file}...`);

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
      const error = await response.text();
      throw new Error(
        `ElevenLabs API error (${response.status}) on ${scene.file}: ${error}`
      );
    }

    const mp3Buffer = Buffer.from(await response.arrayBuffer());
    const outputPath = path.resolve(scene.file);
    const tempMp3 = `${outputPath}.mp3`;

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(tempMp3, mp3Buffer);

    try {
      execFileSync('ffmpeg', [
        '-y',
        '-i', tempMp3,
        '-ar', '44100',
        '-ac', '1',
        '-c:a', 'pcm_s16le',
        outputPath,
      ], { stdio: 'inherit' });

      fs.unlinkSync(tempMp3);
    } catch (error) {
      throw new Error(`Gagal mengonversi audio ${scene.file}: ${error.message}`);
    }

    const stats = fs.statSync(outputPath);
    console.log(`✅ Saved ${scene.file} (${(stats.size / 1024).toFixed(1)} KB)`);
  }

  console.log('\n🎉 Semua 8 voiceover berhasil dibuat!');
}

generateVoiceovers().catch((error) => {
  console.error('\n❌ Voiceover generation failed:', error.message);
  process.exit(1);
});
  
