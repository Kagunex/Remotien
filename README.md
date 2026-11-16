# Metode Pemisahan Campuran — Cinematic Science Documentary

Video edukasi Remotion dengan gaya Cinematic Science × Liquid Glass.

## Spesifikasi
- 1920 × 1080 (16:9 landscape)
- 30 FPS, 1.800 frame, durasi 60 detik
- MP4 H.264 melalui Remotion CLI
- Empat foto praktikum asli dipertahankan dan ditampilkan dalam floating glass frames
- Background CSS 3D, parallax, partikel, glass panels, diagram prinsip ilmiah, dan kinetic typography
- Musik instrumental cinematic electronic original yang disusun khusus untuk video (ambient pads, piano-like bell motif, synth pulse, bass accents, transition impacts, dan fade-out), 60 detik, 48 kHz stereo (`public/music.wav`).

## Storyboard
| Waktu | Scene | Dokumentasi |
|---|---|---|
| 00–07 dtk | Cinematic opening | — |
| 07–19 dtk | 01 — Kromatografi | foto-1.jpg |
| 19–30 dtk | 02 — Sublimasi | foto-2.jpg |
| 30–42 dtk | 03 — Evaporasi | foto-3.jpg |
| 42–51 dtk | Sublimasi — dokumentasi kedua | foto-4.jpg |
| 51–60 dtk | Science summary | Empat prinsip, termasuk filtrasi sebagai informasi saja |

Foto 3 dipertahankan sebagai dokumentasi scene Evaporasi sesuai urutan materi yang ditentukan. Teks membatasi deskripsi pada peralatan yang tampak dan prinsip umum, tanpa mengklaim hasil pengamatan yang tidak dapat dipastikan dari foto.

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
Workflow `/.github/workflows/render.yml` dipertahankan. Upload project ke GitHub, lalu jalankan workflow **Render Video** dari tab Actions. Artifact bernama `praktikum-video`.

## Implementasi
- Composition ID tetap `PraktikumVideo` agar workflow render tidak perlu diubah.
- Durasi dan ukuran composition diatur di `src/Root.tsx`.
- Scene, layout, teks, diagram, animasi, dan audio berada di `src/PraktikumVideo.tsx`.
- Tidak menggunakan WebGL atau library 3D eksternal; animasi memakai CSS 3D dan Remotion agar ramah Chromium headless.
