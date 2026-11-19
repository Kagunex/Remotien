import React from 'react';
import { Composition } from 'remotion';
import { BioluminescenceComposition } from './Composition';
import { VIDEO_SPECS } from './constants/theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BioluminescenceEpisode01"
      component={BioluminescenceComposition}
      durationInFrames={VIDEO_SPECS.totalFrames}
      fps={VIDEO_SPECS.fps}
      width={VIDEO_SPECS.width}
      height={VIDEO_SPECS.height}
    />
  );
};
