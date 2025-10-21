import { useActiveBreakpointKey } from '@/context/BreakpointContext';
import type { ScaleMap, BreakpointKey } from './types';
import { DEFAULT_SCALE } from './constants';

// Hook-based versions (for use at component top level)
export function useScalePercent(
  bubbleScale?: ScaleMap,
  globalScale?: ScaleMap
): number {
  const bp = useActiveBreakpointKey();
  const fromBubble = bubbleScale?.[bp];
  const fromGlobal = globalScale?.[bp];
  const fromDefault = DEFAULT_SCALE[bp];
  return (fromBubble ?? fromGlobal ?? fromDefault) || 100;
}

export function useHeightScale(globalScale?: ScaleMap): number {
  const bp = useActiveBreakpointKey();
  const fromGlobal = globalScale?.[bp];
  const fromDefault = DEFAULT_SCALE[bp];
  return ((fromGlobal ?? fromDefault) || 100) / 100;
}

// Direct calculation versions (for use inside useMemo, useCallback, etc.)
export function getScalePercent(
  bp: BreakpointKey,
  bubbleScale?: ScaleMap,
  globalScale?: ScaleMap
): number {
  const fromBubble = bubbleScale?.[bp];
  const fromGlobal = globalScale?.[bp];
  const fromDefault = DEFAULT_SCALE[bp];
  return (fromBubble ?? fromGlobal ?? fromDefault) || 100;
}

export function getHeightScale(
  bp: BreakpointKey,
  globalScale?: ScaleMap
): number {
  const fromGlobal = globalScale?.[bp];
  const fromDefault = DEFAULT_SCALE[bp];
  return ((fromGlobal ?? fromDefault) || 100) / 100;
}
