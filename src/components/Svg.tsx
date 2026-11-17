import React, {useId} from 'react';
import {AbsoluteFill} from 'remotion';

export const useUid = (prefix: string) => prefix + useId().replace(/:/g, '');

export const Svg: React.FC<{children?: React.ReactNode; bg?: string}> = ({children, bg}) => (
  <AbsoluteFill>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{overflow: 'visible'}}>
      <defs>
        <filter id="blur6"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="blur12"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      {bg ? <rect x={-1000} y={-600} width={3920} height={2280} fill={bg} /> : null}
      {children}
    </svg>
  </AbsoluteFill>
);

export const Glow: React.FC<{x: number; y: number; r: number; color: string; opacity?: number}> = ({
  x, y, r, color, opacity = 1,
}) => {
  const id = useUid('gl');
  return (
    <g opacity={opacity} style={{mixBlendMode: 'screen'}}>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={color} stopOpacity={0.9} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  );
};
