import React, { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from '../styles/palette';
import { getProceduralPbrMaps } from '../utils/pbrTextures';

interface SmartphoneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  screenFillProgress?: number; // 0..1
}

export const Smartphone: React.FC<SmartphoneProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  screenFillProgress = 1,
}) => {
  const clamped = Math.max(0, Math.min(1, screenFillProgress));

  const materials = useMemo(() => {
    const metalMaps = getProceduralPbrMaps('brushed-metal');
    const glassMaps = getProceduralPbrMaps('glass-micro');
    const carbonMaps = getProceduralPbrMaps('carbon-tech');

    return {
      chassis: new THREE.MeshStandardMaterial({
        color: PALETTE.metalSilver,
        map: metalMaps.map,
        roughnessMap: metalMaps.roughnessMap,
        bumpMap: metalMaps.bumpMap,
        bumpScale: 0.008,
        aoMap: metalMaps.aoMap,
        roughness: 0.24,
        metalness: 0.82,
      }),
      backGlass: new THREE.MeshStandardMaterial({
        color: PALETTE.navyElevated,
        map: glassMaps.map,
        roughnessMap: glassMaps.roughnessMap,
        bumpMap: glassMaps.bumpMap,
        bumpScale: 0.004,
        roughness: 0.14,
        metalness: 0.25,
      }),
      bezel: new THREE.MeshStandardMaterial({
        color: PALETTE.slateDark,
        map: carbonMaps.map,
        roughnessMap: carbonMaps.roughnessMap,
        roughness: 0.24,
        metalness: 0.45,
      }),
      screenBase: new THREE.MeshStandardMaterial({
        color: '#071024',
        roughness: 0.08,
        metalness: 0.18,
      }),
      screenGlow: new THREE.MeshStandardMaterial({
        color: PALETTE.navyMid,
        emissive: PALETTE.electricBlue,
        emissiveIntensity: 0.22,
        roughness: 0.1,
      }),
      cameraLens: new THREE.MeshStandardMaterial({
        color: '#050914',
        roughness: 0.05,
        metalness: 0.9,
      }),
      accentRing: new THREE.MeshStandardMaterial({
        color: PALETTE.cyan,
        emissive: PALETTE.cyan,
        emissiveIntensity: 0.55,
        roughness: 0.18,
        metalness: 0.65,
      }),
    };
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Metallic Outer Frame */}
      <mesh material={materials.chassis} castShadow receiveShadow>
        <boxGeometry args={[1.68, 3.22, 0.2]} />
      </mesh>

      {/* Rear Frosted Glass Plate */}
      <mesh position={[0, 0, -0.02]} material={materials.backGlass}>
        <boxGeometry args={[1.58, 3.12, 0.18]} />
      </mesh>

      {/* Front Dark Bezel */}
      <mesh position={[0, 0, 0.02]} material={materials.bezel}>
        <boxGeometry args={[1.58, 3.12, 0.18]} />
      </mesh>

      {/* Active OLED Display Surface */}
      <mesh
        position={[0, 0, 0.114]}
        material={clamped > 0.05 ? materials.screenGlow : materials.screenBase}
      >
        <planeGeometry args={[1.44, 2.94]} />
      </mesh>

      {/* Dynamic Island / Speaker & Front Camera */}
      <mesh position={[0, 1.33, 0.12]} material={materials.bezel}>
        <boxGeometry args={[0.44, 0.085, 0.015]} />
      </mesh>
      <mesh position={[0.13, 1.33, 0.129]} rotation={[Math.PI / 2, 0, 0]} material={materials.cameraLens}>
        <cylinderGeometry args={[0.024, 0.024, 0.01, 16]} />
      </mesh>

      {/* Side Hardware Buttons (Volume Left & Power Right) */}
      <mesh position={[-0.86, 0.65, 0]} material={materials.chassis}>
        <boxGeometry args={[0.05, 0.28, 0.07]} />
      </mesh>
      <mesh position={[-0.86, 0.25, 0]} material={materials.chassis}>
        <boxGeometry args={[0.05, 0.28, 0.07]} />
      </mesh>
      <mesh position={[0.86, 0.48, 0]} material={materials.chassis}>
        <boxGeometry args={[0.05, 0.42, 0.07]} />
      </mesh>

      {/* Bottom USB-C Port & Speaker Grilles */}
      <mesh position={[0, -1.62, 0]} material={materials.bezel}>
        <boxGeometry args={[0.28, 0.03, 0.08]} />
      </mesh>
      {[-0.42, -0.32, 0.32, 0.42].map((x, idx) => (
        <mesh key={idx} position={[x, -1.62, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.bezel}>
          <cylinderGeometry args={[0.018, 0.018, 0.03, 10]} />
        </mesh>
      ))}

      {/* Rear Camera Bump (visible when rotated) */}
      <group position={[-0.36, 1.05, -0.12]}>
        <mesh material={materials.chassis}>
          <boxGeometry args={[0.62, 0.68, 0.06]} />
        </mesh>
        {[
          [-0.14, 0.15],
          [-0.14, -0.15],
          [0.14, 0],
        ].map(([lx, ly], idx) => (
          <group key={idx} position={[lx, ly, -0.035]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.accentRing}>
              <cylinderGeometry args={[0.11, 0.11, 0.03, 20]} />
            </mesh>
            <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]} material={materials.cameraLens}>
              <cylinderGeometry args={[0.075, 0.075, 0.025, 20]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Modular Webpage UI Blocks Reassembling on Screen */}
      {clamped > 0.08 && (
        <mesh
          position={[0, 0.96, 0.122]}
          scale={[Math.min(1, clamped * 1.45), 1, 1]}
        >
          <boxGeometry args={[1.24, 0.32, 0.016]} />
          <meshStandardMaterial color={PALETTE.cyan} emissive={PALETTE.cyan} emissiveIntensity={0.22} roughness={0.22} />
        </mesh>
      )}

      {clamped > 0.28 && (
        <mesh
          position={[0, 0.26, 0.122]}
          scale={[Math.min(1, (clamped - 0.22) * 1.45), 1, 1]}
        >
          <boxGeometry args={[1.24, 0.86, 0.016]} />
          <meshStandardMaterial color={PALETTE.electricBlue} emissive={PALETTE.electricBlue} emissiveIntensity={0.25} roughness={0.22} />
        </mesh>
      )}

      {clamped > 0.54 && (
        <>
          <mesh position={[-0.32, -0.52, 0.122]}>
            <boxGeometry args={[0.58, 0.48, 0.016]} />
            <meshStandardMaterial color={PALETTE.turquoise} emissive={PALETTE.turquoise} emissiveIntensity={0.2} roughness={0.22} />
          </mesh>
          <mesh position={[0.32, -0.52, 0.122]}>
            <boxGeometry args={[0.58, 0.48, 0.016]} />
            <meshStandardMaterial color={PALETTE.cyanSoft} emissive={PALETTE.cyanSoft} emissiveIntensity={0.2} roughness={0.22} />
          </mesh>
        </>
      )}

      {clamped > 0.78 && (
        <mesh position={[0, -1.06, 0.122]}>
          <boxGeometry args={[1.24, 0.38, 0.016]} />
          <meshStandardMaterial color={PALETTE.navyElevated} roughness={0.25} metalness={0.5} />
        </mesh>
      )}

      {/* Subtle Diagonal Glass Reflection Sheen */}
      <mesh position={[0.18, 0.35, 0.132]} rotation={[0, 0, -0.45]}>
        <planeGeometry args={[0.24, 2.3]} />
        <meshStandardMaterial
          color={PALETTE.whiteLight}
          transparent
          opacity={0.14}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
};
