import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../config/colors';
import {useUid} from './Svg';

export type Mood = 'sleep' | 'calm' | 'anxious' | 'shock' | 'cold';
export type Light = {x: number; y: number; color: string; amt: number};
type Who = 'adrian' | 'nadia';
type Outfit = 'main' | 'alt' | 'nadia';

type HeadProps = {
  mood?: Mood; x?: number; y?: number; s?: number; rot?: number;
  turn?: number; back?: boolean; light?: Light; who?: Who;
};

/** Kepala karakter (vektor). Adrian: rambut hitam pendek. Nadia: rambut sebahu. */
export const Head: React.FC<HeadProps> = ({
  mood = 'calm', x = 0, y = 0, s = 1, rot = 0, turn = 0, back = false, light, who = 'adrian',
}) => {
  const id = useUid('hd');
  const nadia = who === 'nadia';
  const skin = nadia ? '#d4aa8c' : C.skin;
  const shade = nadia ? '#9b7560' : C.skinShade;
  const rx = nadia ? 102 : 112;
  const ry = nadia ? 140 : 146;
  const eyeR = mood === 'shock' ? 17 : mood === 'anxious' ? 12 : mood === 'cold' ? 9 : 10;
  const look = turn * 16;
  const brows =
    mood === 'anxious' ? ['M-64,-34 L-26,-52', 'M26,-52 L64,-34']
    : mood === 'shock' ? ['M-64,-62 L-26,-72', 'M26,-72 L64,-62']
    : mood === 'cold' ? ['M-64,-46 L-26,-38', 'M26,-38 L64,-46']
    : ['M-64,-44 L-26,-47', 'M26,-47 L64,-44'];
  const lx = light ? light.x * 130 : 0;
  const ly = light ? light.y * 160 : 0;

  return (
    <g transform={`translate(${x + turn * 60 * s} ${y}) rotate(${rot}) scale(${s * (1 - 0.4 * turn)} ${s})`}>
      <defs>
        <linearGradient id={id + 's'} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade} />
          <stop offset="0.35" stopColor={skin} />
          <stop offset="0.7" stopColor={skin} />
          <stop offset="1" stopColor={shade} />
        </linearGradient>
        <linearGradient id={id + 'l'} gradientUnits="userSpaceOnUse" x1={lx} y1={ly} x2={-lx} y2={-ly}>
          <stop offset="0" stopColor={light?.color ?? '#fff'} stopOpacity={light?.amt ?? 0} />
          <stop offset="0.55" stopColor={light?.color ?? '#fff'} stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={light ? 0.55 : 0} />
        </linearGradient>
      </defs>
      {nadia && <path d="M-138,-40 C-160,-190 160,-190 138,-40 L152,210 L-152,210 Z" fill={C.hair} />}
      <rect x={-46} y={96} width={92} height={110} fill={shade} />
      <circle cx={-rx} cy={10} r={20} fill={shade} />
      <circle cx={rx} cy={10} r={20} fill={shade} />
      {back ? (
        <g>
          <ellipse cx={0} cy={0} rx={rx + 8} ry={ry + 10} fill={C.hair} />
          <path d={`M${rx - 10},-80 C${rx + 14},-20 ${rx + 10},60 ${rx - 20},110`} stroke="rgba(150,185,230,.28)" strokeWidth={6} fill="none" />
        </g>
      ) : (
        <g>
          <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={`url(#${id}s)`} />
          {[-1, 1].map((sx) => (
            <g key={sx} transform={`translate(${sx * 44} -6)`}>
              {mood === 'sleep' ? (
                <path d="M-18,0 Q0,10 18,0" stroke="#1a1210" strokeWidth={5} fill="none" strokeLinecap="round" />
              ) : (
                <g>
                  <ellipse rx={19} ry={eyeR} fill="#e8e6e0" />
                  <circle cx={look} cy={0} r={eyeR * 0.58} fill="#14100e" />
                  <circle cx={look + 3} cy={-3} r={2.5} fill="#fff" opacity={0.8} />
                </g>
              )}
              {mood !== 'calm' && mood !== 'sleep' && <ellipse cy={26} rx={24} ry={7} fill="rgba(40,20,30,.35)" />}
            </g>
          ))}
          {mood !== 'sleep' && brows.map((d, i) => (
            <path key={i} d={d} stroke={C.hair} strokeWidth={9} strokeLinecap="round" fill="none" />
          ))}
          <path d="M0,-5 L-9,42 Q0,50 13,42" stroke={shade} strokeWidth={5} fill="none" opacity={0.6} />
          {mood === 'shock' ? <ellipse cx={0} cy={90} rx={18} ry={24} fill="#2a0e10" />
            : mood === 'anxious' ? <path d="M-26,92 Q0,78 26,92" stroke="#3a1e18" strokeWidth={6} fill="none" strokeLinecap="round" />
            : mood === 'cold' && nadia ? <path d="M-28,86 Q0,80 28,86 Q0,98 -28,86 Z" fill="#6e2634" />
            : <path d="M-28,86 Q0,90 28,86" stroke="#3a1e18" strokeWidth={6} fill="none" strokeLinecap="round" />}
          <path
            d="M-126,-10 C-142,-122 -70,-180 0,-178 C70,-180 142,-122 126,-10 C120,-60 92,-92 40,-98 C10,-70 -20,-100 -60,-86 C-96,-76 -114,-48 -126,-10 Z"
            fill={C.hair}
          />
          <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={`url(#${id}l)`} />
        </g>
      )}
    </g>
  );
};

export const Torso: React.FC<{outfit?: Outfit}> = ({outfit = 'main'}) => {
  const body = outfit === 'alt' ? '#4a1a20' : outfit === 'nadia' ? '#101116' : C.jacket;
  return (
    <g>
      <path d="M-340,430 C-330,270 -210,196 -70,180 L70,180 C210,196 330,270 340,430 Z" fill={body} />
      {outfit === 'main' && <path d="M-74,180 L0,310 L74,180 Z" fill={C.shirt} />}
      {outfit === 'main' && <path d="M-74,180 L-34,430 M74,180 L34,430" stroke="#000" strokeWidth={6} opacity={0.5} />}
      {outfit === 'alt' && <path d="M-62,182 Q0,232 62,182" fill="none" stroke="#2c0e12" strokeWidth={14} />}
      {outfit === 'nadia' && <path d="M-74,180 L0,330 L74,180 Z" fill="#08090c" />}
    </g>
  );
};

/** Kepala + bahu. (0,0) = pusat kepala. */
export const Portrait: React.FC<HeadProps & {outfit?: Outfit}> = ({x = 0, y = 0, s = 1, outfit, ...head}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Torso outfit={outfit ?? (head.who === 'nadia' ? 'nadia' : 'main')} />
    <Head {...head} />
  </g>
);

/** Adrian berdiri. (0,0) = tengah telapak kaki. */
export const AdrianFigure: React.FC<{
  x: number; y: number; s?: number; back?: boolean; mood?: Mood; phone?: boolean;
}> = ({x, y, s = 1, back = false, mood = 'anxious', phone = false}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 30) * 2;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${s})`}>
      <rect x={-72} y={-310} width={64} height={300} rx={14} fill="#17191f" />
      <rect x={8} y={-310} width={64} height={300} rx={14} fill="#17191f" />
      <ellipse cx={-42} cy={-4} rx={44} ry={14} fill="#08090b" />
      <ellipse cx={42} cy={-4} rx={44} ry={14} fill="#08090b" />
      <path d="M-112,-300 L-122,-600 C-122,-646 -70,-664 0,-664 C70,-664 122,-646 122,-600 L112,-300 Z" fill={C.jacket} />
      {!back && <path d="M-40,-664 L0,-560 L40,-664 Z" fill={C.shirt} />}
      <path d="M-118,-610 L-138,-330" stroke={C.jacket} strokeWidth={48} strokeLinecap="round" />
      {phone ? (
        <g>
          <path d="M118,-610 L176,-500 L132,-700" stroke={C.jacket} strokeWidth={48} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx={132} cy={-704} r={22} fill={C.skin} />
          <rect x={110} y={-760} width={34} height={60} rx={6} fill="#7fc1ff" opacity={0.9} />
        </g>
      ) : (
        <g>
          <path d="M118,-610 L138,-330" stroke={C.jacket} strokeWidth={48} strokeLinecap="round" />
          <circle cx={138} cy={-312} r={22} fill={C.skin} />
        </g>
      )}
      {!back && <circle cx={-138} cy={-312} r={22} fill={C.skin} />}
      <Head x={0} y={-752} s={0.5} mood={mood} back={back} />
    </g>
  );
};

/** Adrian berbaring miring di sofa. */
export const AdrianLying: React.FC<{x: number; y: number}> = ({x, y}) => {
  const f = useCurrentFrame();
  const b = Math.sin(f / 40) * 4;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={90} y={-30 + b / 2} width={260} height={84} rx={30} fill="#17191f" />
      <rect x={-180} y={-62 + b} width={300} height={116} rx={44} fill={C.jacket} />
      <path d="M-120,-6 L40,40" stroke={C.shirt} strokeWidth={4} opacity={0.5} />
      <Head x={-232} y={-8} rot={-82} s={0.4} mood="sleep" />
    </g>
  );
};

/** Siluet The Stranger — wajah tidak pernah terlihat. (0,0) = telapak kaki. */
export const Stranger: React.FC<{x: number; y: number; s?: number; rim?: number; opacity?: number}> = ({
  x, y, s = 1, rim = 0.5, opacity = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <path d="M-124,-720 C-136,-850 -70,-890 0,-890 C70,-890 136,-850 124,-720 L176,0 L-176,0 Z" fill="#040506" />
    <rect x={-30} y={-930} width={60} height={60} fill="#030304" />
    <ellipse cx={0} cy={-970} rx={64} ry={80} fill="#020203" />
    <path d="M124,-720 L176,0" stroke={`rgba(130,180,230,${rim})`} strokeWidth={5} fill="none" />
    <path d="M118,-800 C128,-850 96,-880 60,-886" stroke={`rgba(130,180,230,${rim})`} strokeWidth={5} fill="none" />
    <path d="M52,-1030 C86,-1000 86,-930 56,-900" stroke={`rgba(130,180,230,${rim * 0.9})`} strokeWidth={4} fill="none" />
  </g>
);
