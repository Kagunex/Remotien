import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {IncomingCall, Phone, Room, Sofa} from '../components/Props';
import {Mood, Portrait} from '../components/Characters';
import {CLAMP} from '../config/timing';

// SHOT 004 — Adrian terbangun, melihat nama penelepon: ekspresi berubah.
export const Shot04: React.FC = () => {
  const f = useCurrentFrame();
  const mood: Mood = f < 60 ? 'sleep' : f < 540 ? 'calm' : 'anxious';
  const rise = interpolate(f, [0, 100], [70, 0], CLAMP);
  return (
    <Shot n={4} from={{zoom: 1.0}} to={{zoom: 1.12}} shake={1.2}>
      <Svg>
        <g filter="url(#blur12)"><Room /><Sofa x={300} y={820} w={1000} /></g>
        <Portrait x={860} y={680 + rise} s={2.2} mood={mood} light={{x: 1, y: 1, color: '#9fd4ff', amt: 0.55}} />
        <Glow x={1500} y={860} r={560} color="#6fb7ff" opacity={0.45} />
        <Phone x={1500} y={900} s={0.5} rot={14} on>
          <IncomingCall name="ADRIAN" sub="03:17 AM" pulse={(Math.sin(f / 8) + 1) / 2} />
        </Phone>
      </Svg>
    </Shot>
  );
};
