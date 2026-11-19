import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import timingData from '../narration/timing.json';
import { PALETTE } from '../constants/theme';

export const SubtitleOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  const activeSegment = timingData.segments.find(
    (s) => currentSec >= s.startSec - 0.1 && currentSec <= s.endSec + 0.15
  );

  if (!activeSegment) return null;

  const opacity = interpolate(
    currentSec,
    [
      activeSegment.startSec - 0.1,
      activeSegment.startSec + 0.18,
      activeSegment.endSec - 0.15,
      activeSegment.endSec + 0.15,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const translateY = interpolate(
    currentSec,
    [activeSegment.startSec - 0.1, activeSegment.startSec + 0.2],
    [14, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 210,
        left: 64,
        right: 64,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity,
        transform: `translateY(${translateY}px)`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(3, 20, 38, 0.78)',
          border: `1px solid rgba(32, 207, 255, 0.28)`,
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: '18px 28px',
          maxWidth: 920,
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.55)',
        }}
      >
        {activeSegment.subtitleLines.slice(0, 2).map((line, i) => (
          <div
            key={i}
            style={{
              color: PALETTE.white,
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontSize: 38,
              fontWeight: 600,
              lineHeight: 1.32,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(3, 20, 38, 0.9)',
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};
