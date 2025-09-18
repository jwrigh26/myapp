import Image, {
  AspectRatioContainer,
  type SourceProps,
} from '@/components/Image';
import { useDrawer } from '@/hooks/useContext';
import { formatDisplayDate } from '@/utils/date';
import { isFunction } from '@/utils/safety';
import { useIsMobile } from '@/context/BreakpointContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled, useTheme, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

type PositionProps = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const InternalWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(2, 0),
  maxWidth: 'var(--content-max-width)',
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 2),
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const CallToActionContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<{ drawerWidth?: number }>(({ theme, drawerWidth = 65 }) => ({
  display: 'block',
  padding: theme.spacing(2),
  position: 'relative',
  marginTop: 0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.superLight,
  margin: 0,
  isolation: 'isolate',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(4),
  },
}));

// Mobile banner container
const MobileBannerContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  width: '100%',
  // Only show on mobile
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const CircularImageOuterContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  width: '130px',
  height: '130px',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  padding: theme.spacing(1),
  // Hide on mobile, show on desktop
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: '174px',
    height: '174px',
    top: '64%',
    right: 0,
  },
  [theme.breakpoints.up('lg')]: {
    width: '214px',
    height: '214px',
    top: '53%',
    right: 0,
  },
  [theme.breakpoints.up('xl')]: {
    right: 0,
  },
}));

const CircularImageInnerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  // border: `3px solid ${theme.palette.common.white}`,
  overflow: 'hidden',
  position: 'relative',
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.main} 70%, ${theme.palette.secondary.dark} 100%)`,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

interface CallToActionProps {
  title?: string;
  preSubtitle?: string;
  subtitle?: string;
  buttonText?: string;
  onClick?: () => void;
  imageSrc?: string;
  sources?: SourceProps[];
  mobileImageSources?: SourceProps[]; // New prop for mobile image sources
  imageAlt?: string;
  imagePosition?: PositionProps;
  imageRatio?: number;
  date?: string; // New prop for date string
}

export default function CallToAction({
  title,
  preSubtitle,
  subtitle,
  buttonText,
  onClick,
  imageSrc,
  mobileImageSources,
  sources,
  imageAlt = 'Featured image',
  imageRatio = 16 / 9,
  imagePosition,
  date = '01-26-1982', // Default date string
}: CallToActionProps) {
  const theme = useTheme();
  const isMobile = useIsMobile();

  // Get drawer state to determine width
  const { isOpen: isDrawerOpen } = useDrawer('blog-drawer');
  const drawerWidth = isDrawerOpen ? 256 : 65;

  // Format the date string using the new utility
  const formattedDate = formatDisplayDate(date);

  // Determine the image configuration
  // Priority: sources (if provided) > mobileImageSources (on mobile) > imageSrc (fallback)
  const hasImage = !!(sources?.length || imageSrc || mobileImageSources);
  const defaultImageSrc = imageSrc || '';
  const imageSources = sources?.length ? sources : undefined;

  return (
    <>
      {/* Mobile Banner Image - only shown on mobile */}
      {isMobile && hasImage && (
        <MobileBannerContainer className="full-width">
          <AspectRatioContainer ratio={imageRatio}>
            <Image
              sources={mobileImageSources || sources}
              defaultSrc={defaultImageSrc}
              alt={imageAlt}
              objectFit="cover"
            />
          </AspectRatioContainer>
        </MobileBannerContainer>
      )}

      <CallToActionContainer
        id="call-to-action"
        className="full-width"
        drawerWidth={drawerWidth}
      >
        <InternalWrapper>
          {title && (
            <Typography variant="h1" color="common.white" gutterBottom>
              {title}
            </Typography>
          )}
          <Stack direction={isMobile ? 'column' : 'row'} gap={1}>
            {preSubtitle && (
              <Typography
                variant="subtitle1"
                color="secondary.main"
                gutterBottom={!isMobile}
              >
                {preSubtitle}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="subtitle1"
                color="primary.superLight"
                gutterBottom={!isMobile}
              >
                {subtitle}
              </Typography>
            )}
          </Stack>
          {isFunction(onClick) && (
            <CTAButton variant="contained" onClick={onClick}>
              {buttonText}
            </CTAButton>
          )}
          {/* Date display moved to bottom */}
          {formattedDate && (
            <Typography
              variant="caption"
              color="primary.superLight"
              sx={{ display: 'block', mt: { xs: 1, md: 0 } }}
              gutterBottom={isMobile}
            >
              {formattedDate}
            </Typography>
          )}

          {/* Desktop Circular Image - only shown on desktop */}
          {hasImage && (
            <CircularImageOuterContainer>
              <CircularImageInnerContainer>
                <Image
                  sources={imageSources}
                  defaultSrc={defaultImageSrc}
                  alt={imageAlt}
                  objectFit="cover"
                  width="auto"
                  height={200}
                  style={{ position: 'relative', ...imagePosition }}
                />
              </CircularImageInnerContainer>
            </CircularImageOuterContainer>
          )}
        </InternalWrapper>
      </CallToActionContainer>
    </>
  );
}
