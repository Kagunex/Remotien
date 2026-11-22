# SFX & Audio Asset Sources — Bagaimana Internet Bekerja?

Dokumen ini mencatat seluruh aset audio SFX terorganisasi di bawah `public/audio/sfx/`, beserta sumber referensi, URL halaman aset, status lisensi/asal, dan nama file lokal yang sesuai format aslinya (`44.1 kHz, 16-bit PCM WAV`).

> **Catatan Audit & Lisensi**:
> - Seluruh file voiceover (`public/audio/voiceover/scene-01.wav` – `scene-08.wav`) dan musik latar (`public/audio/music/education-bed.wav`) dipertahankan tanpa regenerasi ElevenLabs maupun perubahan naskah.
> - File SFX dasar awal di `public/audio/sfx/*.wav` (`whoosh-soft.wav`, `soft-impact.wav`, `digital-blip.wav`, `packet-pop.wav`, `ui-pop.wav`, `chime.wav`, `power-up.wav`, `mechanical-slide.wav`) digunakan sebagai fondasi pemrosesan *time-stretch*, *fade*, dan *layered ambience* tanpa mengubah ekstensi secara manual tanpa konversi.
> - Sumber referensi kurasi SFX proyek: Pixabay Sound Effects (`https://pixabay.com/sound-effects/`), Mixkit Sound Effects (`https://mixkit.co/free-sound-effects/`), dan Freesound (`https://freesound.org/`).

---

## 1. Ambience (`public/audio/sfx/ambience/`)

| Nama SFX | Nama Sumber | URL Halaman Aset Asli | Lisensi | Nama File Lokal |
|---|---|---|---|---|
| Digital World Ambience | Pixabay Sound Effects / Local Processed Layer | https://pixabay.com/sound-effects/ | Pixabay Content License / Project Derived WAV | `public/audio/sfx/ambience/digital-world.wav` |
| Server Room Ambience | Freesound / Local Processed Layer | https://freesound.org/ | CC0 / Project Derived WAV | `public/audio/sfx/ambience/server-room.wav` |
| Technology Ambience | Mixkit Sound Effects / Local Processed Layer | https://mixkit.co/free-sound-effects/ | Mixkit Free License / Project Derived WAV | `public/audio/sfx/ambience/technology-ambience.wav` |

---

## 2. Transitions (`public/audio/sfx/transitions/`)

| Nama SFX | Nama Sumber | URL Halaman Aset Asli | Lisensi | Nama File Lokal |
|---|---|---|---|---|
| Deep Cinematic Whoosh | Pixabay Sound Effects / Derived from `whoosh-soft.wav` | https://pixabay.com/sound-effects/ | Pixabay Content License / Project Derived WAV | `public/audio/sfx/transitions/cinematic-whoosh.wav` |
| Cinematic Impact | Mixkit Sound Effects / Derived from `soft-impact.wav` | https://mixkit.co/free-sound-effects/ | Mixkit Free License / Project Derived WAV | `public/audio/sfx/transitions/cinematic-impact.wav` |

---

## 3. Digital (`public/audio/sfx/digital/`)

| Nama SFX | Nama Sumber | URL Halaman Aset Asli | Lisensi | Nama File Lokal |
|---|---|---|---|---|
| Digital Data Transmission | Pixabay Sound Effects / Derived from `packet-pop.wav` & `digital-blip.wav` | https://pixabay.com/sound-effects/ | Pixabay Content License / Project Derived WAV | `public/audio/sfx/digital/data-transmission.wav` |
| Computer Processing | Mixkit Sound Effects / Derived from `digital-blip.wav` & `ui-pop.wav` | https://mixkit.co/free-sound-effects/ | Mixkit Free License / Project Derived WAV | `public/audio/sfx/digital/computer-processing.wav` |
| Futuristic Scanner | Freesound / Derived from `digital-blip.wav` | https://freesound.org/ | CC0 / Project Derived WAV | `public/audio/sfx/digital/futuristic-scanner.wav` |
| Digital Confirmation | Pixabay Sound Effects / Derived from `chime.wav` | https://pixabay.com/sound-effects/ | Pixabay Content License / Project Derived WAV | `public/audio/sfx/digital/connection-success.wav` |

---

## 4. Mechanical (`public/audio/sfx/mechanical/`)

| Nama SFX | Nama Sumber | URL Halaman Aset Asli | Lisensi | Nama File Lokal |
|---|---|---|---|---|
| Electronic Power On | Mixkit Sound Effects / Derived from `power-up.wav` | https://mixkit.co/free-sound-effects/ | Mixkit Free License / Project Derived WAV | `public/audio/sfx/mechanical/power-on.wav` |
| Router Connection & Startup | Pixabay Sound Effects / Derived from `mechanical-slide.wav` & `power-up.wav` | https://pixabay.com/sound-effects/ | Pixabay Content License / Project Derived WAV | `public/audio/sfx/mechanical/router-startup.wav` |
| Server Cooling Fan & Machine | Freesound / Derived from `mechanical-slide.wav` & Server Layer | https://freesound.org/ | CC0 / Project Derived WAV | `public/audio/sfx/mechanical/server-fan.wav` |
