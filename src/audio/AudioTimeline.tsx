import React from 'react';
import { Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import {
  SCENES,
  SFX_CUES,
  AMBIENCE_CUES,
  MUSIC_BED_FILE,
  getMusicDuckingVolume,
  getVoiceoverDuckFactor,
} from './SoundCues';

interface FadedAudioProps {
  file: string;
  baseVolume: number;
  durationFrames: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  playbackRate?: number;
  duckWithVo?: boolean;
}

const FadedAudio: React.FC<FadedAudioProps> = ({
  file,
  baseVolume,
  durationFrames,
  fadeInFrames = 3,
  fadeOutFrames = 6,
  playbackRate = 1,
  duckWithVo = false,
}) => {
  const frame = useCurrentFrame();
  const voDuck = duckWithVo ? getVoiceoverDuckFactor(frame) : 0;
  const duckMult = duckWithVo ? 1 - voDuck * 0.42 : 1;

  const fadeIn =
    fadeInFrames > 0
      ? interpolate(frame, [0, fadeInFrames], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1;

  const fadeOut =
    fadeOutFrames > 0
      ? interpolate(
          frame,
          [Math.max(0, durationFrames - fadeOutFrames), durationFrames],
          [1, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        )
      : 1;

  const finalVolume = Math.max(0, Math.min(1, baseVolume * fadeIn * fadeOut * duckMult));

  return (
    <Audio
      src={staticFile(file)}
      volume={finalVolume}
      playbackRate={playbackRate}
    />
  );
};

export const AudioTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const musicVolume = getMusicDuckingVolume(frame);

  return (
    <>
      {/* Background Education Music Bed dengan Fade-In, Auto-Ducking & Fade-Out */}
      <Audio src={staticFile(MUSIC_BED_FILE)} volume={musicVolume} />

      {/* Ambience Layer per Scene dengan Auto-Ducking saat VO aktif */}
      {AMBIENCE_CUES.map((amb) => (
        <Sequence
          key={amb.id}
          from={amb.startFrame}
          durationInFrames={amb.durationFrames}
          name={`AMB-${amb.sceneId}-${amb.id}`}
        >
          <FadedAudio
            file={amb.file}
            baseVolume={amb.volume}
            durationFrames={amb.durationFrames}
            fadeInFrames={amb.fadeInFrames}
            fadeOutFrames={amb.fadeOutFrames}
            duckWithVo
          />
        </Sequence>
      ))}

      {/* Voiceover Utama 8 Scene (ElevenLabs WAV - Dipertahankan Utuh) */}
      {SCENES.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame + 6}
          durationInFrames={scene.durationFrames - 6}
          name={`VO-${scene.id}`}
        >
          <Audio src={staticFile(scene.voFile)} volume={1.0} />
        </Sequence>
      ))}

      {/* Tersinkronisasi SFX Cues Per Scene */}
      {SFX_CUES.map((cue) => (
        <Sequence
          key={cue.id}
          from={cue.frame}
          durationInFrames={cue.durationFrames}
          name={`SFX-${cue.sceneId}-${cue.id}`}
        >
          <FadedAudio
            file={cue.file}
            baseVolume={cue.volume}
            durationFrames={cue.durationFrames}
            fadeInFrames={cue.fadeInFrames ?? 3}
            fadeOutFrames={cue.fadeOutFrames ?? 6}
            playbackRate={cue.playbackRate ?? 1}
          />
        </Sequence>
      ))}
    </>
  );
};
