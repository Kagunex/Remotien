import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {Room} from '../components/Props';
import {Mood, Portrait, Stranger} from '../components/Characters';
import {CLAMP} from '../config/timing';

// SHOT 012 — fokus wajah Adrian, kamera bergeser ke belakang bahu: sosok berdiri diam.
export const Shot12: React.FC = () => {
  const f = useCurrentFrame();
  const mood: Mood = f < 400 ? 'anxious' : 'shock';
  const sO = interpolate(f, [300, 600], [0.05, 0.95], CLAMP);
  return (
    <Shot n={12} from={{zoom: 1.2, x: 150}} to={{zoom: 1.0, x: -100}} shake={0.5} vignette={0.9}>
      <Svg bg="#03050a">
        <g filter="url(#blur12)"><Room dim={0.65} /></g>
        <Glow x={200} y={520} r={900} color="#7fb0d0" opacity={0.35} />
        <Stranger x={1230} y={1060} s={0.85} rim={0.5} opacity={sO} />
        <Portrait x={760} y={650} s={2.3} mood={mood} light={{x: -1, y: 0, color: '#8fb8d8', amt: 0.5}} />
      </Svg>
    </Shot>
  );
};
