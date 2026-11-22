import { interpolate } from 'remotion';
import { SCENES } from '../data/scenes';
import { SFX_CUES, AMBIENCE_CUES } from '../data/audio-cues';
import { FPS, TOTAL_FRAMES } from '../styles/animation';

export const MUSIC_BED_FILE = 'audio/music/education-bed.wav';

export const getVoiceoverDuckFactor = (frame: number): number => {
  const rampFrames = Math.round(0.45 * FPS);
  let duckFactor = 0;

  for (const scene of SCENES) {
    const voStart = scene.startFrame + 6;
    const voEnd = scene.startFrame + scene.durationFrames - Math.round(0.35 * FPS);

    if (frame >= voStart - rampFrames && frame <= voEnd + rampFrames) {
      const enter = interpolate(frame, [voStart - rampFrames, voStart], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const exit = interpolate(frame, [voEnd, voEnd + rampFrames], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      duckFactor = Math.max(duckFactor, Math.min(enter, exit));
    }
  }

  return duckFactor;
};

export const getMusicDuckingVolume = (frame: number): number => {
  const baseVolume = 0.22;
  const duckedVolume = 0.085;

  const fadeInMult = interpolate(frame, [0, Math.round(1.5 * FPS)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOutMult = interpolate(
    frame,
    [TOTAL_FRAMES - Math.round(3.5 * FPS), TOTAL_FRAMES - 4],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const duckFactor = getVoiceoverDuckFactor(frame);
  const targetVolume = baseVolume - (baseVolume - duckedVolume) * duckFactor;
  return Math.max(0, targetVolume * fadeInMult * fadeOutMult);
};

export { SCENES, SFX_CUES, AMBIENCE_CUES };
