#!/usr/bin/env python3
"""Sintesis musik, ambience & SFX untuk THE LAST SIGNAL -> public/audio/*.wav (butuh numpy)."""
import os
import wave
import numpy as np

SR = 44100
BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'audio')
os.makedirs(os.path.join(BASE, 'music'), exist_ok=True)
os.makedirs(os.path.join(BASE, 'sfx'), exist_ok=True)
rng = np.random.default_rng(7)


def T(d):
    return np.arange(int(SR * d)) / SR


def noise(d):
    return rng.standard_normal(int(SR * d))


def filt(x, lo=None, hi=None):
    """Band-limit lewat FFT (hasil loop-safe)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if hi:
        m *= 1 / (1 + (f / hi) ** 4)
    if lo:
        m *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    return np.fft.irfft(X * m, len(x))


def save(name, x, gain=0.9):
    x = np.asarray(x, dtype=np.float64)
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    sub = 'music' if name == 'music' else 'sfx'
    with wave.open(os.path.join(BASE, sub, name + '.wav'), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())
    print('  ', name + '.wav')


def q(freq, d):
    """Kuantisasi frekuensi agar loop mulus."""
    return round(freq * d) / d


# rain (20s loop)
d = 20
t = T(d)
rain = filt(noise(d), 400, 7500) + 0.5 * filt(noise(d), None, 250)
drops = np.zeros_like(t)
for i in rng.integers(0, len(t) - 2000, 900):
    drops[i] = rng.uniform(0.5, 1.5)
rain += 6 * filt(drops, 1800, 9000)
save('rain', rain)

# clock tick (10s loop, 1 tik/detik)
d = 10
x = np.zeros(int(SR * d))
for s in range(d):
    tt = T(0.12)
    f0 = 1800 if s % 2 == 0 else 1400
    tick = np.exp(-tt * 90) * np.sin(2 * np.pi * f0 * tt) + 0.4 * np.exp(-tt * 300) * rng.standard_normal(len(tt))
    i = s * SR
    x[i:i + len(tick)] += tick
save('clock', x, 0.7)

# heartbeat (6 detak @70bpm, loop)
per = 60 / 70
d = per * 6
x = np.zeros(int(SR * d))
for b in range(6):
    for off, f0, a in ((0, 55, 1.0), (0.28, 46, 0.7)):
        tt = T(0.35)
        beat = a * np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 16) * (1 - np.exp(-tt * 400))
        i = int((b * per + off) * SR)
        x[i:i + len(beat)] += beat[: len(x) - i]
save('heartbeat', x)

# suspense drone (20s loop)
d = 20
t = T(d)
lfo = 0.5 + 0.5 * np.sin(2 * np.pi * q(0.15, d) * t)
drone = (np.sin(2 * np.pi * q(55, d) * t) + np.sin(2 * np.pi * q(55.8, d) * t)
         + 0.5 * np.sin(2 * np.pi * q(82.4, d) * t) + 0.3 * np.sin(2 * np.pi * q(110.3, d) * t * (1 + 0.0)))
drone *= 0.6 + 0.4 * lfo
swell = filt(noise(d), None, 500) * (0.2 + 0.8 * lfo) * 0.6
squeal = 0.05 * np.sin(2 * np.pi * q(1760, d) * t) * lfo ** 3
save('suspense', drone + swell + squeal)

# music: dark ambient pad + bell jarang (40s loop)
d = 40
t = T(d)
pad = np.zeros_like(t)
for k, (f0, a) in enumerate(((55, 1), (82.41, 0.7), (130.81, 0.5), (110, 0.6), (164.81, 0.25))):
    mod = 0.55 + 0.45 * np.sin(2 * np.pi * q(0.05 * (k + 1), d) * t + k)
    pad += a * mod * (np.sin(2 * np.pi * q(f0, d) * t) + 0.5 * np.sin(2 * np.pi * q(f0 * 2.003, d) * t))
sub = np.zeros_like(t)
for s in range(0, d, 4):
    tt = T(3)
    n = np.sin(2 * np.pi * 36 * tt) * np.exp(-tt * 1.2) * (1 - np.exp(-tt * 20))
    i = s * SR
    sub[i:i + len(n)] += n[: len(sub) - i]
bells = np.zeros_like(t)
for s, f0 in ((3, 440), (9.5, 329.6), (15, 392), (22, 440), (28.5, 261.6), (35, 329.6)):
    tt = T(4)
    n = (np.sin(2 * np.pi * f0 * tt) + 0.3 * np.sin(2 * np.pi * f0 * 2.76 * tt)) * np.exp(-tt * 1.6)
    i = int(s * SR)
    bells[i:i + len(n)] += n[: len(bells) - i] * 0.12
save('music', pad * 0.5 + sub * 0.9 + bells)

# thunder (6s)
d = 6
t = T(d)
n = filt(noise(d), None, 220)
env = (1 - np.exp(-t * 25)) * np.exp(-t * 0.7) * (0.6 + 0.4 * np.abs(np.sin(2 * np.pi * 1.7 * t)))
crack = filt(noise(d), 800, None) * np.exp(-t * 14) * 0.5
save('thunder', n * env * 6 + crack)

# impact (4s)
d = 4
t = T(d)
fr = 35 + 70 * np.exp(-t * 6)
boom = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 2.2)
burst = filt(noise(d), None, 400) * np.exp(-t * 6) * 2
tail = filt(noise(d), 100, 2500) * np.exp(-t * 1.5) * 0.15
save('impact', boom + burst + tail)

# knock pintu (0.6s)
t = T(0.6)
k = (np.sin(2 * np.pi * 105 * t) * np.exp(-t * 22) + 0.6 * np.sin(2 * np.pi * 210 * t) * np.exp(-t * 30)
     + filt(noise(0.6), 150, 1200) * np.exp(-t * 45) * 1.2)
save('knock', k)

# ring telepon (6s loop = 2 siklus ring-ring + jeda)
d = 6
x = np.zeros(int(SR * d))
for cyc in range(2):
    for r in (0.0, 0.6):
        tt = T(0.4)
        tone = (np.sin(2 * np.pi * 440 * tt) + np.sin(2 * np.pi * 480 * tt)) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 20 * tt)))
        tone *= np.minimum(1, tt * 200) * np.minimum(1, (0.4 - tt) * 200)
        i = int((cyc * 3 + r) * SR)
        x[i:i + len(tone)] += tone
save('ring', x)

# static TV (4s loop)
d = 4
t = T(d)
st = filt(noise(d), 80, 9000) + 0.12 * np.sin(2 * np.pi * q(60, d) * t) * 5
save('static', st)

# buzz lampu (1.2s)
d = 1.2
t = T(d)
gate = (rng.random(int(d * 30)) > 0.4).astype(float)
gate = np.repeat(gate, SR // 30 + 1)[: len(t)]
buzz = (np.sin(2 * np.pi * 100 * t) + 0.5 * np.sin(2 * np.pi * 200 * t) + 0.2 * filt(noise(d), 500, 5000)) * gate
save('buzz', buzz * np.minimum(1, (d - t) * 8))

# napas (2.5s)
d = 2.5
t = T(d)
b = filt(noise(d), 400, 2600)
env = np.exp(-((t - 0.7) / 0.4) ** 2) * 0.6 + np.exp(-((t - 1.6) / 0.5) ** 2)
save('breath', b * env, 0.6)

# tone telepon terputus (0.9s)
t = T(0.9)
x = np.zeros_like(t)
for s in (0.0, 0.3, 0.6):
    m = (t >= s) & (t < s + 0.18)
    x[m] = np.sin(2 * np.pi * 480 * t[m])
save('callend', x, 0.6)
print('selesai')
