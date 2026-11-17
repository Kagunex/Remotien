import React from 'react';
import {interpolate, random, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {Rain} from '../components/Props';
import {Lightning} from '../components/Lighting';
import {TitleBlock} from '../components/EndCard';
import {CLAMP} from '../config/timing';

// SHOT 001 — layar hitam, hujan, fade in gedung apartemen tengah malam.
export const Shot01: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [360, 420, 520, 580], [0, 1, 1, 0], CLAMP);
  const wins: React.ReactNode[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 6; c++) {
      const mine = r === 4 && c === 3;
      const lit = random(`w${r}${c}`) > 0.8;
      wins.push(
        <rect key={`${r}-${c}`} x={600 + c * 125} y={200 + r * 95} width={90} height={60}
          fill={mine ? '#e8a44a' : lit ? '#2a3c4d' : '#0c121a'}
          opacity={mine ? 0.75 + 0.25 * Math.sin(f / 9) : 1} />,
      );
    }
  }
  return (
    <Shot n={1} from={{zoom: 1.02}} to={{zoom: 1.5, x: -70, y: -60}} hold={80} fadeIn={150}
      overlay={<TitleBlock title="THE LAST SIGNAL" sub="PART 01 — THE FIRST CALL" opacity={t} />}>
      <Svg>
        <defs>
          <linearGradient id="s1sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#04070b" /><stop offset="1" stopColor="#13202f" /></linearGradient>
        </defs>
        <rect width={1920} height={1080} fill="url(#s1sky)" />
        {Array.from({length: 14}).map((_, i) => (
          <rect key={i} x={i * 150 - 40} y={500 - random('sk' + i) * 300} width={130} height={900} fill="#080c12" />
        ))}
        <rect x={560} y={120} width={800} height={960} fill="#0a0e14" />
        <rect x={540} y={100} width={840} height={30} fill="#06090d" />
        {wins}
        <Glow x={1020} y={610} r={190} color="#e8a44a" opacity={0.5} />
      </Svg>
      <Rain count={220} opacity={0.4} />
      <Lightning at={[170, 440]} />
    </Shot>
  );
};
