import React from 'react';
import {random, staticFile, useCurrentFrame} from 'remotion';
import assetsJson from '../config/assets.json';
import {C} from '../config/colors';
import {FONT} from '../config/typography';
import {Glow, useUid} from './Svg';

const ASSETS = assetsJson as Record<string, string>;
const Plate: React.FC<{src: string}> = ({src}) => (
  <image href={staticFile(src)} x={0} y={0} width={1920} height={1080} preserveAspectRatio="xMidYMid slice" />
);

export const Rain: React.FC<{count?: number; opacity?: number; speed?: number; angle?: number}> = ({
  count = 140, opacity = 0.35, speed = 38, angle = 12,
}) => {
  const f = useCurrentFrame();
  const a = (angle * Math.PI) / 180;
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity, pointerEvents: 'none'}}>
      {Array.from({length: count}).map((_, i) => {
        const x0 = random('rx' + i) * 2200 - 150;
        const len = 40 + random('rl' + i) * 70;
        const off = random('ro' + i) * 1200;
        const y = ((f * speed * (0.7 + random('rs' + i) * 0.6) + off) % 1300) - 100;
        const x = x0 + y * Math.tan(a);
        return (
          <line key={i} x1={x} y1={y} x2={x + len * Math.sin(a)} y2={y + len}
            stroke="#9fc4e0" strokeWidth={1 + random('rw' + i) * 1.5} strokeLinecap="round" />
        );
      })}
    </svg>
  );
};

/** Jendela dengan lampu kota (bokeh) dan tetesan hujan di kaca. */
export const WindowPane: React.FC<{x: number; y: number; w: number; h: number; frame?: number}> = ({
  x, y, w, h, frame = 14,
}) => {
  const f = useCurrentFrame();
  const id = useUid('wp');
  const cols = ['#e8a44a', '#d0211f', '#4aa0e8', '#d8e8f0'];
  return (
    <g>
      <defs>
        <clipPath id={id}><rect x={x} y={y} width={w} height={h} /></clipPath>
        <linearGradient id={id + 'g'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1624" /><stop offset="1" stopColor="#1a2b3e" />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}g)`} />
      <g clipPath={`url(#${id})`}>
        <g filter="url(#blur6)">
          {Array.from({length: 26}).map((_, i) => (
            <circle key={i} cx={x + random('bx' + i) * w} cy={y + h * 0.35 + random('by' + i) * h * 0.65}
              r={(8 + random('br' + i) * 22) * (w / 400 + 0.5)} fill={cols[i % 4]} opacity={0.25 + random('bo' + i) * 0.4} />
          ))}
        </g>
        {Array.from({length: 18}).map((_, i) => {
          const dx = x + random('dx' + i) * w;
          const dy = y + ((f * (1 + random('dv' + i) * 2.5) + random('dy' + i) * h) % h);
          return <line key={i} x1={dx} y1={dy} x2={dx} y2={dy + 26 + random('dl' + i) * 30} stroke="rgba(180,210,235,.4)" strokeWidth={2.5} strokeLinecap="round" />;
        })}
      </g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#05080c" strokeWidth={frame} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#05080c" strokeWidth={frame * 0.6} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#05080c" strokeWidth={frame * 0.6} />
    </g>
  );
};

export const Room: React.FC<{dim?: number}> = ({dim = 0}) => (
  <g>
    <defs>
      <linearGradient id="rmWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#090e15" /><stop offset="1" stopColor="#121b27" /></linearGradient>
      <linearGradient id="rmFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d0f13" /><stop offset="1" stopColor="#050607" /></linearGradient>
    </defs>
    {ASSETS.apartment ? (
      <g><rect x={-300} y={-300} width={2520} height={1680} fill="#03050a" /><Plate src={ASSETS.apartment} /></g>
    ) : (
      <g>
        <rect x={-300} y={-300} width={2520} height={1130} fill="url(#rmWall)" />
        <rect x={-300} y={820} width={2520} height={500} fill="url(#rmFloor)" />
        <rect x={-300} y={808} width={2520} height={14} fill="#04060a" />
        <WindowPane x={120} y={150} w={400} h={470} />
      </g>
    )}
    {dim > 0 && <rect x={-300} y={-300} width={2520} height={1620} fill="#000" opacity={dim} />}
  </g>
);

export const Sofa: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 800}) => (
  <g>
    <rect x={x} y={y - 230} width={w} height={230} rx={44} fill="#17161a" />
    <rect x={x - 50} y={y - 120} width={90} height={150} rx={34} fill="#1c1b20" />
    <rect x={x + w - 40} y={y - 120} width={90} height={150} rx={34} fill="#1c1b20" />
    <rect x={x + 20} y={y - 90} width={w - 40} height={120} rx={28} fill="#222127" />
    <rect x={x + 10} y={y + 28} width={30} height={26} fill="#0a0a0c" />
    <rect x={x + w - 40} y={y + 28} width={30} height={26} fill="#0a0a0c" />
  </g>
);

export const DigitalClock: React.FC<{x: number; y: number; text?: string; s?: number}> = ({x, y, text = '03:17', s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} style={{filter: 'drop-shadow(0 0 14px #ff1e1e)'}}>
    <rect x={-150} y={-65} width={300} height={130} rx={14} fill="#0b0707" stroke="#2a1414" strokeWidth={4} />
    <text x={0} y={34} textAnchor="middle" fontFamily={FONT.mono} fontWeight={700} fontSize={104} fill="#ff2a2a" letterSpacing={4}>{text}</text>
  </g>
);

export const Door: React.FC<{x: number; y: number; w?: number; h?: number; knock?: number; gap?: number; shadow?: boolean}> = ({
  x, y, w = 340, h = 700, knock = 0, gap = 0.8, shadow = false,
}) => {
  const dx = Math.sin(knock * Math.PI * 6) * knock * 5;
  return (
    <g>
      <rect x={x - 26} y={y - 26} width={w + 52} height={h + 26} fill="#06080b" />
      <g transform={`translate(${dx} 0)`}>
        <rect x={x} y={y} width={w} height={h} fill="#1a1612" />
        <rect x={x + 34} y={y + 40} width={w - 68} height={h * 0.38} fill="#15110e" stroke="#0c0a08" strokeWidth={4} />
        <rect x={x + 34} y={y + h * 0.38 + 80} width={w - 68} height={h * 0.42} fill="#15110e" stroke="#0c0a08" strokeWidth={4} />
        <circle cx={x + w - 46} cy={y + h * 0.52} r={16} fill="#a58a4e" />
        <circle cx={x + w / 2} cy={y + h * 0.2} r={9} fill="#050505" stroke="#a58a4e" strokeWidth={4} />
      </g>
      <rect x={x} y={y + h} width={w} height={8} fill="#f0cf90" opacity={gap} />
      <Glow x={x + w / 2} y={y + h + 10} r={w * 0.8} color="#f0cf90" opacity={gap * 0.3} />
      {shadow && (
        <g fill="#000">
          <rect x={x + w * 0.28} y={y + h} width={w * 0.16} height={8} />
          <rect x={x + w * 0.56} y={y + h} width={w * 0.16} height={8} />
        </g>
      )}
    </g>
  );
};

export const TV: React.FC<{x: number; y: number; w: number; h: number; children?: React.ReactNode}> = ({x, y, w, h, children}) => {
  const id = useUid('tv');
  return (
    <g>
      <rect x={x - 24} y={y - 24} width={w + 48} height={h + 48} rx={18} fill="#09090b" stroke="#1b1d22" strokeWidth={4} />
      <rect x={x} y={y} width={w} height={h} fill="#020203" />
      <defs><clipPath id={id}><rect x={x} y={y} width={w} height={h} rx={6} /></clipPath></defs>
      <g clipPath={`url(#${id})`}><g transform={`translate(${x} ${y})`}>{children}</g></g>
      <rect x={x + w / 2 - 120} y={y + h + 24} width={240} height={26} fill="#0b0b0d" />
    </g>
  );
};

/** Ponsel. Koordinat anak: (0,0) = pusat layar, layar 390x820. */
export const Phone: React.FC<{x: number; y: number; s?: number; rot?: number; on?: boolean; children?: React.ReactNode}> = ({
  x, y, s = 1, rot = 0, on = false, children,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-215} y={-430} width={430} height={860} rx={64} fill="#0b0c0f" stroke="#1d2026" strokeWidth={4} />
    <rect x={-195} y={-410} width={390} height={820} rx={48} fill="#030405" />
    {on && children}
    <rect x={-50} y={-398} width={100} height={22} rx={11} fill="#000" />
  </g>
);

export const IncomingCall: React.FC<{name: string; sub: string; pulse?: number; connected?: boolean}> = ({
  name, sub, pulse = 0, connected = false,
}) => (
  <g fontFamily={FONT.ui} textAnchor="middle" fill={C.text}>
    <rect x={-195} y={-410} width={390} height={820} rx={48} fill="#0a1722" />
    <text y={-290} fontSize={26} letterSpacing={6} fill="#8fb4d0">{connected ? 'TERSAMBUNG' : 'INCOMING CALL'}</text>
    <circle cy={-130} r={82 + pulse * 10} fill="none" stroke="#9fd4ff" strokeWidth={3} opacity={0.3 * (1 - pulse * 0.6)} />
    <circle cy={-130} r={70} fill="#16293a" />
    <circle cy={-150} r={24} fill="#5f7d94" />
    <path d="M-42,-90 Q0,-140 42,-90 L42,-80 L-42,-80 Z" fill="#5f7d94" />
    <text y={30} fontSize={56} fontWeight={700}>{name}</text>
    <text y={80} fontSize={30} fill="#8fb4d0">{sub}</text>
    {connected ? (
      <circle cx={0} cy={290} r={46} fill="#c62828" />
    ) : (
      <g>
        <circle cx={-95} cy={290} r={46} fill="#c62828" />
        <circle cx={95} cy={290} r={46 + pulse * 6} fill="#2e9e4f" />
      </g>
    )}
  </g>
);

export const NumbersScreen: React.FC = () => {
  const f = useCurrentFrame();
  const a1 = Math.min(1, Math.max(0, (f - 60) / 20));
  const a2 = Math.min(1, Math.max(0, (f - 200) / 20));
  const a3 = Math.min(1, Math.max(0, (f - 340) / 15));
  const blink = a3 > 0 ? (Math.floor(f / 10) % 2 ? 1 : 0.4) : 0;
  return (
    <g fontFamily={FONT.ui} textAnchor="middle" fill={C.text}>
      <rect x={-195} y={-410} width={390} height={820} rx={48} fill="#0a1015" />
      <text y={-330} fontSize={24} letterSpacing={5} fill="#c9d4df">PANGGILAN BERAKHIR</text>
      <g opacity={a1}>
        <text y={-190} fontSize={22} letterSpacing={4} fill="#8fb4d0">PENELEPON</text>
        <text y={-135} fontSize={38} fontFamily={FONT.mono}>0812-5550-0317</text>
      </g>
      <g opacity={a2}>
        <text y={0} fontSize={22} letterSpacing={4} fill="#8fb4d0">NOMOR SAYA</text>
        <text y={55} fontSize={38} fontFamily={FONT.mono}>0812-5550-0317</text>
      </g>
      <g opacity={blink}>
        <rect x={-182} y={-182} width={364} height={66} fill="none" stroke={C.red} strokeWidth={4} />
        <rect x={-182} y={8} width={364} height={66} fill="none" stroke={C.red} strokeWidth={4} />
        <text y={200} fontSize={36} fontWeight={700} letterSpacing={6} fill={C.red}>NOMOR SAMA</text>
      </g>
    </g>
  );
};

export const Hallway: React.FC<{flick: number}> = ({flick}) => ASSETS.hallway ? (
  <g><Plate src={ASSETS.hallway} /><rect width={1920} height={1080} fill="#000" opacity={0.35 * (1 - flick)} /></g>
) : (
  <g>
    <rect x={0} y={0} width={1920} height={1080} fill="#0b0f14" />
    <polygon points="0,0 1920,0 1200,380 720,380" fill="#070a0e" />
    <polygon points="0,1080 1920,1080 1200,700 720,700" fill="#0f1319" />
    <polygon points="0,0 720,380 720,700 0,1080" fill="#10161d" />
    <polygon points="1920,0 1200,380 1200,700 1920,1080" fill="#0d1319" />
    <rect x={720} y={380} width={480} height={320} fill="#0a0e13" />
    <rect x={900} y={440} width={120} height={260} fill="#15110e" />
    <Glow x={960} y={390} r={520} color="#b9d7a0" opacity={flick * 0.5} />
    <ellipse cx={960} cy={780} rx={380} ry={60} fill="#b9d7a0" opacity={flick * 0.08} />
  </g>
);
