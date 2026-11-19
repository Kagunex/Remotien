# BIOLUMINESCENCE — THE GLOWING OCEAN (Episode 01)

Proyek video edukasi sains 3D vertikal (`1080×1920`, `30 FPS`, `60 detik`) yang dirender langsung dari kode menggunakan **TypeScript**, **React**, **Remotion**, **Three.js / React Three Fiber**, **FFmpeg**, dan **TTS Bahasa Indonesia**.

## 1. Status Audio di Dalam ZIP Ini

- `public/audio/ambient-ocean.wav` & `public/audio/synth-pad.wav`: **Sudah tersedia** (48 kHz stereo asli).
- `public/audio/narration-id.mp3` & `src/narration/timing.json`: **Belum digenerate** karena lingkungan eksekusi tidak memiliki akses jaringan ke API TTS (ElevenLabs / OpenAI / Edge-TTS) maupun FFmpeg. Jalankan `npm run prepare:audio` di mesin lokal Anda untuk menghasilkan dubbing Bahasa Indonesia nyata sebelum merender MP4.

## 2. Instalasi & Jalankan

```bash
npm install
cp .env.example .env
# Install edge-tts gratis (suara pria Bahasa Indonesia id-ID-ArdiNeural) atau isi API key di .env:
pip install edge-tts

# 1. Generate dubbing TTS nyata + timing.json + soundscape:
npm run prepare:audio

# 2. Validasi seluruh aset, durasi, & subtitle:
npm run validate

# 3. Preview interaktif di Remotion Studio:
npm run preview

# 4. Render video akhir MP4 (H.264 + AAC 48 kHz):
npm run render
```
