import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {CLAMP} from '../config/timing';
import {FONT} from '../config/typography';

export const TitleBlock: React.FC<{title: string; sub?: string; foot?: string; opacity: number}> = ({title, sub, foot, opacity}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity, color: '#e9edf2', fontFamily: FONT.title, textAlign: 'center'}}>
    <div style={{fontSize: 96, letterSpacing: 26, paddingLeft: 26}}>{title}</div>
    {sub && <div style={{fontFamily: FONT.ui, fontSize: 30, letterSpacing: 18, marginTop: 28, color: '#9fb4c7'}}>{sub}</div>}
    {foot && <div style={{fontFamily: FONT.ui, fontSize: 24, letterSpacing: 10, marginTop: 90, color: '#7c8794'}}>{foot}</div>}
  </AbsoluteFill>
);

/** Layar hitam akhir Part 01 (muncul tepat sebelum 04:00). */
export const EndCard: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [300, 360], [0, 1], CLAMP);
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <TitleBlock title="THE LAST SIGNAL" sub="PART 01" foot="TO BE CONTINUED..." opacity={o} />
    </AbsoluteFill>
  );
};
