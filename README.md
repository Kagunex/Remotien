# Metode Pemisahan Campuran — Remotion Cinematic Edition

Video edukasi vertikal 30 detik berbasis Remotion dengan art direction Cinematic Science × Liquid Glass.

## Spesifikasi
- 1080 × 1920 (9:16), 30 FPS, 900 frame / 30 detik
- Output MP4 H.264 melalui Remotion CLI
- Empat foto praktikum asli ditampilkan di dalam floating glass frames (bukan full-screen)
- CSS 3D transforms, SVG-free CSS geometry, ambient particles/grid, parallax, kinetic typography, fades dan camera drift
- Musik latar `public/music.wav` (durasi 30 detik)

## Menjalankan
```bash
npm install
npm run dev
```

Render:
```bash
npm run render
```
Hasil: `out/praktikum-video.mp4`

## GitHub Actions
Workflow `/.github/workflows/render.yml` tetap dipertahankan. Upload project ke GitHub, lalu jalankan workflow **Render Video** dari tab Actions. Artifact bernama `praktikum-video`.

## Penyesuaian konten
Urutan foto dan copy berada di array `scenes` pada `src/PraktikumVideo.tsx`.
Keterangan dibuat berdasarkan hal yang tampak pada foto. Jika nama bahan, tujuan percobaan, atau hasil pengamatan sudah diketahui, teks dapat diperjelas tanpa mengubah foto asli.

## Catatan
Implementasi mengutamakan CSS 3D dan komponen Remotion standar agar kompatibel dengan Chromium headless. Tidak menggunakan WebGL atau library 3D eksternal.
