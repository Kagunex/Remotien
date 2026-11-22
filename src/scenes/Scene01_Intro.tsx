import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Smartphone } from '../components/Smartphone';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { WIDTH, HEIGHT, smoothStep, softSpring } from '../styles/animation';

export const Scene01_Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // Smartphone bergerak naik dari bawah layar (00:00 - 00:03)
  const phoneRise = softSpring(frame, 18, 14, 95);
  const phoneY = -4.2 + phoneRise * 4.05;

  // Tiga ikon UI pop di sekitar smartphone (00:04 - 00:07)
  const chatScale = softSpring(frame, 115, 12, 130);
  const videoScale = softSpring(frame, 150, 12, 130);
  const webScale = softSpring(frame, 185, 12, 130);

  // Kamera melakukan dolly-in lembut menuju smartphone
  const camZ = smoothStep(frame, 0, 290, 7.6, 5.5);
  const camY = smoothStep(frame, 0, 290, 0.8, 0.35);

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[0, camY, camZ]} lookAt={[0, 0.1, 0]} />

        <FloatingObject position={[0, phoneY, 0]} amplitude={0.08}>
          <Smartphone rotation={[0.06, -0.24, 0.04]} scale={1.08} />
        </FloatingObject>

        {/* Ikon Chat Bubble (Kiri Atas) */}
        <FloatingObject position={[-2.15, 0.95, 0.35]} phase={0.4} scale={chatScale}>
          <mesh castShadow>
            <boxGeometry args={[0.92, 0.68, 0.24]} />
            <meshStandardMaterial color={PALETTE.cyan} roughness={0.2} />
          </mesh>
          <mesh position={[-0.22, -0.4, 0]} rotation={[0, 0, 0.7]}>
            <boxGeometry args={[0.26, 0.26, 0.22]} />
            <meshStandardMaterial color={PALETTE.cyan} roughness={0.2} />
          </mesh>
        </FloatingObject>

        {/* Ikon Video Play Badge (Kanan Tengah) */}
        <FloatingObject position={[2.25, 0.35, 0.25]} phase={1.8} scale={videoScale}>
          <mesh castShadow>
            <cylinderGeometry args={[0.56, 0.56, 0.22, 32]} />
            <meshStandardMaterial color={PALETTE.magenta} roughness={0.2} />
          </mesh>
          <mesh position={[0.05, 0, 0.14]} rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.24, 0.38, 3]} />
            <meshStandardMaterial color={PALETTE.white} roughness={0.18} />
          </mesh>
        </FloatingObject>

        {/* Ikon Browser Window (Kiri Bawah) */}
        <FloatingObject position={[-1.95, -0.95, 0.45]} phase={3.1} scale={webScale}>
          <mesh castShadow>
            <boxGeometry args={[1.05, 0.76, 0.22]} />
            <meshStandardMaterial color={PALETTE.yellow} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.24, 0.12]}>
            <boxGeometry args={[0.88, 0.14, 0.03]} />
            <meshStandardMaterial color={PALETTE.white} roughness={0.2} />
          </mesh>
        </FloatingObject>
      </ThreeCanvas>

      <SceneTitle
        kicker="SCENE 01 · THE INVISIBLE NETWORK"
        title="Bagaimana Internet Bekerja?"
        centered
        delay={210}
      />
    </AbsoluteFill>
  );
};
