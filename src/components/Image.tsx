import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

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
  margin = '0 1rem 1rem 0'
}) => {
  const shapeValue = shape === 'circle' 
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
      WebkitClipPath: shapeValue // Safari support
    }),
  };
});

export const BackgroundImageContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['src', 'maxWidth', 'height', 'bgSize', 'bgPosition', 'borderRadius'].includes(prop as string),
})<{
  src: string;
  maxWidth?: string | number;
  height?: string | number;
  bgSize?: 'contain' | 'cover' | string;
  bgPosition?: string;
  borderRadius?: string | number;
}>(({ 
  src, 
  maxWidth = '800px', 
  height = '300px',
  bgSize = 'contain',
  bgPosition = 'center',
  borderRadius = 0
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
}));

export const AspectRatioContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    !['ratio', 'maxWidth'].includes(prop as string),
})<{
  ratio?: number; // width/height (e.g., 16/9 = 1.78)
  maxWidth?: string | number;
}>(({ 
  ratio = 16/9, 
  maxWidth = '100%' 
}) => ({
  position: 'relative',
  width: '100%',
  maxWidth,
  height: 0,
  paddingBottom: `${(1 / ratio) * 100}%`,
  overflow: 'hidden',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}));


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