import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';

interface ServerRackProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  activeLeds?: number; // 0..4
  processing?: boolean;
}

export const ServerRack: React.FC<ServerRackProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  activeLeds = 4,
  processing = false,
}) => {
  const frame = useCurrentFrame();
  const bladeColors = [PALETTE.cyan, PALETTE.turquoise, PALETTE.yellow, PALETTE.magenta];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main Modular Tower Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.85, 2.95, 1.45]} />
        <meshStandardMaterial
          color={PALETTE.darkText}
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Top Glossy Cap */}
      <mesh position={[0, 1.52, 0]} castShadow>
        <boxGeometry args={[1.92, 0.12, 1.52]} />
        <meshStandardMaterial color={PALETTE.white} roughness={0.2} />
      </mesh>

      {/* 4 Modular Server Blades */}
      {[0, 1, 2, 3].map((slot) => {
        const yPos = 0.92 - slot * 0.62;
        const isLit = slot < activeLeds;
        const pulse = processing
          ? 0.5 + 0.5 * Math.sin(frame * 0.35 + slot * 1.4)
          : isLit
            ? 0.85
            : 0.05;

        return (
          <group key={slot} position={[0, yPos, 0.74]}>
            {/* Blade Faceplate */}
            <mesh>
              <boxGeometry args={[1.56, 0.44, 0.08]} />
              <meshStandardMaterial color={PALETTE.white} roughness={0.22} />
            </mesh>

            {/* Ventilation Bar */}
            <mesh position={[0.25, 0, 0.045]}>
              <boxGeometry args={[0.78, 0.14, 0.02]} />
              <meshStandardMaterial color={PALETTE.lightBlue} roughness={0.35} />
            </mesh>

            {/* Status LED */}
            <mesh position={[-0.54, 0, 0.05]}>
              <sphereGeometry args={[0.085, 16, 16]} />
              <meshStandardMaterial
                color={bladeColors[slot]}
                emissive={bladeColors[slot]}
                emissiveIntensity={pulse}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
