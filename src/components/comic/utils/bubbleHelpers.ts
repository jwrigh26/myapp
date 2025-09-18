import type { BubbleSpec, BreakpointKey, ScaleMap, PosMap } from '../types';
import { DEFAULT_SCALE } from '../constants';

/**
 * Calculates the effective scale for a bubble at a given breakpoint
 */
export function calculateBubbleScale(
  bubble: BubbleSpec,
  breakpoint: BreakpointKey,
  defaultScaleByBreakpoint?: ScaleMap
): number {
  const fromBubble = bubble.scaleByBreakpoint?.[breakpoint];
  const fromGlobal = defaultScaleByBreakpoint?.[breakpoint];
  const fromDefault = DEFAULT_SCALE[breakpoint];
  const scalePct = (fromBubble ?? fromGlobal ?? fromDefault) || 100;
  return scalePct / 100;
}

/**
 * Calculates the effective position for a bubble at a given breakpoint
 */
export function calculateBubblePosition(
  bubble: BubbleSpec,
  breakpoint: BreakpointKey,
  defaultPositionByBreakpoint?: PosMap
): { x: number; y: number } {
  const fromBubblePos = bubble.positionByBreakpoint?.[breakpoint];
  const fromGlobalPos = defaultPositionByBreakpoint?.[breakpoint];
  
  const x = fromBubblePos?.x ?? fromGlobalPos?.x ?? bubble.x;
  const y = fromBubblePos?.y ?? fromGlobalPos?.y ?? bubble.y;
  
  return { x, y };
}

/**
 * Calculates scaled pixel nudges for a bubble
 */
export function calculateBubbleNudge(
  bubble: BubbleSpec,
  scale: number
): { nudgeX: number; nudgeY: number } {
  const nudgeX = (bubble.nudgePx?.x ?? 0) * scale;
  const nudgeY = (bubble.nudgePx?.y ?? 0) * scale;
  
  return { nudgeX, nudgeY };
}

/**
 * Calculates scaled width constraints for a bubble
 */
export function calculateBubbleWidthConstraints(
  bubble: BubbleSpec,
  scale: number
): {
  scaledMinWidth?: number;
  scaledMaxWidth?: number;
} {
  const scaledMinWidth = bubble.minWidthPx ? bubble.minWidthPx * scale : undefined;
  const scaledMaxWidth = bubble.maxWidthPx ? bubble.maxWidthPx * scale : undefined;
  
  return {
    scaledMinWidth,
    scaledMaxWidth,
  };
}

/**
 * Calculates all bubble properties needed for rendering
 */
export function calculateBubbleProps(
  bubble: BubbleSpec,
  breakpoint: BreakpointKey,
  defaultScaleByBreakpoint?: ScaleMap,
  defaultPositionByBreakpoint?: PosMap,
  parentScale: number = 1
) {
  // Calculate scale (multiply by parent scale for child bubbles)
  const scale = calculateBubbleScale(bubble, breakpoint, defaultScaleByBreakpoint) * parentScale;
  
  // Calculate position
  const { x, y } = calculateBubblePosition(bubble, breakpoint, defaultPositionByBreakpoint);
  
  // Calculate nudges
  const { nudgeX, nudgeY } = calculateBubbleNudge(bubble, scale);
  
  // Calculate width constraints
  const { scaledMinWidth, scaledMaxWidth } = calculateBubbleWidthConstraints(bubble, scale);
  
  return {
    scale,
    x,
    y,
    nudgeX,
    nudgeY,
    scaledMinWidth,
    scaledMaxWidth,
  };
}

/**
 * Filters bubbles to get only top-level bubbles (no anchorEl)
 */
export function getTopLevelBubbles(bubbles: BubbleSpec[]): BubbleSpec[] {
  return bubbles.filter(bubble => !bubble.anchorEl);
}

/**
 * Finds child bubbles for a given parent bubble ID
 */
export function getChildBubbles(bubbles: BubbleSpec[], parentId: string): BubbleSpec[] {
  return bubbles.filter(bubble => bubble.anchorEl === parentId);
}
