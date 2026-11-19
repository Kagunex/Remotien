import React, { useMemo } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { PALETTE, VIDEO_SPECS } from '../constants/theme';
import { ScientificBadge } from '../components/ScientificBadge';

const DinoflagellateModel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const longitudinalFlagellum = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 30; i++) {
      const u = i / 30;
      pts.push(
        new THREE.Vector3(
          Math.sin(u * 10 - t * 9) * 0.28 * u,
          -1.5 - u * 2.6,
          Math.cos(u * 8 - t * 9) * 0.18 * u
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, [t]);

  const pulse = 1.1 + Math.sin(t * 4) * 0.35;

  return (
    <group rotation={[0.25, t * 0.55, -0.15]}>
      <mesh position={[0, 0.72, 0]} scale={[1.15, 1.35, 1.05]}>
        <coneGeometry args={[1.1, 1.65, 24]} />
        <meshPhysicalMaterial
          color={PALETTE.oceanBlue}
          emissive={PALETTE.electricCyan}
          emissiveIntensity={0.28}
          transmission={0.65}
          thickness={1.2}
          roughness={0.2}
          ior={1.38}
        />
      </mesh>

      <mesh position={[0, -0.68, 0]} rotation={[Math.PI, 0, 0]} scale={[1.12, 1.25, 1.02]}>
        <coneGeometry args={[1.08, 1.5, 24]} />
        <meshPhysicalMaterial
          color={PALETTE.oceanBlue}
          emissive={PALETTE.electricCyan}
          emissiveIntensity={0.28}
          transmission={0.65}
          thickness={1.2}
          roughness={0.2}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.16, 0.065, 16, 64]} />
        <meshStandardMaterial
          color={PALETTE.softBlue}
          emissive={PALETTE.electricCyan}
          emissiveIntensity={1.4}
        />
      </mesh>

      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial
          color={PALETTE.white}
          emissive={PALETTE.softBlue}
          emissiveIntensity={0.9}
        />
      </mesh>

      {[
        [0.65, 0.35, 0.3],
        [-0.6, -0.3, 0.4],
        [0.45, -0.5, -0.45],
        [-0.5, 0.45, -0.35],
        [0.7, -0.1, -0.2],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial
            color={PALETTE.white}
            emissive={PALETTE.electricCyan}
            emissiveIntensity={pulse * 2.2}
            toneMapped={false}
          />
        </mesh>
      ))}

      <mesh>
        <tubeGeometry args={[longitudinalFlagellum, 40, 0.025, 8, false]} />
        <meshStandardMaterial
          color={PALETTE.softBlue}
          emissive={PALETTE.electricCyan}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
};

export const Scene03Dinoflagellates: React.FC = () => {
  const frame = useCurrentFrame();
  const labelOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });

  const annotations = [
    { title: 'THECA (DINDING SEL)', desc: 'Lempeng selulosa pelindung', top: 470, left: 85 },
    { title: 'CINGULUM & FLAGELA TRANSVERSAL', desc: 'Alur rotasi pergerakan sel', top: 760, right: 85 },
    { title: 'SCINTILLON', desc: 'Organel penghasil kilatan cahaya', top: 1030, left: 85 },
    { title: 'FLAGELA LONGITUDINAL', desc: 'Kemudi propulsi arah maju', top: 1310, right: 85 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: PALETTE.deepOceanNavy }}>
      <ThreeCanvas
        width={VIDEO_SPECS.width}
        height={VIDEO_SPECS.height}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
      >
        <color attach="background" args={[PALETTE.deepOceanNavy]} />
        <ambientLight intensity={0.45} color={PALETTE.oceanBlue} />
        <directionalLight position={[5, 6, 5]} intensity={1.8} color={PALETTE.softBlue} />
        <pointLight position={[-4, -3, 3]} intensity={1.6} color={PALETTE.electricCyan} />

        <DinoflagellateModel />

        <EffectComposer>
          <Bloom luminanceThreshold={0.6} mipmapBlur intensity={1.1} />
        </EffectComposer>
      </ThreeCanvas>

      <ScientificBadge
        label="Model Rekonstruksi 3D (Bukan Foto Mikroskop Asli)"
        source="Perin et al. (2022)"
      />

      {annotations.map((item, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            right: item.right,
            opacity: labelOpacity,
            backgroundColor: 'rgba(3, 20, 38, 0.8)',
            border: `1px solid ${PALETTE.electricCyan}`,
            borderRadius: 10,
            padding: '12px 18px',
            maxWidth: 430,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <div style={{ color: PALETTE.electricCyan, fontSize: 22, fontWeight: 700 }}>{item.title}</div>
          <div style={{ color: PALETTE.white, fontSize: 20, opacity: 0.9, marginTop: 4 }}>{item.desc}</div>
        </div>
      ))}
    </div>
  );
};
