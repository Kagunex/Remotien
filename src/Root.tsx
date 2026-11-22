import React from 'react';
import { Composition } from 'remotion';
import { InternetExplained } from './compositions/InternetExplained';
import { FPS, WIDTH, HEIGHT, TOTAL_FRAMES } from './styles/animation';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InternetExplained"
        component={InternetExplained}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
