import React, { useMemo } from 'react';
import { PALETTE } from '../styles/palette';
import { getProceduralPbrMaps } from '../utils/pbrTextures';

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
  const metalMaps = useMemo(() => getProceduralPbrMaps('brushed-metal'), []);

  if (variant === 'book') {
    return (
      <group position={position} rotation={rotation} scale={scale}>
        <mesh position={[-0.78, 0, 0]} rotation={[0, 0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.45, 2.05, 0.16]} />
          <meshStandardMaterial
            color={PALETTE.navyElevated}
            map={metalMaps.map}
            roughnessMap={metalMaps.roughnessMap}
            roughness={0.25}
            metalness={0.65}
          />
        </mesh>
        <mesh position={[0.78, 0, 0]} rotation={[0, -0.22, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.45, 2.05, 0.16]} />
          <meshStandardMaterial
            color={PALETTE.navyElevated}
            map={metalMaps.map}
            roughnessMap={metalMaps.roughnessMap}
            roughness={0.25}
            metalness={0.65}
          />
        </mesh>
        <mesh position={[-0.72, 0, 0.11]} rotation={[0, 0.22, 0]}>
          <boxGeometry args={[1.32, 1.88, 0.1]} />
          <meshStandardMaterial color={PALETTE.whiteLight} roughness={0.28} />
        </mesh>
        <mesh position={[0.72, 0, 0.11]} rotation={[0, -0.22, 0]}>
          <boxGeometry args={[1.32, 1.88, 0.1]} />
          <meshStandardMaterial color={PALETTE.lightBlue} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0, -0.04]}>
          <cylinderGeometry args={[0.14, 0.14, 2.06, 20]} />
          <meshStandardMaterial color={PALETTE.cyan} emissive={PALETTE.cyan} emissiveIntensity={0.25} roughness={0.22} metalness={0.7} />
        </mesh>
      </group>
    );
  }

  const cardColor = variant === 'domain' ? PALETTE.cyan : PALETTE.electricBlue;
  const badgeColor = variant === 'domain' ? PALETTE.whiteLight : PALETTE.cyanSoft;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.95, 0.82, 0.14]} />
        <meshStandardMaterial color={PALETTE.navyElevated} roughness={0.22} metalness={0.55} />
      </mesh>
      <mesh position={[-0.64, 0, 0.08]}>
        <boxGeometry args={[0.42, 0.48, 0.04]} />
        <meshStandardMaterial color={badgeColor} emissive={badgeColor} emissiveIntensity={0.22} roughness={0.2} />
      </mesh>
      <mesh position={[0.25, 0.11, 0.08]}>
        <boxGeometry args={[1.05, 0.16, 0.03]} />
        <meshStandardMaterial color={cardColor} emissive={cardColor} emissiveIntensity={0.32} roughness={0.22} />
      </mesh>
      <mesh position={[0.12, -0.14, 0.08]}>
        <boxGeometry args={[0.78, 0.12, 0.03]} />
        <meshStandardMaterial color={PALETTE.lightBlue} roughness={0.3} />
      </mesh>
    </group>
  );
};
