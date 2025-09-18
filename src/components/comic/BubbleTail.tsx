import React, { useMemo } from 'react';
import type { BubbleSpec } from './types';
import { SVG_TAIL_BASE_STYLE } from './constants';

interface BubbleTailProps {
  points: NonNullable<BubbleSpec['tailPointsPx']>;
  attach?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  offsetPx?: number;
  baseOverlapPx?: number;
  strokeWidth?: number;
}

/**
 * SVG tail (PX-based):
 * - White fill triangle (no stroke on base)
 * - Two side strokes (tip->baseLeft + tip->baseRight) with 'butt' caps
 * - Positioned inside the Inner bubble (scales with it)
 */
export function BubbleTail({
  points,
  attach = 'bottom-left',
  offsetPx = 20,
  baseOverlapPx = 6,
  strokeWidth = 3,
}: BubbleTailProps) {
  // Memoize expensive SVG calculations - only recalculate when points change
  const svgData = useMemo(() => {
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
    const viewBox = `${minX} ${minY} ${width} ${height}`;

    return {
      width,
      height,
      polyD,
      sideLeftD,
      sideRightD,
      viewBox,
    };
  }, [points]);

  // Memoize positioning style - only recalculate when positioning params change
  const positionStyle = useMemo((): React.CSSProperties => {
    const { width, height } = svgData;
    
    switch (attach) {
      case 'bottom-left':
        return {
          ...SVG_TAIL_BASE_STYLE,
          top: -(height - baseOverlapPx),
          left: offsetPx,
          width,
          height,
          transform: 'rotate(180deg)',
          transformOrigin: 'center',
        };
      case 'bottom-right':
        return {
          ...SVG_TAIL_BASE_STYLE,
          top: -(height - baseOverlapPx),
          right: offsetPx,
          width,
          height,
          transform: 'rotate(180deg)',
          transformOrigin: 'center',
        };
      case 'top-left':
        return {
          ...SVG_TAIL_BASE_STYLE,
          bottom: -(height - baseOverlapPx),
          left: offsetPx,
          width,
          height,
        };
      case 'top-right':
        return {
          ...SVG_TAIL_BASE_STYLE,
          bottom: -(height - baseOverlapPx),
          right: offsetPx,
          width,
          height,
        };
      default:
        return {
          ...SVG_TAIL_BASE_STYLE,
          width,
          height,
        };
    }
  }, [svgData, attach, offsetPx, baseOverlapPx]);

  return (
    <svg
      width={svgData.width}
      height={svgData.height}
      viewBox={svgData.viewBox}
      style={positionStyle}
      aria-hidden
    >
      {/* Using #ffffff (white) and #212121 (grey[900]) for consistent comic styling */}
      <path d={svgData.polyD} fill="#ffffff" stroke="none" />
      <path
        d={svgData.sideLeftD}
        fill="none"
        stroke="#212121"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
      <path
        d={svgData.sideRightD}
        fill="none"
        stroke="#212121"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
    </svg>
  );
}
