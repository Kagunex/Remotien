import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
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
import { WIDTH, HEIGHT, smoothStep, softSpring } from '../styles/animation';

export const Scene08_Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const groupAppear = softSpring(frame, 10, 14, 95);
  const lineProgress = smoothStep(frame, 45, 150, 0, 1);

  // Kamera menjauh lembut untuk memperlihatkan keseluruhan ekosistem
  const camZ = smoothStep(frame, 60, 320, 6.8, 9.2);
  const camY = smoothStep(frame, 60, 320, 1.0, 1.65);

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[0, camY, camZ]} lookAt={[0, 0.15, 0]} />

        <group scale={groupAppear}>
          {/* Smartphone (Kiri) */}
          <FloatingObject position={[-3.3, -0.15, 0.4]} phase={0.2}>
            <Smartphone rotation={[0.05, 0.35, 0]} scale={0.78} screenFillProgress={1} />
          </FloatingObject>

          {/* Router (Kiri Tengah Bawah) */}
          <FloatingObject position={[-1.15, -0.75, 0.65]} phase={1.1}>
            <Router rotation={[0.1, 0.2, 0]} scale={0.76} pulseActive />
          </FloatingObject>

          {/* Globe (Tengah Atas) */}
          <FloatingObject position={[0.45, 0.72, -0.45]} phase={2.0}>
            <Globe scale={0.88} nodeProgress={1} />
          </FloatingObject>

          {/* Server Rack (Kanan) */}
          <FloatingObject position={[3.15, -0.1, 0.25]} phase={2.9}>
            <ServerRack rotation={[0, -0.35, 0]} scale={0.82} activeLeds={4} processing />
          </FloatingObject>

          {/* Garis Jaringan yang Menghubungkan Semua Objek */}
          <NetworkLine
            start={[-2.75, -0.25, 0.45]}
            end={[-1.55, -0.65, 0.65]}
            arcHeight={0.35}
            progress={lineProgress}
            color={PALETTE.cyan}
          />
          <NetworkLine
            start={[-0.75, -0.45, 0.55]}
            end={[0.15, 0.25, -0.1]}
            arcHeight={0.45}
            progress={lineProgress}
            color={PALETTE.yellow}
          />
          <NetworkLine
            start={[1.35, 0.55, -0.2]}
            end={[2.55, 0.15, 0.2]}
            arcHeight={0.45}
            progress={lineProgress}
            color={PALETTE.turquoise}
          />
          <NetworkLine
            start={[-2.85, 0.45, 0.3]}
            end={[2.65, 0.55, 0.15]}
            arcHeight={1.55}
            progress={lineProgress}
            color={PALETTE.magenta}
          />
        </group>
      </ThreeCanvas>

      <SceneTitle
        kicker="SCENE 08 · EVERYTHING IS CONNECTED"
        title="Dunia di Balik Satu Sentuhan"
        centered
        delay={175}
      />
    </AbsoluteFill>
  );
};
