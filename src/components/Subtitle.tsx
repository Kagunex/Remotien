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
        bottom: 52,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '78%',
        backgroundColor: 'rgba(39, 48, 74, 0.88)',
        border: `2px solid rgba(217, 238, 255, 0.28)`,
        borderRadius: 20,
        padding: '16px 32px',
        boxShadow: '0 14px 36px rgba(39, 48, 74, 0.28)',
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
