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
  centered = true,
  delay = 8,
}) => {
  const frame = useCurrentFrame();
  const anim = softSpring(frame, delay, 13, 120);

  const opacity = Math.min(1, anim * 1.4);
  const translateY = (1 - anim) * 26;
  const scale = 0.94 + anim * 0.06;

  return (
    <div
      style={{
        position: 'absolute',
        top: 118,
        left: '50%',
        width: '88%',
        transform: `translate(-50%, ${translateY}px) scale(${scale})`,
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
          backgroundColor: 'rgba(247, 245, 252, 0.9)',
          padding: '8px 20px',
          borderRadius: 999,
          boxShadow: '0 8px 24px rgba(30, 37, 56, 0.16)',
          marginBottom: 14,
        }}
      >
        <span style={TYPOGRAPHY.kicker}>{kicker}</span>
      </div>
      <h1
        style={{
          ...TYPOGRAPHY.title,
          fontSize: 54,
          margin: 0,
          color: PALETTE.white,
          textShadow: '0 6px 26px rgba(30, 37, 56, 0.34)',
        }}
      >
        {title}
      </h1>
    </div>
  );
};
