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
