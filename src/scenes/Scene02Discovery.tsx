import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { PALETTE, VIDEO_SPECS } from '../constants/theme';
import { ScientificBadge } from '../components/ScientificBadge';

const PlanktonField: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const count = 900;
  const particles = useMemo(() => {
    const arr: Array<{ x: number; y: number; z: number; phase: number; scale: number }> = [];
    for (let i = 0; i < count; i++) {
      const s1 = Math.sin(i * 12.9898) * 43758.5453;
      const s2 = Math.sin(i * 78.233) * 29413.1234;
      const s3 = Math.sin(i * 45.164) * 91827.3412;
      const rx = s1 - Math.floor(s1);
      const ry = s2 - Math.floor(s2);
      const rz = s3 - Math.floor(s3);

      arr.push({
        x: (rx - 0.5) * 14,
        y: (ry - 0.5) * 18,
        z: (rz - 0.5) * 14,
        phase: rx * Math.PI * 2,
        scale: 0.03 + ry * 0.055,
      });
    }
    return arr;
  }, []);

  const waveFrontY = interpolate(frame, [0, 270], [7, -7]);

  return (
    <group>
      {particles.map((p, idx) => {
        const distToWave = Math.abs(p.y + Math.sin(p.x * 0.6 + t * 2) * 1.2 - waveFrontY);
        const excitation = Math.max(0, 1 - distToWave / 3.4);
        const glow = 0.25 + Math.pow(excitation, 2) * 2.8;

        return (
          <mesh
            key={idx}
            position={[
              p.x + Math.sin(t * 0.8 + p.phase) * 0.25,
              p.y + Math.cos(t * 0.6 + p.phase) * 0.25,
              p.z,
            ]}
            scale={p.scale * (1 + excitation * 0.7)}
          >
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial
              color={PALETTE.softBlue}
              emissive={PALETTE.electricCyan}
              emissiveIntensity={glow}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export const Scene02Discovery: React.FC = () => {
  const frame = useCurrentFrame();
  const diveY = interpolate(frame, [0, 270], [3.5, -2.5], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: PALETTE.deepOceanNavy }}>
      <ThreeCanvas
        width={VIDEO_SPECS.width}
        height={VIDEO_SPECS.height}
        camera={{ position: [0, diveY, 8.5], fov: 48 }}
      >
        <color attach="background" args={[PALETTE.deepOceanNavy]} />
        <fogExp2 attach="fog" args={[PALETTE.deepOceanNavy, 0.075]} />

        <spotLight
          position={[0, 14, 0]}
          angle={0.55}
          penumbra={1}
          intensity={3.5}
          color={PALETTE.oceanBlue}
        />
        <ambientLight intensity={0.3} color={PALETTE.oceanBlue} />

        <PlanktonField />

        <EffectComposer>
          <DepthOfField focusDistance={0.015} focalLength={0.035} bokehScale={4.5} />
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.3} />
        </EffectComposer>
      </ThreeCanvas>

      <ScientificBadge label="Rekonstruksi Visual 3D • Kolom Laut" source="Smithsonian Ocean" />
    </div>
  );
};
