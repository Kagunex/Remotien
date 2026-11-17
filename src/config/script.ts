import cuesJson from './cues.json';

export type VoiceId = 'narrator' | 'adrian' | 'caller' | 'stranger' | 'recording';
export type Cue = {
  id: string;
  shot: number;
  voice: VoiceId;
  at: number; // detik absolut
  dur: number;
  text: string;
  fx?: string;
  label?: string;
};

export const CUES = cuesJson as unknown as Cue[];

export const SPEAKERS: Record<VoiceId, {label: string; color: string; italic?: boolean}> = {
  narrator: {label: 'NARATOR', color: '#c9d4df', italic: true},
  adrian: {label: 'ADRIAN', color: '#f2f4f7'},
  caller: {label: 'SUARA TELEPON', color: '#9fd4ff'},
  stranger: {label: 'THE STRANGER', color: '#e0554f'},
  recording: {label: 'ADRIAN (REKAMAN)', color: '#e8a44a'},
};
