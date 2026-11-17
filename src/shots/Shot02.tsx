import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {DigitalClock, Rain, Room, Sofa, WindowPane} from '../components/Props';
import {AdrianLying} from '../components/Characters';
import {CLAMP} from '../config/timing';

// SHOT 002 — kamera melewati jendela; Adrian tertidur di sofa; jam 03:17.
export const Shot02: React.FC = () => {
  const f = useCurrentFrame();
  const ext = interpolate(f, [280, 440], [1, 0], CLAMP);
  return (
    <Shot n={2} from={{zoom: 1.0, x: 40}} to={{zoom: 1.2, x: -30}}>
      <Svg>
        <Room />
        <Sofa x={560} y={800} w={820} />
        <AdrianLying x={960} y={690} />
        <rect x={1440} y={700} width={190} height={130} fill="#15110e" />
        <DigitalClock x={1535} y={640} text="03:17" s={0.8} />
        <Glow x={1535} y={650} r={260} color="#ff2a2a" opacity={0.35} />
      </Svg>
      <AbsoluteFill style={{opacity: ext}}>
        <Svg bg="#04070b"><WindowPane x={0} y={0} w={1920} h={1080} frame={44} /></Svg>
        <Rain count={260} opacity={0.5} />
      </AbsoluteFill>
    </Shot>
  );
};
