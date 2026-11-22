import React from 'react';
import { PALETTE } from '../styles/palette';

interface SmartphoneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  screenFillProgress?: number; // 0..1 untuk Scene 07 reassembly
}

export const Smartphone: React.FC<SmartphoneProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  screenFillProgress = 1,
}) => {
  const clamped = Math.max(0, Math.min(1, screenFillProgress));

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Glossy Rounded Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.65, 3.15, 0.22]} />
        <meshStandardMaterial
          color={PALETTE.white}
          roughness={0.18}
          metalness={0.08}
        />
      </mesh>

      {/* Bezel Frame */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <boxGeometry args={[1.54, 3.02, 0.2]} />
        <meshStandardMaterial
          color={PALETTE.darkText}
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Glass Screen Base */}
      <mesh position={[0, 0, 0.125]}>
        <planeGeometry args={[1.4, 2.84]} />
        <meshStandardMaterial
          color={PALETTE.lightBlue}
          roughness={0.1}
          metalness={0.05}
        />
      </mesh>

      {/* Speaker Notch */}
      <mesh position={[0, 1.32, 0.132]}>
        <boxGeometry args={[0.38, 0.05, 0.01]} />
        <meshStandardMaterial color={PALETTE.shadow} roughness={0.4} />
      </mesh>

      {/* Modular Webpage UI Blocks on Screen */}
      {clamped > 0.1 && (
        <mesh position={[0, 0.92, 0.133]} scale={[Math.min(1, clamped * 1.4), 1, 1]}>
          <boxGeometry args={[1.18, 0.34, 0.015]} />
          <meshStandardMaterial color={PALETTE.cyan} roughness={0.25} />
        </mesh>
      )}

      {clamped > 0.35 && (
        <mesh position={[0, 0.24, 0.133]} scale={[Math.min(1, (clamped - 0.25) * 1.5), 1, 1]}>
          <boxGeometry args={[1.18, 0.82, 0.015]} />
          <meshStandardMaterial color={PALETTE.yellow} roughness={0.25} />
        </mesh>
      )}

      {clamped > 0.6 && (
        <>
          <mesh position={[-0.31, -0.52, 0.133]}>
            <boxGeometry args={[0.56, 0.44, 0.015]} />
            <meshStandardMaterial color={PALETTE.turquoise} roughness={0.25} />
          </mesh>
          <mesh position={[0.31, -0.52, 0.133]}>
            <boxGeometry args={[0.56, 0.44, 0.015]} />
            <meshStandardMaterial color={PALETTE.magenta} roughness={0.25} />
          </mesh>
        </>
      )}

      {clamped > 0.82 && (
        <mesh position={[0, -1.04, 0.133]}>
          <boxGeometry args={[1.18, 0.36, 0.015]} />
          <meshStandardMaterial color={PALETTE.shadow} roughness={0.25} />
        </mesh>
      )}
    </group>
  );
};
