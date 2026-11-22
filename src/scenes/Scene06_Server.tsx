import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { ServerRack } from '../components/ServerRack';
import { DataPacket } from '../components/DataPacket';
import { NetworkLine } from '../components/NetworkLine';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { smoothStep, softSpring } from '../styles/animation';

export const Scene06_Server: React.FC = () => {
  const frame = useCurrentFrame();

  // Server rack naik dari lantai studio
  const rise = softSpring(frame, 8, 14, 100);
  const serverY = -3.8 + rise * 3.55;

  const activeLeds = Math.min(4, Math.floor(smoothStep(frame, 42, 118, 0, 4.9)));

  // Permintaan turun dari atas ke server (105 -> 185), server memproses (185 -> 240), respons keluar ke atas kiri (240 -> 325)
  const reqIn = smoothStep(frame, 105, 185, 0, 1);
  const isProcessing = frame >= 180 && frame <= 245;
  const resOut = smoothStep(frame, 240, 325, 0, 1);

  const camRotX = smoothStep(frame, 0, 325, -0.22, 0.22);

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY=-3.1 theme="server" />
        <CameraRig
          position={[Math.sin(camRotX) * 8.2, 0.65, Math.cos(camRotX) * 8.2]}
          lookAt={[0, -0.1, 0]}
        />

        <ServerRack
          position={[0.25, serverY, 0]}
          rotation={[0, -0.32, 0]}
          scale={1.06}
          activeLeds={activeLeds}
          processing={isProcessing}
        />

        {/* Jalur Request Masuk & Response Keluar */}
        <NetworkLine
          start={[-1.45, 2.1, 0.5]}
          end={[-0.25, 0.45, 0.55]}
          arcHeight={0.35}
          progress={smoothStep(frame, 68, 138, 0, 1)}
          color={PALETTE.yellow}
        />
        <NetworkLine
          start={[-0.25, -0.35, 0.6]}
          end={[-1.55, -2.15, 0.65]}
          arcHeight={0.25}
          progress={smoothStep(frame, 218, 288, 0, 1)}
          color={PALETTE.turquoise}
        />

        {/* Paket Permintaan Masuk */}
        {frame >= 100 && frame <= 190 && (
          <DataPacket
            position={[-1.45 + reqIn * 1.2, 2.1 - reqIn * 1.65, 0.52]}
            color={PALETTE.yellow}
            size={0.42}
          />
        )}

        {/* Paket Respons Keluar */}
        {frame >= 240 && (
          <DataPacket
            position={[-0.25 - resOut * 1.3, -0.35 - resOut * 1.8, 0.62]}
            color={PALETTE.turquoise}
            size={0.46}
          />
        )}
      </SceneCanvas>

      <SceneTitle
        kicker="SCENE 06 · THE SERVER RESPONDS"
        title="Server Mengolah Data"
      />
    </AbsoluteFill>
  );
};
