import React from 'react';
import { ThreeCanvas } from '@remotion/three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { interpolate, useCurrentFrame } from 'remotion';
import { PALETTE, VIDEO_SPECS } from '../constants/theme';
import { ScientificBadge } from '../components/ScientificBadge';

const ScintillonReaction3D: React.FC = () => {
  const frame = useCurrentFrame();

  const protonProgress = interpolate(frame, [10, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const catalysisProgress = interpolate(frame, [110, 220], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const photonEmission = interpolate(frame, [215, 265, 360], [0, 2.6, 1.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2.35, 36, 36]} />
        <meshPhysicalMaterial
          color={PALETTE.oceanBlue}
          transparent
          opacity={0.24}
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.37, 24, 24]} />
        <meshBasicMaterial color={PALETTE.electricCyan} wireframe transparent opacity={0.16} />
      </mesh>

      <mesh scale={1 + catalysisProgress * 0.22}>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshStandardMaterial
          color={PALETTE.oceanBlue}
          emissive={PALETTE.electricCyan}
          emissiveIntensity={0.4 + catalysisProgress * 1.4}
        />
      </mesh>

      <mesh position={[-1.4 + catalysisProgress * 0.9, 0.35 - catalysisProgress * 0.2, 0.4]}>
        <dodecahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color={PALETTE.softBlue}
          emissive={PALETTE.electricCyan}
          emissiveIntensity={0.8 + photonEmission}
          toneMapped={false}
        />
      </mesh>

      <group position={[1.4 - catalysisProgress * 0.85, 0.3 - catalysisProgress * 0.15, 0.4]}>
        <mesh position={[-0.14, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={PALETTE.white} emissive={PALETTE.softBlue} emissiveIntensity={0.7} />
        </mesh>
        <mesh position={[0.14, 0, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color={PALETTE.white} emissive={PALETTE.softBlue} emissiveIntensity={0.7} />
        </mesh>
      </group>

      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = interpolate(protonProgress, [0, 1], [3.1, 1.15]);
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.2]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial
              color={PALETTE.electricCyan}
              emissive={PALETTE.electricCyan}
              emissiveIntensity={1.6}
            />
          </mesh>
        );
      })}

      <pointLight position={[0, 0, 0]} intensity={photonEmission * 4} distance={10} color={PALETTE.electricCyan} />
    </group>
  );
};

export const Scene04ChemicalReaction: React.FC = () => {
  const frame = useCurrentFrame();

  const step1Opacity = interpolate(frame, [10, 35], [0, 1], { extrapolateRight: 'clamp' });
  const step2Opacity = interpolate(frame, [110, 135], [0, 1], { extrapolateRight: 'clamp' });
  const step3Opacity = interpolate(frame, [215, 245], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: PALETTE.deepOceanNavy }}>
      <ThreeCanvas
        width={VIDEO_SPECS.width}
        height={VIDEO_SPECS.height}
        camera={{ position: [0, 0, 6.8], fov: 44 }}
      >
        <color attach="background" args={[PALETTE.deepOceanNavy]} />
        <ambientLight intensity={0.4} color={PALETTE.oceanBlue} />
        <ScintillonReaction3D />
        <EffectComposer>
          <Bloom luminanceThreshold={0.45} mipmapBlur intensity={1.45} />
        </EffectComposer>
      </ThreeCanvas>

      <ScientificBadge
        label="Diagram Skematik 3D • Organel Scintillon"
        source="Fogel & Hastings (1972)"
      />

      <div
        style={{
          position: 'absolute',
          top: 230,
          left: 64,
          right: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            opacity: step1Opacity,
            backgroundColor: 'rgba(3, 20, 38, 0.82)',
            borderLeft: `4px solid ${PALETTE.softBlue}`,
            padding: '14px 20px',
            borderRadius: 8,
            color: PALETTE.white,
            fontSize: 24,
          }}
        >
          <strong>1. Penurunan pH (Influx Ion H⁺):</strong> Mengubah konformasi enzim luciferase menjadi aktif.
        </div>

        <div
          style={{
            opacity: step2Opacity,
            backgroundColor: 'rgba(3, 20, 38, 0.82)',
            borderLeft: `4px solid ${PALETTE.electricCyan}`,
            padding: '14px 20px',
            borderRadius: 8,
            color: PALETTE.white,
            fontSize: 24,
          }}
        >
          <strong>2. Katalisis Oksidasi:</strong> Luciferase + Luciferin + O₂ → Oxyluciferin tereksitasi.
        </div>

        <div
          style={{
            opacity: step3Opacity,
            backgroundColor: 'rgba(7, 91, 155, 0.45)',
            border: `1px solid ${PALETTE.electricCyan}`,
            padding: '16px 20px',
            borderRadius: 8,
            color: PALETTE.white,
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          3. Emisi Foton Biru: Energi dilepaskan sebagai kilatan cahaya biru.
        </div>
      </div>
    </div>
  );
};
