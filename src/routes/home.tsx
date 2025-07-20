import { LatestBlogDeck } from '@/features/blog';
import { PageLayout } from '@/layout';
import { useBackgroundImageSrc } from '@/utils/images';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, styled, useTheme } from '@mui/system';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
});

function HomeComponent() {
  const theme = useTheme();
  const isSizeXL = useMediaQuery(theme.breakpoints.down('xl'));
  const padding = isSizeXL ? 0 : 2;
  const heroBackgroundImage = useBackgroundImageSrc(
    '20250601-image-home-page-splash'
  );

  return (
    <PageLayout padding={padding}>
      <HeroSection id="hero-section" backgroundImageUrl={heroBackgroundImage}>
        <HeroCallout>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              textShadow:
                '2px 2px 12px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.4)',
              mb: 2,
              textWrap: 'balance',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontSize: {
                xs: '3rem',
                sm: '4rem',
                md: '5rem',
                lg: '6rem',
                xl: '7rem',
              },
            }}
          >
            Justin Wright
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.primary.superLight,
              textShadow: {
                xs: '2px 2px 10px rgba(0,0,0,0.6), 0 0 6px rgba(0,0,0,0.4)', // Stronger shadow on mobile
                md: '1px 1px 8px rgba(0,0,0,0.5), 0 0 4px rgba(0,0,0,0.3)', // Softer shadow on larger screens
              },
              textWrap: 'balance',
              fontWeight: {
                xs: 600,
                md: 500,
              },
              letterSpacing: '0.005em',
              fontSize: {
                xs: '1.2rem',
                sm: '1.4rem',
                md: '1.9rem',
                lg: '2.4rem',
              },
            }}
          >
            Senior Frontend Engineer with UX + Product Brain
          </Typography>
        </HeroCallout>
      </HeroSection>

      <LatestBlogDeck />
    </PageLayout>
  );
}

const alphaOffset = 0.7;

export const HeroSection = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'backgroundImageUrl',
})<{ backgroundImageUrl?: string }>(({ theme, backgroundImageUrl }) => {
  const linearPrimaryGradient = `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, alphaOffset)} 0%, ${alpha(theme.palette.primary.main, alphaOffset)} 50%, ${alpha(theme.palette.primary.light, alphaOffset)} 100%)`;
  return {
    backgroundColor: theme.palette.primary.dark,
    backgroundImage: backgroundImageUrl
      ? `${linearPrimaryGradient}, url(${backgroundImageUrl})`
      : linearPrimaryGradient,
    backgroundBlendMode: 'multiply, normal',
    backgroundSize: 'cover',
    backgroundPosition: 'center center', // Start with center, then adjust
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingBottom: 140,
    marginBottom: theme.spacing(4),
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingTop: 80,
      paddingBottom: 220,
      marginBottom: theme.spacing(8),
    },
  };
});

export const HeroCallout = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  textAlign: 'left',
  zIndex: 2,
  padding: theme.spacing(4),
  maxWidth: '800px',
  width: '100%',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg,
      rgba(0,0,0,0.3) 0%,
      rgba(0,0,0,0.16) 50%,
      rgba(0,0,0,0.18) 100%)`,
    borderRadius: theme.shape.borderRadius,
    zIndex: -1,
    backdropFilter: 'blur(0.5px)',
  },
}));

const MainHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: alpha(theme.palette.primary.contrastText, 0.7),
  marginBottom: theme.spacing(2),
  // Base size for smallest screens
  fontSize: 'clamp(1.5rem, 5vw, 2rem)',
  // Control line height to be tighter
  lineHeight: 1.1,

  // Small phones (320px+)
  [theme.breakpoints.up(320)]: {
    fontSize: 'clamp(1.8rem, 5.5vw, 2.5rem)',
  },

  // Medium phones (400px+)
  [theme.breakpoints.up(400)]: {
    fontSize: 'clamp(2.2rem, 6vw, 3rem)',
  },

  // Large phones (480px+)
  [theme.breakpoints.up(480)]: {
    fontSize: 'clamp(2.6rem, 6.5vw, 3.5rem)',
  },

  // Small tablets (600px+)
  [theme.breakpoints.up(600)]: {
    fontSize: 'clamp(3rem, 7vw, 4rem)',
  },

  // Tablets (768px+)
  [theme.breakpoints.up('md')]: {
    // 900px in MUI
    marginBottom: theme.spacing(3),
    fontSize: 'clamp(3.5rem, 7.5vw, 4.5rem)',
    lineHeight: 1.15, // Slightly looser for larger screens
  },

  // Small desktops (1024px+)
  [theme.breakpoints.up('lg')]: {
    // 1200px in MUI
    fontSize: 'clamp(4rem, 8vw, 5rem)',
  },

  // Large desktops (1280px+)
  [theme.breakpoints.up(1280)]: {
    fontSize: 'clamp(4.5rem, 9vw, 5.5rem)', // Reduced from 7rem to 5.5rem max
    lineHeight: 1.2, // More comfortable for reading at largest size
  },

  // Additional control for very large screens
  [theme.breakpoints.up(1600)]: {
    fontSize: '5.5rem', // Hard cap at 5.5rem for largest screens
  },

  zIndex: 2,
}));

const StatementBlock = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'baseline',
  gap: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    paddingBottom: theme.spacing(1),
    '&:after': {
      content: '""',
      display: 'block',
      width: '50%',
      translate: '50% 0',
      borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
      position: 'relative',
      top: theme.spacing(3),
    },
  },
}));

const SupportingStatement = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 'clamp(1.25rem, 4vw, 2rem)',
  textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
  width: 'max-content',
  lineHeight: 1.2,
}));

// Now refactor your Statement1, Statement2, Statement3 to use these size variants
const Statement1 = styled(SupportingStatement)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)',
  [theme.breakpoints.up('sm')]: {
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
  },
  [theme.breakpoints.up('md')]: {
    alignSelf: 'flex-start',
  },
}));

const Statement2 = styled(SupportingStatement)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.info.main}, ${theme.palette.info.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
  [theme.breakpoints.up('sm')]: {
    fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
  },
}));

const Statement3 = styled(SupportingStatement)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.common.white})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)',
  [theme.breakpoints.up('sm')]: {
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
  },
  [theme.breakpoints.up('md')]: {
    alignSelf: 'flex-end',
  },
}));
