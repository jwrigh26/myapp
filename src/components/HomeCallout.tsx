import Image, {
  ContentImageGrid,
  GridContent,
  GridImage,
  ResponsiveContentImageGrid,
} from '@/components/Image';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const CalloutBlurb = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
}));

const CalloutTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  textWrap: 'balance',
}));

const CalloutDescription = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  textWrap: 'balance',
}));

// Specialized container for consistent home page image sizing
const HomeImageContainer = styled(Box, {
  shouldForwardProp: (prop) => !['fixedHeight'].includes(prop as string),
})<{ fixedHeight?: string | number }>(({ theme, fixedHeight = '280px' }) => ({
  position: 'relative',
  width: '100%',
  height: fixedHeight,
  borderRadius: '2px',
  overflow: 'hidden',
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
        border: `2px solid ${theme.palette.grey[400]}`,
      }
    : {
        border: `4px solid ${theme.palette.grey[700]}`,
      }),

  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

// Specialized grid for home callouts with consistent image heights
const HomeContentImageGrid = styled(ContentImageGrid)(({ theme }) => ({
  // Override the responsive behavior to ensure consistent heights
  [theme.breakpoints.up('md')]: {
    alignItems: 'stretch', // Make both grid items the same height
  },
}));

interface HomeCalloutProps {
  title: string;
  description: string;
  imageKey: string;
  imageAlt: string;
  imageOnRight?: boolean;
  aspectRatio?: number; // Still kept for backward compatibility, but won't be used in fixed height mode
  caption?: string;
  mobileImageFirst?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  // New props for consistent sizing
  useFixedImageHeight?: boolean; // When true, uses fixed height instead of aspect ratio
  fixedImageHeight?: string | number; // Height for the image container (default: 280px)
  columns?: string; // Allow customization of grid columns
}

export default function HomeCallout({
  title,
  description,
  imageKey,
  imageAlt,
  imageOnRight = true,
  aspectRatio = 16 / 9,
  caption,
  mobileImageFirst = false,
  objectFit = 'cover',
  useFixedImageHeight = true, // Default to true for consistent home page styling
  fixedImageHeight = '280px',
  columns = '1fr 1fr',
}: HomeCalloutProps) {
  const theme = useTheme();

  // Use the 'home' asset category since this image is in the home directory
  const imageSources = createImageSources(imageKey as any, 'home');
  const defaultImageSrc = getDefaultImageSrc(imageKey as any, 'home');

  // Use the specialized HomeContentImageGrid for consistent sizing
  if (useFixedImageHeight) {
    return (
      <HomeContentImageGrid gap={3} columns={columns}>
        <GridContent
          imageOnRight={imageOnRight}
          mobileImageFirst={mobileImageFirst}
          gap={3}
        >
          <CalloutBlurb>
            <CalloutTitle variant="h3">{title}</CalloutTitle>
            <CalloutDescription variant="body1">
              {description}
            </CalloutDescription>
          </CalloutBlurb>
        </GridContent>
        <GridImage
          imageOnRight={imageOnRight}
          mobileImageFirst={mobileImageFirst}
        >
          <HomeImageContainer fixedHeight={fixedImageHeight}>
            <Image
              sources={imageSources}
              defaultSrc={defaultImageSrc}
              alt={imageAlt}
              objectFit={objectFit}
            />
          </HomeImageContainer>
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
                mt: 1,
                mb: 2,
              }}
            >
              {caption}
            </Typography>
          )}
        </GridImage>
      </HomeContentImageGrid>
    );
  }

  // Fallback to the original ResponsiveContentImageGrid for backward compatibility
  return (
    <ResponsiveContentImageGrid
      imageSrc={defaultImageSrc}
      sources={imageSources}
      imageAlt={imageAlt}
      imageOnRight={imageOnRight}
      aspectRatio={aspectRatio}
      caption={caption}
      mobileImageFirst={mobileImageFirst}
      gap={3}
      columns={columns}
      objectFit={objectFit}
    >
      <CalloutBlurb>
        <CalloutTitle variant="h3">{title}</CalloutTitle>
        <CalloutDescription variant="body1">{description}</CalloutDescription>
      </CalloutBlurb>
    </ResponsiveContentImageGrid>
  );
}
