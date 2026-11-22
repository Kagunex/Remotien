# Sound Design & Audio Mix

1. **Voiceover (TTS)**: 8 file WAV (`public/audio/voiceover/scene-01.wav` – `scene-08.wav`) dipertahankan agar tidak membuang kredit ElevenLabs. Di workflow GitHub Actions, regenerasi bersifat opt-in (`regenerate_vo: false` secara default).
2. **Music Bed**: `public/audio/music/education-bed.wav` dengan fade-in 1,5 detik, *auto-ducking* halus ke `0.095` saat VO aktif, dan fade-out 3,5 detik di akhir.
3. **SFX**: Dikelompokkan per kategori & scene di `src/data/audio-cues.ts` dan dirender modular lewat `AudioTimeline.tsx`.
