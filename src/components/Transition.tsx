import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {CLAMP} from '../config/timing';

export const Fade: React.FC<{dur: number; inFrames?: number; outFrames?: number; hold?: number}> = ({
  dur, inFrames = 0, outFrames = 0, hold = 0,
}) => {
  const f = useCurrentFrame();
  let o = 0;
  if (inFrames > 0 || hold > 0) {
    o = Math.max(o, 1 - interpolate(f, [hold, hold + Math.max(1, inFrames)], [0, 1], CLAMP));
  }
  if (outFrames > 0) {
    o = Math.max(o, interpolate(f, [dur - outFrames, dur], [0, 1], CLAMP));
  }
  return <AbsoluteFill style={{background: '#000', opacity: o}} />;
};

export const Glitch: React.FC<{active: boolean}> = ({active}) => {
  const f = useCurrentFrame();
  if (!active) return null;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {[0, 1, 2, 3, 4].map((i) => {
        const y = random(`gy${i}${f}`) * 1080;
        const h = 8 + random(`gh${i}${f}`) * 60;
        const x = (random(`gx${i}${f}`) - 0.5) * 160;
        return (
          <div
            key={i}
            style={{
              position: 'absolute', left: 0, right: 0, top: y, height: h,
              transform: `translateX(${x}px)`,
              background: i % 2 ? 'rgba(255,0,60,.2)' : 'rgba(0,200,255,.2)',
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
