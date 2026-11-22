import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Smartphone } from '../components/Smartphone';
import { DataPacket } from '../components/DataPacket';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PACKET_COLORS } from '../styles/palette';
import { WIDTH, HEIGHT, smoothStep } from '../styles/animation';

export const Scene07_Reassembly: React.FC = () => {
  const frame = useCurrentFrame();

  // Paket kembali menuju smartphone (0 - 160)
  const absorbProgress = smoothStep(frame, 20, 165, 0, 1);

  // Elemen website tersusun bertahap di layar smartphone (130 - 290)
  const screenFill = smoothStep(frame, 130, 295, 0, 1);

  // Kamera zoom-out halus di akhir scene
  const camZ = smoothStep(frame, 190, 355, 5.2, 6.8);

  const incomingCoords: Array<[number, number, number]> = [
    [-3.4, 1.3, 0.6],
    [-3.8, 0.2, 0.8],
    [-3.2, -1.1, 0.5],
    [-2.7, 0.8, 0.9],
  ];

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[0, 0.35, camZ]} lookAt={[0, 0, 0]} />

        <FloatingObject position={[0.55, -0.05, 0]} amplitude={0.07}>
          <Smartphone
            rotation={[0.05, -0.22, 0.02]}
            scale={1.15}
            screenFillProgress={screenFill}
          />
        </FloatingObject>

        {/* Paket Data Masuk ke Layar Smartphone */}
        {incomingCoords.map((start, idx) => {
          const localP = Math.max(0, Math.min(1, (absorbProgress - idx * 0.08) * 1.3));
          const x = start[0] + (0.45 - start[0]) * localP;
          const y = start[1] + (0.1 - start[1]) * localP;
          const z = start[2] + (0.2 - start[2]) * localP;
          const scale = localP > 0.95 ? 0.001 : 1 - localP * 0.45;

          return (
            <group key={idx} scale={scale}>
              <DataPacket
                position={[x, y, z]}
                color={PACKET_COLORS[idx % PACKET_COLORS.length]}
                size={0.4}
              />
            </group>
          );
        })}
      </ThreeCanvas>

      <SceneTitle
        kicker="SCENE 07 · REASSEMBLED ON YOUR DEVICE"
        title="Halaman Web Tersusun di Layar"
      />
    </AbsoluteFill>
  );
};
