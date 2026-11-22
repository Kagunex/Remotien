import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import { WIDTH, HEIGHT } from '../styles/animation';

interface SceneCanvasProps {
  children: React.ReactNode;
  cameraFov?: number;
}

/**
 * Wrapper terpusat untuk ThreeCanvas dengan konfigurasi WebGL yang stabil
 * di Remotion Headless Chromium / GitHub Actions (SwiftShader / ANGLE).
 */
export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  children,
  cameraFov = 42,
}) => {
  return (
    <ThreeCanvas
      width={WIDTH}
      height={HEIGHT}
      dpr={[1, 1.5]}
      shadows="percentage"
      camera={{ fov: cameraFov, near: 0.1, far: 100, position: [0, 0.5, 8] }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'default',
        preserveDrawingBuffer: true,
        stencil: false,
        depth: true,
        failIfMajorPerformanceCaveat: false,
      }}
    >
      {children}
    </ThreeCanvas>
  );
};
