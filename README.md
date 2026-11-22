# Bagaimana Internet Bekerja? — 3D Educational Motion Graphic (9:16)

Project produksi video edukasi 3D vertikal berdurasi **90 detik (8 Scene, 1080×1920 @ 30fps)** menggunakan **Remotion**, **React Three Fiber**, dan **Three.js**.

## Menjalankan Secara Lokal

```bash
npm install

# Buka Remotion Studio untuk preview interaktif
npm run dev

# Typecheck TypeScript
npm run typecheck

# Smoke test 1 frame WebGL
npm run smoke

# Render MP4 H.264 (9:16)
npm run render
```

## Konfigurasi GitHub Actions (`.github/workflows/render.yml`)

- Secara default workflow menggunakan file `public/audio/voiceover/scene-*.wav` yang sudah ada agar **tidak menghabiskan kredit ElevenLabs**.
- Jika ingin membuat ulang voiceover dari naskah terbaru, jalankan workflow secara manual (`workflow_dispatch`) dengan mencentang `regenerate_vo = true` dan memastikan secret `ELEVENLABS_API_KEY` sudah terpasang.
