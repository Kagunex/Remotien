# Video Praktikum — Remotion

Template video dokumentasi praktikum vertikal 9:16 dari 4 foto yang kamu kirim.

## Spesifikasi
- Resolusi: 1080 × 1920 (vertikal)
- Frame rate: 30 FPS
- Durasi: 30 detik
- Efek: slow zoom, gerak kamera halus, overlay gelap sinematik, judul tahap, progress bar, opening dan closing.

## Jalankan di komputer / environment Linux
```bash
npm install
npm run dev
```

Render MP4:
```bash
npm run render
```

File hasil: `out/praktikum-video.mp4`

## Render dari Android
Termux Android sering terkendala Chromium/headless browser untuk rendering Remotion. Cara yang lebih ringan:
1. Upload folder project ini ke repository GitHub.
2. Buka tab **Actions**.
3. Jalankan workflow **Render Video**.
4. Unduh artifact `praktikum-video`.

## Ubah judul dan keterangan
Edit array `scenes` di `src/PraktikumVideo.tsx`.
Nama/judul praktikum belum diberikan, jadi teks saat ini dibuat netral berdasarkan hal yang terlihat pada foto.

## Catatan
Musik belum disertakan. Tambahkan file audio milik sendiri ke `public/music.mp3`, lalu pasang komponen `<Audio src={staticFile('music.mp3')} />` di komposisi jika diperlukan.
