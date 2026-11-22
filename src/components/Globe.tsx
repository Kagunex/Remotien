import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';

interface GlobeProps {
  position?: [number, number, number];
  scale?: number;
  nodeProgress?: number; // 0..1
}

const NODE_POSITIONS: Array<[number, number, number]> = [
  [0.9, 0.85, 0.78],
  [-0.85, 0.9, 0.78],
  [0.2, 1.35, 0.45],
  [1.22, -0.35, 0.68],
  [-1.18, -0.42, 0.72],
  [0.05, -0.92, 1.12],
  [0.75, 0.25, -1.18],
  [-0.78, 0.45, -1.12],
];

export const Globe: React.FC<GlobeProps> = ({
  position = [0, 0, 0],
  scale = 1,
  nodeProgress = 1,
}) => {
  const frame = useCurrentFrame();
  const rotY = frame * 0.014;

  return (
    <group position={position} rotation={[0.18, rotY, 0]} scale={scale}>
      {/* Main Glossy Ocean Sphere */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.45, 48, 48]} />
        <meshStandardMaterial
          color={PALETTE.cyan}
          roughness={0.22}
          metalness={0.06}
        />
      </mesh>

      {/* Latitude / Longitude Stylised Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.47, 0.02, 16, 64]} />
        <meshStandardMaterial color={PALETTE.lightBlue} roughness={0.2} />
      </mesh>
      <mesh rotation={[0, 0.6, 0]}>
        <torusGeometry args={[1.47, 0.02, 16, 64]} />
        <meshStandardMaterial color={PALETTE.lightBlue} roughness={0.2} />
      </mesh>

      {/* Stylized Clay Continents (Geometric Clusters) */}
      <mesh position={[0.62, 0.55, 1.12]} rotation={[0.4, 0.5, 0]}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshStandardMaterial color={PALETTE.turquoise} roughness={0.3} />
      </mesh>
      <mesh position={[-0.72, 0.48, 1.08]} rotation={[-0.3, -0.5, 0]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color={PALETTE.turquoise} roughness={0.3} />
      </mesh>
      <mesh position={[0.12, -0.58, 1.24]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color={PALETTE.turquoise} roughness={0.3} />
      </mesh>

      {/* Glowing Connection Nodes */}
      {NODE_POSITIONS.map((pos, idx) => {
        const threshold = idx / NODE_POSITIONS.length;
        const active = nodeProgress >= threshold;
        const nodeScale = active ? 1 : 0.001;
        return (
          <mesh key={idx} position={pos} scale={nodeScale}>
            <sphereGeometry args={[0.11, 20, 20]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? PALETTE.yellow : PALETTE.magenta}
              emissive={idx % 2 === 0 ? PALETTE.yellow : PALETTE.magenta}
              emissiveIntensity={0.65}
              roughness={0.18}
            />
          </mesh>
        );
      })}
    </group>
  );
};
