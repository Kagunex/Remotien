import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';
import {FPS, sec} from '../config/timing';

type Pt = [number, number];
const sfxPath = (f: string) => (f === 'music' ? 'audio/music/music.wav' : `audio/sfx/${f}.wav`);
const env = (pts: Pt[]) => (t: number) =>
  interpolate(t, pts.map((p) => p[0]), pts.map((p) => p[1]), {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Layer: React.FC<{file: string; from: number; to: number; pts: Pt[]; offset?: number}> = ({
  file, from, to, pts, offset = 0,
}) => {
  const e = env(pts);
  return (
    <Sequence from={sec(from)} durationInFrames={sec(to - from)} layout="none">
      <Audio src={staticFile(sfxPath(file))} loop startFrom={sec(offset)} volume={(f) => e(from + f / FPS)} />
    </Sequence>
  );
};

const Hit: React.FC<{file: string; at: number; vol?: number; len?: number}> = ({file, at, vol = 1, len = 6}) => (
  <Sequence from={sec(at)} durationInFrames={sec(len)} layout="none">
    <Audio src={staticFile(sfxPath(file))} volume={vol} />
  </Sequence>
);

/** Seluruh timeline musik, ambience, dan SFX Part 01 (waktu dalam detik absolut). */
export const SoundDesign: React.FC = () => (
  <>
    {/* Ambience */}
    <Layer file="rain" from={0} to={233} pts={[[0, 0.6], [40, 0.45], [100, 0.32], [170, 0.28], [233, 0.28], [233.1, 0]]} />
    <Layer file="clock" from={0} to={42} pts={[[0, 0.55], [30, 0.5], [41, 0.2], [42, 0]]} />
    <Layer file="clock" from={108} to={122} pts={[[108, 0.6], [120, 0.6], [122, 0]]} />

    {/* Musik: naik saat telepon, mati saat ketukan, kembali di klimaks */}
    <Layer file="music" from={25} to={108} pts={[[25, 0], [40, 0.5], [46, 0.25], [100, 0.4], [107.9, 0.4], [108, 0]]} />
    <Layer file="music" from={150} to={233} offset={12} pts={[[150, 0], [170, 0.3], [195, 0.5], [225, 0.7], [233, 0.7], [233.05, 0]]} />
    <Layer file="suspense" from={40} to={100} pts={[[40, 0], [55, 0.25], [90, 0.4], [100, 0.4]]} />
    <Layer file="suspense" from={120} to={233} pts={[[120, 0.2], [170, 0.45], [215, 0.7], [233, 0.7], [233.05, 0]]} />
    <Layer file="heartbeat" from={100} to={233} pts={[[100, 0], [120, 0.25], [170, 0.4], [215, 0.75], [233, 0.95], [233.05, 0]]} />

    {/* Thunder */}
    <Hit file="thunder" at={3} vol={0.9} />
    <Hit file="thunder" at={7.5} vol={1} />
    <Hit file="thunder" at={21} vol={0.6} />

    {/* Telepon */}
    <Layer file="ring" from={26} to={42} pts={[[26, 0.7], [41, 0.7], [42, 0]]} />
    <Hit file="callend" at={88} vol={0.8} len={2} />
    <Layer file="ring" from={146} to={150} pts={[[146, 0.8], [149.5, 0.8], [150, 0]]} />

    {/* Ketukan pintu */}
    <Hit file="knock" at={108} vol={1} len={2} />
    <Hit file="knock" at={109} vol={1} len={2} />
    <Hit file="knock" at={110} vol={1} len={2} />
    <Hit file="impact" at={110} vol={0.5} len={4} />

    {/* Lampu berkedip */}
    <Hit file="buzz" at={182} vol={0.8} len={2} />
    <Hit file="buzz" at={184.5} vol={0.6} len={2} />

    {/* Televisi */}
    <Hit file="impact" at={195} vol={0.8} len={4} />
    <Layer file="static" from={195} to={216} pts={[[195, 0.8], [202, 0.25], [215, 0.25], [215.8, 0]]} />

    {/* Ending */}
    <Hit file="impact" at={233} vol={0.9} len={5} />
    <Hit file="breath" at={237.6} vol={0.7} len={3} />
  </>
);
