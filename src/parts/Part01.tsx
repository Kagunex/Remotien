import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES, sec} from '../config/timing';
import {OpeningScene} from '../scenes/OpeningScene';
import {PhoneCallScene} from '../scenes/PhoneCallScene';
import {KnockScene} from '../scenes/KnockScene';
import {TelevisionScene} from '../scenes/TelevisionScene';
import {FinalRevealScene} from '../scenes/FinalRevealScene';
import {FilmGrain, Letterbox} from '../components/FilmGrain';
import {Subtitle} from '../components/Subtitle';
import {VoiceTrack} from '../components/Dialogue';
import {SoundDesign} from '../components/SoundDesign';

const seq = (id: keyof typeof SCENES, C: React.FC) => (
  <Sequence key={id} from={sec(SCENES[id].start)} durationInFrames={sec(SCENES[id].end - SCENES[id].start)}>
    <C />
  </Sequence>
);

export const Part01: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    {seq('opening', OpeningScene)}
    {seq('caller', PhoneCallScene)}
    {seq('knock', KnockScene)}
    {seq('television', TelevisionScene)}
    {seq('reveal', FinalRevealScene)}
    <FilmGrain />
    <Letterbox />
    <Subtitle />
    <SoundDesign />
    <VoiceTrack />
  </AbsoluteFill>
);
