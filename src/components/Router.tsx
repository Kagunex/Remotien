import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';
import { getProceduralPbrMaps } from '../utils/pbrTextures';

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
  const ledColors = [PALETTE.cyan, PALETTE.electricBlue, PALETTE.cyanSoft, PALETTE.whiteLight, PALETTE.cyan];

  const materials = useMemo(() => {
    const glassMaps = getProceduralPbrMaps('glass-micro');
    const carbonMaps = getProceduralPbrMaps('carbon-tech');
    const metalMaps = getProceduralPbrMaps('brushed-metal');

    return {
      shell: new THREE.MeshStandardMaterial({
        color: PALETTE.navyElevated,
        map: glassMaps.map,
        roughnessMap: glassMaps.roughnessMap,
        bumpMap: glassMaps.bumpMap,
        bumpScale: 0.005,
        roughness: 0.2,
        metalness: 0.35,
      }),
      darkTrim: new THREE.MeshStandardMaterial({
        color: PALETTE.slateDark,
        map: carbonMaps.map,
        roughnessMap: carbonMaps.roughnessMap,
        bumpMap: carbonMaps.bumpMap,
        bumpScale: 0.008,
        roughness: 0.32,
        metalness: 0.55,
      }),
      metallicAccent: new THREE.MeshStandardMaterial({
        color: PALETTE.metalSilver,
        map: metalMaps.map,
        roughnessMap: metalMaps.roughnessMap,
        bumpMap: metalMaps.bumpMap,
        bumpScale: 0.006,
        roughness: 0.22,
        metalness: 0.85,
      }),
      portGold: new THREE.MeshStandardMaterial({
        color: PALETTE.copperGold,
        roughness: 0.24,
        metalness: 0.88,
      }),
    };
  }, []);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main Router Chassis */}
      <mesh material={materials.shell} castShadow receiveShadow>
        <boxGeometry args={[2.25, 0.54, 1.45]} />
      </mesh>

      {/* Recessed Mid-Band Trim */}
      <mesh position={[0, -0.04, 0]} material={materials.darkTrim}>
        <boxGeometry args={[2.28, 0.14, 1.48]} />
      </mesh>

      {/* Top Cooling Ventilation Louvers */}
      {[-0.55, -0.28, 0, 0.28, 0.55].map((x, idx) => (
        <mesh key={idx} position={[x, 0.28, -0.1]} material={materials.darkTrim}>
          <boxGeometry args={[0.14, 0.03, 0.82]} />
        </mesh>
      ))}

      {/* Metallic Front Status Bar */}
      <mesh position={[0, -0.04, 0.745]} material={materials.metallicAccent}>
        <boxGeometry args={[1.85, 0.12, 0.02]} />
      </mesh>

      {/* 5 Front Status LEDs (Power, WAN, LAN1, LAN2, Wi-Fi) */}
      {ledColors.map((color, idx) => {
        const blink = pulseActive
          ? 0.45 + 0.55 * Math.sin(frame * 0.28 + idx * 1.15)
          : 0.2;
        return (
          <mesh key={idx} position={[-0.64 + idx * 0.32, -0.04, 0.76]}>
            <sphereGeometry args={[0.052, 14, 14]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={blink}
            />
          </mesh>
        );
      })}

      {/* 4 Rear/Side RJ45 Ethernet Ports with Gold Pins */}
      {[-0.54, -0.18, 0.18, 0.54].map((x, idx) => (
        <group key={idx} position={[x, 0.06, -0.73]}>
          <mesh material={materials.darkTrim}>
            <boxGeometry args={[0.24, 0.2, 0.04]} />
          </mesh>
          <mesh position={[0, -0.04, -0.015]} material={materials.portGold}>
            <boxGeometry args={[0.16, 0.04, 0.02]} />
          </mesh>
        </group>
      ))}

      {/* 3 High-Gain Articulated Antennas */}
      {[
        { x: -0.82, tiltZ: 0.16 },
        { x: 0, tiltZ: 0 },
        { x: 0.82, tiltZ: -0.16 },
      ].map((ant, idx) => (
        <group
          key={idx}
          position={[ant.x, 0.26, -0.46]}
          rotation={[-0.12, 0, ant.tiltZ]}
        >
          <mesh position={[0, 0.08, 0]} material={materials.metallicAccent}>
            <cylinderGeometry args={[0.09, 0.1, 0.16, 16]} />
          </mesh>
          <mesh position={[0, 0.72, 0]} material={materials.darkTrim} castShadow>
            <cylinderGeometry args={[0.048, 0.075, 1.22, 18]} />
          </mesh>
          <mesh position={[0, 1.36, 0]}>
            <sphereGeometry args={[0.072, 16, 16]} />
            <meshStandardMaterial
              color={PALETTE.cyan}
              emissive={PALETTE.cyan}
              emissiveIntensity={0.68}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};
