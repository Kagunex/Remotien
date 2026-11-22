import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { SCENES } from '../data/scenes';
import { Scene01_Intro } from '../scenes/Scene01_Intro';
import { Scene02_GlobalNetwork } from '../scenes/Scene02_GlobalNetwork';
import { Scene03_DNS } from '../scenes/Scene03_DNS';
import { Scene04_DataPackets } from '../scenes/Scene04_DataPackets';
import { Scene05_Routing } from '../scenes/Scene05_Routing';
import { Scene06_Server } from '../scenes/Scene06_Server';
import { Scene07_Reassembly } from '../scenes/Scene07_Reassembly';
import { Scene08_Outro } from '../scenes/Scene08_Outro';
import { Subtitle } from '../components/Subtitle';
import { AudioMix } from '../audio/AudioMix';
import { PALETTE } from '../styles/palette';

const SCENE_COMPONENTS: Record<string, React.FC> = {
  'scene-01': Scene01_Intro,
  'scene-02': Scene02_GlobalNetwork,
  'scene-03': Scene03_DNS,
  'scene-04': Scene04_DataPackets,
  'scene-05': Scene05_Routing,
  'scene-06': Scene06_Server,
  'scene-07': Scene07_Reassembly,
  'scene-08': Scene08_Outro,
};

export const InternetExplained: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: PALETTE.lavender }}>
      {/* Visual 3D Sequence untuk 8 Scene (Total 2700 Frames / 90 Detik) */}
      <Series>
        {SCENES.map((scene) => {
          const SceneComponent = SCENE_COMPONENTS[scene.id];
          return (
            <Series.Sequence
              key={scene.id}
              durationInFrames={scene.durationFrames}
              name={`${scene.number.toString().padStart(2, '0')} - ${scene.title}`}
            >
              <SceneComponent />
            </Series.Sequence>
          );
        })}
      </Series>

      {/* Layer Subtitle WCAG 2.2 High Contrast */}
      <Subtitle />

      {/* Master Audio Mix (Voiceover + SFX + Ducked Music Bed) */}
      <AudioMix />
    </AbsoluteFill>
  );
};
