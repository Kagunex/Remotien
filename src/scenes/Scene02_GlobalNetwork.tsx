import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Globe } from '../components/Globe';
import { NetworkLine } from '../components/NetworkLine';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { WIDTH, HEIGHT, smoothStep, softSpring } from '../styles/animation';

export const Scene02_GlobalNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  const globeScale = softSpring(frame, 4, 13, 110) * 1.18;
  const nodeProgress = smoothStep(frame, 35, 165, 0, 1);
  const line1 = smoothStep(frame, 90, 175, 0, 1);
  const line2 = smoothStep(frame, 135, 225, 0, 1);
  const line3 = smoothStep(frame, 175, 270, 0, 1);

  // Kamera mengorbit globe secara perlahan
  const orbitAngle = smoothStep(frame, 0, 330, -0.35, 0.45);
  const camX = Math.sin(orbitAngle) * 6.4;
  const camZ = Math.cos(orbitAngle) * 6.4;

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[camX, 1.15, camZ]} lookAt={[0, 0, 0]} />

        <FloatingObject amplitude={0.07} scale={globeScale}>
          <Globe nodeProgress={nodeProgress} />
        </FloatingObject>

        {/* Garis koneksi antar titik jaringan global */}
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
      </ThreeCanvas>

      <SceneTitle
        kicker="SCENE 02 · A GLOBAL NETWORK"
        title="Jaringan dari Banyak Jaringan"
      />
    </AbsoluteFill>
  );
};
