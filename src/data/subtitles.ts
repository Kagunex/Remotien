import { FPS } from '../styles/animation';

export interface SubtitleCue {
  id: string;
  sceneId: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  endFrame: number;
  text: string;
}

const RAW_SUBTITLES: Array<Omit<SubtitleCue, 'startFrame' | 'endFrame'>> = [
  // Scene 01 (00:00 - 00:10)
  { id: 'sub-01-1', sceneId: 'scene-01', startSec: 0.3, endSec: 2.6, text: 'Setiap hari, kita menggunakan internet.' },
  { id: 'sub-01-2', sceneId: 'scene-01', startSec: 2.6, endSec: 5.4, text: 'Mengirim pesan, menonton video, atau membuka website.' },
  { id: 'sub-01-3', sceneId: 'scene-01', startSec: 5.4, endSec: 7.0, text: 'Semuanya terasa instan.' },
  { id: 'sub-01-4', sceneId: 'scene-01', startSec: 7.0, endSec: 9.8, text: 'Tapi, bagaimana informasi berpindah antar perangkat?' },

  // Scene 02 (00:10 - 00:21)
  { id: 'sub-02-1', sceneId: 'scene-02', startSec: 10.3, endSec: 15.5, text: 'Internet adalah jaringan dari banyak jaringan yang menghubungkan perangkat di seluruh dunia.' },
  { id: 'sub-02-2', sceneId: 'scene-02', startSec: 15.5, endSec: 20.6, text: 'Perangkat-perangkat ini saling bertukar data melalui berbagai jalur komunikasi.' },

  // Scene 03 (00:21 - 00:33)
  { id: 'sub-03-1', sceneId: 'scene-03', startSec: 21.3, endSec: 26.8, text: 'Ketika kamu mengetik alamat website, DNS membantu mencari alamat IP server yang dituju.' },
  { id: 'sub-03-2', sceneId: 'scene-03', startSec: 26.8, endSec: 32.6, text: 'Bayangkan DNS seperti buku kontak untuk menemukan alamat sebuah tempat.' },

  // Scene 04 (00:33 - 00:44)
  { id: 'sub-04-1', sceneId: 'scene-04', startSec: 33.3, endSec: 36.2, text: 'Browser kemudian mengirim permintaan.' },
  { id: 'sub-04-2', sceneId: 'scene-04', startSec: 36.2, endSec: 40.3, text: 'Informasi digital dibawa dalam unit-unit kecil yang disebut paket.' },
  { id: 'sub-04-3', sceneId: 'scene-04', startSec: 40.3, endSec: 43.7, text: 'Paket-paket ini membantu data dikirim dan diteruskan di jaringan.' },

  // Scene 05 (00:44 - 00:56)
  { id: 'sub-05-1', sceneId: 'scene-05', startSec: 44.3, endSec: 49.8, text: 'Router membaca informasi tujuan paket, lalu meneruskannya ke jaringan berikutnya.' },
  { id: 'sub-05-2', sceneId: 'scene-05', startSec: 49.8, endSec: 55.6, text: 'Perjalanan data melewati beberapa perangkat, dan tidak selalu lewat jalur yang sama.' },

  // Scene 06 (00:56 - 01:07)
  { id: 'sub-06-1', sceneId: 'scene-06', startSec: 56.3, endSec: 61.8, text: 'Permintaan sampai ke server, yaitu komputer yang menyediakan data atau layanan.' },
  { id: 'sub-06-2', sceneId: 'scene-06', startSec: 61.8, endSec: 66.7, text: 'Server memproses permintaan, lalu mengirimkan respons kembali melalui jaringan.' },

  // Scene 07 (01:07 - 01:19)
  { id: 'sub-07-1', sceneId: 'scene-07', startSec: 67.3, endSec: 70.2, text: 'Perangkatmu menerima data tersebut.' },
  { id: 'sub-07-2', sceneId: 'scene-07', startSec: 70.2, endSec: 78.6, text: 'Browser memprosesnya dan menyusun tampilan halaman web—teks, gambar, dan elemen lainnya.' },

  // Scene 08 (01:19 - 01:30)
  { id: 'sub-08-1', sceneId: 'scene-08', startSec: 79.3, endSec: 81.8, text: 'Jadi, internet bukan sihir.' },
  { id: 'sub-08-2', sceneId: 'scene-08', startSec: 81.8, endSec: 86.5, text: 'Ada DNS, router, server, dan banyak jaringan yang bekerja bersama.' },
  { id: 'sub-08-3', sceneId: 'scene-08', startSec: 86.5, endSec: 89.7, text: 'Sekarang, kamu tahu dunia di balik satu sentuhan.' },
];

export const SUBTITLES: SubtitleCue[] = RAW_SUBTITLES.map((cue) => ({
  ...cue,
  startFrame: Math.round(cue.startSec * FPS),
  endFrame: Math.round(cue.endSec * FPS),
}));
