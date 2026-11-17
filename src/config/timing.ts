export const FPS = 60;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const sec = (s: number) => Math.round(s * FPS);
export const TOTAL_FRAMES = sec(240); // 14.400 frame

export const CLAMP = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

// [mulai, selesai] dalam detik, sesuai naskah
export const SHOT_RANGES: Record<number, [number, number]> = {
  1: [0, 10], 2: [10, 25], 3: [25, 40],
  4: [40, 55], 5: [55, 75], 6: [75, 100],
  7: [100, 120], 8: [120, 145], 9: [145, 170],
  10: [170, 195], 11: [195, 215],
  12: [215, 230], 13: [230, 240],
};
export const shotStart = (n: number) => sec(SHOT_RANGES[n][0]);
export const shotDur = (n: number) => sec(SHOT_RANGES[n][1] - SHOT_RANGES[n][0]);

export type SceneId = 'opening' | 'caller' | 'knock' | 'television' | 'reveal';
export const SCENES: Record<SceneId, {start: number; end: number}> = {
  opening: {start: 0, end: 40},
  caller: {start: 40, end: 100},
  knock: {start: 100, end: 170},
  television: {start: 170, end: 215},
  reveal: {start: 215, end: 240},
};
