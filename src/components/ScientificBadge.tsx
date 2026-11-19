import React from 'react';
import { PALETTE } from '../constants/theme';

interface ScientificBadgeProps {
  label: string;
  source: string;
}

export const ScientificBadge: React.FC<ScientificBadgeProps> = ({ label, source }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 96,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        borderRadius: 10,
        backgroundColor: 'rgba(3, 20, 38, 0.72)',
        borderLeft: `4px solid ${PALETTE.electricCyan}`,
        fontFamily: 'Inter, system-ui, sans-serif',
        zIndex: 40,
      }}
    >
      <span
        style={{
          color: PALETTE.electricCyan,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: PALETTE.softBlue,
          fontSize: 19,
          fontWeight: 500,
          opacity: 0.85,
        }}
      >
        {source}
      </span>
    </div>
  );
};
