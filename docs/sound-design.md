# Sound Design & ElevenLabs Pipeline

1. **Voiceover (TTS)**: Dihasilkan otomatis melalui `scripts/generate-elevenlabs-vo.mjs` menggunakan model `eleven_multilingual_v2` dalam format PCM 44.1kHz WAV agar sinkron akurat dengan frame Remotion.
2. **Music Bed**: `public/audio/music/education-bed.wav` berjalan penuh 90 detik dengan *auto-ducking* otomatis ke `0.11` saat narasi aktif.
3. **SFX**: Ditempatkan per frame pada `src/data/audio-cues.ts` (riser, whoosh, UI pop, digital blip, chime, packet pop, mechanical slide, power-up).
