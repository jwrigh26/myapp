import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

// Define the structure for each image source
interface SourceProps {
  media: string; // e.g., "(min-width: 768px)"
  srcSet: string; // e.g., "image-large.jpg 2x, image-large@1x.jpg 1x"
  sizes?: string; // e.g., "100vw"
}

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
  ...rest
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const combinedStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
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
  gap?: number | string;
  columns?: string; // Customizable gridTemplateColumns for desktop
}>(({ theme, imageOnRight = true, gap = 2, columns = '1fr 1fr' }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr', // Default for mobile
  gridTemplateRows: 'auto auto',
  gap: theme.spacing(gap),
  width: '100%',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: columns, // Customizable for desktop
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
  gap?: number | string;
}>(({ theme, imageOnRight = true, mobileImageFirst = false, gap = 2 }) => ({
  order: mobileImageFirst ? 2 : 1, // Default mobile order
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(gap),

  [theme.breakpoints.up('md')]: {
    order: imageOnRight ? 1 : 2, // Desktop order
    gap: theme.spacing(gap),
  },
}));

export const GridImage = styled(Box, {
  shouldForwardProp: (prop) =>
    !['imageOnRight', 'mobileImageFirst'].includes(prop as string),
})<{ imageOnRight?: boolean; mobileImageFirst?: boolean }>(
  ({ theme, imageOnRight = true, mobileImageFirst = false }) => ({
    order: mobileImageFirst ? 1 : 2, // Default mobile order
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    '& .aspect-ratio-container': {
      ...(theme.palette.mode === 'light'
        ? {
            boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
            border: `2px solid ${theme.palette.grey[400]}`,
            // border: `2px solid ${theme.palette.secondary.light}`,
          }
        : {
            border: `4px solid ${theme.palette.grey[700]}`,
          }),
    },

    [theme.breakpoints.up('md')]: {
      order: imageOnRight ? 2 : 1, // Desktop order
      paddingBottom: 0,
      paddingTop: 0,
    },
  })
);

interface ContentImageGridProps {
  imageOnRight?: boolean;
  gap?: number | string;
  columns?: string; // Customizable gridTemplateColumns for desktop
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  caption?: string;
  mobileImageFirst?: boolean; // New prop for mobile-first image order
}

export const ResponsiveContentImageGrid: React.FC<ContentImageGridProps> = ({
  imageOnRight = true,
  gap = 2,
  imageSrc,
  imageAlt,
  children,
  aspectRatio = 4 / 3,
  objectFit = 'cover',
  caption,
  columns = '1fr 1fr', // Default desktop columns
  mobileImageFirst = false, // New prop for mobile-first image order
}) => {
  const theme = useTheme();

  return (
    <ContentImageGrid imageOnRight={imageOnRight} gap={gap} columns={columns}>
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
          <Image defaultSrc={imageSrc} alt={imageAlt} objectFit={objectFit} />
        </AspectRatioContainer>
        {caption && (
          <Typography
            variant="caption"
            sx={{
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.main,
              display: 'block',
              textAlign: 'center',
              marginTop: theme.spacing(1),
              marginBottom: theme.spacing(2),
            }}
          >
            {caption}
          </Typography>
        )}
      </GridImage>
    </ContentImageGrid>
  );
};
