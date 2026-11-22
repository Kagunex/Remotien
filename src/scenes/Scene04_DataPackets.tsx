import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { DataPacket } from '../components/DataPacket';
import { NetworkLine } from '../components/NetworkLine';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE, PACKET_COLORS } from '../styles/palette';
import { WIDTH, HEIGHT, smoothStep } from '../styles/animation';

export const Scene04_DataPackets: React.FC = () => {
  const frame = useCurrentFrame();

  // Fase 1 (0-75): Satu objek data besar utuh
  // Fase 2 (75-150): Terpecah menjadi kubus-kubus kecil berwarna
  // Fase 3 (150-330): Paket bergerak sepanjang jalur jaringan
  const splitProgress = smoothStep(frame, 70, 145, 0, 1);
  const travelProgress = smoothStep(frame, 145, 325, 0, 1);
  const bigBlockScale = Math.max(0.001, 1 - splitProgress);

  const offsets: Array<[number, number, number]> = [
    [-0.55, 0.55, 0.3],
    [0.55, 0.55, -0.2],
    [-0.55, -0.55, -0.25],
    [0.55, -0.55, 0.3],
    [0, 0.65, -0.4],
    [0, -0.65, 0.4],
  ];

  // Kamera mengikuti perjalanan paket
  const camX = smoothStep(frame, 145, 325, -0.5, 2.8);
  const camZ = smoothStep(frame, 145, 325, 6.0, 5.2);

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[camX, 0.85, camZ]} lookAt={[camX, 0, 0]} />

        {/* Objek Data Besar Sebelum Dipecah */}
        {splitProgress < 0.98 && (
          <mesh position={[-1.8, 0, 0]} scale={bigBlockScale} castShadow>
            <boxGeometry args={[1.45, 1.45, 1.45]} />
            <meshStandardMaterial color={PALETTE.white} roughness={0.2} />
          </mesh>
        )}

        {/* Jalur Jaringan */}
        <NetworkLine
          start={[-1.8, 0, 0]}
          end={[4.6, 0.2, 0]}
          arcHeight={0.65}
          progress={smoothStep(frame, 110, 200, 0, 1)}
          color={PALETTE.lightBlue}
          radius={0.04}
        />

        {/* Kubus-kubus Paket Berwarna */}
        {offsets.map((off, idx) => {
          const stagger = idx * 0.08;
          const localTravel = Math.max(0, Math.min(1, (travelProgress - stagger) * 1.25));
          const x = -1.8 + off[0] * splitProgress * (1 - localTravel * 0.7) + localTravel * 6.2;
          const y = off[1] * splitProgress * (1 - localTravel * 0.75) + Math.sin(localTravel * Math.PI) * 0.65;
          const z = off[2] * splitProgress;

          return (
            <DataPacket
              key={idx}
              position={[x, y, z]}
              color={PACKET_COLORS[idx % PACKET_COLORS.length]}
              size={0.42}
              spinSpeed={0.05 + idx * 0.01}
            />
          );
        })}
      </ThreeCanvas>

      <SceneTitle
        kicker="SCENE 04 · DATA IN PACKETS"
        title="Data Dipecah Menjadi Paket"
      />
    </AbsoluteFill>
  );
};
