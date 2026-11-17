import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

export const FilmGrain: React.FC<{opacity?: number}> = ({opacity = 0.14}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{opacity, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <svg width={1920} height={1080}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={1920} height={1080} filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Letterbox: React.FC<{h?: number}> = ({h = 90}) => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: h, background: '#000'}} />
    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: h, background: '#000'}} />
  </AbsoluteFill>
);
