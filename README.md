# Bagaimana Internet Bekerja? — 3D Educational Motion Graphic

Project produksi video edukasi 3D berdurasi **90 detik (8 Scene, 1920×1080 @ 30fps)** menggunakan **Remotion**, **React Three Fiber**, **Three.js**, dan integrasi otomatis **ElevenLabs Text-to-Speech** di GitHub Actions.

## Menjalankan Secara Lokal

```bash
npm install
# Opsional: generate voiceover Bahasa Indonesia dari ElevenLabs
export ELEVENLABS_API_KEY="sk_..."
npm run tts:generate

# Buka Remotion Studio untuk preview interaktif
npm run dev

# Render MP4 H.264
npm run render
```

## Konfigurasi GitHub Actions (`render.yml` & `render-video.yml`)

Tambahkan repository secret berikut di **Settings → Secrets and variables → Actions**:
- `ELEVENLABS_API_KEY` (Wajib untuk generate voiceover otomatis saat workflow berjalan)
- `ELEVENLABS_VOICE_ID` (Opsional, default ke voice multilingual standar)

Workflow dapat dijalankan manual lewat tab **Actions → Run workflow** atau otomatis saat ada perubahan pada `src/` atau `public/`.
