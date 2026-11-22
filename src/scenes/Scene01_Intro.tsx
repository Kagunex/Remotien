import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { Smartphone } from '../components/Smartphone';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { smoothStep, softSpring } from '../styles/animation';

export const Scene01_Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // Smartphone naik dari bawah layar & melakukan hero-turn halus
  const phoneRise = softSpring(frame, 12, 14, 95);
  const phoneY = -4.6 + phoneRise * 4.45;
  const phoneRotY = smoothStep(frame, 0, 290, -0.38, 0.24);

  // Tiga ikon UI muncul berurutan di sekitar layar vertikal
  const chatScale = softSpring(frame, 68, 12, 130);
  const videoScale = softSpring(frame, 102, 12, 130);
  const webScale = softSpring(frame, 135, 12, 130);

  // Cinematic dolly-in vertikal
  const camZ = smoothStep(frame, 0, 290, 9.6, 7.4);
  const camY = smoothStep(frame, 0, 290, 0.85, 0.25);

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY={-3.2} theme="intro" />
        <CameraRig
          position={[0, camY, camZ]}
          lookAt={[0, 0.05, 0]}
        />

        <FloatingObject
          position={[0, phoneY, 0]}
          amplitude={0.08}
        >
          <Smartphone
            rotation={[0.06, phoneRotY, 0.03]}
            scale={1.18}
          />
        </FloatingObject>

        {/* Ikon Chat Bubble (Kiri Atas) */}
        <FloatingObject
          position={[-1.45, 1.35, 0.45]}
          phase={0.4}
          scale={chatScale}
        >
          <mesh castShadow>
            <boxGeometry args={[0.88, 0.64, 0.24]} />
            <meshStandardMaterial
              color={PALETTE.cyan}
              roughness={0.2}
            />
          </mesh>

          <mesh
            position={[-0.2, -0.38, 0]}
            rotation={[0, 0, 0.7]}
          >
            <boxGeometry args={[0.24, 0.24, 0.22]} />
            <meshStandardMaterial
              color={PALETTE.cyan}
              roughness={0.2}
            />
          </mesh>
        </FloatingObject>

        {/* Ikon Video Play Badge (Kanan Tengah) */}
        <FloatingObject
          position={[1.52, 0.35, 0.35]}
          phase={1.8}
          scale={videoScale}
        >
          <mesh castShadow>
            <cylinderGeometry args={[0.52, 0.52, 0.22, 28]} />
            <meshStandardMaterial
              color={PALETTE.magenta}
              roughness={0.2}
            />
          </mesh>

          <mesh
            position={[0.04, 0, 0.13]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          >
            <coneGeometry args={[0.22, 0.34, 3]} />
            <meshStandardMaterial
              color={PALETTE.white}
              roughness={0.18}
            />
          </mesh>
        </FloatingObject>

        {/* Ikon Browser Window (Kiri Bawah) */}
        <FloatingObject
          position={[-1.38, -1.15, 0.5]}
          phase={3.1}
          scale={webScale}
        >
          <mesh castShadow>
            <boxGeometry args={[0.98, 0.7, 0.22]} />
            <meshStandardMaterial
              color={PALETTE.yellow}
              roughness={0.22}
            />
          </mesh>

          <mesh position={[0, 0.22, 0.12]}>
            <boxGeometry args={[0.82, 0.13, 0.03]} />
            <meshStandardMaterial
              color={PALETTE.white}
              roughness={0.2}
            />
          </mesh>
        </FloatingObject>
      </SceneCanvas>

      <SceneTitle
        kicker="SCENE 01 · THE INVISIBLE NETWORK"
        title="Bagaimana Internet Bekerja?"
        centered
        delay={205}
      />
    </AbsoluteFill>
  );
};
