import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Svg} from '../components/Svg';
import {Door, Room, Sofa} from '../components/Props';
import {AdrianFigure} from '../components/Characters';

// SHOT 007 — Adrian berdiri; musik mati; TOK TOK TOK pada detik 8, 9, 10.
export const Shot07: React.FC = () => {
  const f = useCurrentFrame();
  const knocks = [480, 540, 600];
  const pulse = Math.max(...knocks.map((k) => (f - k >= 0 && f - k < 14 ? 1 - (f - k) / 14 : 0)));
  return (
    <Shot n={7} from={{zoom: 1.0}} to={{zoom: 1.15, x: -60}} shake={pulse * 6}
      overlay={<AbsoluteFill style={{background: '#000', opacity: f >= 480 ? 0.35 : 0}} />}>
      <Svg>
        <Room />
        <Sofa x={80} y={830} w={620} />
        <Door x={1280} y={170} w={340} h={700} knock={pulse} gap={f >= 480 ? 1 : 0.5} />
        <AdrianFigure x={860} y={1010} s={0.95} phone mood="anxious" />
      </Svg>
    </Shot>
  );
};
