# THE LAST SIGNAL — PART 01 "THE FIRST CALL"
1920×1080 · 60 FPS · 14.400 frame (04:00) · H.264 + AAC

## Mulai
```bash
npm install
npm run dev            # Remotion Studio (Part01, CharacterSheet, folder Shots/Shot01–Shot13)
npm run voice          # (opsional) voice-over Indonesia: pip install edge-tts
npm run render         # -> out/part01.mp4
npm run still:sheet    # -> out/character-sheet.png (desain Adrian, Nadia, The Stranger)
```
Musik/SFX sudah dibuat (`public/audio/*.wav`). Buat ulang dengan `npm run audio` (numpy).
Voice-over aktif otomatis setelah `npm run voice` (mengisi `src/config/voice-manifest.json`).

## Struktur
- `src/config/` warna, tipografi, timing (shot & scene), `cues.json` (dialog + waktu, satu sumber untuk subtitle & TTS)
- `src/components/` kamera, lighting, grain, subtitle, transisi, karakter, props, sound design, voice
- `src/shots/Shot01–13.tsx` satu file per shot sesuai naskah
- `src/scenes/` 5 scene (Opening, PhoneCall, Knock, Television, FinalReveal) + CharacterSheet
- `src/parts/Part01.tsx` merakit semuanya + audio + subtitle

## Catatan
- Suara penelepon memakai voice Adrian (kontinuitas), dengan filter telepon via ffmpeg.
- Film grain (feTurbulence) memakan waktu render; turunkan di `FilmGrain` atau pakai `--concurrency`.
- Tabel frame di naskah (Revelation 10.200–14.399) disesuaikan: Television 170–215s, Reveal 215–240s.
- Ganti desain vektor dengan aset di `public/characters|environments|props` kapan saja.

## Voice, gambar, dan struktur `public/`
```
public/audio/{voice/{narrator,adrian,caller,stranger},music,sfx}
public/environments/{apartment,hallway,bedroom,laboratory}
public/props/{smartphone,clock,television,door,window-rain,recording-equipment}
```
- **Voice:** `prompts/voice-direction.md` (casting + tabel baris + nama file). Taruh WAV rekaman → `npm run voice:build`
  (48 kHz/24-bit, versi telepon untuk Caller, track per karakter 04:00, manifest). `npm run voice:draft` = draft TTS.
- **Gambar:** `prompts/style-bible.md`, `environments.md`, `props.md`. Simpan di path yang tertulis, lalu `npm run assets`.
  Saat ini aset foto dipakai otomatis untuk `apartment` (Room) dan `hallway` (lubang intip); aset lain sudah siap di folder.
