import React from 'react';
import {ShotSequence} from '../components/ShotSequence';
import {Shot01} from '../shots/Shot01';
import {Shot02} from '../shots/Shot02';
import {Shot03} from '../shots/Shot03';

export const OpeningScene: React.FC = () => <ShotSequence scene="opening" shots={{1: Shot01, 2: Shot02, 3: Shot03}} />;
