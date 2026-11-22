export const PALETTE = {
  // Core Deep Navy & Tech Palette
  deepNavy: '#060D1F',
  navyMid: '#0B1736',
  navyElevated: '#12234D',
  electricBlue: '#1D6BFF',
  cyan: '#00E5FF',
  cyanSoft: '#7CEEFF',
  whiteLight: '#F4F8FF',

  // Compatibility aliases & supporting material tones
  lavender: '#081229',
  lavenderDeep: '#050B1A',
  shadow: '#040814',
  turquoise: '#00C8E8',
  yellow: '#5CE1FF',
  magenta: '#3B82F6',
  white: '#F4F8FF',
  slateDark: '#0D1830',
  darkText: '#E6F4FF',
  metalSilver: '#B8CBE0',
  metalDark: '#1C2B4A',
  pcbGreen: '#0B3A4A',
  copperGold: '#63D2FF',
  lightBlue: '#A5E8FF',
} as const;

export const PACKET_COLORS = [
  PALETTE.cyan,
  PALETTE.electricBlue,
  PALETTE.whiteLight,
  PALETTE.cyanSoft,
  PALETTE.turquoise,
] as const;
