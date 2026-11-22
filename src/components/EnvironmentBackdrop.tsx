import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';
import { seededRandom } from '../styles/animation';
import { getProceduralPbrMaps } from '../utils/pbrTextures';

interface EnvironmentBackdropProps {
  theme?: 'intro' | 'globe' | 'dns' | 'packets' | 'routing' | 'server' | 'reassembly' | 'outro';
  intensity?: number;
}

export const EnvironmentBackdrop: React.FC<EnvironmentBackdropProps> = ({
  theme = 'intro',
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const floorMaps = useMemo(() => getProceduralPbrMaps('floor-grid'), []);

  const particles = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => {
      const x = (seededRandom(i * 11 + 1) - 0.5) * 16;
      const y = (seededRandom(i * 17 + 2) - 0.5) * 12;
      const z = -12 + seededRandom(i * 23 + 3) * 14;
      const r = 0.02 + seededRandom(i * 29 + 4) * 0.045;
      const speed = 0.008 + seededRandom(i * 31 + 5) * 0.016;
      const phase = seededRandom(i * 37 + 6) * Math.PI * 2;
      const isCyan = i % 3 !== 0;
      return { x, y, z, r, speed, phase, isCyan };
    });
  }, []);

  const ringCount = theme === 'globe' || theme === 'outro' ? 3 : 2;

  return (
    <group>
      {/* Background Structural Rings & Depth Pillars */}
      {Array.from({ length: ringCount }, (_, idx) => {
        const radius = 5.2 + idx * 2.1;
        const zPos = -7.5 - idx * 3.5;
        const rotZ = frame * (0.002 + idx * 0.001) * (idx % 2 === 0 ? 1 : -1);
        return (
          <group key={idx} position={[0, 0.2, zPos]} rotation={[0.12, 0, rotZ]}>
            <mesh>
              <torusGeometry args={[radius, 0.022, 12, 72]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? PALETTE.electricBlue : PALETTE.cyan}
                emissive={idx % 2 === 0 ? PALETTE.electricBlue : PALETTE.cyan}
                emissiveIntensity={0.28 * intensity}
                roughness={0.3}
                metalness={0.6}
                transparent
                opacity={0.34}
              />
            </mesh>
          </group>
        );
      })}

      {/* Midground Depth Light Pillars */}
      {[-4.4, 4.4].map((xPos, idx) => {
        const driftY = Math.sin(frame * 0.015 + idx * 1.8) * 0.25;
        return (
          <mesh key={idx} position={[xPos, driftY, -5.8]}>
            <cylinderGeometry args={[0.04, 0.04, 14, 12]} />
            <meshStandardMaterial
              color={PALETTE.electricBlue}
              emissive={PALETTE.electricBlue}
              emissiveIntensity={0.24 * intensity}
              transparent
              opacity={0.25}
            />
          </mesh>
        );
      })}

      {/* Deterministic Atmospheric Data & Light Particles */}
      {particles.map((p, idx) => {
        const yOffset = ((frame * p.speed * 18 + p.y + 6) % 12) - 6;
        const xWobble = p.x + Math.sin(frame * 0.03 + p.phase) * 0.22;
        const col = p.isCyan ? PALETTE.cyan : PALETTE.electricBlue;
        return (
          <mesh key={idx} position={[xWobble, yOffset, p.z]}>
            <octahedronGeometry args={[p.r, 0]} />
            <meshStandardMaterial
              color={col}
              emissive={col}
              emissiveIntensity={0.55 * intensity}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Subtle PBR Grid Floor at Deep Studio Level */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.2, -3.5]}>
        <planeGeometry args={[48, 48]} />
        <meshStandardMaterial
          color={PALETTE.navyMid}
          map={floorMaps.map}
          roughnessMap={floorMaps.roughnessMap}
          bumpMap={floorMaps.bumpMap}
          bumpScale={0.015}
          aoMap={floorMaps.aoMap}
          roughness={0.45}
          metalness={0.55}
          transparent
          opacity={0.42}
        />
      </mesh>
    </group>
  );
};
