import React, { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from '../styles/palette';

interface NetworkLineProps {
  start: [number, number, number];
  end: [number, number, number];
  arcHeight?: number;
  progress?: number; // 0..1
  color?: string;
  radius?: number;
}

export const NetworkLine: React.FC<NetworkLineProps> = ({
  start,
  end,
  arcHeight = 0.9,
  progress = 1,
  color = PALETTE.lightBlue,
  radius = 0.032,
}) => {
  const clamped = Math.max(0.01, Math.min(1, progress));

  const geometry = useMemo(() => {
    const p0 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(p0, p2).multiplyScalar(0.5);
    mid.y += arcHeight;

    const fullCurve = new THREE.QuadraticBezierCurve3(p0, mid, p2);
    const sampleCount = Math.max(4, Math.floor(32 * clamped));
    const pts = fullCurve.getPoints(32).slice(0, sampleCount + 1);
    const partialCurve = new THREE.CatmullRomCurve3(pts);

    return new THREE.TubeGeometry(partialCurve, Math.max(6, sampleCount), radius, 10, false);
  }, [start, end, arcHeight, clamped, radius]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.45}
        roughness={0.2}
      />
    </mesh>
  );
};
