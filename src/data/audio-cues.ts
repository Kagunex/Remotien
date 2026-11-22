import { FPS } from '../styles/animation';

export interface SfxCue {
  id: string;
  sceneId: string;
  file: string;
  timeSec: number;
  frame: number;
  volume: number;
  playbackRate?: number;
}

const RAW_SFX_CUES: Array<Omit<SfxCue, 'frame'>> = [
  // Scene 01 (00:00 - 00:10)
  { id: 's01-riser', sceneId: 'scene-01', file: 'audio/sfx/whoosh-soft.wav', timeSec: 0.0, volume: 0.45, playbackRate: 0.85 },
  { id: 's01-whoosh', sceneId: 'scene-01', file: 'audio/sfx/whoosh-soft.wav', timeSec: 2.0, volume: 0.6 },
  { id: 's01-pop1', sceneId: 'scene-01', file: 'audio/sfx/ui-pop.wav', timeSec: 4.0, volume: 0.55 },
  { id: 's01-pop2', sceneId: 'scene-01', file: 'audio/sfx/ui-pop.wav', timeSec: 5.2, volume: 0.55, playbackRate: 1.08 },
  { id: 's01-pop3', sceneId: 'scene-01', file: 'audio/sfx/ui-pop.wav', timeSec: 6.5, volume: 0.55, playbackRate: 1.15 },
  { id: 's01-chime', sceneId: 'scene-01', file: 'audio/sfx/chime.wav', timeSec: 8.0, volume: 0.65 },

  // Scene 02 (00:10 - 00:21)
  { id: 's02-impact', sceneId: 'scene-02', file: 'audio/sfx/soft-impact.wav', timeSec: 10.2, volume: 0.65 },
  { id: 's02-blip1', sceneId: 'scene-02', file: 'audio/sfx/digital-blip.wav', timeSec: 12.5, volume: 0.45 },
  { id: 's02-blip2', sceneId: 'scene-02', file: 'audio/sfx/digital-blip.wav', timeSec: 14.0, volume: 0.45, playbackRate: 1.12 },
  { id: 's02-shimmer', sceneId: 'scene-02', file: 'audio/sfx/chime.wav', timeSec: 16.5, volume: 0.4, playbackRate: 1.25 },

  // Scene 03 (00:21 - 00:33)
  { id: 's03-type1', sceneId: 'scene-03', file: 'audio/sfx/ui-pop.wav', timeSec: 21.5, volume: 0.35, playbackRate: 1.4 },
  { id: 's03-type2', sceneId: 'scene-03', file: 'audio/sfx/ui-pop.wav', timeSec: 22.1, volume: 0.35, playbackRate: 1.5 },
  { id: 's03-scan', sceneId: 'scene-03', file: 'audio/sfx/digital-blip.wav', timeSec: 24.5, volume: 0.5 },
  { id: 's03-flip', sceneId: 'scene-03', file: 'audio/sfx/whoosh-soft.wav', timeSec: 26.8, volume: 0.5, playbackRate: 1.25 },
  { id: 's03-chime', sceneId: 'scene-03', file: 'audio/sfx/chime.wav', timeSec: 29.5, volume: 0.6 },

  // Scene 04 (00:33 - 00:44)
  { id: 's04-click', sceneId: 'scene-04', file: 'audio/sfx/ui-pop.wav', timeSec: 33.4, volume: 0.5 },
  { id: 's04-shimmer', sceneId: 'scene-04', file: 'audio/sfx/power-up.wav', timeSec: 35.5, volume: 0.45, playbackRate: 1.15 },
  { id: 's04-packet1', sceneId: 'scene-04', file: 'audio/sfx/packet-pop.wav', timeSec: 37.8, volume: 0.5 },
  { id: 's04-packet2', sceneId: 'scene-04', file: 'audio/sfx/packet-pop.wav', timeSec: 38.4, volume: 0.5, playbackRate: 1.1 },
  { id: 's04-whoosh', sceneId: 'scene-04', file: 'audio/sfx/whoosh-soft.wav', timeSec: 40.5, volume: 0.55 },

  // Scene 05 (00:44 - 00:56)
  { id: 's05-impact', sceneId: 'scene-05', file: 'audio/sfx/soft-impact.wav', timeSec: 44.3, volume: 0.6 },
  { id: 's05-pulse', sceneId: 'scene-05', file: 'audio/sfx/digital-blip.wav', timeSec: 47.2, volume: 0.5 },
  { id: 's05-tick', sceneId: 'scene-05', file: 'audio/sfx/packet-pop.wav', timeSec: 49.5, volume: 0.45, playbackRate: 1.2 },
  { id: 's05-whoosh', sceneId: 'scene-05', file: 'audio/sfx/whoosh-soft.wav', timeSec: 52.0, volume: 0.55 },

  // Scene 06 (00:56 - 01:07)
  { id: 's06-slide', sceneId: 'scene-06', file: 'audio/sfx/mechanical-slide.wav', timeSec: 56.2, volume: 0.55 },
  { id: 's06-powerup', sceneId: 'scene-06', file: 'audio/sfx/power-up.wav', timeSec: 58.0, volume: 0.5 },
  { id: 's06-blip', sceneId: 'scene-06', file: 'audio/sfx/digital-blip.wav', timeSec: 61.5, volume: 0.5 },
  { id: 's06-whoosh', sceneId: 'scene-06', file: 'audio/sfx/whoosh-soft.wav', timeSec: 64.2, volume: 0.55 },

  // Scene 07 (01:07 - 01:19)
  { id: 's07-pop1', sceneId: 'scene-07', file: 'audio/sfx/packet-pop.wav', timeSec: 68.5, volume: 0.5 },
  { id: 's07-pop2', sceneId: 'scene-07', file: 'audio/sfx/packet-pop.wav', timeSec: 69.2, volume: 0.5, playbackRate: 1.15 },
  { id: 's07-click', sceneId: 'scene-07', file: 'audio/sfx/ui-pop.wav', timeSec: 72.0, volume: 0.55 },
  { id: 's07-chime', sceneId: 'scene-07', file: 'audio/sfx/chime.wav', timeSec: 75.5, volume: 0.6 },

  // Scene 08 (01:19 - 01:30)
  { id: 's08-sweep', sceneId: 'scene-08', file: 'audio/sfx/power-up.wav', timeSec: 79.2, volume: 0.5 },
  { id: 's08-impact', sceneId: 'scene-08', file: 'audio/sfx/soft-impact.wav', timeSec: 81.5, volume: 0.6 },
  { id: 's08-chime', sceneId: 'scene-08', file: 'audio/sfx/chime.wav', timeSec: 86.5, volume: 0.75 },
];

export const SFX_CUES: SfxCue[] = RAW_SFX_CUES.map((cue) => ({
  ...cue,
  frame: Math.round(cue.timeSec * FPS),
}));
