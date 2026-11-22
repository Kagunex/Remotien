import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Smartphone } from '../components/Smartphone';
import { Globe } from '../components/Globe';
import { Router } from '../components/Router';
import { ServerRack } from '../components/ServerRack';
import { NetworkLine } from '../components/NetworkLine';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { smoothStep, softSpring } from '../styles/animation';

export const Scene08_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const groupAppear = softSpring(frame, 8, 14, 95);
  const lineProgress = smoothStep(frame, 42, 155, 0, 1);

  // Pull-back sinematik memperlihatkan seluruh ekosistem vertikal (Globe -> Router -> Smartphone & Server)
  const camZ = smoothStep(frame, 55, 325, 8.8, 11.2);
  const camY = smoothStep(frame, 55, 325, 0.8, 1.35);

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY=-3.6 theme="outro" />
        <CameraRig position={[0, camY, camZ]} lookAt={[0, -0.05, 0]} />

        <group scale={groupAppear}>
          {/* Globe Global (Puncak Komposisi Vertikal) */}
          <FloatingObject position={[0, 1.65, -0.35]} phase={2.0}>
            <Globe scale={0.78} nodeProgress={1} />
          </FloatingObject>

          {/* Router ISP (Tengah) */}
          <FloatingObject position={[0, -0.15, 0.55]} phase={1.1}>
            <Router rotation={[0.18, 0.15, 0]} scale={0.72} pulseActive />
          </FloatingObject>

          {/* Smartphone (Kiri Bawah) */}
          <FloatingObject position={[-1.25, -1.65, 0.45]} phase={0.2}>
            <Smartphone rotation={[0.05, 0.32, 0]} scale={0.72} screenFillProgress={1} />
          </FloatingObject>

          {/* Server Rack (Kanan Bawah) */}
          <FloatingObject position={[1.25, -1.6, 0.25]} phase={2.9}>
            <ServerRack rotation={[0, -0.35, 0]} scale={0.74} activeLeds={4} processing />
          </FloatingObject>

          {/* Jaringan Fiber Optik Menghubungkan Seluruh Ekosistem */}
          <NetworkLine
            start={[-1.05, -0.85, 0.5]}
            end={[-0.35, -0.2, 0.55]}
            arcHeight={0.25}
            progress={lineProgress}
            color={PALETTE.cyan}
          />
          <NetworkLine
            start={[0, 0.25, 0.35]}
            end={[0, 0.85, 0.1]}
            arcHeight={0.2}
            progress={lineProgress}
            color={PALETTE.yellow}
          />
          <NetworkLine
            start={[0.35, -0.2, 0.5]}
            end={[1.05, -0.85, 0.35]}
            arcHeight={0.25}
            progress={lineProgress}
            color={PALETTE.turquoise}
          />
          <NetworkLine
            start={[-1.15, -1.5, 0.4]}
            end={[1.15, -1.5, 0.3]}
            arcHeight={-0.35}
            progress={lineProgress}
            color={PALETTE.magenta}
          />
        </group>
      </SceneCanvas>

      <SceneTitle
        kicker="SCENE 08 · EVERYTHING IS CONNECTED"
        title="Dunia di Balik Satu Sentuhan"
        centered
        delay={165}
      />
    </AbsoluteFill>
  );
};
