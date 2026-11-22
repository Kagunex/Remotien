import React from 'react';
import { useCurrentFrame } from 'remotion';

interface FloatingObjectProps {
  children: React.ReactNode;
  amplitude?: number;
  speed?: number;
  phase?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const FloatingObject: React.FC<FloatingObjectProps> = ({
  children,
  amplitude = 0.14,
  speed = 0.06,
  phase = 0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const bobY = Math.sin(frame * speed + phase) * amplitude;
  const tiltZ = Math.cos(frame * speed * 0.8 + phase) * 0.03;

  return (
    <group
      position={[position[0], position[1] + bobY, position[2]]}
      rotation={[rotation[0], rotation[1], rotation[2] + tiltZ]}
      scale={scale}
    >
      {children}
    </group>
  );
};
