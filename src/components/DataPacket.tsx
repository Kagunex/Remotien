import React from 'react';
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
  size = 0.36,
  spinSpeed = 0.04,
  glow = true,
}) => {
  const frame = useCurrentFrame();

  return (
    <group
      position={position}
      rotation={[frame * spinSpeed, frame * spinSpeed * 1.2, 0]}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          roughness={0.22}
          metalness={0.08}
          emissive={glow ? color : '#000000'}
          emissiveIntensity={glow ? 0.18 : 0}
        />
      </mesh>
      {/* Inner core highlight */}
      <mesh>
        <boxGeometry args={[size * 0.52, size * 0.52, size * 0.52]} />
        <meshStandardMaterial
          color={PALETTE.white}
          roughness={0.15}
          emissive={PALETTE.white}
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
};
