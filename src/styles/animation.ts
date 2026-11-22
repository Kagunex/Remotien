import { interpolate, spring } from 'remotion';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TOTAL_DURATION_SEC = 90;
export const TOTAL_FRAMES = TOTAL_DURATION_SEC * FPS; // 2700

export const easeInOutCubic = (t: number): number => {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
};

export const easeOutBack = (t: number): number => {
  const clamped = Math.max(0, Math.min(1, t));
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(clamped - 1, 3) + c1 * Math.pow(clamped - 1, 2);
};

export const smoothStep = (
  frame: number,
  startFrame: number,
  endFrame: number,
  from = 0,
  to = 1
): number => {
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return from + (to - from) * easeInOutCubic(progress);
};

export const softSpring = (frame: number, delay = 0, damping = 14, stiffness = 110) => {
  return spring({
    frame: Math.max(0, frame - delay),
    fps: FPS,
    config: {
      damping,
      stiffness,
      mass: 0.9,
    },
  });
};
