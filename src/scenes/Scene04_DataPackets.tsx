import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { DataPacket } from '../components/DataPacket';
import { CircuitBoard } from '../components/CircuitBoard';
import { NetworkLine } from '../components/NetworkLine';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE, PACKET_COLORS } from '../styles/palette';
import { smoothStep } from '../styles/animation';

export const Scene04_DataPackets: React.FC = () => {
  const frame = useCurrentFrame();

  // Alur vertikal diagonal untuk layar 9:16: PCB Processor (Atas) -> Pemecahan Paket -> Mengalir ke Bawah
  const splitProgress = smoothStep(frame, 65, 140, 0, 1);
  const travelProgress = smoothStep(frame, 140, 325, 0, 1);
  const bigBlockScale = Math.max(0.001, 1 - splitProgress);

  const offsets: Array<[number, number, number]> = [
    [-0.52, 0.42, 0.28],
    [0.52, 0.42, -0.22],
    [-0.52, -0.42, -0.24],
    [0.52, -0.42, 0.28],
    [0, 0.55, -0.35],
    [0, -0.55, 0.35],
  ];

  const camY = smoothStep(frame, 140, 325, 0.65, -0.95);
  const camZ = smoothStep(frame, 140, 325, 8.4, 7.6);

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY={-3.6} theme="packets" />
        <CameraRig position={[0, camY, camZ]} lookAt={[0, camY * 0.7, 0]} />

        {/* Motherboard / PCB di bagian atas sebagai sumber data */}
        <CircuitBoard
          position={[0, 1.35, -0.25]}
          rotation={[0.48, 0.2, 0]}
          scale={0.85}
          active
        />

        {/* Payload Besar Sebelum Dipecah TCP/IP */}
        {splitProgress < 0.98 && (
          <mesh position={[0, 0.65, 0.35]} scale={bigBlockScale} castShadow>
            <boxGeometry args={[1.15, 1.15, 1.15]} />
            <meshStandardMaterial color={PALETTE.white} roughness={0.18} />
          </mesh>
        )}

        {/* Jalur Fiber Optik Vertikal ke Bawah */}
        <NetworkLine
          start={[0, 0.65, 0.3]}
          end={[0, -2.55, 0.4]}
          arcHeight={0.2}
          progress={smoothStep(frame, 105, 195, 0, 1)}
          color={PALETTE.lightBlue}
          radius={0.04}
        />

        {/* 6 Paket Data TCP/IP */}
        {offsets.map((off, idx) => {
          const stagger = idx * 0.085;
          const localTravel = Math.max(0, Math.min(1, (travelProgress - stagger) * 1.25));
          const x = off[0] * splitProgress * (1 - localTravel * 0.75) + Math.sin(localTravel * Math.PI * 2 + idx) * 0.28;
          const y = 0.65 + off[1] * splitProgress * (1 - localTravel * 0.75) - localTravel * 3.15;
          const z = 0.35 + off[2] * splitProgress;

          return (
            <DataPacket
              key={idx}
              position={[x, y, z]}
              color={PACKET_COLORS[idx % PACKET_COLORS.length]}
              size={0.4}
              spinSpeed={0.055 + idx * 0.01}
            />
          );
        })}
      </SceneCanvas>

      <SceneTitle
        kicker="SCENE 04 · TCP/IP DATA PACKETS"
        title="Data Dipecah Jadi Paket"
      />
    </AbsoluteFill>
  );
};
