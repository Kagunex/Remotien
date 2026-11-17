import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {IncomingCall, Phone, Room} from '../components/Props';
import {Portrait} from '../components/Characters';
import {FONT} from '../config/typography';

// SHOT 005 — Adrian mengangkat telepon, hening tiga detik, suara misterius.
export const Shot05: React.FC = () => {
  const f = useCurrentFrame();
  const s = Math.floor(f / 60);
  return (
    <Shot n={5} from={{zoom: 1.0, x: 30}} to={{zoom: 1.15, x: -20}} shake={0.8}
      overlay={<div style={{position: 'absolute', left: 120, top: 130, fontFamily: FONT.mono, fontSize: 26, color: '#9fd4ff', opacity: 0.7}}>
        ● 00:{String(s).padStart(2, '0')}
      </div>}>
      <Svg>
        <g filter="url(#blur12)"><Room dim={0.3} /></g>
        <Portrait x={760} y={620} s={2.6} mood="anxious" light={{x: 1, y: 0.3, color: '#9fd4ff', amt: 0.5}} />
        <Glow x={1180} y={620} r={520} color="#6fb7ff" opacity={0.4} />
        <Phone x={1190} y={640} s={0.7} rot={8} on>
          <IncomingCall name="ADRIAN" sub={`00:${String(s).padStart(2, '0')}`} connected />
        </Phone>
      </Svg>
    </Shot>
  );
};
