import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';
import { getProceduralPbrMaps } from '../utils/pbrTextures';

interface GlobeProps {
  position?: [number, number, number];
  scale?: number;
  nodeProgress?: number; // 0..1
}

const NODE_POSITIONS: Array<[number, number, number]> = [
  [0.92, 0.85, 0.76],
  [-0.86, 0.9, 0.76],
  [0.2, 1.35, 0.45],
  [1.22, -0.35, 0.68],
  [-1.18, -0.42, 0.72],
  [0.05, -0.92, 1.12],
  [0.75, 0.25, -1.18],
  [-0.78, 0.45, -1.12],
];

const CONTINENT_CLUSTERS: Array<{ pos: [number, number, number]; scale: [number, number, number]; rot: [number, number, number] }> = [
  { pos: [0.64, 0.56, 1.12], scale: [1.15, 0.85, 0.65], rot: [0.4, 0.5, 0.2] },
  { pos: [-0.74, 0.52, 1.06], scale: [1.1, 0.95, 0.65], rot: [-0.3, -0.5, -0.1] },
  { pos: [-0.58, -0.35, 1.2], scale: [0.78, 1.05, 0.6], rot: [0.2, -0.4, 0.3] },
  { pos: [0.16, -0.62, 1.22], scale: [0.95, 0.75, 0.6], rot: [-0.2, 0.1, 0.2] },
  { pos: [0.72, 0.35, -1.18], scale: [1.1, 0.9, 0.6], rot: [0.3, 2.5, 0] },
  { pos: [-0.65, 0.25, -1.22], scale: [1.0, 0.85, 0.6], rot: [-0.2, -2.4, 0] },
];

export const Globe: React.FC<GlobeProps> = ({
  position = [0, 0, 0],
  scale = 1,
  nodeProgress = 1,
}) => {
  const frame = useCurrentFrame();
  const rotY = frame * 0.014;

  const materials = useMemo(() => {
    const oceanMaps = getProceduralPbrMaps('glass-micro');
    const landMaps = getProceduralPbrMaps('carbon-tech');

    return {
      ocean: new THREE.MeshStandardMaterial({
        color: PALETTE.electricBlue,
        map: oceanMaps.map,
        roughnessMap: oceanMaps.roughnessMap,
        bumpMap: oceanMaps.bumpMap,
        bumpScale: 0.005,
        roughness: 0.18,
        metalness: 0.28,
      }),
      continent: new THREE.MeshStandardMaterial({
        color: PALETTE.cyan,
        map: landMaps.map,
        roughnessMap: landMaps.roughnessMap,
        bumpMap: landMaps.bumpMap,
        bumpScale: 0.01,
        roughness: 0.28,
        metalness: 0.22,
      }),
      gridRing: new THREE.MeshStandardMaterial({
        color: PALETTE.cyanSoft,
        emissive: PALETTE.cyan,
        emissiveIntensity: 0.28,
        roughness: 0.2,
        transparent: true,
        opacity: 0.62,
      }),
      atmosphere: new THREE.MeshStandardMaterial({
        color: PALETTE.cyan,
        emissive: PALETTE.electricBlue,
        emissiveIntensity: 0.24,
        transparent: true,
        opacity: 0.14,
        roughness: 0.1,
      }),
    };
  }, []);

  return (
    <group position={position} rotation={[0.16, rotY, 0]} scale={scale}>
      <mesh material={materials.ocean} castShadow receiveShadow>
        <sphereGeometry args={[1.45, 48, 48]} />
      </mesh>

      <mesh material={materials.atmosphere}>
        <sphereGeometry args={[1.56, 36, 36]} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.gridRing}>
        <torusGeometry args={[1.48, 0.016, 12, 64]} />
      </mesh>
      <mesh rotation={[0, 0.5, 0]} material={materials.gridRing}>
        <torusGeometry args={[1.48, 0.016, 12, 64]} />
      </mesh>
      <mesh rotation={[0, -0.8, 0.35]} material={materials.gridRing}>
        <torusGeometry args={[1.48, 0.014, 12, 64]} />
      </mesh>

      {CONTINENT_CLUSTERS.map((c, idx) => (
        <mesh
          key={idx}
          position={c.pos}
          rotation={c.rot}
          scale={c.scale}
          material={materials.continent}
          castShadow
        >
          <icosahedronGeometry args={[0.42, 2]} />
        </mesh>
      ))}

      {NODE_POSITIONS.map((pos, idx) => {
        const threshold = idx / NODE_POSITIONS.length;
        const active = nodeProgress >= threshold;
        const pulse = active ? 1 + 0.16 * Math.sin(frame * 0.2 + idx) : 0.001;
        const color = idx % 2 === 0 ? PALETTE.cyan : PALETTE.whiteLight;

        return (
          <group key={idx} position={pos} scale={pulse}>
            <mesh>
              <sphereGeometry args={[0.105, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                roughness={0.18}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.165, 14, 14]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.35}
                transparent
                opacity={0.32}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
