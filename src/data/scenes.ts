import { FPS } from '../styles/animation';

export interface SceneConfig {
  id: string;
  number: number;
  title: string;
  subtitleTag: string;
  startSec: number;
  durationSec: number;
  startFrame: number;
  durationFrames: number;
  narration: string;
  voFile: string;
}

const RAW_SCENES: Array<Omit<SceneConfig, 'startFrame' | 'durationFrames'>> = [
  {
    id: 'scene-01',
    number: 1,
    title: 'Bagaimana Internet Bekerja?',
    subtitleTag: 'THE INVISIBLE NETWORK',
    startSec: 0,
    durationSec: 10,
    narration:
      'Setiap hari, kita menggunakan internet. Mengirim pesan, menonton video, atau membuka website. Semuanya terasa instan. Tapi, sebenarnya… bagaimana informasi bisa berpindah dari satu perangkat ke perangkat lain?',
    voFile: 'audio/voiceover/scene-01.wav',
  },
  {
    id: 'scene-02',
    number: 2,
    title: 'Jaringan Global',
    subtitleTag: 'A GLOBAL NETWORK',
    startSec: 10,
    durationSec: 11,
    narration:
      'Internet adalah jaringan dari banyak jaringan yang menghubungkan perangkat di seluruh dunia. Perangkat-perangkat ini bisa saling bertukar data melalui berbagai jalur komunikasi.',
    voFile: 'audio/voiceover/scene-02.wav',
  },
  {
    id: 'scene-03',
    number: 3,
    title: 'Nama ke Alamat IP',
    subtitleTag: 'NAME TO ADDRESS · DNS',
    startSec: 21,
    durationSec: 12,
    narration:
      'Ketika kamu mengetik alamat website, DNS membantu mencari alamat IP server yang dituju. Bayangkan DNS seperti buku kontak yang membantu menemukan alamat sebuah tempat.',
    voFile: 'audio/voiceover/scene-03.wav',
  },
  {
    id: 'scene-04',
    number: 4,
    title: 'Data dalam Paket',
    subtitleTag: 'DATA IN PACKETS',
    startSec: 33,
    durationSec: 11,
    narration:
      'Browser kemudian mengirim permintaan. Informasi digital dibawa melalui jaringan dalam unit-unit data yang disebut paket. Paket-paket ini membantu data dikirim dan diteruskan di jaringan.',
    voFile: 'audio/voiceover/scene-04.wav',
  },
  {
    id: 'scene-05',
    number: 5,
    title: 'Router & Jalur Data',
    subtitleTag: 'ROUTERS & ROUTES',
    startSec: 44,
    durationSec: 12,
    narration:
      'Router membaca informasi tujuan paket, lalu meneruskannya ke jaringan berikutnya. Perjalanan data bisa melewati beberapa perangkat jaringan, dan tidak selalu melalui jalur yang sama.',
    voFile: 'audio/voiceover/scene-05.wav',
  },
  {
    id: 'scene-06',
    number: 6,
    title: 'Server Merespons',
    subtitleTag: 'THE SERVER RESPONDS',
    startSec: 56,
    durationSec: 11,
    narration:
      'Permintaan itu sampai ke server, yaitu komputer yang menyediakan data atau layanan. Server memproses permintaan, lalu mengirimkan respons kembali melalui jaringan.',
    voFile: 'audio/voiceover/scene-06.wav',
  },
  {
    id: 'scene-07',
    number: 7,
    title: 'Disusun Ulang di Layar',
    subtitleTag: 'REASSEMBLED ON YOUR DEVICE',
    startSec: 67,
    durationSec: 12,
    narration:
      'Perangkatmu menerima data tersebut. Browser memproses bagian-bagian yang diperlukan, lalu menyusun tampilan halaman web—teks, gambar, dan elemen lainnya—di layar.',
    voFile: 'audio/voiceover/scene-07.wav',
  },
  {
    id: 'scene-08',
    number: 8,
    title: 'Semuanya Terhubung',
    subtitleTag: 'EVERYTHING IS CONNECTED',
    startSec: 79,
    durationSec: 11,
    narration:
      'Jadi, internet bukan sihir. Ada DNS, router, server, dan banyak jaringan yang bekerja bersama agar informasi bisa sampai ke tujuan. Sekarang, kamu tahu sedikit tentang dunia di balik satu sentuhan.',
    voFile: 'audio/voiceover/scene-08.wav',
  },
];

export const SCENES: SceneConfig[] = RAW_SCENES.map((scene) => ({
  ...scene,
  startFrame: Math.round(scene.startSec * FPS),
  durationFrames: Math.round(scene.durationSec * FPS),
}));
