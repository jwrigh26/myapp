import React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from '../Image';


// TODO: Thought needs to draw bubbles
// Shout needs to be A big circle and normal tail.

const ComicAspectRatioContainer = styled(Box, {
  shouldForwardProp: (prop) => !['ratio', 'maxWidth'].includes(prop as string),
})<{
  ratio?: number;
  maxWidth?: string | number;
}>(({ ratio = 16 / 9, maxWidth = '100%' }) => ({
  position: 'relative',
  width: '100%',
  maxWidth,
  height: 0,
  paddingBottom: `${(1 / ratio) * 100}%`,
  borderRadius: '2px',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export type BubbleRole = 'speech' | 'thought' | 'shout';
export type BubbleAnchor =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

// NEW
type BreakpointKey = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type ScaleMap = Partial<Record<BreakpointKey, number>>;
type PosMap = Partial<Record<BreakpointKey, { x?: number; y?: number }>>;

export interface BubbleSpec {
  id: string;
  text: string;
  x: number; // 0–100 (% of frame width) baseline at XL
  y: number; // 0–100 (% of frame height) baseline at XL
  anchor?: BubbleAnchor;
  role?: BubbleRole;
  maxWidthPct?: number;
  /**
   * Maximum width in pixels at XL breakpoint (will be scaled down for smaller breakpoints).
   * Takes precedence over maxWidthPct if both are specified.
   * Example: 400 at XL becomes ~340px at LG, ~288px at MD, etc. based on ScaleMap scaling.
   */
  maxWidthPx?: number;
  /**
   * Optional minimum width in pixels at XL breakpoint (will be scaled down for smaller breakpoints).
   * Example: 500 at XL becomes ~425px at LG, ~360px at MD, etc. based on ScaleMap scaling.
   */
  minWidthPx?: number;
  ariaLabel?: string;

  /** Tail geometry in PX (local to the tail SVG) */
  tailPointsPx?: {
    baseLeft: [number, number];
    baseRight: [number, number];
    tip: [number, number];
  };

  /** Slide the tail along the attached bubble edge (px) */
  tailOffsetPx?: number; // default 20

  /** Tuck the tail under the bubble edge to hide seams/caps (px) */
  baseOverlapPx?: number; // default 6

  /** Stroke width for the tail sides (px) – match bubble border (3) */
  tailStrokePx?: number; // default 3

  /** Per-bubble responsive scale map (percent of XL baseline) */
  scaleByBreakpoint?: ScaleMap;

  /** NEW: optional per-bubble position overrides by breakpoint (percent) */
  positionByBreakpoint?: PosMap;

  /** NEW: pixel nudge (defined at XL), scales with bubble scale */
  nudgePx?: { x?: number; y?: number };
}

export interface ComicFrameWithBubblesProps {
  alt: string;
  src: string;
  sources?: React.ComponentProps<typeof Image>['sources'];
  aspectRatio?: number;
  objectFit?: React.ComponentProps<typeof Image>['objectFit'];
  bubbles: BubbleSpec[];
  className?: string;

  /** Global default scale map (percent of XL baseline). Per-bubble can override. */
  defaultScaleByBreakpoint?: ScaleMap;

  /** NEW: optional global position overrides (rarely needed) */
  defaultPositionByBreakpoint?: PosMap;
}

/** Sensible defaults if you don't pass anything */
const DEFAULT_SCALE: Required<ScaleMap> = {
  xl: 100,
  lg: 85,
  md: 72,
  sm: 60,
  xs: 50,
};

function useActiveBreakpointKey() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  if (isXl) return 'xl' as const;
  if (isLg) return 'lg' as const;
  if (isMd) return 'md' as const;
  if (isSm) return 'sm' as const;
  return 'xs' as const;
}

function useScalePercent(
  bubbleScale?: ScaleMap,
  globalScale?: ScaleMap
): number {
  const bp = useActiveBreakpointKey();
  const fromBubble = bubbleScale?.[bp];
  const fromGlobal = globalScale?.[bp];
  const fromDefault = DEFAULT_SCALE[bp];
  return (fromBubble ?? fromGlobal ?? fromDefault) || 100;
}

// NEW: resolve position for current breakpoint (fall back to base x/y)
function useResolvedXY(
  baseX: number,
  baseY: number,
  bubblePos?: PosMap,
  globalPos?: PosMap
): { x: number; y: number } {
  const bp = useActiveBreakpointKey();
  const fromBubble = bubblePos?.[bp];
  const fromGlobal = globalPos?.[bp];
  return {
    x: fromBubble?.x ?? fromGlobal?.x ?? baseX,
    y: fromBubble?.y ?? fromGlobal?.y ?? baseY,
  };
}

const defaultAnchor: BubbleAnchor = 'top-left';

const anchorToTransform = (anchor: BubbleAnchor) => {
  switch (anchor) {
    case 'top-left':
      return 'translate(0%, -100%)';
    case 'top-right':
      return 'translate(-100%, -100%)';
    case 'bottom-left':
      return 'translate(0%, 0%)';
    case 'bottom-right':
      return 'translate(-100%, 0%)';
    case 'center':
    default:
      return 'translate(-50%, -50%)';
  }
};

function anchorToTransformOrigin(
  anchor: BubbleAnchor
): React.CSSProperties['transformOrigin'] {
  switch (anchor) {
    case 'top-left':
      return 'top left';
    case 'top-right':
      return 'top right';
    case 'bottom-left':
      return 'bottom left';
    case 'bottom-right':
      return 'bottom right';
    case 'center':
    default:
      return 'center';
  }
}

/**
 * SVG tail (PX-based):
 * - White fill triangle (no stroke on base)
 * - Two side strokes (tip->baseLeft + tip->baseRight) with 'butt' caps
 * - Positioned inside the Inner bubble (scales with it)
 */
function BubbleTailPx({
  points,
  attach = 'bottom-left',
  offsetPx = 20,
  baseOverlapPx = 6,
  strokeWidth = 3,
}: {
  points: NonNullable<BubbleSpec['tailPointsPx']>;
  attach?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  offsetPx?: number;
  baseOverlapPx?: number;
  strokeWidth?: number;
}) {
  const [blx, bly] = points.baseLeft;
  const [brx, bry] = points.baseRight;
  const [tx, ty] = points.tip;

  const xs = [blx, brx, tx];
  const ys = [bly, bry, ty];
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const width = Math.max(...xs) - minX || 1;
  const height = Math.max(...ys) - minY || 1;

  const polyD = `M ${blx},${bly} L ${brx},${bry} L ${tx},${ty} Z`;
  const sideLeftD = `M ${tx},${ty} L ${blx},${bly}`;
  const sideRightD = `M ${tx},${ty} L ${brx},${bry}`;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    width,
    height,
    zIndex: 0,
    pointerEvents: 'none',
  };

  let style: React.CSSProperties = {};
  switch (attach) {
    case 'bottom-left':
      style = {
        ...baseStyle,
        top: -(height - baseOverlapPx),
        left: offsetPx,
        transform: 'rotate(180deg)',
        transformOrigin: 'center',
      };
      break;
    case 'bottom-right':
      style = {
        ...baseStyle,
        top: -(height - baseOverlapPx),
        right: offsetPx,
        transform: 'rotate(180deg)',
        transformOrigin: 'center',
      };
      break;
    case 'top-left':
      style = {
        ...baseStyle,
        bottom: -(height - baseOverlapPx),
        left: offsetPx,
      };
      break;
    case 'top-right':
      style = {
        ...baseStyle,
        bottom: -(height - baseOverlapPx),
        right: offsetPx,
      };
      break;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      style={style}
      aria-hidden
    >
      <path d={polyD} fill="#ffffff" stroke="none" />
      <path
        d={sideLeftD}
        fill="none"
        stroke="#000000"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
      <path
        d={sideRightD}
        fill="none"
        stroke="#000000"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
    </svg>
  );
}

export default function ComicFrameWithBubbles({
  alt,
  src,
  sources,
  aspectRatio = 4 / 3,
  objectFit = 'cover',
  bubbles,
  className,
  defaultScaleByBreakpoint,
  defaultPositionByBreakpoint, // NEW
}: ComicFrameWithBubblesProps) {
  const theme = useTheme();

  return (
    <FrameRoot className={className}>
      <ComicAspectRatioContainer ratio={aspectRatio} className="frame">
        <Image
          defaultSrc={src}
          sources={sources}
          alt={alt}
          objectFit={objectFit}
        />
        <Overlay>
          {bubbles.map((b) => {
            const anchor = b.anchor ?? defaultAnchor;

            // 1) Resolve scale for this bubble at current breakpoint
            const scalePct = useScalePercent(
              b.scaleByBreakpoint,
              defaultScaleByBreakpoint
            );
            const scale = scalePct / 100;

            // 2) Resolve position for this breakpoint (percent), falling back to base x/y
            const { x, y } = useResolvedXY(
              b.x,
              b.y,
              b.positionByBreakpoint,
              defaultPositionByBreakpoint
            );

            // 3) Compute scaled pixel nudges (optional)
            const nudgeX = (b.nudgePx?.x ?? 0) * scale;
            const nudgeY = (b.nudgePx?.y ?? 0) * scale;

            // 4) Compute scaled minimum width (if specified)
            const scaledMinWidth = b.minWidthPx
              ? b.minWidthPx * scale
              : undefined;

            // 5) Compute scaled maximum width (pixel-based takes precedence over percentage)
            const scaledMaxWidth = b.maxWidthPx
              ? b.maxWidthPx * scale
              : undefined;

            const attachEdge:
              | 'bottom-left'
              | 'bottom-right'
              | 'top-left'
              | 'top-right' =
              anchor === 'top-left'
                ? 'bottom-left'
                : anchor === 'top-right'
                  ? 'bottom-right'
                  : anchor === 'bottom-left'
                    ? 'top-left'
                    : anchor === 'bottom-right'
                      ? 'top-right'
                      : 'bottom-left';

            const maxWidthPct = b.maxWidthPct ?? 40;

            return (
              <BubbleOuter
                key={b.id}
                data-anchor={anchor}
                data-role={b.role ?? 'speech'}
                style={
                  {
                    left: `${x}%`,
                    top: `${y}%`,
                    maxWidth: scaledMaxWidth
                      ? `${scaledMaxWidth}px`
                      : `${maxWidthPct}%`,
                    transform: anchorToTransform(anchor),
                  } as React.CSSProperties
                }
                role="note"
                aria-label={b.ariaLabel}
              >
                {/* NEW: positional nudge in px that scales with the bubble scale */}
                <BubblePos
                  style={{ transform: `translate(${nudgeX}px, ${nudgeY}px)` }}
                >
                  <BubbleInner
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: anchorToTransformOrigin(anchor),
                    }}
                  >
                    <BubbleBox
                      style={{
                        minWidth: scaledMinWidth
                          ? `${scaledMinWidth}px`
                          : undefined,
                      }}
                    >
                      <BubbleText>{b.text}</BubbleText>
                      {b.tailPointsPx && (
                        <BubbleTailPx
                          points={b.tailPointsPx}
                          attach={attachEdge}
                          offsetPx={b.tailOffsetPx ?? 20}
                          baseOverlapPx={b.baseOverlapPx ?? 6}
                          strokeWidth={b.tailStrokePx ?? 3}
                        />
                      )}
                    </BubbleBox>
                  </BubbleInner>
                </BubblePos>
              </BubbleOuter>
            );
          })}
        </Overlay>
      </ComicAspectRatioContainer>
    </FrameRoot>
  );
}

// ----------------------
// Styled Components
// ----------------------

const FrameRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  '& .frame': {
    borderRadius: theme.spacing(1),
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 4px 12px rgba(255,255,255,0.08)'
        : '0 6px 16px rgba(0,0,0,0.18)',
  },
}));

const Overlay = styled('div')(() => ({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
}));

/** OUTER: positioned/translated, does NOT scale */
const BubbleOuter = styled('div')(() => ({
  position: 'absolute',
  pointerEvents: 'auto',
}));

/** NEW: px nudge wrapper (applied before scaling) */
const BubblePos = styled('div')(() => ({
  display: 'inline-block',
}));

/** INNER: applies responsive scale without moving the anchor */
const BubbleInner = styled('div')(() => ({
  display: 'inline-block',
}));

/** The visual bubble box (scales with BubbleInner) */
const BubbleBox = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  padding: theme.spacing(3, 3.5),
  borderRadius: 18,
  lineHeight: 1.3,
  background: theme.palette.common.white,
  color: theme.palette.grey[900],
  border: `3px solid ${theme.palette.grey[900]}`,
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  transition: 'transform 120ms ease-out',
  // Add minimum width that scales with the responsive scaling
  minWidth: '120px', // Adjust this value as needed
  // '&:hover': { transform: 'translateZ(0) scale(1.03)' },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}));

const BubbleText = styled(Typography)(({ theme }) => ({
  margin: 0,
  // Use the comic typography variant from theme (Happy Monkey font)
  ...theme.typography.comic,
  // Override with responsive sizing for comic bubbles
  fontSize: 'clamp(18px, 2vw, 24px)',
  fontWeight: 400, // Happy Monkey looks better at normal weight
  color: theme.palette.grey[900],
  // Make all text uppercase for classic comic book style
  textTransform: 'uppercase',
}));
