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
  height?: number | string;
  style?: React.CSSProperties;
  skeletonProps?: React.ComponentProps<typeof Skeleton>; // Optional Skeleton props
}

const Image: React.FC<ResponsiveImageProps> = ({
  alt,
  defaultSrc,
  sources = [],
  width,
  height,
  style,
  skeletonProps,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    // Reset loading state when the src changes
    setLoading(false);
    setImgSrc(defaultSrc);
  }, [defaultSrc]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    // Optionally handle error state here
  };

  const combinedStyle: React.CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'cover' as const,
    ...style,
    display: loading ? 'none' : 'block',
  };

  return (
    <Box position="relative">
      {loading && (
        <Skeleton
          variant="rectangular"
          width={width || '100%'}
          height={height || 200}
          animation="wave"
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
          src={imgSrc || undefined}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          style={combinedStyle}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...rest}
        />
      </picture>
    </Box>
  );
};

export default Image;

/**
 *
 <ResponsiveImage
      defaultSrc={myImage}
      alt="Description of the image"
      width={300}
      height={200}
  />

 <ResponsiveImage
  alt="City skyline"
  defaultSrc="city-default.jpg"
  sources={[
    {
      media: "(min-width: 1024px)",
      srcSet: "city-large.jpg 2x, city-large@1x.jpg 1x",
      sizes: "100vw",
    },
    {
      media: "(min-width: 600px)",
      srcSet: "city-medium.jpg 2x, city-medium@1x.jpg 1x",
      sizes: "100vw",
    },
  ]}
/>
 
 */

export const FluidContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'maxWidth' && prop !== 'height',
})<BoxProps & { maxWidth?: string | number; height?: string | number }>(
  ({ maxWidth = '800px', height = 'auto' }) => ({
    width: '100%',
    maxWidth,
    margin: '0 auto',
    height,
    overflow: 'hidden',
  })
);

// Improved FloatImageContainer with configurable float direction and width
export const FloatImageContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['float', 'width', 'clearFloat'].includes(prop as string),
})<{
  float?: 'left' | 'right';
  width?: number | string;
  clearFloat?: boolean;
}>(({ theme, float = 'left', width = '320px', clearFloat = false }) => ({
  float,
  marginRight: float === 'left' ? theme.spacing(2) : 0,
  marginLeft: float === 'right' ? theme.spacing(2) : 0,
  marginBottom: theme.spacing(2),
  width,
  // Add clear property if clearFloat is true
  ...(clearFloat && {
    clear: 'both',
  }),
}));

// Add a utility component to clear floats
export const ClearFloat = styled(Box)({
  clear: 'both',
  display: 'block',
  width: '100%',
});

// Add this to your Image.tsx
export const ShapeOutsideContainer = styled(Box, {
    shouldForwardProp: (prop) => 
      !['float', 'width', 'shape', 'margin'].includes(prop as string),
  })<{ 
    float?: 'left' | 'right'; 
    width?: string | number;
    shape?: 'circle' | 'ellipse' | 'inset' | null;
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
      : null;
      
    return {
      float,
      width,
      margin: float === 'left' ? margin : '0 0 1rem 1rem',
      shapeOutside: shapeValue || 'none',
      ...(shapeValue && { clipPath: shapeValue }),
    };
  });

// // FluidContainer with custom maxWidth
// <FluidContainer maxWidth="1200px">
//   <ResponsiveImage
//     alt="Fluid landscape"
//     defaultSrc={landscapeImage}
//   />
// </FluidContainer>

// // FloatImageContainer with right float and custom width
// <Box>
//   <FloatImageContainer float="right" width={300}>
//     <ResponsiveImage
//       alt="Portrait image"
//       defaultSrc={portraitImage}
//     />
//   </FloatImageContainer>
//   <Typography variant="body1" paragraph>
//     Text content that wraps around the floated image...
//   </Typography>

//   {/* Clear the float at the end */}
//   <ClearFloat />
// </Box>

// Add a new BackgroundImageContainer
export const BackgroundImageContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['src', 'maxWidth', 'height'].includes(prop as string),
})<{
  src: string;
  maxWidth?: string | number;
  height?: string | number;
}>(({ src, maxWidth = '800px', height = '300px' }) => ({
  width: '100%',
  maxWidth,
  height,
  margin: '0 auto',
  backgroundImage: `url(${src})`,
  backgroundPosition: 'center',
  backgroundSize: 'contain', // or 'cover' to fill the container
  backgroundRepeat: 'no-repeat',
}));
