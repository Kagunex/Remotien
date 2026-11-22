import { FPS } from '../styles/animation';

export type SfxCategory =
  | 'ambience'
  | 'title'
  | 'transition'
  | 'device'
  | 'packet'
  | 'data-flow'
  | 'network'
  | 'server'
  | 'confirm'
  | 'outro';

export interface SfxCue {
  id: string;
  sceneId: string;
  category: SfxCategory;
  file: string;
  timeSec: number;
  frame: number;
  durationFrames: number;
  volume: number;
  playbackRate?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}

export interface AmbienceCue {
  id: string;
  sceneId: string;
  file: string;
  startFrame: number;
  durationFrames: number;
  volume: number;
  fadeInFrames: number;
  fadeOutFrames: number;
}

const RAW_SFX_CUES: Array<Omit<SfxCue, 'frame'>> = [
  // Scene 01 (00:00 - 00:10)
  { id: 's01-phone-on', sceneId: 'scene-01', category: 'device', file: 'audio/sfx/mechanical/power-on.wav', timeSec: 0.5, durationFrames: 42, volume: 0.34, playbackRate: 1.15 },
  { id: 's01-pop-chat', sceneId: 'scene-01', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 2.3, durationFrames: 26, volume: 0.36, playbackRate: 1.1 },
  { id: 's01-pop-video', sceneId: 'scene-01', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 3.4, durationFrames: 26, volume: 0.36, playbackRate: 1.18 },
  { id: 's01-pop-web', sceneId: 'scene-01', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 4.5, durationFrames: 26, volume: 0.36, playbackRate: 1.25 },
  { id: 's01-title-whoosh', sceneId: 'scene-01', category: 'title', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 6.8, durationFrames: 36, volume: 0.44 },
  { id: 's01-chime', sceneId: 'scene-01', category: 'confirm', file: 'audio/sfx/digital/connection-success.wav', timeSec: 7.3, durationFrames: 34, volume: 0.42 },

  // Scene 02 (00:10 - 00:21)
  { id: 's02-trans-whoosh', sceneId: 'scene-02', category: 'transition', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 10.0, durationFrames: 36, volume: 0.44, playbackRate: 1.02 },
  { id: 's02-globe-land', sceneId: 'scene-02', category: 'device', file: 'audio/sfx/transitions/cinematic-impact.wav', timeSec: 10.4, durationFrames: 28, volume: 0.42 },
  { id: 's02-node-blip1', sceneId: 'scene-02', category: 'network', file: 'audio/sfx/digital/futuristic-scanner.wav', timeSec: 12.6, durationFrames: 28, volume: 0.35 },
  { id: 's02-node-blip2', sceneId: 'scene-02', category: 'network', file: 'audio/sfx/digital/futuristic-scanner.wav', timeSec: 14.4, durationFrames: 28, volume: 0.35, playbackRate: 1.12 },
  { id: 's02-fiber-flow', sceneId: 'scene-02', category: 'data-flow', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 16.5, durationFrames: 30, volume: 0.36, playbackRate: 1.2 },

  // Scene 03 (00:21 - 00:33)
  { id: 's03-trans-whoosh', sceneId: 'scene-03', category: 'transition', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 21.0, durationFrames: 34, volume: 0.42, playbackRate: 1.08 },
  { id: 's03-key1', sceneId: 'scene-03', category: 'device', file: 'audio/sfx/digital/computer-processing.wav', timeSec: 21.6, durationFrames: 24, volume: 0.3, playbackRate: 1.3 },
  { id: 's03-key2', sceneId: 'scene-03', category: 'device', file: 'audio/sfx/digital/computer-processing.wav', timeSec: 22.3, durationFrames: 24, volume: 0.3, playbackRate: 1.4 },
  { id: 's03-dns-scan', sceneId: 'scene-03', category: 'data-flow', file: 'audio/sfx/digital/futuristic-scanner.wav', timeSec: 25.0, durationFrames: 32, volume: 0.42 },
  { id: 's03-book-slide', sceneId: 'scene-03', category: 'network', file: 'audio/sfx/mechanical/router-startup.wav', timeSec: 26.8, durationFrames: 36, volume: 0.38 },
  { id: 's03-ip-confirm', sceneId: 'scene-03', category: 'confirm', file: 'audio/sfx/digital/connection-success.wav', timeSec: 29.2, durationFrames: 34, volume: 0.45 },

  // Scene 04 (00:33 - 00:44)
  { id: 's04-trans-whoosh', sceneId: 'scene-04', category: 'transition', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 33.0, durationFrames: 34, volume: 0.42 },
  { id: 's04-split-impact', sceneId: 'scene-04', category: 'packet', file: 'audio/sfx/transitions/cinematic-impact.wav', timeSec: 35.4, durationFrames: 28, volume: 0.44, playbackRate: 1.18 },
  { id: 's04-pkt1', sceneId: 'scene-04', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 36.2, durationFrames: 28, volume: 0.42 },
  { id: 's04-pkt2', sceneId: 'scene-04', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 36.8, durationFrames: 28, volume: 0.42, playbackRate: 1.12 },
  { id: 's04-flow', sceneId: 'scene-04', category: 'data-flow', file: 'audio/sfx/digital/computer-processing.wav', timeSec: 39.2, durationFrames: 32, volume: 0.38, playbackRate: 1.15 },

  // Scene 05 (00:44 - 00:56)
  { id: 's05-trans-whoosh', sceneId: 'scene-05', category: 'transition', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 44.0, durationFrames: 34, volume: 0.42 },
  { id: 's05-router-land', sceneId: 'scene-05', category: 'network', file: 'audio/sfx/mechanical/router-startup.wav', timeSec: 44.4, durationFrames: 38, volume: 0.44 },
  { id: 's05-route-scan', sceneId: 'scene-05', category: 'data-flow', file: 'audio/sfx/digital/futuristic-scanner.wav', timeSec: 48.2, durationFrames: 30, volume: 0.4 },
  { id: 's05-hop-pop', sceneId: 'scene-05', category: 'network', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 50.2, durationFrames: 28, volume: 0.4, playbackRate: 1.16 },
  { id: 's05-forward-whoosh', sceneId: 'scene-05', category: 'data-flow', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 52.2, durationFrames: 34, volume: 0.42, playbackRate: 1.15 },

  // Scene 06 (00:56 - 01:07)
  { id: 's06-rack-slide', sceneId: 'scene-06', category: 'server', file: 'audio/sfx/mechanical/server-fan.wav', timeSec: 56.2, durationFrames: 45, volume: 0.42 },
  { id: 's06-server-power', sceneId: 'scene-06', category: 'server', file: 'audio/sfx/mechanical/power-on.wav', timeSec: 57.8, durationFrames: 42, volume: 0.42 },
  { id: 's06-process-blip', sceneId: 'scene-06', category: 'data-flow', file: 'audio/sfx/digital/computer-processing.wav', timeSec: 62.0, durationFrames: 34, volume: 0.4 },
  { id: 's06-response-pop', sceneId: 'scene-06', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 64.0, durationFrames: 30, volume: 0.44, playbackRate: 1.15 },

  // Scene 07 (01:07 - 01:19)
  { id: 's07-trans-whoosh', sceneId: 'scene-07', category: 'transition', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 67.0, durationFrames: 34, volume: 0.42 },
  { id: 's07-pkt-in1', sceneId: 'scene-07', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 68.4, durationFrames: 28, volume: 0.42 },
  { id: 's07-pkt-in2', sceneId: 'scene-07', category: 'packet', file: 'audio/sfx/digital/data-transmission.wav', timeSec: 69.2, durationFrames: 28, volume: 0.42, playbackRate: 1.14 },
  { id: 's07-ui-snap', sceneId: 'scene-07', category: 'device', file: 'audio/sfx/digital/computer-processing.wav', timeSec: 72.2, durationFrames: 28, volume: 0.42 },
  { id: 's07-page-ready', sceneId: 'scene-07', category: 'confirm', file: 'audio/sfx/digital/connection-success.wav', timeSec: 75.8, durationFrames: 36, volume: 0.48 },

  // Scene 08 (01:19 - 01:30)
  { id: 's08-pullback', sceneId: 'scene-08', category: 'transition', file: 'audio/sfx/transitions/cinematic-whoosh.wav', timeSec: 79.1, durationFrames: 38, volume: 0.44, playbackRate: 0.92 },
  { id: 's08-connect-power', sceneId: 'scene-08', category: 'network', file: 'audio/sfx/mechanical/power-on.wav', timeSec: 81.2, durationFrames: 38, volume: 0.38 },
  { id: 's08-title-impact', sceneId: 'scene-08', category: 'outro', file: 'audio/sfx/transitions/cinematic-impact.wav', timeSec: 84.8, durationFrames: 32, volume: 0.46 },
  { id: 's08-final-chime', sceneId: 'scene-08', category: 'outro', file: 'audio/sfx/digital/connection-success.wav', timeSec: 86.2, durationFrames: 42, volume: 0.56 },
];

export const SFX_CUES: SfxCue[] = RAW_SFX_CUES.map((cue) => ({
  ...cue,
  frame: Math.round(cue.timeSec * FPS),
  fadeInFrames: cue.fadeInFrames ?? 3,
  fadeOutFrames: cue.fadeOutFrames ?? 6,
}));

export const AMBIENCE_CUES: AmbienceCue[] = [
  {
    id: 'amb-01-digital',
    sceneId: 'scene-01',
    file: 'audio/sfx/ambience/digital-world.wav',
    startFrame: 0,
    durationFrames: 11 * FPS,
    volume: 0.11,
    fadeInFrames: 24,
    fadeOutFrames: 24,
  },
  {
    id: 'amb-02-tech',
    sceneId: 'scene-02',
    file: 'audio/sfx/ambience/technology-ambience.wav',
    startFrame: 10 * FPS,
    durationFrames: 12 * FPS,
    volume: 0.11,
    fadeInFrames: 24,
    fadeOutFrames: 24,
  },
  {
    id: 'amb-06-server',
    sceneId: 'scene-06',
    file: 'audio/sfx/ambience/server-room.wav',
    startFrame: 56 * FPS,
    durationFrames: 12 * FPS,
    volume: 0.13,
    fadeInFrames: 24,
    fadeOutFrames: 24,
  },
  {
    id: 'amb-08-digital-outro',
    sceneId: 'scene-08',
    file: 'audio/sfx/ambience/digital-world.wav',
    startFrame: 79 * FPS,
    durationFrames: 11 * FPS,
    volume: 0.12,
    fadeInFrames: 24,
    fadeOutFrames: 45,
  },
];
