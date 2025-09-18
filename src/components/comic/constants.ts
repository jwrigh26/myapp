import type { BubbleAnchor, BreakpointKey, ScaleMap } from './types';

/** Sensible defaults if you don't pass anything */
export const DEFAULT_SCALE: Required<ScaleMap> = {
  xl: 100,
  lg: 85,
  md: 72,
  tablet: 68,
  sm: 60,
  mobileLg: 60,
  mobile: 50,
  xs: 50,
};

export const defaultAnchor: BubbleAnchor = 'top-left';

// Static lookup objects - calculated once at module load for better performance
export const ANCHOR_TRANSFORMS: Record<BubbleAnchor, string> = {
  'top-left': 'translate(0%, -100%)',
  'top-right': 'translate(-100%, -100%)',
  'bottom-left': 'translate(0%, 0%)',
  'bottom-right': 'translate(-100%, 0%)',
  center: 'translate(-50%, -50%)',
} as const;

export const ANCHOR_TRANSFORM_ORIGINS: Record<
  BubbleAnchor,
  React.CSSProperties['transformOrigin']
> = {
  'top-left': 'top left',
  'top-right': 'top right',
  'bottom-left': 'bottom left',
  'bottom-right': 'bottom right',
  center: 'center',
} as const;

// Static base style for SVG tail positioning - avoids object recreation
export const SVG_TAIL_BASE_STYLE: React.CSSProperties = {
  position: 'absolute',
  zIndex: 0,
  pointerEvents: 'none',
} as const;
