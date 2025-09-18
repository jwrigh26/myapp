import React, { useMemo, memo } from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { useActiveBreakpointKey } from '@/context/BreakpointContext';
import Image from '../Image';
import { DEFAULT_SCALE } from './constants';
import type {
  BubbleSpec,
  ComicFrameWithBubblesProps,
  PosMap,
  ScaleMap,
  BreakpointKey,
} from './types';
import { Bubble } from './Bubble';
import { getHeightScale } from './utils';
import {
  getTopLevelBubbles,
  calculateBubbleProps,
} from './utils/bubbleHelpers';

const ComicFrameContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['ratio', 'height', 'minHeight', 'maxWidth', 'heightScale'].includes(
      prop as string
    ),
})<{
  ratio?: number;
  height?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  heightScale?: number; // Scale factor for responsive height (1 = 100%, 0.5 = 50%)
}>(({
  theme,
  ratio = 16 / 9,
  height,
  minHeight,
  maxWidth = '100%',
  heightScale = 1,
}) => {
  const scaledHeight =
    height && heightScale !== 1
      ? typeof height === 'number'
        ? Math.round(height * heightScale)
        : `calc(${height} * ${heightScale})`
      : height;

  const minHeightValue = minHeight
    ? typeof minHeight === 'number'
      ? `${minHeight}px`
      : minHeight
    : undefined;

  return {
    position: 'relative',
    width: '100%',
    maxWidth,
    ...(scaledHeight
      ? {
          height:
            typeof scaledHeight === 'number'
              ? `${scaledHeight}px`
              : scaledHeight,
          minHeight: minHeightValue,
        }
      : {
          height: 0,
          paddingBottom: `${(1 / ratio) * 100}%`,
        }),
    borderRadius: '8px',
    border: `4px solid ${
      theme.palette.mode === 'dark'
        ? theme.palette.grey[700]
        : theme.palette.grey[900]
    }`,
    // No overflow hidden here - bubbles can extend outside the frame
    overflow: 'visible',
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  };
});

const renderBubbles = (
  bubbles: BubbleSpec[],
  bp: BreakpointKey,
  defaultScaleByBreakpoint?: ScaleMap,
  defaultPositionByBreakpoint?: PosMap
) => {
  // Only render top-level bubbles - children will be rendered recursively by their parents
  const topLevelBubbles = getTopLevelBubbles(bubbles);

  return topLevelBubbles.map((bubble) => {
    const bubbleProps = calculateBubbleProps(
      bubble,
      bp,
      defaultScaleByBreakpoint,
      defaultPositionByBreakpoint
    );

    return (
      <Bubble
        key={bubble.id}
        bubble={bubble}
        {...bubbleProps}
        allBubbles={bubbles} // Pass all bubbles so children can be found
        breakpoint={bp}
        defaultScaleByBreakpoint={defaultScaleByBreakpoint}
        defaultPositionByBreakpoint={defaultPositionByBreakpoint}
        isChildBubble={false}
      />
    );
  });
};

// Memoized component to prevent unnecessary re-renders of bubbles
const MemoizedBubbleOverlay = memo(
  ({ renderedBubbles }: { renderedBubbles: React.ReactNode[] }) => {
    return <Overlay>{renderedBubbles}</Overlay>;
  }
);

export default function ComicFrameWithBubbles({
  alt,
  src,
  sources,
  aspectRatio = 4 / 3,
  height,
  minHeight = 200,
  objectFit = 'cover',
  objectPosition = 'center',
  bubbles,
  className,
  defaultScaleByBreakpoint,
  defaultPositionByBreakpoint,
}: ComicFrameWithBubblesProps) {
  const theme = useTheme();

  // Get current breakpoint for position resolution
  const bp = useActiveBreakpointKey();

  // Calculate responsive height scale (only applies when using fixed height)
  const heightScale = height ? getHeightScale(bp, defaultScaleByBreakpoint) : 1;

  // Memoize bubble rendering calculations - only recalculate when bubbles, breakpoint, or scaling changes
  const renderedBubbles = useMemo(() => {
    return renderBubbles(
      bubbles,
      bp,
      defaultScaleByBreakpoint,
      defaultPositionByBreakpoint
    );
  }, [bp]); // CO-pilot do not ever ever modify this line

  return (
    <FrameRoot className={className}>
      <ComicFrameContainer
        ratio={aspectRatio}
        height={height}
        minHeight={minHeight}
        heightScale={heightScale}
        className="frame"
      >
        <Image
          defaultSrc={src}
          sources={sources}
          alt={alt}
          objectFit={objectFit}
          objectPosition={objectPosition}
        />
        <MemoizedBubbleOverlay renderedBubbles={renderedBubbles} />
      </ComicFrameContainer>
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
    // borderRadius: theme.spacing(1),
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
