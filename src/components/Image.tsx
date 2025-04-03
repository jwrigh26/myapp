import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Define the structure for each image source
interface SourceProps {
  media: string; // e.g., "(min-width: 768px)"
  srcSet: string; // e.g., "image-large.jpg 2x, image-large@1x.jpg 1x"
  sizes?: string; // e.g., "100vw"
}

// Extend the default img props for extra flexibility
interface ResponsiveImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  defaultSrc: string; // Fallback image source
  sources?: SourceProps[]; // Array of source objects for the <picture> element
  width?: number | string;
  height?: number | string; // This is only for skeleton loading
  style?: React.CSSProperties;
  skeletonProps?: React.ComponentProps<typeof Skeleton>; // Optional Skeleton props
  isLoading?: boolean; // Optional loading state
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}
// Extend the default img props for extra flexibility
interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  alt: string;
  defaultSrc: string; // Fallback image source
  sources?: SourceProps[]; // Array of source objects for the <picture> element
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  skeletonProps?: React.ComponentProps<typeof Skeleton>; // Optional Skeleton props
  isLoading?: boolean; // Optional manual loading state
  isLazyLoading?: boolean; // Controls the loading="lazy" attribute
}
const Image: React.FC<ResponsiveImageProps> = ({
  alt,
  defaultSrc,
  sources = [],
  width,
  height,
  style,
  skeletonProps,
  isLoading = false, // default to not loading
  isLazyLoading = true, // default to lazy loading
  objectFit = 'cover',
  ...rest
}) => {
  const combinedStyle: React.CSSProperties = {
    maxWidth: width || '100%',
    height: height || 'auto',
    objectFit,
    ...style,
    display: isLoading ? 'none' : 'block',
  };

  return (
    <Box position="relative">
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || '100%'}
          animation={undefined}
          {...skeletonProps}
        />
      )}
      <picture>
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
          loading="lazy"
          style={combinedStyle}
          {...rest}
        />
      </picture>
    </Box>
  );
};

export default Image;

export const ClearFloat = styled(Box)({
  clear: 'both',
  display: 'block',
  width: '100%',
});

export const ShapeOutsideContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['float', 'width', 'shape', 'margin'].includes(prop as string),
})<{
  float?: 'left' | 'right';
  width?: string | number;
  shape?: 'circle' | 'ellipse' | 'inset' | 'polygon' | null;
  margin?: string | number;
}>(({
  float = 'left',
  width = '320px',
  shape = null,
  margin = '0 1rem 1rem 0',
}) => {
  const shapeValue =
    shape === 'circle'
      ? 'circle(50%)'
      : shape === 'ellipse'
        ? 'ellipse(50% 50% at 50% 50%)'
        : shape === 'inset'
          ? 'inset(10% 10% 10% 10%)'
          : shape === 'polygon'
            ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
            : null;

  return {
    float,
    width,
    margin: float === 'left' ? margin : '0 0 1rem 1rem',
    shapeOutside: shapeValue || 'none',
    WebkitShapeOutside: shapeValue || 'none', // Safari support
    ...(shapeValue && {
      clipPath: shapeValue,
      WebkitClipPath: shapeValue, // Safari support
    }),
  };
});

export const BackgroundImageContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      'src',
      'maxWidth',
      'height',
      'bgSize',
      'bgPosition',
      'borderRadius',
    ].includes(prop as string),
})<{
  src: string;
  maxWidth?: string | number;
  height?: string | number;
  bgSize?: 'contain' | 'cover' | string;
  bgPosition?: string;
  borderRadius?: string | number;
}>(
  ({
    src,
    maxWidth = '800px',
    height = '300px',
    bgSize = 'contain',
    bgPosition = 'center',
    borderRadius = 0,
  }) => ({
    width: '100%',
    maxWidth,
    height,
    margin: '0 auto',
    backgroundImage: `url(${src})`,
    backgroundPosition: bgPosition,
    backgroundSize: bgSize,
    backgroundRepeat: 'no-repeat',
    borderRadius,
    transition: 'background-image 0.3s ease-in-out',
  })
);

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
  borderRadius: '4px',
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

export function MobileImage({
  src,
  alt,
  width = '100%',
  height = 'auto',
}: Omit<ResponsiveImageProps, 'defaultSrc'>) {
  const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.up('md'));

  if (!src) {
    return null;
  }

  if (isDesktop) {
    return null;
  }

  return (
    <Image
      defaultSrc={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

/**
 * Usage Examples:
 *
 * 1. AspectRatioContainer:
 *
 * <AspectRatioContainer ratio={4/3} maxWidth="600px">
 *   <Image
 *     defaultSrc={landscapeImage}
 *     alt="Landscape with 4:3 aspect ratio"
 *   />
 * </AspectRatioContainer>
 *
 * 2. Enhanced BackgroundImageContainer:
 *
 * <BackgroundImageContainer
 *   src={backgroundImage}
 *   height="400px"
 *   bgSize="cover"
 *   bgPosition="center bottom"
 *   borderRadius="8px"
 * >
 *   <Typography
 *     variant="h2"
 *     color="white"
 *     sx={{ padding: 3, textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
 *   >
 *     Text overlaid on background image
 *   </Typography>
 * </BackgroundImageContainer>
 */



export const ContentImageGrid = styled(Box, {
  shouldForwardProp: (prop) => !['imageOnRight', 'gap'].includes(prop as string),
})<{
  imageOnRight?: boolean;
  gap?: number | string;
}>(({ theme, imageOnRight = true, gap = 2 }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto auto',
  gap: theme.spacing(gap),
  width: '100%',
  
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr',
    alignItems: 'flex-start',
    padding: theme.spacing(2, 0)
  },
}));

export const GridContent = styled(Box)<{ imageOnRight?: boolean }>(
  ({ theme, imageOnRight = true }) => ({
    order: 1,
    
    [theme.breakpoints.up('md')]: {
      order: imageOnRight ? 1 : 2,
    },
  })
);

export const GridImage = styled(Box)<{ imageOnRight?: boolean }>(
  ({ theme, imageOnRight = true }) => ({
    order: 2,
    padding: theme.spacing(0, 2),
    
    '& .aspect-ratio-container': {
      ...(theme.palette.mode === 'light' 
        ? {
            // Light mode styling - keeping the subtle shadow
            boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
            // transition: 'all 0.3s ease',
            // '&:hover': {
            //   boxShadow: '0 12px 24px rgba(0,0,0,0.18), 0 8px 12px rgba(0,0,0,0.12)',
            //   transform: 'translateY(-2px)',
            // },
          } 
        : {
            // Dark mode styling - clean border only, no shadow
            border: `4px solid ${theme.palette.grey[700]}`,
            // transition: 'all 0.3s ease',
            // '&:hover': {
            //   borderColor: theme.palette.primary.main,
            //   transform: 'translateY(-2px)',
            // },
          }
      ),
    },
    
    [theme.breakpoints.up('md')]: {
      order: imageOnRight ? 2 : 1,
      // padding: theme.spacing(0, 2),
    },
  })
);

interface ContentImageGridProps {
  imageOnRight?: boolean;
  gap?: number | string;
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export const ResponsiveContentImageGrid: React.FC<ContentImageGridProps> = ({
  imageOnRight = true,
  gap = 2,
  imageSrc,
  imageAlt,
  children,
  aspectRatio = 4/3,
  objectFit = 'cover'
}) => {
  return (
    <ContentImageGrid imageOnRight={imageOnRight} gap={gap}>
      <GridContent imageOnRight={imageOnRight}>
        {children}
      </GridContent>
      <GridImage imageOnRight={imageOnRight}>
        <AspectRatioContainer ratio={aspectRatio} className="aspect-ratio-container">
          <Image
            defaultSrc={imageSrc}
            alt={imageAlt}
            objectFit={objectFit}
          />
        </AspectRatioContainer>
      </GridImage>
    </ContentImageGrid>
  );
};