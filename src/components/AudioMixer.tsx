import React from 'react';
import { Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import timingData from '../narration/timing.json';

export const AudioMixer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  let activeSpeechWeight = 0;
  for (const seg of timingData.segments) {
    const fadeIn = interpolate(currentSec, [seg.startSec - 0.35, seg.startSec], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const fadeOut = interpolate(currentSec, [seg.endSec, seg.endSec + 0.45], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const weight = Math.min(fadeIn, fadeOut);
    if (weight > activeSpeechWeight) {
      activeSpeechWeight = weight;
    }
  }

  const musicVolume = interpolate(activeSpeechWeight, [0, 1], [0.42, 0.14]);
  const oceanVolume = interpolate(activeSpeechWeight, [0, 1], [0.5, 0.18]);

  return (
    <>
      <Audio src={staticFile('audio/narration-id.mp3')} volume={1.0} />
      <Audio src={staticFile('audio/synth-pad.wav')} volume={musicVolume} />
      <Audio src={staticFile('audio/ambient-ocean.wav')} volume={oceanVolume} />
    </>
  );
};
