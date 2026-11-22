import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SUBTITLES } from '../data/subtitles';
import { PALETTE } from '../styles/palette';
import { TYPOGRAPHY } from '../styles/typography';

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const activeCue = SUBTITLES.find(
    (cue) => frame >= cue.startFrame && frame <= cue.endFrame
  );

  if (!activeCue) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Subtitle"
      style={{
        position: 'absolute',
        bottom: 165,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '86%',
        backgroundColor: 'rgba(30, 37, 56, 0.9)',
        border: '2px solid rgba(217, 238, 255, 0.32)',
        borderRadius: 24,
        padding: '20px 28px',
        boxShadow: '0 16px 38px rgba(30, 37, 56, 0.32)',
        textAlign: 'center',
        fontFamily: TYPOGRAPHY.fontFamily,
        zIndex: 30,
      }}
    >
      <p
        style={{
          ...TYPOGRAPHY.subtitle,
          margin: 0,
          color: PALETTE.white,
        }}
      >
        {activeCue.text}
      </p>
    </div>
  );
};
