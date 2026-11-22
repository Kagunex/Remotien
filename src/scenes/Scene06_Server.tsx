import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { ServerRack } from '../components/ServerRack';
import { DataPacket } from '../components/DataPacket';
import { NetworkLine } from '../components/NetworkLine';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { WIDTH, HEIGHT, smoothStep, softSpring } from '../styles/animation';

export const Scene06_Server: React.FC = () => {
  const frame = useCurrentFrame();

  // Server rack muncul dari lantai
  const rise = softSpring(frame, 8, 14, 100);
  const serverY = -3.4 + rise * 3.15;

  // Lampu indikator menyala satu per satu
  const activeLeds = Math.min(4, Math.floor(smoothStep(frame, 45, 120, 0, 4.9)));

  // Paket permintaan masuk (110 -> 185), pemrosesan (185 -> 240), paket respons keluar (240 -> 325)
  const reqIn = smoothStep(frame, 110, 185, 0, 1);
  const isProcessing = frame >= 180 && frame <= 245;
  const resOut = smoothStep(frame, 240, 325, 0, 1);

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[0, 0.9, 6.2]} lookAt={[0, 0.1, 0]} />

        <ServerRack
          position={[0.65, serverY, 0]}
          rotation={[0, -0.28, 0]}
          scale={1.12}
          activeLeds={activeLeds}
          processing={isProcessing}
        />

        {/* Jalur Masuk & Keluar */}
        <NetworkLine
          start={[-4.2, 0.5, 0.3]}
          end={[-0.25, 0.35, 0.3]}
          arcHeight={0.35}
          progress={smoothStep(frame, 70, 140, 0, 1)}
          color={PALETTE.yellow}
        />
        <NetworkLine
          start={[-0.25, -0.35, 0.4]}
          end={[-4.2, -0.65, 0.4]}
          arcHeight={0.35}
          progress={smoothStep(frame, 220, 290, 0, 1)}
          color={PALETTE.turquoise}
        />

        {/* Paket Permintaan Masuk */}
        {frame >= 105 && frame <= 190 && (
          <DataPacket
            position={[-4.2 + reqIn * 3.95, 0.5 - reqIn * 0.15, 0.3]}
            color={PALETTE.yellow}
            size={0.44}
          />
        )}

        {/* Paket Respons Keluar */}
        {frame >= 240 && (
          <DataPacket
            position={[-0.25 - resOut * 4.1, -0.35 - resOut * 0.3, 0.4]}
            color={PALETTE.turquoise}
            size={0.48}
          />
        )}
      </ThreeCanvas>

      <SceneTitle
        kicker="SCENE 06 · THE SERVER RESPONDS"
        title="Server Memproses Permintaan"
      />
    </AbsoluteFill>
  );
};
