import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';

interface RouterProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  pulseActive?: boolean;
}

export const Router: React.FC<RouterProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  pulseActive = true,
}) => {
  const frame = useCurrentFrame();
  const ledColors = [PALETTE.turquoise, PALETTE.cyan, PALETTE.yellow, PALETTE.magenta];

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Rounded Router Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.56, 1.35]} />
        <meshStandardMaterial
          color={PALETTE.white}
          roughness={0.2}
          metalness={0.08}
        />
      </mesh>

      {/* Top Accent Plate */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.92, 0.08, 1.18]} />
        <meshStandardMaterial color={PALETTE.lightBlue} roughness={0.25} />
      </mesh>

      {/* Left & Right Antennas */}
      {[-0.68, 0.68].map((xPos, idx) => (
        <group key={idx} position={[xPos, 0.78, -0.35]} rotation={[0, 0, idx === 0 ? 0.14 : -0.14]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.055, 0.08, 1.15, 20]} />
            <meshStandardMaterial color={PALETTE.darkText} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <sphereGeometry args={[0.085, 16, 16]} />
            <meshStandardMaterial
              color={PALETTE.cyan}
              emissive={PALETTE.cyan}
              emissiveIntensity={0.45}
            />
          </mesh>
        </group>
      ))}

      {/* Front Indicator Lights */}
      {ledColors.map((color, idx) => {
        const blink = pulseActive ? 0.45 + 0.45 * Math.sin(frame * 0.25 + idx * 1.1) : 0.2;
        return (
          <mesh key={idx} position={[-0.54 + idx * 0.36, 0.02, 0.69]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={blink}
            />
          </mesh>
        );
      })}
    </group>
  );
};
