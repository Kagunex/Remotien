import React from 'react';
import {interpolate, Sequence, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {Room} from '../components/Props';
import {Portrait, Stranger} from '../components/Characters';
import {EndCard} from '../components/EndCard';
import {CLAMP} from '../config/timing';

// SHOT 013 — Adrian perlahan menoleh → CUT TO BLACK → suara The Stranger.
const Turn: React.FC = () => {
  const f = useCurrentFrame();
  const turn = interpolate(f, [10, 170], [0, 0.9], CLAMP);
  return (
    <Shot n={13} dur={180} from={{zoom: 1.0}} to={{zoom: 1.2}} shake={0.4} vignette={0.9}>
      <Svg bg="#03050a">
        <g filter="url(#blur12)"><Room dim={0.65} /></g>
        <Glow x={200} y={520} r={900} color="#7fb0d0" opacity={0.3} />
        <Stranger x={1230} y={1060} s={0.85} rim={0.6} />
        <Portrait x={760} y={650} s={2.3} mood="shock" turn={turn} light={{x: -1, y: 0, color: '#8fb8d8', amt: 0.5}} />
      </Svg>
    </Shot>
  );
};

export const Shot13: React.FC = () => (
  <>
    <Sequence durationInFrames={180}><Turn /></Sequence>
    <Sequence from={180} durationInFrames={420}><EndCard /></Sequence>
  </>
);
