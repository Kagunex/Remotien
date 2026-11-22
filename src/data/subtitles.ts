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
  { id: 'sub-01-1', sceneId: 'scene-01', startSec: 0.3, endSec: 3.4, text: 'Setiap hari kita kirim pesan, nonton video, sampai buka website—' },
  { id: 'sub-01-2', sceneId: 'scene-01', startSec: 3.4, endSec: 5.8, text: 'dan semuanya muncul dalam hitungan detik.' },
  { id: 'sub-01-3', sceneId: 'scene-01', startSec: 5.8, endSec: 9.7, text: 'Pernah kepikiran, gimana data melesat dari satu layar ke layar lain?' },

  // Scene 02 (00:10 - 00:21)
  { id: 'sub-02-1', sceneId: 'scene-02', startSec: 10.3, endSec: 15.2, text: 'Internet bukan awan ajaib di langit, melainkan jutaan jaringan terhubung' },
  { id: 'sub-02-2', sceneId: 'scene-02', startSec: 15.2, endSec: 20.6, text: 'lewat kabel serat optik bawah laut, menara seluler, hingga satelit.' },

  // Scene 03 (00:21 - 00:33)
  { id: 'sub-03-1', sceneId: 'scene-03', startSec: 21.3, endSec: 26.8, text: 'Saat mengetik nama website, komputer butuh alamat angka bernama IP Address.' },
  { id: 'sub-03-2', sceneId: 'scene-03', startSec: 26.8, endSec: 32.6, text: 'DNS bekerja seperti buku kontak raksasa untuk mencarikan alamat server tujuan.' },

  // Scene 04 (00:33 - 00:44)
  { id: 'sub-04-1', sceneId: 'scene-04', startSec: 33.3, endSec: 38.6, text: 'Aturan TCP/IP memecah permintaanmu menjadi potongan kecil bernama paket data.' },
  { id: 'sub-04-2', sceneId: 'scene-04', startSec: 38.6, endSec: 43.7, text: 'Setiap paket diberi label tujuan dan nomor urut supaya nggak tertukar.' },

  // Scene 05 (00:44 - 00:56)
  { id: 'sub-05-1', sceneId: 'scene-05', startSec: 44.3, endSec: 49.8, text: 'Paket melompat dari router rumah ke jaringan penyedia internet (ISP).' },
  { id: 'sub-05-2', sceneId: 'scene-05', startSec: 49.8, endSec: 55.6, text: 'Tiap router memilihkan jalur tercepat, meski rutenya berbeda-beda.' },

  // Scene 06 (00:56 - 01:07)
  { id: 'sub-06-1', sceneId: 'scene-06', startSec: 56.3, endSec: 61.8, text: 'Tiba di pusat data, server tangguh langsung memproses permintaanmu,' },
  { id: 'sub-06-2', sceneId: 'scene-06', startSec: 61.8, endSec: 66.7, text: 'menyiapkan data yang diminta, lalu mengirimkannya kembali.' },

  // Scene 07 (01:07 - 01:19)
  { id: 'sub-07-1', sceneId: 'scene-07', startSec: 67.3, endSec: 71.2, text: 'Ribuan paket balasan mendarat kembali di ponselmu.' },
  { id: 'sub-07-2', sceneId: 'scene-07', startSec: 71.2, endSec: 78.6, text: 'Browser menyusun ulang teks, gambar, dan video hingga tampil utuh di layar.' },

  // Scene 08 (01:19 - 01:30)
  { id: 'sub-08-1', sceneId: 'scene-08', startSec: 79.3, endSec: 81.8, text: 'Jadi, internet bukan sihir.' },
  { id: 'sub-08-2', sceneId: 'scene-08', startSec: 81.8, endSec: 86.2, text: 'DNS, paket data, router, ISP, dan server bekerja serempak dalam sekejap.' },
  { id: 'sub-08-3', sceneId: 'scene-08', startSec: 86.2, endSec: 89.7, text: 'Itulah perjalanan luar biasa di balik satu sentuhan jarimu.' },
];

export const SUBTITLES: SubtitleCue[] = RAW_SUBTITLES.map((cue) => ({
  ...cue,
  startFrame: Math.round(cue.startSec * FPS),
  endFrame: Math.round(cue.endSec * FPS),
}));
