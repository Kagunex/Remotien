import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {Shot} from '../components/Shot';
import {Glow, Svg} from '../components/Svg';
import {Room, TV} from '../components/Props';
import {AdrianFigure, Portrait} from '../components/Characters';
import {Glitch} from '../components/Transition';
import {FONT} from '../config/typography';

// SHOT 011 — TV menyala sendiri: static, lalu rekaman Adrian dengan pakaian berbeda.
export const Shot11: React.FC = () => {
  const f = useCurrentFrame();
  const rec = f >= 400;
  const glowO = 0.25 + 0.2 * random(`tv${f}`);
  return (
    <Shot n={11} from={{zoom: 1.0}} to={{zoom: 1.25}} shake={0.8}
      overlay={<Glitch active={(f > 380 && f < 430) || (rec && random(`g${Math.floor(f / 8)}`) > 0.93)} />}>
      <Svg>
        <Room dim={0.55} />
        <Glow x={960} y={440} r={950} color="#7fb0d0" opacity={glowO} />
        <TV x={410} y={130} w={1100} h={620}>
          {!rec ? (
            <g>
              <filter id="stat"><feTurbulence type="fractalNoise" baseFrequency="0.85 0.95" numOctaves={2} seed={f} /><feColorMatrix type="saturate" values="0" /></filter>
              <rect width={1100} height={620} filter="url(#stat)" />
            </g>
          ) : (
            <g>
              <rect width={1100} height={620} fill="#0f1a22" />
              <rect y={470} width={1100} height={150} fill="#0a0f14" />
              <Portrait x={550} y={290} s={0.95} outfit="alt" mood="calm" light={{x: -1, y: 0, color: '#9fd4ff', amt: 0.25}} />
              {Array.from({length: 62}).map((_, i) => <rect key={i} y={i * 10} width={1100} height={2} fill="#000" opacity={0.25} />)}
              <text x={36} y={56} fontFamily={FONT.mono} fontSize={34} fill="#ff3b3b">● REC</text>
              <text x={1064} y={590} textAnchor="end" fontFamily={FONT.mono} fontSize={30} fill="#d9e6f0">03:17:42</text>
            </g>
          )}
        </TV>
        <AdrianFigure x={280} y={1130} s={0.8} back />
      </Svg>
    </Shot>
  );
};
