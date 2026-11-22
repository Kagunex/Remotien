import { PALETTE } from './palette';

export const TYPOGRAPHY = {
  fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  monoFamily: "'JetBrains Mono', 'Fira Code', monospace",
  title: {
    fontSize: 64,
    fontWeight: 800,
    lineHeight: 1.12,
    letterSpacing: '-0.02em',
    color: PALETTE.darkText,
  },
  kicker: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: PALETTE.shadow,
  },
  subtitle: {
    fontSize: 34,
    fontWeight: 600,
    lineHeight: 1.38,
    color: PALETTE.white,
  },
};
