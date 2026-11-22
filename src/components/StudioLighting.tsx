import React from 'react';
import { PALETTE } from '../styles/palette';
import { EnvironmentBackdrop } from './EnvironmentBackdrop';

interface StudioLightingProps {
  floorY?: number;
  bgColor?: string;
  theme?: 'intro' | 'globe' | 'dns' | 'packets' | 'routing' | 'server' | 'reassembly' | 'outro';
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  floorY = -3.1,
  bgColor = PALETTE.deepNavy,
  theme = 'intro',
}) => {
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[bgColor, 13, 34]} />

      {/* Three-Point Cinematic Lighting Setup */}
      {/* 1. Ambient / Hemisphere Base */}
      <hemisphereLight
        args={[PALETTE.cyanSoft, PALETTE.shadow, 0.78]}
        position={[0, 12, 0]}
      />

      {/* 2. Key Light from Upper-Left */}
      <directionalLight
        position={[-5.5, 9.2, 7.8]}
        intensity={1.7}
        color={PALETTE.whiteLight}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-bias={-0.0005}
      />

      {/* 3. Cool Rim / Back Light for Edge Separation */}
      <directionalLight
        position={[6.2, 5.8, -6.5]}
        intensity={1.05}
        color={PALETTE.cyan}
      />

      {/* Controlled Accent Fill from Lower Front */}
      <pointLight
        position={[2.4, -2.1, 4.8]}
        intensity={0.55}
        distance={14}
        color={PALETTE.electricBlue}
      />

      {/* Depth Environment & Atmospheric Particles */}
      <EnvironmentBackdrop theme={theme} />

      {/* Shadow Catcher Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, floorY, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <shadowMaterial transparent opacity={0.28} color={PALETTE.shadow} />
      </mesh>
    </>
  );
};
