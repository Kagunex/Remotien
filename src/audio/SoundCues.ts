import { SCENES } from '../data/scenes';
import { SFX_CUES } from '../data/audio-cues';
import { FPS, TOTAL_FRAMES } from '../styles/animation';

export const MUSIC_BED_FILE = 'audio/music/education-bed.wav';

/**
 * Menghitung ducking volume musik latar secara deterministik berdasarkan frame aktif narasi.
 */
export const getMusicDuckingVolume = (frame: number): number => {
  const baseVolume = 0.28;
  const duckedVolume = 0.11;
  const fadeFrames = Math.round(0.4 * FPS);

  // Fade out akhir video (87s - 90s)
  if (frame > TOTAL_FRAMES - 3 * FPS) {
    const outProgress = (TOTAL_FRAMES - frame) / (3 * FPS);
    return Math.max(0, duckedVolume * Math.max(0, outProgress));
  }

  // Cek apakah sedang dalam window narasi aktif
  let isNarrating = false;
  for (const scene of SCENES) {
    const voStart = scene.startFrame + Math.round(0.2 * FPS);
    const voEnd = scene.startFrame + scene.durationFrames - Math.round(0.3 * FPS);
    if (frame >= voStart - fadeFrames && frame <= voEnd + fadeFrames) {
      isNarrating = true;
      break;
    }
  }

  return isNarrating ? duckedVolume : baseVolume;
};

export { SCENES, SFX_CUES };
