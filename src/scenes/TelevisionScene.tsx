import React from 'react';
import {ShotSequence} from '../components/ShotSequence';
import {Shot10} from '../shots/Shot10';
import {Shot11} from '../shots/Shot11';

export const TelevisionScene: React.FC = () => <ShotSequence scene="television" shots={{10: Shot10, 11: Shot11}} />;
