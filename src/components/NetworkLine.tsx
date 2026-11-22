import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useCurrentFrame } from 'remotion';
import { PALETTE } from '../styles/palette';

interface NetworkLineProps {
  start: [number, number, number];
  end: [number, number, number];
  arcHeight?: number;
  progress?: number; // 0..1
  color?: string;
  radius?: number;
  showPulse?: boolean;
}

export const NetworkLine: React.FC<NetworkLineProps> = ({
  start,
  end,
  arcHeight = 0.9,
  progress = 1,
  color = PALETTE.lightBlue,
  radius = 0.032,
  showPulse = true,
}) => {
  const frame = useCurrentFrame();
  const clamped = Math.max(0.01, Math.min(1, progress));

  const { geometry, pulsePos } = useMemo(() => {
    const p0 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(p0, p2).multiplyScalar(0.5);
    mid.y += arcHeight;

    const fullCurve = new THREE.QuadraticBezierCurve3(p0, mid, p2);
    const sampleCount = Math.max(4, Math.floor(32 * clamped));
    const pts = fullCurve.getPoints(32).slice(0, sampleCount + 1);
    const partialCurve = new THREE.CatmullRomCurve3(pts);
    const geom = new THREE.TubeGeometry(partialCurve, Math.max(6, sampleCount), radius, 10, false);

    const pulseT = ((frame * 0.025) % 1) * clamped;
    const pVec = fullCurve.getPoint(Math.max(0, Math.min(1, pulseT)));

    return {
      geometry: geom,
      pulsePos: [pVec.x, pVec.y, pVec.z] as [number, number, number],
    };
  }, [start, end, arcHeight, clamped, radius, frame]);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          roughness={0.2}
        />
      </mesh>
      {showPulse && clamped > 0.2 && (
        <mesh position={pulsePos}>
          <sphereGeometry args={[radius * 2.1, 12, 12]} />
          <meshStandardMaterial
            color={PALETTE.white}
            emissive={color}
            emissiveIntensity={1.1}
            roughness={0.1}
          />
        </mesh>
      )}
    </group>
  );
};
