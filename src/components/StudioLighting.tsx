import React from 'react';
import { PALETTE } from '../styles/palette';

export const StudioLighting: React.FC = () => {
  return (
    <>
      <color attach="background" args={[PALETTE.lavender]} />
      <fog attach="fog" args={[PALETTE.lavender, 14, 34]} />

      {/* Ambient fill lembut */}
      <hemisphereLight
        args={[PALETTE.white, PALETTE.shadow, 0.95]}
        position={[0, 10, 0]}
      />

      {/* Key Light dari atas kiri sesuai aturan visual */}
      <directionalLight
        position={[-6, 9, 7]}
        intensity={1.55}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
      />

      {/* Rim Light lembut untuk memberi separasi glossy plastic/clay */}
      <directionalLight
        position={[6, 5, -5]}
        intensity={0.55}
        color={PALETTE.lightBlue}
      />

      {/* Studio Shadow Catcher Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.35, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <shadowMaterial transparent opacity={0.14} color={PALETTE.shadow} />
      </mesh>
    </>
  );
};
