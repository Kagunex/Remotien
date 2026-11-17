import React from 'react';
import {ShotSequence} from '../components/ShotSequence';
import {Shot07} from '../shots/Shot07';
import {Shot08} from '../shots/Shot08';
import {Shot09} from '../shots/Shot09';

export const KnockScene: React.FC = () => <ShotSequence scene="knock" shots={{7: Shot07, 8: Shot08, 9: Shot09}} />;
