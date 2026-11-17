import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {Door, IncomingCall, Phone, Room} from '../components/Props';
import {Portrait} from '../components/Characters';

// SHOT 009 — ponsel berdering lagi; tangan gemetar; jawab; bayangan di bawah pintu.
export const Shot09: React.FC = () => {
  const f = useCurrentFrame();
  const connected = f >= 300;
  const jx = Math.sin(f * 1.9) * 3;
  return (
    <Shot n={9} from={{zoom: 1.0}} to={{zoom: 1.2, x: -30}} shake={3.2}>
      <Svg>
        <g filter="url(#blur12)">
          <Room dim={0.25} />
          <Door x={1300} y={120} w={380} h={800} gap={1} shadow />
        </g>
        <Portrait x={700 + jx} y={680} s={2.3} mood="anxious" light={{x: 1, y: 0.6, color: '#9fd4ff', amt: 0.5}} />
        <Glow x={1220} y={800} r={520} color="#6fb7ff" opacity={0.45} />
        <Phone x={1230 + jx * 2} y={820} s={0.6} rot={-10} on>
          <IncomingCall name="ADRIAN" sub={connected ? '00:08' : '03:20 AM'} pulse={(Math.sin(f / 7) + 1) / 2} connected={connected} />
        </Phone>
      </Svg>
    </Shot>
  );
};
