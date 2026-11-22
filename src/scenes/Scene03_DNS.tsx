import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { DNSCard } from '../components/DNSCard';
import { ServerRack } from '../components/ServerRack';
import { NetworkLine } from '../components/NetworkLine';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { TYPOGRAPHY } from '../styles/typography';
import { WIDTH, HEIGHT, smoothStep, softSpring } from '../styles/animation';

export const Scene03_DNS: React.FC = () => {
  const frame = useCurrentFrame();

  const bookScale = softSpring(frame, 12, 13, 105);
  const domainX = smoothStep(frame, 45, 140, -3.1, -0.4);
  const ipScale = softSpring(frame, 145, 12, 125);
  const ipX = smoothStep(frame, 165, 255, 0.35, 2.1);
  const linkProgress = smoothStep(frame, 210, 300, 0, 1);

  // Kamera mengikuti pergerakan dari buku kontak DNS ke server
  const camX = smoothStep(frame, 160, 350, -0.3, 1.5);
  const camZ = smoothStep(frame, 160, 350, 6.2, 5.6);

  // Efek ketikan "example.com"
  const domainText = 'example.com';
  const charCount = Math.min(domainText.length, Math.floor(smoothStep(frame, 8, 70, 0, domainText.length)));

  return (
    <AbsoluteFill>
      <ThreeCanvas width={WIDTH} height={HEIGHT} shadows>
        <StudioLighting />
        <CameraRig position={[camX, 0.7, camZ]} lookAt={[camX * 0.85, 0, 0]} />

        {/* Buku Kontak DNS 3D */}
        <FloatingObject position={[-0.4, 0.05, 0]} scale={bookScale} amplitude={0.06}>
          <DNSCard variant="book" />
        </FloatingObject>

        {/* Kartu Domain Masuk */}
        <DNSCard
          variant="domain"
          position={[domainX, 0.75, 0.65]}
          rotation={[0, 0.12, 0]}
          scale={0.85}
        />

        {/* Kartu Alamat IP Muncul sebagai Hasil */}
        <DNSCard
          variant="ip"
          position={[ipX, -0.35, 0.75]}
          rotation={[0, -0.1, 0]}
          scale={0.88 * ipScale}
        />

        {/* Server Tujuan di Sebelah Kanan */}
        <ServerRack position={[3.35, -0.25, -0.2]} scale={0.78} activeLeds={2} />

        <NetworkLine
          start={[2.1, -0.35, 0.6]}
          end={[3.1, 0.1, 0.1]}
          arcHeight={0.5}
          progress={linkProgress}
          color={PALETTE.turquoise}
        />
      </ThreeCanvas>

      {/* Overlay Label Domain & IP untuk Kejelasan Edukasi */}
      <div
        style={{
          position: 'absolute',
          top: 215,
          left: 140,
          backgroundColor: PALETTE.white,
          color: PALETTE.darkText,
          padding: '12px 24px',
          borderRadius: 14,
          fontFamily: TYPOGRAPHY.monoFamily,
          fontSize: 28,
          fontWeight: 700,
          boxShadow: '0 10px 28px rgba(39, 48, 74, 0.18)',
          opacity: frame > 8 ? 1 : 0,
        }}
      >
        🌐 {domainText.slice(0, charCount)}
      </div>

      {frame > 155 && (
        <div
          style={{
            position: 'absolute',
            top: 315,
            right: 260,
            backgroundColor: PALETTE.turquoise,
            color: PALETTE.darkText,
            padding: '12px 24px',
            borderRadius: 14,
            fontFamily: TYPOGRAPHY.monoFamily,
            fontSize: 26,
            fontWeight: 800,
            boxShadow: '0 10px 28px rgba(39, 48, 74, 0.2)',
          }}
        >
          IP: 93.184.216.34
        </div>
      )}

      <SceneTitle
        kicker="SCENE 03 · NAME TO ADDRESS (DNS)"
        title="DNS: Buku Kontak Internet"
      />
    </AbsoluteFill>
  );
};
