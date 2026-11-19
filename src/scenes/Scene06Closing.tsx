import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { PALETTE, VIDEO_SPECS } from '../constants/theme';
import { oceanFragmentShader, oceanVertexShader } from '../components/shaders/oceanShader';

const ClosingOceanMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color(PALETTE.deepOceanNavy) },
      uOceanColor: { value: new THREE.Color(PALETTE.oceanBlue) },
      uCyanGlow: { value: new THREE.Color(PALETTE.electricCyan) },
      uSoftBlue: { value: new THREE.Color(PALETTE.softBlue) },
    }),
    []
  );
  uniforms.uTime.value = time;

  const camY = interpolate(frame, [0, 180], [-1.2, 6.2], { extrapolateRight: 'clamp' });
  const camZ = interpolate(frame, [0, 180], [6.5, 15.5], { extrapolateRight: 'clamp' });

  return (
    <>
      <color attach="background" args={[PALETTE.deepOceanNavy]} />
      <fogExp2 attach="fog" args={[PALETTE.deepOceanNavy, 0.04]} />
      <ambientLight intensity={0.3} color={PALETTE.oceanBlue} />
      <pointLight position={[0, 1.5, 4.5]} intensity={3.5} distance={16} color={PALETTE.electricCyan} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -4]}>
        <planeGeometry args={[38, 34, 160, 160]} />
        <shaderMaterial
          vertexShader={oceanVertexShader}
          fragmentShader={oceanFragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>

      <group
        ref={(node) => {
          if (node) {
            node.parent?.children.forEach((child) => {
              if ((child as THREE.PerspectiveCamera).isPerspectiveCamera) {
                child.position.set(0, camY, camZ);
                child.lookAt(0, 0.4, 2.5);
              }
            });
          }
        }}
      />

      <EffectComposer>
        <Bloom luminanceThreshold={0.45} mipmapBlur intensity={1.2} />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </>
  );
};

export const Scene06Closing: React.FC = () => {
  const frame = useCurrentFrame();

  const line1Opacity = interpolate(frame, [55, 90], [0, 1], { extrapolateRight: 'clamp' });
  const line2Opacity = interpolate(frame, [105, 145], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOutBlack = interpolate(frame, [265, 300], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: PALETTE.deepOceanNavy }}>
      <ThreeCanvas width={VIDEO_SPECS.width} height={VIDEO_SPECS.height}>
        <ClosingOceanMesh />
      </ThreeCanvas>

      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: 64,
          right: 64,
          textAlign: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            color: PALETTE.white,
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          NATURE IS AMAZING.
        </div>
        <div
          style={{
            opacity: line2Opacity,
            color: PALETTE.electricCyan,
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            textShadow: '0 6px 32px rgba(32, 207, 255, 0.5)',
          }}
        >
          SCIENCE EXPLAINS WHY.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          opacity: fadeOutBlack,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
