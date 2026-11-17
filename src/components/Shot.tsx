import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../config/colors';
import {shotDur} from '../config/timing';
import {Cam, CinematicCamera} from './CinematicCamera';
import {ColorGrade, Vignette} from './Lighting';
import {Fade} from './Transition';

/** Pembungkus satu shot: kamera + grade + vignette + fade. */
export const Shot: React.FC<{
  n: number;
  dur?: number;
  from?: Cam;
  to?: Cam;
  shake?: number;
  fadeIn?: number;
  fadeOut?: number;
  hold?: number;
  vignette?: number;
  overlay?: React.ReactNode;
  children: React.ReactNode;
}> = ({n, dur, from, to, shake, fadeIn = 0, fadeOut = 0, hold = 0, vignette = 0.8, overlay, children}) => {
  const d = dur ?? shotDur(n);
  return (
    <AbsoluteFill style={{background: C.black}}>
      <CinematicCamera from={from} to={to} dur={d} shake={shake}>
        {children}
      </CinematicCamera>
      <ColorGrade />
      <Vignette strength={vignette} />
      {overlay}
      <Fade dur={d} inFrames={fadeIn} outFrames={fadeOut} hold={hold} />
    </AbsoluteFill>
  );
};
