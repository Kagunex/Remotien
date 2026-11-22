import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';
import { getProceduralPbrMaps } from '../utils/pbrTextures';

interface CircuitBoardProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  active?: boolean;
}

export const CircuitBoard: React.FC<CircuitBoardProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  active = true,
}) => {
  const frame = useCurrentFrame();

  const materials = useMemo(() => {
    const pcbMaps = getProceduralPbrMaps('pcb-grid');
    const metalMaps = getProceduralPbrMaps('brushed-metal');

    return {
      pcb: new THREE.MeshStandardMaterial({
        color: PALETTE.pcbGreen,
        map: pcbMaps.map,
        roughnessMap: pcbMaps.roughnessMap,
        bumpMap: pcbMaps.bumpMap,
        bumpScale: 0.012,
        aoMap: pcbMaps.aoMap,
        roughness: 0.3,
        metalness: 0.35,
      }),
      chip: new THREE.MeshStandardMaterial({
        color: PALETTE.slateDark,
        roughness: 0.24,
        metalness: 0.65,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: PALETTE.copperGold,
        map: metalMaps.map,
        roughnessMap: metalMaps.roughnessMap,
        roughness: 0.2,
        metalness: 0.9,
      }),
      capacitor: new THREE.MeshStandardMaterial({
        color: PALETTE.metalSilver,
        map: metalMaps.map,
        roughnessMap: metalMaps.roughnessMap,
        roughness: 0.2,
        metalness: 0.86,
      }),
    };
  }, []);

  const pulse = active ? 0.55 + 0.45 * Math.sin(frame * 0.25) : 0.15;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={materials.pcb} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.1, 1.9]} />
      </mesh>

      <mesh position={[0, 0, 0.97]} material={materials.gold}>
        <boxGeometry args={[1.65, 0.06, 0.08]} />
      </mesh>

      <group position={[0, 0.1, 0]}>
        <mesh material={materials.chip} castShadow>
          <boxGeometry args={[0.78, 0.12, 0.78]} />
        </mesh>
        <mesh position={[0, 0.065, 0]} material={materials.gold}>
          <boxGeometry args={[0.42, 0.02, 0.42]} />
        </mesh>
        <mesh position={[0, 0.078, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.14, 0.19, 24]} />
          <meshStandardMaterial
            color={PALETTE.cyan}
            emissive={PALETTE.cyan}
            emissiveIntensity={pulse}
          />
        </mesh>
      </group>

      {[-0.65, -0.35, 0.35, 0.65].map((z, idx) => (
        <mesh key={idx} position={[0, 0.055, z]} material={materials.gold}>
          <boxGeometry args={[2.25, 0.015, 0.035]} />
        </mesh>
      ))}
      {[-0.85, 0.85].map((x, idx) => (
        <mesh key={idx} position={[x, 0.055, 0]} material={materials.gold}>
          <boxGeometry args={[0.035, 0.015, 1.55]} />
        </mesh>
      ))}

      {[
        [-0.95, 0.11, -0.52],
        [-0.95, 0.11, -0.22],
        [0.95, 0.11, -0.52],
        [0.95, 0.11, -0.22],
      ].map(([cx, cy, cz], idx) => (
        <mesh key={idx} position={[cx, cy, cz]} material={materials.capacitor}>
          <cylinderGeometry args={[0.08, 0.08, 0.16, 14]} />
        </mesh>
      ))}
    </group>
  );
};
