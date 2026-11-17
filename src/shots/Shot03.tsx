import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {IncomingCall, Phone} from '../components/Props';

// SHOT 003 — close-up ponsel, layar tiba-tiba menyala: incoming call ADRIAN 03:17 AM.
export const Shot03: React.FC = () => {
  const f = useCurrentFrame();
  const on = f >= 120;
  const pulse = on ? (Math.sin(f / 8) + 1) / 2 : 0;
  const vib = on ? Math.sin(f * 2.4) * 4 : 0;
  return (
    <Shot n={3} from={{zoom: 1.0}} to={{zoom: 1.25}} shake={on ? 2 : 0}>
      <Svg bg="#030507">
        <defs>
          <linearGradient id="s3table" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1c130d" /><stop offset="1" stopColor="#060403" /></linearGradient>
        </defs>
        <rect x={-100} y={730} width={2120} height={400} fill="url(#s3table)" />
        <Glow x={960} y={500} r={720} color="#6fb7ff" opacity={on ? 0.5 : 0} />
        <Phone x={960 + vib} y={470} s={0.85} rot={-6} on={on}>
          <IncomingCall name="ADRIAN" sub="03:17 AM" pulse={pulse} />
        </Phone>
      </Svg>
    </Shot>
  );
};
