import React from 'react';
import {Composition, Folder} from 'remotion';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH, shotDur} from './config/timing';
import {Part01} from './parts/Part01';
import {CharacterSheet} from './scenes/CharacterSheet';
import {Shot01} from './shots/Shot01';
import {Shot02} from './shots/Shot02';
import {Shot03} from './shots/Shot03';
import {Shot04} from './shots/Shot04';
import {Shot05} from './shots/Shot05';
import {Shot06} from './shots/Shot06';
import {Shot07} from './shots/Shot07';
import {Shot08} from './shots/Shot08';
import {Shot09} from './shots/Shot09';
import {Shot10} from './shots/Shot10';
import {Shot11} from './shots/Shot11';
import {Shot12} from './shots/Shot12';
import {Shot13} from './shots/Shot13';

const SHOTS: [number, React.FC][] = [
  [1, Shot01], [2, Shot02], [3, Shot03], [4, Shot04], [5, Shot05], [6, Shot06], [7, Shot07],
  [8, Shot08], [9, Shot09], [10, Shot10], [11, Shot11], [12, Shot12], [13, Shot13],
];

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Part01" component={Part01} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Composition id="CharacterSheet" component={CharacterSheet} durationInFrames={1} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Folder name="Shots">
      {SHOTS.map(([n, C]) => (
        <Composition key={n} id={`Shot${String(n).padStart(2, '0')}`} component={C}
          durationInFrames={shotDur(n)} fps={FPS} width={WIDTH} height={HEIGHT} />
      ))}
    </Folder>
  </>
);
