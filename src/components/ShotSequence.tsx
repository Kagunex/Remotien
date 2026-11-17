import React from 'react';
import {Sequence} from 'remotion';
import {SCENES, SceneId, sec, shotDur, shotStart} from '../config/timing';

export const ShotSequence: React.FC<{scene: SceneId; shots: Record<number, React.FC>}> = ({scene, shots}) => {
  const base = sec(SCENES[scene].start);
  return (
    <>
      {Object.entries(shots).map(([k, Comp]) => {
        const n = Number(k);
        return (
          <Sequence key={n} from={shotStart(n) - base} durationInFrames={shotDur(n)}>
            <Comp />
          </Sequence>
        );
      })}
    </>
  );
};
