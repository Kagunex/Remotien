import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {Door, Room, Sofa, TV} from '../components/Props';
import {AdrianFigure} from '../components/Characters';
import {Flicker} from '../components/Lighting';
import {CLAMP} from '../config/timing';

// SHOT 010 — Adrian mundur; lampu ruangan berkedip.
export const Shot10: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 900], [1250, 960], CLAMP);
  return (
    <Shot n={10} from={{zoom: 1.3, x: -120}} to={{zoom: 1.0, x: 0}} shake={1}
      overlay={<Flicker at={[720, 900]} len={60} />}>
      <Svg>
        <Room />
        <Glow x={800} y={240} r={520} color="#e8c88a" opacity={0.18} />
        <Sofa x={560} y={850} w={700} />
        <TV x={140} y={640} w={300} h={170}><rect width={300} height={170} fill="#050607" /></TV>
        <Door x={1560} y={250} w={260} h={560} gap={1} shadow />
        <AdrianFigure x={x} y={1020} s={0.72} mood="anxious" />
      </Svg>
    </Shot>
  );
};
