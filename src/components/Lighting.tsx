import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';

export const Vignette: React.FC<{strength?: number}> = ({strength = 0.8}) => (
  <AbsoluteFill
    style={{background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 38%, rgba(0,0,0,${strength}) 100%)`}}
  />
);

/** Color grade teal-biru dingin. */
export const ColorGrade: React.FC = () => (
  <AbsoluteFill
    style={{background: 'linear-gradient(180deg, rgba(25,70,100,.22), rgba(8,16,36,.2))', mixBlendMode: 'overlay'}}
  />
);

/** Kilat petir pada frame lokal tertentu. */
export const Lightning: React.FC<{at: number[]}> = ({at}) => {
  const f = useCurrentFrame();
  let o = 0;
  for (const s of at) {
    const d = f - s;
    if (d < 0 || d > 40) continue;
    const v = d < 4 ? 0.85 : d < 9 ? 0.15 : d < 13 ? 0.6 : 0.6 * Math.max(0, 1 - (d - 13) / 27);
    o = Math.max(o, v);
  }
  return <AbsoluteFill style={{background: '#cfe3ff', opacity: o * 0.55, mixBlendMode: 'screen'}} />;
};

/** Lampu berkedip: layar menggelap acak pada rentang frame. */
export const Flicker: React.FC<{at: number[]; len?: number; depth?: number}> = ({at, len = 45, depth = 0.9}) => {
  const f = useCurrentFrame();
  const active = at.some((s) => f >= s && f < s + len);
  const dark = active && random(`fl${f}`) > 0.45;
  return <AbsoluteFill style={{background: '#000', opacity: dark ? depth : 0}} />;
};
