import Image, { AspectRatioContainer } from '@/components/Image';
import { isFunction } from '@/utils/safety';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { isNil } from '@/utils/safety';

type PositionProps = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const CallToActionContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  padding: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.superLight,
  margin: 0,
}));

// Mobile banner container
const MobileBannerContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
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
  right: 16,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    padding: '7px',
    // Hide on mobile, show on desktop
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '174px',
      height: '174px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '214px',
      height: '214px',
      top: '60%',
    },
}));

const CircularImageInnerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: `3px solid ${theme.palette.common.white}`,
  overflow: 'hidden',
  position: 'relative',
}));

const ContentContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasImage',
})<{ hasImage?: boolean }>(({ theme, hasImage }) => ({
  [theme.breakpoints.up('md')]: {
    width: '100%',
    paddingRight: hasImage ? theme.spacing(4) : 0,
  },
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
  imageAlt?: string;
  imagePosition?: PositionProps;
}

export default function CallToAction({
  title,
  preSubtitle,
  subtitle,
  buttonText,
  onClick,
  imageSrc,
  imageAlt = 'Featured image',
  imagePosition,
}: CallToActionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  console.log('imagePosition', imagePosition);

  return (
    <>
      {/* Mobile Banner Image - only shown on mobile */}
      {imageSrc && (
        <MobileBannerContainer>
          <AspectRatioContainer ratio={16 / 9}>
            <Image defaultSrc={imageSrc} alt={imageAlt} objectFit="cover" />
          </AspectRatioContainer>
        </MobileBannerContainer>
      )}

      <CallToActionContainer>
        <ContentContainer hasImage={!!imageSrc}>
          {title && (
            <Typography
              variant="h1"
              color="common.white"
              gutterBottom={!isMobile}
            >
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
                color="primary.light"
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
        </ContentContainer>

        {/* Desktop Circular Image - only shown on desktop */}
        {imageSrc && (
          <CircularImageOuterContainer>
            <CircularImageInnerContainer>
              <Image
                defaultSrc={imageSrc}
                alt={imageAlt}
                objectFit="cover"
                width="auto"
                height={200}
                style={{ position: 'relative', ...imagePosition }}
              />
            </CircularImageInnerContainer>
          </CircularImageOuterContainer>
        )}
      </CallToActionContainer>
    </>
  );
}
