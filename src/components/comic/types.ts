// Comic Frame Types and Interfaces

export type BubbleRole = 'speech' | 'speech-continued' | 'thought' | 'shout';
export type BubbleAnchor =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

export type BreakpointKey = 'xl' | 'lg' | 'md' | 'tablet' | 'sm' | 'mobileLg' | 'mobile' | 'xs';
export type ScaleMap = Partial<Record<BreakpointKey, number>>;
export type PosMap = Partial<Record<BreakpointKey, { x?: number; y?: number }>>;

export interface BubbleSpec {
  id: string;
  text: string;
  x: number; // 0–100 (% of frame width) baseline at XL
  y: number; // 0–100 (% of frame height) baseline at XL
  anchor?: BubbleAnchor;
  anchorEl?: string; // ID of another bubble to anchor to (for speech-continued)
  role?: BubbleRole;
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

  /** Rectangle configuration for speech-continued bubbles (px at XL breakpoint) */
  rectangle?: {
    width: number; // Width of the rectangle
    height: number; // Height of the rectangle
    offsetX: number; // Horizontal offset from anchor point
    offsetY: number; // Vertical offset from anchor point
  };

  /** Per-bubble responsive scale map (percent of XL baseline) */
  scaleByBreakpoint?: ScaleMap;

  /** Per-bubble position overrides by breakpoint (percent) */
  positionByBreakpoint?: PosMap;

  /** Pixel nudge (defined at XL), scales with bubble scale */
  nudgePx?: { x?: number; y?: number };

  /** White connector box for child bubbles to hide parent borders (px) */
  connector?: {
    width: number;    // px width of white connector box
    height: number;   // px height of white connector box  
    x: number;        // px offset from bubble top-left (can be negative)
    y: number;        // px offset from bubble top-left (can be negative)
    zIndex?: number;  // control layering (default: 1 = in front)
  };

  /** Decorative text styling rules */
  decorativeText?: {
    type: 'first-letter' | 'search-replace' | 'symbol-replace';
    className: string;
    searchText?: string; // For search-replace type
    symbolText?: string; // For symbol-replace type (what to replace the text with)
  }[];
}

export interface ComicFrameWithBubblesProps {
  alt: string;
  src: string;
  sources?: React.ComponentProps<any>['sources']; // Will be typed properly when imported
  aspectRatio?: number;
  height?: string | number;
  minHeight?: string | number; // Minimum height to prevent over-scaling (default: 200px)
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string; // CSS object-position: 'center', 'center bottom', '50% 80%', etc.
  bubbles: BubbleSpec[];
  className?: string;

  /** Global default scale map (percent of XL baseline). Per-bubble can override. */
  defaultScaleByBreakpoint?: ScaleMap;

  /** Optional global position overrides (rarely needed) */
  defaultPositionByBreakpoint?: PosMap;
}
