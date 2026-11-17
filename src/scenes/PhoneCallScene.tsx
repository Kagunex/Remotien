import React from 'react';
import {ShotSequence} from '../components/ShotSequence';
import {Shot04} from '../shots/Shot04';
import {Shot05} from '../shots/Shot05';
import {Shot06} from '../shots/Shot06';

export const PhoneCallScene: React.FC = () => <ShotSequence scene="caller" shots={{4: Shot04, 5: Shot05, 6: Shot06}} />;
