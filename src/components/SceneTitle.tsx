import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';
import { TYPOGRAPHY } from '../styles/typography';
import { softSpring } from '../styles/animation';

interface SceneTitleProps {
  kicker: string;
  title: string;
  centered?: boolean;
  delay?: number;
}

export const SceneTitle: React.FC<SceneTitleProps> = ({
  kicker,
  title,
  centered = false,
  delay = 8,
}) => {
  const frame = useCurrentFrame();
  const anim = softSpring(frame, delay, 13, 120);

  const opacity = Math.min(1, anim * 1.4);
  const translateY = (1 - anim) * 28;
  const scale = 0.92 + anim * 0.08;

  return (
    <div
      style={{
        position: 'absolute',
        top: centered ? 84 : 54,
        left: centered ? '50%' : 72,
        transform: centered
          ? `translate(-50%, ${translateY}px) scale(${scale})`
          : `translateY(${translateY}px) scale(${scale})`,
        opacity,
        textAlign: centered ? 'center' : 'left',
        fontFamily: TYPOGRAPHY.fontFamily,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          backgroundColor: 'rgba(245, 243, 250, 0.88)',
          backdropFilter: 'blur(8px)',
          padding: '8px 18px',
          borderRadius: 999,
          boxShadow: '0 8px 24px rgba(39, 48, 74, 0.12)',
          marginBottom: 12,
        }}
      >
        <span style={TYPOGRAPHY.kicker}>{kicker}</span>
      </div>
      <h1
        style={{
          ...TYPOGRAPHY.title,
          fontSize: centered ? 68 : 48,
          margin: 0,
          color: PALETTE.white,
          textShadow: '0 6px 24px rgba(39, 48, 74, 0.28)',
        }}
      >
        {title}
      </h1>
    </div>
  );
};
