import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Router } from '../components/Router';
import { DataPacket } from '../components/DataPacket';
import { NetworkLine } from '../components/NetworkLine';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { WIDTH, HEIGHT, smoothStep, softSpring } from '../styles/animation';

export const Scene05_Routing: React.FC = () => {
  const frame = useCurrentFrame();

  const routerScale = softSpring(frame, 6, 13, 115) * 1.1;
  const branchProgress = smoothStep(frame, 85, 175, 0, 1);

  // Paket datang dari kiri (-4 -> 0), lalu diteruskan lewat cabang atas (0 -> 4.2)
  const incoming = smoothStep(frame, 30, 130, 0, 1);
  const outgoing = smoothStep(frame, 145, 340, 0, 1);

  const packetX = frame < 140 ? -4.2 + incoming * 4.2 : outgoing * 4.4;
  const packetY = frame < 140 ? 0.35 : 0.35 + outgoing * 1.15;

  const camX = smoothStep(frame, 145, 345, 0, 2.2);

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[camX, 1.35, 6.4]} lookAt={[camX * 0.7, 0.25, 0]} />

        {/* Router 3D Utama */}
        <Router position={[0, -0.1, 0]} scale={routerScale} pulseActive />

        {/* Jalur Masuk dari Kiri */}
        <NetworkLine
          start={[-4.4, 0.35, 0]}
          end={[-0.8, 0.25, 0]}
          arcHeight={0.25}
          progress={1}
          color={PALETTE.lightBlue}
        />

        {/* 3 Jalur Bercabang ke Kanan */}
        <NetworkLine
          start={[0.8, 0.25, 0]}
          end={[4.5, 1.55, -0.3]}
          arcHeight={0.45}
          progress={branchProgress}
          color={PALETTE.turquoise}
          radius={0.042}
        />
        <NetworkLine
          start={[0.8, 0.15, 0]}
          end={[4.5, 0.1, 0.3]}
          arcHeight={0.2}
          progress={branchProgress}
          color={PALETTE.lightBlue}
        />
        <NetworkLine
          start={[0.8, 0.05, 0]}
          end={[4.5, -1.25, 0.1]}
          arcHeight={-0.3}
          progress={branchProgress}
          color={PALETTE.lightBlue}
        />

        {/* Paket Data yang Diteruskan Router */}
        <DataPacket
          position={[packetX, packetY, 0]}
          color={PALETTE.yellow}
          size={0.46}
        />
      </ThreeCanvas>

      <SceneTitle
        kicker="SCENE 05 · ROUTERS & ROUTES"
        title="Router Memilih Jalur Terbaik"
      />
    </AbsoluteFill>
  );
};
