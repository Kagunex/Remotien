import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';
import { getProceduralPbrMaps } from '../utils/pbrTextures';

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
  const bladeColors = [PALETTE.cyan, PALETTE.electricBlue, PALETTE.cyanSoft, PALETTE.whiteLight];

  const materials = useMemo(() => {
    const carbonMaps = getProceduralPbrMaps('carbon-tech');
    const metalMaps = getProceduralPbrMaps('brushed-metal');

    return {
      cabinet: new THREE.MeshStandardMaterial({
        color: PALETTE.slateDark,
        map: carbonMaps.map,
        roughnessMap: carbonMaps.roughnessMap,
        bumpMap: carbonMaps.bumpMap,
        bumpScale: 0.008,
        aoMap: carbonMaps.aoMap,
        roughness: 0.3,
        metalness: 0.72,
      }),
      steelTrim: new THREE.MeshStandardMaterial({
        color: PALETTE.metalSilver,
        map: metalMaps.map,
        roughnessMap: metalMaps.roughnessMap,
        bumpMap: metalMaps.bumpMap,
        bumpScale: 0.006,
        roughness: 0.22,
        metalness: 0.85,
      }),
      bladeFace: new THREE.MeshStandardMaterial({
        color: PALETTE.navyElevated,
        map: metalMaps.map,
        roughnessMap: metalMaps.roughnessMap,
        roughness: 0.24,
        metalness: 0.55,
      }),
      ventDark: new THREE.MeshStandardMaterial({
        color: '#060B18',
        roughness: 0.42,
        metalness: 0.6,
      }),
    };
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main Heavy-Duty Steel Cabinet */}
      <mesh material={materials.cabinet} castShadow receiveShadow>
        <boxGeometry args={[1.95, 3.15, 1.55]} />
      </mesh>

      {/* Top Exhaust & Metallic Cap */}
      <mesh position={[0, 1.62, 0]} material={materials.steelTrim} castShadow>
        <boxGeometry args={[2.04, 0.12, 1.64]} />
      </mesh>

      {/* Heavy Stabilizer Base Feet */}
      {[-0.78, 0.78].map((x, idx) => (
        <mesh key={idx} position={[x, -1.64, 0]} material={materials.steelTrim}>
          <boxGeometry args={[0.26, 0.14, 1.68]} />
        </mesh>
      ))}

      {/* Vertical Rack Mounting Rails */}
      {[-0.86, 0.86].map((x, idx) => (
        <mesh key={idx} position={[x, 0, 0.78]} material={materials.steelTrim}>
          <boxGeometry args={[0.09, 2.92, 0.05]} />
        </mesh>
      ))}

      {/* 4 Hot-Swappable Server Blades */}
      {[0, 1, 2, 3].map((slot) => {
        const yPos = 0.98 - slot * 0.64;
        const isLit = slot < activeLeds;
        const pulse = processing
          ? 0.5 + 0.5 * Math.sin(frame * 0.38 + slot * 1.45)
          : isLit
            ? 0.88
            : 0.08;

        return (
          <group key={slot} position={[0, yPos, 0.78]}>
            <mesh material={materials.bladeFace}>
              <boxGeometry args={[1.62, 0.48, 0.08]} />
            </mesh>

            <mesh position={[-0.74, 0, 0.055]} material={materials.steelTrim}>
              <boxGeometry args={[0.05, 0.36, 0.04]} />
            </mesh>
            <mesh position={[0.74, 0, 0.055]} material={materials.steelTrim}>
              <boxGeometry args={[0.05, 0.36, 0.04]} />
            </mesh>

            {[-0.12, 0.12, 0.36, 0.56].map((vx, vIdx) => (
              <mesh key={vIdx} position={[vx, 0, 0.045]} material={materials.ventDark}>
                <boxGeometry args={[0.16, 0.32, 0.02]} />
              </mesh>
            ))}

            <mesh position={[-0.56, 0.08, 0.05]}>
              <sphereGeometry args={[0.058, 14, 14]} />
              <meshStandardMaterial
                color={bladeColors[slot]}
                emissive={bladeColors[slot]}
                emissiveIntensity={pulse}
              />
            </mesh>

            <mesh position={[-0.42, 0.08, 0.05]}>
              <sphereGeometry args={[0.042, 12, 12]} />
              <meshStandardMaterial
                color={PALETTE.cyan}
                emissive={PALETTE.cyan}
                emissiveIntensity={processing ? 0.3 + 0.7 * Math.cos(frame * 0.55 + slot) : 0.28}
              />
            </mesh>

            {[-0.56, -0.42].map((px, pIdx) => (
              <mesh key={pIdx} position={[px, -0.1, 0.046]} material={materials.ventDark}>
                <boxGeometry args={[0.09, 0.08, 0.02]} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
};
