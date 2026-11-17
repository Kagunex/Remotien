import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';

export type Cam = {x?: number; y?: number; zoom?: number; rot?: number};

/** Kamera sinematik: dolly/pan/zoom/roll dengan easing + handheld shake opsional. */
export const CinematicCamera: React.FC<{
  from?: Cam;
  to?: Cam;
  dur: number;
  shake?: number;
  children: React.ReactNode;
}> = ({from = {}, to = {}, dur, shake = 0, children}) => {
  const f = useCurrentFrame();
  const p = Math.min(1, Math.max(0, f / Math.max(1, dur)));
  const t = Easing.inOut(Easing.sin)(p);
  const v = (k: keyof Cam, d: number) => {
    const a = from[k] ?? d;
    const b = to[k] ?? a;
    return a + (b - a) * t;
  };
  const sx = shake ? (Math.sin(f * 0.31) + Math.sin(f * 0.77 + 1.3) * 0.6) * shake : 0;
  const sy = shake ? (Math.cos(f * 0.27) + Math.sin(f * 0.91 + 0.4) * 0.6) * shake : 0;
  return (
    <AbsoluteFill
      style={{
        transform: `translate(${v('x', 0) + sx}px, ${v('y', 0) + sy}px) scale(${v('zoom', 1.05)}) rotate(${v('rot', 0)}deg)`,
        transformOrigin: '50% 50%',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
