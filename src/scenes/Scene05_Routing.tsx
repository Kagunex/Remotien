import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Router } from '../components/Router';
import { DataPacket } from '../components/DataPacket';
import { NetworkLine } from '../components/NetworkLine';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { smoothStep, softSpring } from '../styles/animation';

export const Scene05_Routing: React.FC = () => {
  const frame = useCurrentFrame();

  const routerScale = softSpring(frame, 6, 13, 115) * 0.96;
  const branchProgress = smoothStep(frame, 80, 175, 0, 1);

  // Paket turun dari atas (2.3 -> 0.1) ke Router, lalu diteruskan ke cabang kanan bawah (0.1 -> -2.35)
  const incoming = smoothStep(frame, 28, 130, 0, 1);
  const outgoing = smoothStep(frame, 145, 340, 0, 1);

  const packetX = frame < 140 ? -0.35 + incoming * 0.35 : outgoing * 1.35;
  const packetY = frame < 140 ? 2.35 - incoming * 2.15 : 0.2 - outgoing * 2.45;
  const packetZ = frame < 140 ? 0.2 : 0.2 + outgoing * 0.35;

  const camY = smoothStep(frame, 140, 345, 0.9, -0.35);

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY=-3.3 theme="routing" />
        <CameraRig position={[0, camY, 8.6]} lookAt={[0, camY * 0.5, 0]} />

        {/* Router 3D Utama di Tengah */}
        <Router position={[0, 0.15, 0]} rotation={[0.24, 0.18, 0]} scale={routerScale} pulseActive />

        {/* Jalur Masuk dari Atas */}
        <NetworkLine
          start={[-0.35, 2.45, 0.15]}
          end={[0, 0.45, 0.1]}
          arcHeight={0.15}
          progress={1}
          color={PALETTE.lightBlue}
        />

        {/* 3 Jalur ISP Bercabang ke Bawah (Portrait Layout) */}
        <NetworkLine
          start={[0.25, -0.05, 0.2]}
          end={[1.38, -2.28, 0.55]}
          arcHeight={0.25}
          progress={branchProgress}
          color={PALETTE.turquoise}
          radius={0.042}
        />
        <NetworkLine
          start={[0, -0.05, 0.2]}
          end={[0, -2.4, 0.4]}
          arcHeight={0.15}
          progress={branchProgress}
          color={PALETTE.lightBlue}
        />
        <NetworkLine
          start={[-0.25, -0.05, 0.2]}
          end={[-1.38, -2.28, 0.55]}
          arcHeight={0.25}
          progress={branchProgress}
          color={PALETTE.lightBlue}
        />

        {/* Paket Data Estafet */}
        <DataPacket
          position={[packetX, packetY, packetZ]}
          color={PALETTE.yellow}
          size={0.44}
        />
      </SceneCanvas>

      <SceneTitle
        kicker="SCENE 05 · ROUTERS & ISP"
        title="Router Memilih Jalur Terbaik"
      />
    </AbsoluteFill>
  );
};
