import fs from 'fs';
import path from 'path';

const SAMPLE_RATE = 48000;
const DURATION_SEC = 60;
const TOTAL_SAMPLES = SAMPLE_RATE * DURATION_SEC;

function writeWavStereo(filePath: string, left: Float32Array, right: Float32Array) {
  const numChannels = 2;
  const bytesPerSample = 2;
  const dataSize = TOTAL_SAMPLES * numChannels * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * numChannels * bytesPerSample, 28);
  buffer.writeUInt16LE(numChannels * bytesPerSample, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const l = Math.max(-1, Math.min(1, left[i]));
    const r = Math.max(-1, Math.min(1, right[i]));
    buffer.writeInt16LE(Math.round(l * 32767), offset);
    buffer.writeInt16LE(Math.round(r * 32767), offset + 2);
    offset += 4;
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buffer);
}

function generateOceanAndUnderwaterAmbience() {
  const left = new Float32Array(TOTAL_SAMPLES);
  const right = new Float32Array(TOTAL_SAMPLES);

  let lpL = 0;
  let lpR = 0;

  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    const waveCycle = 0.5 + 0.5 * Math.sin((2 * Math.PI * t) / 6.5 - Math.PI / 2);
    const waveEnvelope = Math.pow(waveCycle, 2.2) * 0.45 + 0.08;
    const underwaterFactor = t >= 8 && t <= 50 ? 0.012 : 0.045;

    const whiteL = Math.random() * 2 - 1;
    const whiteR = Math.random() * 2 - 1;

    lpL = lpL + underwaterFactor * (whiteL - lpL);
    lpR = lpR + underwaterFactor * (whiteR - lpR);

    left[i] = lpL * waveEnvelope;
    right[i] = lpR * waveEnvelope;
  }

  writeWavStereo(path.resolve('public/audio/ambient-ocean.wav'), left, right);
}

function generateCinematicPad() {
  const left = new Float32Array(TOTAL_SAMPLES);
  const right = new Float32Array(TOTAL_SAMPLES);

  const freqs = [73.42, 110.0, 174.61, 261.63, 329.63];

  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    const fadeIn = Math.min(1, t / 3.0);
    const fadeOut = Math.min(1, (DURATION_SEC - t) / 4.0);
    const masterEnv = fadeIn * fadeOut * 0.22;

    let sigL = 0;
    let sigR = 0;

    freqs.forEach((f, idx) => {
      const detune = 1 + Math.sin(t * 0.3 + idx) * 0.0018;
      const swell = 0.65 + 0.35 * Math.sin(t * 0.25 + idx * 1.1);
      sigL += Math.sin(2 * Math.PI * f * detune * t) * swell * (1 / (idx + 1.4));
      sigR += Math.sin(2 * Math.PI * (f * 1.002) * detune * t) * swell * (1 / (idx + 1.4));
    });

    const sceneStarts = [0, 8, 17, 27, 39, 50];
    let ping = 0;
    for (const st of sceneStarts) {
      const dt = t - st;
      if (dt >= 0 && dt < 2.2) {
        ping += Math.sin(2 * Math.PI * 587.33 * dt) * Math.exp(-dt * 2.8) * 0.14;
      }
    }

    left[i] = (sigL * 0.45 + ping) * masterEnv;
    right[i] = (sigR * 0.45 + ping) * masterEnv;
  }

  writeWavStereo(path.resolve('public/audio/synth-pad.wav'), left, right);
}

generateOceanAndUnderwaterAmbience();
generateCinematicPad();
console.log('[SUKSES] Ambient ocean & cinematic pad WAV 48kHz dibuat.');
