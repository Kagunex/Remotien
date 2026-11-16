import React from 'react';
import {Composition} from 'remotion';
import {PraktikumVideo} from './PraktikumVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PraktikumVideo"
      component={PraktikumVideo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
