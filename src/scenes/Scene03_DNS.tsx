import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneCanvas } from '../components/SceneCanvas';
import { StudioLighting } from '../components/StudioLighting';
import { CameraRig } from '../components/CameraRig';
import { DNSCard } from '../components/DNSCard';
import { ServerRack } from '../components/ServerRack';
import { NetworkLine } from '../components/NetworkLine';
import { FloatingObject } from '../components/FloatingObject';
import { SceneTitle } from '../components/SceneTitle';
import { PALETTE } from '../styles/palette';
import { TYPOGRAPHY } from '../styles/typography';
import { smoothStep, softSpring } from '../styles/animation';

export const Scene03_DNS: React.FC = () => {
  const frame = useCurrentFrame();

  // Komposisi vertikal bertingkat: Domain (Atas) -> Buku Kontak DNS (Tengah) -> IP & Server (Bawah)
  const bookScale = softSpring(frame, 14, 13, 105) * 0.92;
  const domainY = smoothStep(frame, 35, 125, 2.8, 1.45);
  const ipScale = softSpring(frame, 140, 12, 125);
  const linkProgress = smoothStep(frame, 200, 295, 0, 1);

  const camY = smoothStep(frame, 130, 340, 0.75, -0.45);
  const camZ = smoothStep(frame, 130, 340, 8.8, 7.8);

  const domainText = 'example.com';
  const charCount = Math.min(
    domainText.length,
    Math.floor(smoothStep(frame, 8, 68, 0, domainText.length))
  );

  return (
    <AbsoluteFill>
      <SceneCanvas cameraFov={42}>
        <StudioLighting floorY=-3.5 theme="dns" />
        <CameraRig position={[0.15, camY, camZ]} lookAt={[0, camY * 0.6, 0]} />

        {/* Kartu Domain di Atas */}
        <DNSCard
          variant="domain"
          position={[-0.45, domainY, 0.55]}
          rotation={[0.06, 0.14, 0]}
          scale={0.86}
        />

        {/* Buku Kontak DNS di Tengah */}
        <FloatingObject position={[0, 0.15, 0]} scale={bookScale} amplitude={0.05}>
          <DNSCard variant="book" />
        </FloatingObject>

        {/* Kartu Alamat IP Muncul di Bawah Kiri */}
        <DNSCard
          variant="ip"
          position={[-0.65, -1.35, 0.65]}
          rotation={[-0.04, 0.12, 0]}
          scale={0.85 * ipScale}
        />

        {/* Server Tujuan di Bawah Kanan */}
        <ServerRack position={[1.15, -1.65, -0.15]} rotation={[0, -0.32, 0]} scale={0.62} activeLeds={2} />

        <NetworkLine
          start={[0.15, -1.35, 0.55]}
          end={[0.85, -1.4, 0.2]}
          arcHeight={0.35}
          progress={linkProgress}
          color={PALETTE.turquoise}
        />
      </SceneCanvas>

      {/* Badge Domain (Zona Atas Layar Portrait) */}
      <div
        style={{
          position: 'absolute',
          top: 340,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: PALETTE.white,
          color: PALETTE.darkText,
          padding: '14px 28px',
          borderRadius: 16,
          fontFamily: TYPOGRAPHY.monoFamily,
          fontSize: 30,
          fontWeight: 800,
          boxShadow: '0 12px 30px rgba(30, 37, 56, 0.22)',
          opacity: frame > 8 ? 1 : 0,
        }}
      >
        🌐 {domainText.slice(0, charCount)}
      </div>

      {/* Badge IP Address Resolved */}
      {frame > 148 && (
        <div
          style={{
            position: 'absolute',
            bottom: 390,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: PALETTE.turquoise,
            color: PALETTE.darkText,
            padding: '14px 28px',
            borderRadius: 16,
            fontFamily: TYPOGRAPHY.monoFamily,
            fontSize: 28,
            fontWeight: 800,
            boxShadow: '0 12px 30px rgba(30, 37, 56, 0.24)',
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
