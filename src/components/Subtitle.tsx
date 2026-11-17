import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {CLAMP, sec} from '../config/timing';
import {CUES, SPEAKERS} from '../config/script';
import {FONT} from '../config/typography';

/** Subtitle global (pakai frame absolut Part01). */
export const Subtitle: React.FC = () => {
  const f = useCurrentFrame();
  const cue = CUES.find((c) => f >= sec(c.at) && f < sec(c.at + c.dur));
  if (!cue) return null;
  const a = sec(cue.at);
  const b = sec(cue.at + cue.dur);
  const o = interpolate(f, [a, a + 8, b - 8, b], [0, 1, 1, 0], CLAMP);
  const sp = SPEAKERS[cue.voice];
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 125, textAlign: 'center', opacity: o}}>
      <div style={{fontFamily: FONT.ui, fontSize: 20, letterSpacing: 7, color: sp.color, marginBottom: 10, opacity: 0.85}}>
        {cue.label ?? sp.label}
      </div>
      <div
        style={{
          margin: '0 auto', maxWidth: 1400, fontFamily: FONT.title, fontSize: cue.fx === 'whisper' ? 38 : 48,
          fontStyle: sp.italic || cue.fx === 'whisper' ? 'italic' : 'normal', color: '#f2f4f7',
          textShadow: '0 2px 14px #000, 0 0 3px #000', lineHeight: 1.25,
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};
