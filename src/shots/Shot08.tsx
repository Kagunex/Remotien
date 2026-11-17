import React from 'react';
import {interpolate, random, Sequence, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg, useUid} from '../components/Svg';
import {Door, Hallway, Room} from '../components/Props';
import {AdrianFigure} from '../components/Characters';
import {Flicker} from '../components/Lighting';
import {CLAMP} from '../config/timing';

// SHOT 008 — Adrian mendekati pintu → lubang intip (kosong) → bayangan di bawah pintu.
const Approach: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 600], [600, 800], CLAMP);
  const s = interpolate(f, [0, 600], [1.15, 0.9], CLAMP);
  return (
    <Shot n={8} dur={600} from={{zoom: 1.0}} to={{zoom: 1.2}} shake={0.6}>
      <Svg>
        <Room dim={0.3} />
        <Door x={760} y={60} w={400} h={900} gap={1} />
        <AdrianFigure x={x} y={1110} s={s} back />
      </Svg>
    </Shot>
  );
};

const Peephole: React.FC = () => {
  const f = useCurrentFrame();
  const id = useUid('pp');
  const flick = 0.6 + 0.4 * random(`pf${Math.floor(f / 5)}`);
  return (
    <Shot n={8} dur={480} from={{zoom: 1.0}} to={{zoom: 1.08}} vignette={0.3}>
      <Svg bg="#000">
        <defs>
          <clipPath id={id}><circle cx={960} cy={540} r={480} /></clipPath>
          <radialGradient id={id + 'v'}><stop offset="0.55" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.85} /></radialGradient>
        </defs>
        <g clipPath={`url(#${id})`}>
          <g transform="translate(-192 -108) scale(1.2)"><Hallway flick={flick} /></g>
          <circle cx={960} cy={540} r={480} fill={`url(#${id}v)`} />
        </g>
        <circle cx={960} cy={540} r={486} fill="none" stroke="#a58a4e" strokeWidth={14} />
      </Svg>
      <Flicker at={[200]} len={40} depth={0.7} />
    </Shot>
  );
};

const UnderDoor: React.FC = () => {
  const f = useCurrentFrame();
  const sway = Math.sin(f / 50) * 14;
  return (
    <Shot n={8} dur={420} from={{zoom: 1.0, y: 0}} to={{zoom: 1.7, y: -20}} shake={0.4}>
      <Svg bg="#05070a">
        <rect x={-100} y={560} width={2120} height={600} fill="#07090c" />
        <rect x={250} y={0} width={1420} height={560} fill="#14100d" />
        <rect x={250} y={556} width={1420} height={10} fill="#f0cf90" />
        <Glow x={960} y={600} r={620} color="#f0cf90" opacity={0.35} />
        <g fill="#000">
          <rect x={800 + sway} y={556} width={120} height={12} />
          <rect x={1000 + sway} y={556} width={120} height={12} />
        </g>
      </Svg>
    </Shot>
  );
};

export const Shot08: React.FC = () => (
  <>
    <Sequence durationInFrames={600}><Approach /></Sequence>
    <Sequence from={600} durationInFrames={480}><Peephole /></Sequence>
    <Sequence from={1080} durationInFrames={420}><UnderDoor /></Sequence>
  </>
);
