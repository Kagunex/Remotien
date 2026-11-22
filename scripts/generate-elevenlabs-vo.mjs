import fs from 'node:fs';
import path from 'node:path';

const API_KEY = process.env.ELEVENLABS_API_KEY;
// Default: Rachel / Multilingual v2 (bisa diganti ke Voice ID Bahasa Indonesia pilihan via env ELEVENLABS_VOICE_ID)
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
    console.warn('⚠️ ELEVENLABS_API_KEY tidak ditemukan. Menggunakan file WAV placeholder bawaan.');
    return;
  }

  console.log(`🎙️ Generating 8 scene voiceovers via ElevenLabs (Model: ${MODEL_ID}, Voice: ${VOICE_ID})...`);

  for (const scene of SCENES_NARRATION) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=pcm_44100`;
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
      throw new Error(`ElevenLabs API error (${response.status}) on ${scene.file}: ${errText}`);
    }

    const pcmBuffer = Buffer.from(await response.arrayBuffer());
    const wavBuffer = wrapPcmAsWav(pcmBuffer, 44100, 1, 16);

    fs.mkdirSync(path.dirname(scene.file), { recursive: true });
    fs.writeFileSync(scene.file, wavBuffer);
    console.log(`✅ Saved ${scene.file} (${(wavBuffer.length / 1024).toFixed(1)} KB)`);
  }
}

function wrapPcmAsWav(pcmData, sampleRate, numChannels, bitsPerSample) {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmData]);
}

generateVoiceovers().catch((err) => {
  console.error(err);
  process.exit(1);
});
