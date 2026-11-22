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
      'Setiap hari kita kirim pesan, nonton video, sampai buka website—dan semuanya muncul dalam hitungan detik. Pernah kepikiran nggak, gimana data bisa melesat dari satu layar ke layar lain?',
    voFile: 'audio/voiceover/scene-01.wav',
  },
  {
    id: 'scene-02',
    number: 2,
    title: 'Jaringan Raksasa Global',
    subtitleTag: 'A GLOBAL NETWORK',
    startSec: 10,
    durationSec: 11,
    narration:
      'Internet itu bukan awan ajaib di langit, melainkan jutaan jaringan yang saling terhubung lewat kabel serat optik bawah laut, menara seluler, hingga satelit di seluruh dunia.',
    voFile: 'audio/voiceover/scene-02.wav',
  },
  {
    id: 'scene-03',
    number: 3,
    title: 'DNS: Buku Kontak Internet',
    subtitleTag: 'NAME TO ADDRESS · DNS',
    startSec: 21,
    durationSec: 12,
    narration:
      'Saat kamu mengetik nama website, komputer butuh alamat angka yang disebut IP Address. Di sinilah DNS bekerja seperti buku kontak raksasa untuk mencarikan alamat server tujuan.',
    voFile: 'audio/voiceover/scene-03.wav',
  },
  {
    id: 'scene-04',
    number: 4,
    title: 'Data Dipecah Jadi Paket',
    subtitleTag: 'TCP/IP · DATA PACKETS',
    startSec: 33,
    durationSec: 11,
    narration:
      'Setelah alamat ketemu, aturan TCP/IP memecah permintaanmu menjadi potongan kecil bernama paket data. Setiap paket diberi label tujuan dan nomor urut supaya nggak tertukar.',
    voFile: 'audio/voiceover/scene-04.wav',
  },
  {
    id: 'scene-05',
    number: 5,
    title: 'Router & Estafet ISP',
    subtitleTag: 'ROUTERS & ISP',
    startSec: 44,
    durationSec: 12,
    narration:
      'Paket-paket itu lalu melompat dari router rumah ke jaringan penyedia internet atau ISP. Setiap router membaca label tujuan dan memilihkan jalur tercepat, meski rutenya berbeda-beda.',
    voFile: 'audio/voiceover/scene-05.wav',
  },
  {
    id: 'scene-06',
    number: 6,
    title: 'Server Mengolah Data',
    subtitleTag: 'THE SERVER RESPONDS',
    startSec: 56,
    durationSec: 11,
    narration:
      'Begitu tiba di pusat data, server—komputer super tangguh yang bekerja non-stop—langsung memproses permintaanmu, menyiapkan data yang diminta, lalu mengirimkannya balik.',
    voFile: 'audio/voiceover/scene-06.wav',
  },
  {
    id: 'scene-07',
    number: 7,
    title: 'Dirakit Ulang di Layar',
    subtitleTag: 'REASSEMBLED ON YOUR DEVICE',
    startSec: 67,
    durationSec: 12,
    narration:
      'Ribuan paket balasan mendarat kembali di ponselmu. Browser lalu menyusun ulang potongan teks, gambar, dan video sesuai nomor urutnya hingga tampil utuh di layar.',
    voFile: 'audio/voiceover/scene-07.wav',
  },
  {
    id: 'scene-08',
    number: 8,
    title: 'Dunia di Balik Satu Sentuhan',
    subtitleTag: 'EVERYTHING IS CONNECTED',
    startSec: 79,
    durationSec: 11,
    narration:
      'Jadi, internet bukan sihir. DNS, paket data, router, ISP, dan server bekerja serempak dalam sekejap mata. Itulah perjalanan luar biasa di balik satu sentuhan jarimu.',
    voFile: 'audio/voiceover/scene-08.wav',
  },
];

export const SCENES: SceneConfig[] = RAW_SCENES.map((scene) => ({
  ...scene,
  startFrame: Math.round(scene.startSec * FPS),
  durationFrames: Math.round(scene.durationSec * FPS),
}));
