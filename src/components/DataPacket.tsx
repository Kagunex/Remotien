import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';

interface DataPacketProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
  spinSpeed?: number;
  glow?: boolean;
}

export const DataPacket: React.FC<DataPacketProps> = ({
  position = [0, 0, 0],
  color = PALETTE.cyan,
  size = 0.38,
  spinSpeed = 0.04,
  glow = true,
}) => {
  const frame = useCurrentFrame();

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: PALETTE.slateDark,
        roughness: 0.25,
        metalness: 0.7,
      }),
    []
  );

  return (
    <group
      position={position}
      rotation={[frame * spinSpeed, frame * spinSpeed * 1.25, frame * spinSpeed * 0.4]}
    >
      {/* Translucent Payload Cube */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          roughness={0.18}
          metalness={0.15}
          emissive={glow ? color : '#000000'}
          emissiveIntensity={glow ? 0.28 : 0}
        />
      </mesh>

      {/* TCP/IP Header Collar Band */}
      <mesh position={[0, size * 0.34, 0]} material={frameMat}>
        <boxGeometry args={[size * 1.06, size * 0.16, size * 1.06]} />
      </mesh>

      {/* Glowing Data Core */}
      <mesh>
        <octahedronGeometry args={[size * 0.32, 0]} />
        <meshStandardMaterial
          color={PALETTE.white}
          roughness={0.1}
          emissive={PALETTE.white}
          emissiveIntensity={0.55}
        />
      </mesh>
    </group>
  );
};
