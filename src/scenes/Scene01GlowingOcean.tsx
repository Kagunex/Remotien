import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { PALETTE, VIDEO_SPECS } from '../constants/theme';
import { oceanFragmentShader, oceanVertexShader } from '../components/shaders/oceanShader';
import { ScientificBadge } from '../components/ScientificBadge';

const CameraRig: React.FC<{ camY: number; camZ: number }> = ({ camY, camZ }) => {
  const frame = useCurrentFrame();
  return (
    <group
      ref={(node) => {
        if (node) {
          node.parent?.children.forEach((child) => {
            if ((child as THREE.PerspectiveCamera).isPerspectiveCamera) {
              child.position.set(Math.sin(frame * 0.01) * 0.35, camY, camZ);
              child.lookAt(0, 0.2, 3.5);
            }
          });
        }
      }}
    />
  );
};

const OceanSceneMesh: React.FC = () => {
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

  const camZ = interpolate(frame, [0, 240], [16, 8.2], { extrapolateRight: 'clamp' });
  const camY = interpolate(frame, [0, 240], [5.4, 2.3], { extrapolateRight: 'clamp' });

  return (
    <>
      <color attach="background" args={[PALETTE.deepOceanNavy]} />
      <fogExp2 attach="fog" args={[PALETTE.deepOceanNavy, 0.045]} />

      <ambientLight intensity={0.22} color={PALETTE.oceanBlue} />
      <directionalLight position={[-6, 12, -10]} intensity={0.7} color={PALETTE.softBlue} />
      <pointLight position={[0, 1.2, 4.5]} intensity={3.2} distance={14} color={PALETTE.electricCyan} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 7]}>
        <planeGeometry args={[40, 24]} />
        <meshStandardMaterial color="#020B16" roughness={0.25} metalness={0.6} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -4]}>
        <planeGeometry args={[36, 32, 180, 180]} />
        <shaderMaterial
          vertexShader={oceanVertexShader}
          fragmentShader={oceanFragmentShader}
          uniforms={uniforms}
          transparent
        />
      </mesh>

      <perspectiveCamera position={[0, camY, camZ]} />
      <CameraRig camY={camY} camZ={camZ} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.45} mipmapBlur intensity={1.15} />
        <Vignette eskil={false} offset={0.2} darkness={0.75} />
      </EffectComposer>
    </>
  );
};

export const Scene01GlowingOcean: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [24, 54, 195, 225], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleTranslateY = interpolate(frame, [24, 58], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: PALETTE.deepOceanNavy }}>
      <ThreeCanvas width={VIDEO_SPECS.width} height={VIDEO_SPECS.height}>
        <OceanSceneMesh />
      </ThreeCanvas>

      <ScientificBadge label="Rekonstruksi Visual 3D" source="NOAA Ocean Exploration" />

      <div
        style={{
          position: 'absolute',
          top: '26%',
          left: 64,
          right: 64,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            color: PALETTE.electricCyan,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.32em',
            marginBottom: 16,
          }}
        >
          BIOLUMINESCENCE
        </div>
        <h1
          style={{
            color: PALETTE.white,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 8px 40px rgba(32, 207, 255, 0.45)',
          }}
        >
          THE GLOWING OCEAN
        </h1>
      </div>
    </div>
  );
};
