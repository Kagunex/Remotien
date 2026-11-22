import React from 'react';
import { PALETTE } from '../styles/palette';

interface DNSCardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: 'domain' | 'ip' | 'book';
}

export const DNSCard: React.FC<DNSCardProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  variant = 'domain',
}) => {
  if (variant === 'book') {
    return (
      <group position={position} rotation={rotation} scale={scale}>
        {/* Left Cover */}
        <mesh position={[-0.78, 0, 0]} rotation={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.45, 2.05, 0.16]} />
          <meshStandardMaterial color={PALETTE.shadow} roughness={0.25} />
        </mesh>
        {/* Right Cover */}
        <mesh position={[0.78, 0, 0]} rotation={[0, -0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.45, 2.05, 0.16]} />
          <meshStandardMaterial color={PALETTE.shadow} roughness={0.25} />
        </mesh>
        {/* Left & Right Pages */}
        <mesh position={[-0.72, 0, 0.11]} rotation={[0, 0.22, 0]}>
          <boxGeometry args={[1.32, 1.88, 0.1]} />
          <meshStandardMaterial color={PALETTE.white} roughness={0.3} />
        </mesh>
        <mesh position={[0.72, 0, 0.11]} rotation={[0, -0.22, 0]}>
          <boxGeometry args={[1.32, 1.88, 0.1]} />
          <meshStandardMaterial color={PALETTE.lightBlue} roughness={0.3} />
        </mesh>
        {/* Spine */}
        <mesh position={[0, 0, -0.04]}>
          <cylinderGeometry args={[0.14, 0.14, 2.06, 20]} />
          <meshStandardMaterial color={PALETTE.yellow} roughness={0.22} />
        </mesh>
      </group>
    );
  }

  const cardColor = variant === 'domain' ? PALETTE.cyan : PALETTE.turquoise;
  const badgeColor = variant === 'domain' ? PALETTE.yellow : PALETTE.magenta;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.95, 0.82, 0.14]} />
        <meshStandardMaterial color={PALETTE.white} roughness={0.2} />
      </mesh>
      <mesh position={[-0.64, 0, 0.08]}>
        <boxGeometry args={[0.42, 0.48, 0.04]} />
        <meshStandardMaterial color={badgeColor} roughness={0.22} />
      </mesh>
      <mesh position={[0.25, 0.11, 0.08]}>
        <boxGeometry args={[1.05, 0.16, 0.03]} />
        <meshStandardMaterial color={cardColor} roughness={0.25} />
      </mesh>
      <mesh position={[0.12, -0.14, 0.08]}>
        <boxGeometry args={[0.78, 0.12, 0.03]} />
        <meshStandardMaterial color={PALETTE.darkText} roughness={0.35} />
      </mesh>
    </group>
  );
};
