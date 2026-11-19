import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { interpolate, useCurrentFrame } from 'remotion';
import { PALETTE, VIDEO_SPECS } from '../constants/theme';
import { ScientificBadge } from '../components/ScientificBadge';

const PredatorInteraction3D: React.FC = () => {
  const frame = useCurrentFrame();

  const predatorX = interpolate(frame, [0, 125, 160, 330], [-4.8, -1.1, -1.5, -5.5], {
    extrapolateRight: 'clamp',
  });
  const predatorRotY = interpolate(frame, [120, 155], [0, Math.PI], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const flashIntensity = interpolate(frame, [105, 128, 175, 250], [0.3, 4.5, 1.2, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shockwaveScale = interpolate(frame, [115, 210], [0.2, 4.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveOpacity = interpolate(frame, [115, 210], [0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group>
      <mesh position={[1.2, 0, 0]}>
        <octahedronGeometry args={[0.65, 2]} />
        <meshStandardMaterial
          color={PALETTE.softBlue}
          emissive={PALETTE.electricCyan}
          emissiveIntensity={flashIntensity}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[1.2, 0, 0]} scale={shockwaveScale}>
        <ringGeometry args={[0.85, 0.95, 48]} />
        <meshBasicMaterial color={PALETTE.electricCyan} transparent opacity={shockwaveOpacity} />
      </mesh>

      <group position={[predatorX, 0.1, 0.2]} rotation={[0, predatorRotY, -Math.PI / 2]}>
        <mesh>
          <capsuleGeometry args={[0.45, 1.4, 12, 24]} />
          <meshStandardMaterial color="#0A2B4C" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      <pointLight
        position={[1.2, 0, 0.5]}
        intensity={flashIntensity * 3.5}
        distance={12}
        color={PALETTE.electricCyan}
      />
    </group>
  );
};

export const Scene05Defense: React.FC = () => {
  const frame = useCurrentFrame();
  const cardOpacity = interpolate(frame, [130, 165], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: PALETTE.deepOceanNavy }}>
      <ThreeCanvas
        width={VIDEO_SPECS.width}
        height={VIDEO_SPECS.height}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
      >
        <color attach="background" args={[PALETTE.deepOceanNavy]} />
        <ambientLight intensity={0.35} color={PALETTE.oceanBlue} />
        <directionalLight position={[0, 8, 4]} intensity={1.1} color={PALETTE.softBlue} />

        <PredatorInteraction3D />

        <EffectComposer>
          <Bloom luminanceThreshold={0.45} mipmapBlur intensity={1.5} />
        </EffectComposer>
      </ThreeCanvas>

      <ScientificBadge
        label="Simulasi Interaksi Ekologis 3D"
        source="NOAA Ocean Exploration • Perin et al. (2022)"
      />

      <div
        style={{
          position: 'absolute',
          top: 250,
          left: 64,
          right: 64,
          opacity: cardOpacity,
          backgroundColor: 'rgba(3, 20, 38, 0.84)',
          border: `1px solid rgba(139, 234, 255, 0.35)`,
          borderRadius: 14,
          padding: '22px 26px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            color: PALETTE.electricCyan,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '0.06em',
            marginBottom: 8,
          }}
        >
          FUNGSI EKOLOGIS YANG DIDUKUNG PENELITIAN
        </div>
        <div style={{ color: PALETTE.white, fontSize: 26, lineHeight: 1.4 }}>
          Stimulasi mekanis air memicu kilatan cahaya untuk mengejutkan pemangsa atau menarik predator sekunder.
        </div>
      </div>
    </div>
  );
};
