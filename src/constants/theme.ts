export const PALETTE = {
  deepOceanNavy: '#031426',
  oceanBlue: '#075B9B',
  electricCyan: '#20CFFF',
  softBlue: '#8BEAFF',
  white: '#F5FAFF',
} as const;

export const VIDEO_SPECS = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInSeconds: 60,
  totalFrames: 1800,
} as const;

export const SCENES = {
  scene01: { startFrame: 0, durationFrames: 240 },
  scene02: { startFrame: 240, durationFrames: 270 },
  scene03: { startFrame: 510, durationFrames: 300 },
  scene04: { startFrame: 810, durationFrames: 360 },
  scene05: { startFrame: 1170, durationFrames: 330 },
  scene06: { startFrame: 1500, durationFrames: 300 },
} as const;
