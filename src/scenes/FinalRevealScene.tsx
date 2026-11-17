import React from 'react';
import {ShotSequence} from '../components/ShotSequence';
import {Shot12} from '../shots/Shot12';
import {Shot13} from '../shots/Shot13';

export const FinalRevealScene: React.FC = () => <ShotSequence scene="reveal" shots={{12: Shot12, 13: Shot13}} />;
