#!/usr/bin/env python3
"""Pipeline voice-over THE LAST SIGNAL — PART 01.

  python3 scripts/voice_pipeline.py          # build: konform 48 kHz, versi telepon, track karakter, manifest
  python3 scripts/voice_pipeline.py --tts    # + buat DRAFT suara dengan edge-tts (pip install edge-tts)

Rekaman final: taruh WAV per baris di public/audio/voice/<karakter>/<id>.wav (id ada di prompts/voice-direction.md).
Hasil build:
  public/audio/voice/<karakter>/<id>.wav          baris individual (48 kHz, mono, 24-bit)
  public/audio/voice/caller/<id>_phone.wav        versi bandwidth telepon (dipakai video)
  public/audio/voice/<karakter>/<karakter>_track.wav   track 04:00 penuh per karakter (tanpa musik)
Butuh: ffmpeg, numpy.
"""
import asyncio, json, os, subprocess, sys
import numpy as np

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
CUES = json.load(open(os.path.join(ROOT, 'src/config/cues.json'), encoding='utf-8'))
VDIR = os.path.join(ROOT, 'public/audio/voice')
SR, TOTAL = 48000, 240
FOLDER = {'narrator': 'narrator', 'adrian': 'adrian', 'recording': 'adrian', 'caller': 'caller', 'stranger': 'stranger'}

# DRAFT TTS saja (edge-tts hanya punya 1 suara pria ID). Pitch/EQ membedakan karakter.
TTS = {  # voice, pitch, rate, ffmpeg filter
    'narrator': ('id-ID-ArdiNeural', '-28Hz', '-14%', 'equalizer=f=110:t=q:w=1:g=5,lowpass=f=9000'),
    'adrian': ('id-ID-ArdiNeural', '+0Hz', '+0%', ''),
    'recording': ('id-ID-ArdiNeural', '+0Hz', '+0%', ''),
    'caller': ('id-ID-ArdiNeural', '-6Hz', '-8%', 'equalizer=f=120:t=q:w=1:g=2'),   # suara Adrian, sedikit lebih dalam
    'stranger': ('id-ID-ArdiNeural', '-45Hz', '-25%', 'lowpass=f=6500,aecho=0.8:0.5:70:0.25'),
}
PHONE = 'highpass=f=350,lowpass=f=3400,acompressor=threshold=0.1:ratio=3'


def wav_path(c, suffix=''):
    return os.path.join(VDIR, FOLDER[c['voice']], f"{c['id']}{suffix}.wav")


def ff(*a):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *a], check=True)


def tts_draft():
    import edge_tts
    async def run():
        for c in CUES:
            voice, pitch, rate, flt = TTS[c['voice']]
            if c.get('fx') == 'whisper':
                rate = '-30%'
            tmp = wav_path(c, '.tmp').replace('.wav', '.mp3')
            await edge_tts.Communicate(c['text'], voice, rate=rate, pitch=pitch).save(tmp)
            args = ['-i', tmp, '-ar', str(SR), '-ac', '1']
            if flt:
                args += ['-af', flt]
            ff(*args, '-c:a', 'pcm_s24le', wav_path(c))
            os.remove(tmp)
            print('  draft', c['id'])
    asyncio.run(run())


def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def save24(path, x):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-',
                    '-c:a', 'pcm_s24le', path], input=np.clip(x, -1, 1).astype(np.float32).tobytes(), check=True)


def build():
    tracks = {k: np.zeros(TOTAL * SR, dtype=np.float32) for k in set(FOLDER.values())}
    manifest, missing = {}, []
    for c in CUES:
        p = wav_path(c)
        if not os.path.exists(p):
            missing.append(c['id'])
            continue
        use = p
        if c['voice'] == 'caller':               # efek telepon dibuat di post, bukan saat rekaman
            use = wav_path(c, '_phone')
            ff('-i', p, '-af', PHONE, '-ar', str(SR), '-ac', '1', '-c:a', 'pcm_s24le', use)
        x = load(use)
        i = int(c['at'] * SR)
        seg = x[: len(tracks[FOLDER[c['voice']]]) - i]
        tracks[FOLDER[c['voice']]][i:i + len(seg)] += seg
        manifest[c['id']] = os.path.relpath(use, os.path.join(ROOT, 'public')).replace(os.sep, '/')
        print('  ok', c['id'], f"({len(x) / SR:.1f}s / slot {c['dur']}s)")
        if len(x) / SR > c['dur'] + 0.5:
            print('     ! lebih panjang dari slot — cek tumpang tindih dengan baris berikutnya')
    for name, t in tracks.items():
        if np.any(t):
            save24(os.path.join(VDIR, name, f'{name}_track.wav'), t)
    json.dump(manifest, open(os.path.join(ROOT, 'src/config/voice-manifest.json'), 'w'), indent=2)
    print(f"manifest: {len(manifest)} baris" + (f" | belum ada: {', '.join(missing)}" if missing else ''))


if __name__ == '__main__':
    if '--tts' in sys.argv:
        tts_draft()
    build()
