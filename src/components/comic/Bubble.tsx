import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { BubbleSpec, BreakpointKey, ScaleMap, PosMap } from './types';
import {
  ANCHOR_TRANSFORMS,
  ANCHOR_TRANSFORM_ORIGINS,
  defaultAnchor,
} from './constants';
import { BubbleTail } from './BubbleTail';
import { calculateBubbleProps, getChildBubbles } from './utils/bubbleHelpers';

interface BubbleProps {
  bubble: BubbleSpec;
  scale: number;
  x: number;
  y: number;
  nudgeX: number;
  nudgeY: number;
  scaledMinWidth?: number;
  scaledMaxWidth?: number;
  // New props for recursive rendering
  allBubbles?: BubbleSpec[]; // All bubbles for finding children
  breakpoint?: BreakpointKey; // Current breakpoint for child calculations
  defaultScaleByBreakpoint?: ScaleMap;
  defaultPositionByBreakpoint?: PosMap;
  isChildBubble?: boolean; // Whether this is a child bubble (affects positioning)
}

export function Bubble({
  bubble,
  scale,
  x,
  y,
  nudgeX,
  nudgeY,
  scaledMinWidth,
  scaledMaxWidth,
  allBubbles = [],
  breakpoint = 'md',
  defaultScaleByBreakpoint,
  defaultPositionByBreakpoint,
  isChildBubble = false,
}: BubbleProps) {
  const anchor = bubble.anchor ?? defaultAnchor;

  const attachEdge: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' =
    anchor === 'top-left'
      ? 'bottom-left'
      : anchor === 'top-right'
        ? 'bottom-right'
        : anchor === 'bottom-left'
          ? 'top-left'
          : anchor === 'bottom-right'
            ? 'top-right'
            : 'bottom-left';

  // Find child bubbles that are anchored to this bubble
  const childBubbles = getChildBubbles(allBubbles, bubble.id);

  return (
    <BubbleOuter
      id={bubble.id}
      key={bubble.id}
      data-anchor={anchor}
      data-role={bubble.role ?? 'speech'}
      style={
        {
          left: `${x}%`,
          top: `${y}%`,
          maxWidth: scaledMaxWidth ? `${scaledMaxWidth}px` : '100%',
          minWidth: isChildBubble ? `${scaledMinWidth}px` : undefined,
          transform: isChildBubble ? 'none' : ANCHOR_TRANSFORMS[anchor],
        } as React.CSSProperties
      }
      role="note"
      aria-label={bubble.ariaLabel}
    >
      {/* Positional nudge in px that scales with the bubble scale */}
      <BubblePos style={{ transform: `translate(${nudgeX}px, ${nudgeY}px)` }}>
        <BubbleInner
          id={bubble.id ? `inner-${bubble.id}` : undefined}
          style={{
            transform: isChildBubble ? 'none' : `scale(${scale})`,
            transformOrigin: ANCHOR_TRANSFORM_ORIGINS[anchor],
          }}
        >
          <BubbleBox
            style={{
              minWidth: scaledMinWidth ? `${scaledMinWidth}px` : undefined,
            }}
          >
            <BubbleText>{bubble.text}</BubbleText>
            {/* Render tail for regular speech bubbles */}
            {bubble.tailPointsPx && (
              <BubbleTail
                points={bubble.tailPointsPx}
                attach={attachEdge}
                offsetPx={bubble.tailOffsetPx ?? 20}
                baseOverlapPx={bubble.baseOverlapPx ?? 6}
                strokeWidth={bubble.tailStrokePx ?? 3}
              />
            )}
            
            {/* White connector box for child bubbles only (renders in front) */}
            {isChildBubble && bubble.connector && (
              <ConnectorBox
                style={{
                  width: bubble.connector.width,
                  height: bubble.connector.height,
                  left: bubble.connector.x,
                  top: bubble.connector.y,
                  zIndex: bubble.connector.zIndex ?? 1, // In front by default
                }}
              />
            )}
            
            {childBubbles.map((childBubble) => {
              const childProps = calculateBubbleProps(
                childBubble,
                breakpoint,
                defaultScaleByBreakpoint,
                defaultPositionByBreakpoint,
                1 // Don't multiply parent scale - child is inside scaled container
              );

              return (
                <Bubble
                  key={childBubble.id}
                  bubble={childBubble}
                  {...childProps}
                  allBubbles={allBubbles}
                  breakpoint={breakpoint}
                  defaultScaleByBreakpoint={defaultScaleByBreakpoint}
                  defaultPositionByBreakpoint={defaultPositionByBreakpoint}
                  isChildBubble={true}
                />
              );
            })}
          </BubbleBox>
        </BubbleInner>

        {/* Render child bubbles OUTSIDE BubbleInner to avoid scaling conflicts */}
      </BubblePos>
    </BubbleOuter>
  );
}

// ----------------------
// Styled Components
// ----------------------

/** OUTER: positioned/translated, does NOT scale */
const BubbleOuter = styled('div')(() => ({
  position: 'absolute',
  pointerEvents: 'none', // Make it static like an image
  userSelect: 'none', // Prevent text selection
  WebkitUserSelect: 'none', // Safari
  MozUserSelect: 'none', // Firefox
}));

/** Px nudge wrapper (applied before scaling) */
const BubblePos = styled('div')(() => ({
  display: 'inline-block',
  position: 'relative',
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
  fontSize: 'clamp(18px, 1.7vw, 20px)',
  fontWeight: 400, // Happy Monkey looks better at normal weight
  color: theme.palette.grey[900],
  // Make all text uppercase for classic comic book style
  textTransform: 'uppercase',
}));

/** White connector box to hide parent bubble borders for visual connection */
const ConnectorBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  background: theme.palette.common.white,
  border: 'none',
  pointerEvents: 'none',
}));
