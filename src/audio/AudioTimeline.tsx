import React from 'react';
import { Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Audio } from '@remotion/media';
import { SCENES, SFX_CUES, MUSIC_BED_FILE, getMusicDuckingVolume } from './SoundCues';

export const AudioTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const musicVolume = getMusicDuckingVolume(frame);

  return (
    <>
      {/* Background Education Music Bed dengan Auto-Ducking */}
      <Audio src={staticFile(MUSIC_BED_FILE)} volume={musicVolume} />

      {/* Voiceover 8 Scene (ElevenLabs WAV) */}
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

      {/* Tersinkronisasi SFX Cues */}
      {SFX_CUES.map((cue) => (
        <Sequence
          key={cue.id}
          from={cue.frame}
          durationInFrames={60}
          name={`SFX-${cue.id}`}
        >
          <Audio
            src={staticFile(cue.file)}
            volume={cue.volume}
            playbackRate={cue.playbackRate ?? 1}
          />
        </Sequence>
      ))}
    </>
  );
};
