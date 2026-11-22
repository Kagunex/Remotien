import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Smartphone } from '../components/Smartphone';
import { DataPacket } from '../components/DataPacket';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PACKET_COLORS } from '../styles/palette';
import { smoothStep } from '../styles/animation';

export const Scene07_Reassembly: React.FC = () => {
  const frame = useCurrentFrame();

  const absorbProgress = smoothStep(frame, 18, 165, 0, 1);
  const screenFill = smoothStep(frame, 128, 295, 0, 1);

  // Close-up layar lalu dolly-out halus menampilkan halaman web lengkap
  const camZ = smoothStep(frame, 185, 355, 6.8, 8.4);

  const incomingCoords: Array<[number, number, number]> = [
    [-1.45, 1.85, 0.7],
    [1.45, 1.65, 0.7],
    [-1.4, -1.65, 0.65],
    [1.4, -1.5, 0.65],
  ];

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY={-3.2} theme="reassembly" />
        <CameraRig position={[0, 0.15, camZ]} lookAt={[0, -0.05, 0]} />

        <FloatingObject position={[0, -0.08, 0]} amplitude={0.07}>
          <Smartphone
            rotation={[0.04, -0.16, 0.02]}
            scale={1.18}
            screenFillProgress={screenFill}
          />
        </FloatingObject>

        {/* Paket Data Masuk dari 4 Sudut Layar Portrait */}
        {incomingCoords.map((start, idx) => {
          const localP = Math.max(0, Math.min(1, (absorbProgress - idx * 0.08) * 1.3));
          const x = start[0] + (0 - start[0]) * localP;
          const y = start[1] + (-0.05 - start[1]) * localP;
          const z = start[2] + (0.25 - start[2]) * localP;
          const scale = localP > 0.95 ? 0.001 : 1 - localP * 0.45;

          return (
            <group key={idx} scale={scale}>
              <DataPacket
                position={[x, y, z]}
                color={PACKET_COLORS[idx % PACKET_COLORS.length]}
                size={0.38}
              />
            </group>
          );
        })}
      </SceneCanvas>

      <SceneTitle
        kicker="SCENE 07 · REASSEMBLED ON YOUR DEVICE"
        title="Dirakit Ulang di Layar"
      />
    </AbsoluteFill>
  );
};
