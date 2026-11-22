import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Globe } from '../components/Globe';
import { NetworkLine } from '../components/NetworkLine';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { smoothStep, softSpring } from '../styles/animation';

export const Scene02_GlobalNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  const globeScale = softSpring(frame, 4, 13, 110) * 1.15;
  const nodeProgress = smoothStep(frame, 35, 165, 0, 1);
  const line1 = smoothStep(frame, 85, 170, 0, 1);
  const line2 = smoothStep(frame, 130, 220, 0, 1);
  const line3 = smoothStep(frame, 170, 265, 0, 1);

  // Orbit camera + tilt vertikal untuk menonjolkan kabel bawah laut & satelit
  const orbitAngle = smoothStep(frame, 0, 330, -0.45, 0.55);
  const radius = smoothStep(frame, 0, 330, 8.6, 7.6);
  const camX = Math.sin(orbitAngle) * radius;
  const camZ = Math.cos(orbitAngle) * radius;
  const camY = smoothStep(frame, 0, 330, 1.4, 0.65);

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY={-3.1} theme="globe" />

        <CameraRig
          position={[camX, camY, camZ]}
          lookAt={[0, -0.05, 0]}
        />

        <FloatingObject amplitude={0.07} scale={globeScale}>
          <Globe nodeProgress={nodeProgress} />
        </FloatingObject>

        {/* Jalur Fiber Optik & Satelit Antar Benua */}
        <NetworkLine
          start={[-1.05, 0.9, 1.0]}
          end={[1.1, 0.95, 0.95]}
          arcHeight={0.95}
          progress={line1}
          color={PALETTE.yellow}
        />

        <NetworkLine
          start={[-1.35, -0.45, 0.85]}
          end={[1.38, -0.35, 0.82]}
          arcHeight={0.8}
          progress={line2}
          color={PALETTE.lightBlue}
        />

        <NetworkLine
          start={[0.15, 1.55, 0.55]}
          end={[0.05, -1.05, 1.3]}
          arcHeight={1.1}
          progress={line3}
          color={PALETTE.magenta}
        />
      </SceneCanvas>

      <SceneTitle
        kicker="SCENE 02 · A GLOBAL NETWORK"
        title="Jaringan Raksasa Global"
      />
    </AbsoluteFill>
  );
};
        
