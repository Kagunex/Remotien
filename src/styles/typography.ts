import { PALETTE } from './palette';

export const TYPOGRAPHY = {
  fontFamily:
    "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  monoFamily: "'JetBrains Mono', 'Fira Code', monospace",
  title: {
    fontSize: 56,
    fontWeight: 800,
    lineHeight: 1.14,
    letterSpacing: '-0.02em',
    color: PALETTE.white,
  },
  kicker: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: PALETTE.shadow,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: 600,
    lineHeight: 1.38,
    color: PALETTE.white,
  },
};
