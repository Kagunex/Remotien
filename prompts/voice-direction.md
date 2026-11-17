# Voice Direction — THE LAST SIGNAL / PART 01

**Format rekaman:** WAV 48 kHz, mono, 24-bit, studio kering, tanpa musik, tanpa reverb (kecuali Stranger: reverb ruangan tipis).
Satu file per baris dengan nama di tabel. Lalu jalankan `npm run voice:build` → track per karakter (04:00) + manifest otomatis.

## Casting
- **Narrator** — pria Indonesia 35–45 th, dalam, resonansi dada, lambat, tenang, sedikit ominous, emosi tertahan.
- **Adrian** — pria Indonesia 24 th, pitch sedang-rendah, kasual, agak lelah dan cemas, napas halus; takut naik bertahap, tanpa akting berlebihan.
- **Caller** — **aktor/voice model yang sama dengan Adrian**. Sedikit lebih dalam dan terkontrol, mic sangat dekat. Efek telepon ditambahkan di post (`_phone.wav`), bukan saat rekaman.
- **Stranger** — pria dalam, gelap, pelan, minim emosi, mengancam tanpa teriak. Identitas ambigu: jangan samakan dengan Adrian.

## Daftar baris (sesuai naskah)
| ID | Shot | Mulai | File | Teks | Arahan |
|---|---|---|---|---|---|
| `n01` | 1 | 2.0s | `public/audio/voice/narrator/n01.wav` | Manusia selalu percaya bahwa waktu bergerak maju. Bahwa setiap kejadian memiliki awal dan akhir. | Pelan, berat, tenang. Jeda 0,6 dtk setelah "maju". |
| `n02` | 2 | 11.0s | `public/audio/voice/narrator/n02.wav` | Tetapi bagaimana jika ada sesuatu yang mengetahui apa yang akan terjadi... bahkan sebelum itu terjadi? | Lebih rendah di "bahkan sebelum itu terjadi". Jangan dramatis. |
| `a04a` | 4 | 41.0s | `public/audio/voice/adrian/a04a.wav` | Siapa yang telepon jam segini... | Serak baru bangun, setengah bergumam, napas berat. |
| `a04b` | 4 | 49.0s | `public/audio/voice/adrian/a04b.wav` | Adrian? | Bingung, nada naik tipis. Mulai curiga. |
| `a05a` | 5 | 56.0s | `public/audio/voice/adrian/a05a.wav` | Halo? | Pelan, ragu. Tarik napas sebelum bicara. Lalu 3 dtk hening. |
| `c05a` | 5 | 61.0s | `public/audio/voice/caller/c05a.wav` | Adrian... dengarkan aku baik-baik. | Intim, mic sangat dekat, mendesak tapi tenang. Suara IDENTIK dengan Adrian, sedikit lebih dalam. |
| `a05b` | 5 | 66.0s | `public/audio/voice/adrian/a05b.wav` | Siapa ini? | Datar tapi tegang. Napas pendek. |
| `c05b` | 5 | 69.0s | `public/audio/voice/caller/c05b.wav` | Kamu tidak punya banyak waktu. | Tenang, tegas. |
| `c06a` | 6 | 77.0s | `public/audio/voice/caller/c06a.wav` | Sebentar lagi seseorang akan mengetuk pintumu. | Pelan, terukur. |
| `a06a` | 6 | 82.0s | `public/audio/voice/adrian/a06a.wav` | Apa maksudmu? | Cemas tertahan, hampir berbisik. |
| `c06b` | 6 | 85.0s | `public/audio/voice/caller/c06b.wav` | Jangan buka pintunya. | Tegas, nyaris berbisik. Jeda sebelum "pintunya". |
| `a07` | 7 | 102.0s | `public/audio/voice/adrian/a07.wav` | Ini pasti lelucon... | Menyangkal diri sendiri, napas gemetar. |
| `s08a` | 8 | 122.0s | `public/audio/voice/stranger/s08a.wav` | Adrian? | Dari balik pintu: teredam, tenang, tanpa emosi. |
| `s08b` | 8 | 126.0s | `public/audio/voice/stranger/s08b.wav` | Aku tahu kamu di dalam. | Pelan, dingin, ancaman tanpa berteriak. |
| `a09a` | 9 | 150.0s | `public/audio/voice/adrian/a09a.wav` | Siapa sebenarnya kamu?! | Panik, tapi tetap realistis — bukan teriakan teatrikal. |
| `c09a` | 9 | 154.0s | `public/audio/voice/caller/c09a.wav` | Aku sudah bilang... jangan buka pintunya. | Lebih mendesak dari sebelumnya. |
| `a09b` | 9 | 159.0s | `public/audio/voice/adrian/a09b.wav` | Siapa orang di luar?! | Panik naik, suara pecah tipis. |
| `c09b` | 9 | 163.0s | `public/audio/voice/caller/c09b.wav` | Adrian... dia bukan orang yang seharusnya ada di sana. | Berat, lambat, penuh arti. |
| `a10` | 10 | 171.0s | `public/audio/voice/adrian/a10.wav` | Apa yang sebenarnya terjadi?! | Ketakutan puncak, napas tersengal. |
| `c10` | 10 | 176.0s | `public/audio/voice/caller/c10.wav` | Dengarkan aku. Apa pun yang kamu lihat, jangan percaya. | Sangat dekat di mic, urgent. |
| `r11` | 11 | 202.0s | `public/audio/voice/adrian/r11.wav` | Jika kamu sedang melihat ini... berarti semuanya terulang lagi. | Suara Adrian dalam rekaman: lebih lelah, datar, seperti pesan untuk diri sendiri. |
| `c12` | 12 | 220.0s | `public/audio/voice/caller/c12.wav` | Jangan... menoleh. | Bisikan, hampir tanpa nada. |
| `s13` | 13 | 234.0s | `public/audio/voice/stranger/s13.wav` | Akhirnya... kita bertemu lagi. | Sangat pelan, ada reverb ruangan alami. Jeda sebelum "kita bertemu lagi". Identitas tetap misterius. |

## Catatan
- Teks tidak boleh diubah atau diterjemahkan, tidak ada dialog tambahan.
- Baris **"Adrian..."** (Stranger) ada di daftarmu tapi tidak ada di naskah Part 01, jadi **belum dipasang**. Beri tahu shot dan waktunya bila mau dimasukkan.
- Naskah memuat dua baris Adrian yang tidak ada di daftarmu: `r11` (rekaman TV) dan `a10`. Keduanya tetap ada di sini.
- Untuk suara final nyata: aktor suara, atau ElevenLabs / voice cloning dengan satu voice ID untuk Adrian + Caller. `npm run voice:draft` hanya membuat draft TTS (edge-tts), bukan kualitas produksi.
