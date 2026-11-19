import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { PALETTE, SCENES } from './constants/theme';
import { Scene01GlowingOcean } from './scenes/Scene01GlowingOcean';
import { Scene02Discovery } from './scenes/Scene02Discovery';
import { Scene03Dinoflagellates } from './scenes/Scene03Dinoflagellates';
import { Scene04ChemicalReaction } from './scenes/Scene04ChemicalReaction';
import { Scene05Defense } from './scenes/Scene05Defense';
import { Scene06Closing } from './scenes/Scene06Closing';
import { AudioMixer } from './components/AudioMixer';
import { SubtitleOverlay } from './components/SubtitleOverlay';

export const BioluminescenceComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: PALETTE.deepOceanNavy }}>
      <Series>
        <Series.Sequence durationInFrames={SCENES.scene01.durationFrames}>
          <Scene01GlowingOcean />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene02.durationFrames}>
          <Scene02Discovery />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene03.durationFrames}>
          <Scene03Dinoflagellates />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene04.durationFrames}>
          <Scene04ChemicalReaction />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene05.durationFrames}>
          <Scene05Defense />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.scene06.durationFrames}>
          <Scene06Closing />
        </Series.Sequence>
      </Series>

      <SubtitleOverlay />
      <AudioMixer />
    </AbsoluteFill>
  );
};
