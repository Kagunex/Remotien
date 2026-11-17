import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {CUES, VoiceId} from '../config/script';
import manifestJson from '../config/voice-manifest.json';
import {sec} from '../config/timing';

const VOLUME: Record<VoiceId, number> = {narrator: 1, adrian: 1, caller: 0.9, stranger: 1, recording: 0.85};

/** Voice-over: hanya memutar file yang tercatat di voice-manifest.json (dibuat `npm run voice`). */
export const VoiceTrack: React.FC = () => {
  const M = manifestJson as Record<string, string>;
  return (
    <>
      {CUES.filter((c) => M[c.id]).map((c) => (
        <Sequence key={c.id} from={sec(c.at)} durationInFrames={sec(c.dur) + 180} layout="none">
          <Audio src={staticFile(M[c.id])} volume={VOLUME[c.voice]} />
        </Sequence>
      ))}
    </>
  );
};
