import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Svg} from '../components/Svg';
import {Portrait, Stranger} from '../components/Characters';
import {C} from '../config/colors';
import {FONT} from '../config/typography';

const Label: React.FC<{x: number; name: string; role: string; lines: string[]}> = ({x, name, role, lines}) => (
  <div style={{position: 'absolute', left: x - 280, top: 880, width: 560, textAlign: 'center', fontFamily: FONT.ui, color: C.text}}>
    <div style={{fontSize: 38, letterSpacing: 10, fontFamily: FONT.title}}>{name}</div>
    <div style={{fontSize: 20, letterSpacing: 6, color: C.phone, margin: '6px 0 10px'}}>{role}</div>
    {lines.map((l) => <div key={l} style={{fontSize: 21, color: C.dim, lineHeight: 1.45}}>{l}</div>)}
  </div>
);

/** Still: `npm run still:sheet` */
export const CharacterSheet: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 30%, #14202c, #04070b)'}}>
    <div style={{position: 'absolute', top: 40, width: '100%', textAlign: 'center', letterSpacing: 16, fontSize: 32, fontFamily: FONT.title, color: C.text}}>
      THE LAST SIGNAL — CHARACTER SHEET
    </div>
    <Svg>
      <Portrait x={360} y={440} s={1.0} mood="calm" light={{x: -1, y: -0.3, color: '#9fd4ff', amt: 0.4}} />
      <Portrait x={960} y={440} s={1.0} who="nadia" mood="cold" light={{x: 1, y: -0.3, color: '#9fd4ff', amt: 0.4}} />
      <Stranger x={1560} y={850} s={0.72} rim={0.7} />
    </Svg>
    <Label x={360} name="ADRIAN WIRATAMA" role="PROTAGONIS · 24 TAHUN"
      lines={['Rambut hitam pendek · jaket hitam, kaus abu-abu', 'Pendiam, cerdas, mudah curiga']} />
    <Label x={960} name="NADIA PRAMESTI" role="MISTERIUS · 23 TAHUN"
      lines={['Rambut hitam sebahu · pakaian gelap', 'Tenang, penuh rahasia · belum tampil di PART 01']} />
    <Label x={1560} name="THE STRANGER" role="MISTERIUS"
      lines={['Wajah tidak diperlihatkan · hanya bayangan', 'Suara berat, pelan, mengancam']} />
  </AbsoluteFill>
);
