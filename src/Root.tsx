import React from 'react';
import {Composition} from 'remotion';
import {PraktikumVideo} from './PraktikumVideo';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="PraktikumVideo"
    component={PraktikumVideo}
    durationInFrames={1800}
    fps={30}
    width={1920}
    height={1080}
  />
);
