import { createImageSources, getDefaultImageSrc } from '@/utils/images';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import Image, { AspectRatioContainer } from '../Image';

interface LegacyComicFrame {
  imageName: string;
  alt: string;
}

interface LegacyComicStripProps {
  frames: LegacyComicFrame[];
  title?: string; // Optional comic title for accessibility
  aspectRatio?: number; // Default: 4/3, but configurable per comic
  className?: string; // Additional styling if needed
}

// Background styling similar to BackdropSection
const BackdropBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const PrimaryBackground = styled(BackdropBackground)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : theme.palette.primary.dark,
  backgroundImage:
    theme.palette.mode === 'dark'
      ? undefined
      : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
}));

// Container for the comic strip with responsive grid classes
const ComicContainer = styled(PrimaryBackground)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3, 2),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 3),
  },
}));

// Grid layout for frames
const FrameGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  maxWidth: '1200px',
  margin: '0 auto',

  // Mobile: Single column
  gridTemplateColumns: '1fr',

  // Tablet: 2 columns
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(3),
  },

  // Desktop: Horizontal strip
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(var(--frame-count), 1fr)',
    gap: theme.spacing(2),
  },
}));

// Individual frame container
const FrameContainer = styled(Box)(({ theme }) => ({
  position: 'relative',

  // Comic book styling
  '& .frame-image': {
    border: `3px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800]}`,
    borderRadius: theme.spacing(1),
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 4px 12px rgba(255,255,255,0.1)'
        : '0 4px 12px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
}));

// Frame number indicator (mobile only)
const FrameNumber = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 2,
  width: 28,
  height: 28,
  borderRadius: '50%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  opacity: 0.4,
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.75rem',
  fontWeight: 'bold',

  // Only show on mobile
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

// Optional title styling
const ComicTitle = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.common.white,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 600,
}));

const ComicStrip = React.memo(
  ({
    frames,
    title,
    aspectRatio = 4 / 3,
    className,
  }: LegacyComicStripProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    // Determine grid class based on screen size
    const getGridClass = () => {
      if (isMobile) return 'full-width';
      if (isTablet) return 'full-width';
      return 'full-width';
    };

    const gridClass = getGridClass();
    const frameCount = frames.length;

    return (
      <ComicContainer
        className={`${gridClass} ${className || ''}`}
        role="img"
        aria-label={title || `Comic strip with ${frameCount} frames`}
        style={
          {
            '--frame-count': frameCount,
          } as React.CSSProperties
        }
      >
        {title && <ComicTitle variant="h5">{title}</ComicTitle>}

        <FrameGrid>
          {frames.map((frame, index) => (
            <FrameContainer key={`${frame.imageName}-${index}`}>
              {/* <FrameNumber>{index + 1}</FrameNumber> */}

              <AspectRatioContainer ratio={aspectRatio} className="frame-image">
                <Image
                  sources={createImageSources(frame.imageName as any)}
                  defaultSrc={getDefaultImageSrc(frame.imageName as any)}
                  alt={frame.alt}
                  objectFit="cover"
                />
              </AspectRatioContainer>
            </FrameContainer>
          ))}
        </FrameGrid>
      </ComicContainer>
    );
  },
  (prevProps, nextProps) => {
    // Only check frames array reference and title (aspectRatio won't change per blog)
    return (
      prevProps.frames === nextProps.frames &&
      prevProps.title === nextProps.title
    );
  }
);

ComicStrip.displayName = 'ComicStrip';

export default ComicStrip;
export type { LegacyComicFrame, LegacyComicStripProps };

// TODO: Needs to be updated to use ComicFrame and BubbleSpec eventually
// Used for first comic in learn-names page
