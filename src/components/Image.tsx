import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

// Define the structure for each image source
export interface SourceProps {
  media: string; // e.g., "(min-width: 768px)"
  srcSet: string; // e.g., "image-large.jpg 2x, image-large@1x.jpg 1x"
  sizes?: string; // e.g., "100vw"
}

const loadedImageCache = new Set<string>();

// Main Image component props
interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  alt: string;
  defaultSrc: string; // Fallback image source
  sources?: SourceProps[]; // Array of source objects for the <picture> element
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  skeletonProps?: React.ComponentProps<typeof Skeleton>; // Optional Skeleton props
  isLazyLoading?: boolean; // Controls the loading="lazy" attribute
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string; // CSS object-position: 'center', 'center bottom', '50% 80%', etc.
}
const Image: React.FC<ResponsiveImageProps> = ({
  alt,
  defaultSrc,
  sources = [],
  width,
  height,
  style,
  skeletonProps,
  isLazyLoading = true, // default to lazy loading
  objectFit = 'cover',
  objectPosition = 'center', // default to center positioning
  ...rest
}) => {
  const initialIsLoading = !loadedImageCache.has(defaultSrc);
  const [isLoading, setIsLoading] = React.useState(initialIsLoading);
  const [hasError, setHasError] = useState(false);

  // Reset loading state when defaultSrc changes
  useEffect(() => {
    setIsLoading(!loadedImageCache.has(defaultSrc));
    setHasError(false);
  }, [defaultSrc]);

  const handleLoad = () => {
    setIsLoading(false);
    loadedImageCache.add(defaultSrc);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const combinedStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    objectPosition,
    opacity: isLoading ? 0 : 1,
    transform: isLoading ? 'scale(0.98)' : 'scale(1)',
    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
    ...style,
  };

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation={false}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '2px',
            bgcolor: 'action.hover',
          }}
          {...skeletonProps}
        />
      )}
      {hasError && !isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
            borderRadius: '2px',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">Failed to load image</Typography>
        </Box>
      )}
      <picture style={{ width: '100%', height: '100%' }}>
        {sources.map((source, index) => (
          <source
            key={index}
            media={source.media}
            srcSet={source.srcSet}
            sizes={source.sizes}
          />
        ))}
        <img
          src={defaultSrc}
          alt={alt}
          loading={isLazyLoading ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          style={combinedStyle}
          {...rest}
        />
      </picture>
    </>
  );
};

export default Image;

export const AspectRatioContainer = styled(Box, {
  shouldForwardProp: (prop) => !['ratio', 'maxWidth'].includes(prop as string),
})<{
  ratio?: number; // width/height (e.g., 16/9 = 1.78)
  maxWidth?: string | number;
}>(({ ratio = 16 / 9, maxWidth = '100%' }) => ({
  position: 'relative',
  width: '100%',
  maxWidth,
  height: 0,
  paddingBottom: `${(1 / ratio) * 100}%`,
  borderRadius: '2px',
  overflow: 'hidden',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export const ContentImageGrid = styled(Box, {
  shouldForwardProp: (prop) =>
    !['imageOnRight', 'gap', 'columns'].includes(prop as string),
})<{
  imageOnRight?: boolean;
  gap?: number;
  columns?: string;
}>(({ theme, gap = 2, columns = '1fr 1fr' }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto auto',
  gap: theme.spacing(gap),
  width: '100%',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: columns,
    gridTemplateRows: '1fr',
    alignItems: 'flex-start',
  },
}));

export const GridContent = styled(Box, {
  shouldForwardProp: (prop) =>
    !['imageOnRight', 'mobileImageFirst', 'gap'].includes(prop as string),
})<{
  imageOnRight?: boolean;
  mobileImageFirst?: boolean;
  gap?: number;
}>(({ theme, imageOnRight = true, mobileImageFirst = false, gap = 2 }) => ({
  order: mobileImageFirst ? 2 : 1,
  display: 'flex',
  flexDirection: 'column',
  spacing: theme.spacing(gap), // For sake of not refactoring existing code we want spacing so it doesn't break mobile layout

  [theme.breakpoints.up('md')]: {
    order: imageOnRight ? 1 : 2,
  },
}));

export const GridImage = styled(Box, {
  shouldForwardProp: (prop) =>
    !['imageOnRight', 'mobileImageFirst'].includes(prop as string),
})<{ imageOnRight?: boolean; mobileImageFirst?: boolean }>(
  ({ theme, imageOnRight = true, mobileImageFirst = false }) => ({
    order: mobileImageFirst ? 1 : 2,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    '& .aspect-ratio-container': {
      ...(theme.palette.mode === 'light'
        ? {
            boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
            border: `2px solid ${theme.palette.grey[400]}`,
          }
        : {
            border: `4px solid ${theme.palette.grey[700]}`,
          }),
    },

    [theme.breakpoints.up('md')]: {
      order: imageOnRight ? 2 : 1,
      paddingBottom: 0,
      paddingTop: 0,
    },
  })
);

const ImageCaption = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? theme.palette.secondary.dark
      : theme.palette.secondary.main,
  display: 'block',
  textAlign: 'center',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

interface ContentImageGridProps {
  imageSrc: string;
  sources?: SourceProps[];
  imageAlt: string;
  children: React.ReactNode;
  imageOnRight?: boolean;
  gap?: number;
  columns?: string; // Customizable gridTemplateColumns for desktop
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  caption?: string;
  mobileImageFirst?: boolean; // Controls mobile ordering: true = image first, false = content first
}

export const ResponsiveContentImageGrid: React.FC<ContentImageGridProps> = ({
  imageOnRight = true,
  gap = 2,
  imageSrc,
  sources,
  imageAlt,
  children,
  aspectRatio = 4 / 3,
  objectFit = 'cover',
  caption,
  columns = '1fr 1fr',
  mobileImageFirst = false,
}) => {
  return (
    <ContentImageGrid gap={gap} columns={columns}>
      <GridContent
        imageOnRight={imageOnRight}
        mobileImageFirst={mobileImageFirst}
        gap={gap}
      >
        {children}
      </GridContent>
      <GridImage
        imageOnRight={imageOnRight}
        mobileImageFirst={mobileImageFirst}
      >
        <AspectRatioContainer
          ratio={aspectRatio}
          className="aspect-ratio-container"
        >
          <Image
            sources={sources}
            defaultSrc={imageSrc}
            alt={imageAlt}
            objectFit={objectFit}
          />
        </AspectRatioContainer>
        {caption && <ImageCaption variant="caption">{caption}</ImageCaption>}
      </GridImage>
    </ContentImageGrid>
  );
};

/*
 * NOTES: Image Loading & CSS Transitions Pattern
 *
 * This component demonstrates a key React pattern that solves common image loading UX issues:
 *
 * THE KNOWLEDGE GAP:
 * Many developers struggle with image loading in React because they try to handle
 * everything with JavaScript state management and complex conditional rendering.
 *
 * THE SOLUTION:
 * - React manages simple boolean state (isLoading: true/false)
 * - CSS handles the visual transitions (opacity, transform, transition)
 * - Browser does the heavy lifting with hardware-accelerated transitions
 *
 * WHY THIS WORKS SO WELL:
 * 1. Single Source of Truth: One simple boolean state
 * 2. CSS Transitions Are Optimized: Hardware-accelerated, smooth
 * 3. No Layout Thrashing: Image stays in DOM, just changes appearance
 * 4. Separation of Concerns: React = state, CSS = animation
 *
 * KEY INSIGHT:
 * Instead of complex conditional rendering like:
 *   {isLoading ? <Skeleton /> : <img />}
 *
 * Use smooth transitions with:
 *   style={{
 *     opacity: isLoading ? 0 : 1,
 *     transform: isLoading ? 'scale(0.98)' : 'scale(1)',
 *     transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
 *   }}
 *
 * This pattern beats complex JavaScript animations 90% of the time and provides
 * a much better developer experience with predictable, performant results.
 */
