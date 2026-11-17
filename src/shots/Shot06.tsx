import React from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {NumbersScreen, Phone, Room} from '../components/Props';
import {Mood, Portrait} from '../components/Characters';
import {Glitch} from '../components/Transition';

// SHOT 006 — push-in ke wajah Adrian; telepon terputus; nomor penelepon = nomor sendiri.
const FaceA: React.FC = () => {
  const f = useCurrentFrame();
  const mood: Mood = f < 600 ? 'anxious' : 'shock';
  return (
    <Shot n={6} dur={900} from={{zoom: 1.0}} to={{zoom: 1.7}} shake={0.6} overlay={<Glitch active={f > 880} />}>
      <Svg>
        <g filter="url(#blur12)"><Room dim={0.4} /></g>
        <Portrait x={960} y={640} s={2.4} mood={mood} light={{x: 0.2, y: 1, color: '#9fd4ff', amt: 0.5}} />
      </Svg>
    </Shot>
  );
};

const NumbersB: React.FC = () => (
  <Shot n={6} dur={600} from={{zoom: 1.0}} to={{zoom: 1.2}} shake={0.5}>
    <Svg bg="#020304">
      <Glow x={960} y={540} r={700} color="#6fb7ff" opacity={0.4} />
      <Phone x={960} y={540} s={1.0} on><NumbersScreen /></Phone>
    </Svg>
  </Shot>
);

export const Shot06: React.FC = () => (
  <>
    <Sequence durationInFrames={900}><FaceA /></Sequence>
    <Sequence from={900} durationInFrames={600}><NumbersB /></Sequence>
  </>
);
