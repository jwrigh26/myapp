import BackdropSection from '@/components/BackdropSection';
import HomeCallout from '@/components/HomeCallout';
import { LatestBlogDeck } from '@/features/blog';
import { HomeLayout } from '@/layout';
import { useBackgroundImageSrc } from '@/utils/images';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme } from '@mui/system';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
});

function HomeComponent() {
  const theme = useTheme();
  const heroBackgroundImage = useBackgroundImageSrc(
    '20250601-image-home-page-splash'
  );

  return (
    <HomeLayout>
      {/* Hero section in content zone */}
      <HeroSection
        id="hero-section"
        backgroundImageUrl={heroBackgroundImage}
        className="breakout"
      >
        {/* <HeroBackground id="hero-background" className="full-width" /> */}
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

      {/* Home callout section */}
      <Box component="section" sx={{ mb: 4 }}>
        <HomeCallout
          title="Building Better User Experiences"
          description="I'm passionate about creating intuitive, performant web applications that solve real problems. With expertise in React, TypeScript, and modern frontend architecture, I help teams deliver products that users love."
          imageKey="20250701-image-20250723-home1"
          imageAlt="Justin Wright working on frontend development"
          imageOnRight={true}
          aspectRatio={16 / 10}
          mobileImageFirst={false}
        />
      </Box>

      {/* Latest blog posts in content zone */}
      <BackdropSection showBackdrop={theme.palette.mode === 'light'}>
        <LatestBlogDeck />
      </BackdropSection>
    </HomeLayout>
  );
}

export const HeroSection = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'backgroundImageUrl',
})<{ backgroundImageUrl?: string }>(({ theme, backgroundImageUrl }) => {
  const alphaOffset = theme.palette.mode === 'dark' ? 0.88 : 0.44;
  const linearPrimaryGradient = `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, alphaOffset)} 0%, ${alpha(theme.palette.primary.main, alphaOffset)} 50%, ${alpha(theme.palette.primary.light, alphaOffset)} 100%)`;
  return {
    backgroundColor: theme.palette.primary.dark,
    backgroundImage: backgroundImageUrl
      ? `${linearPrimaryGradient}, url(${backgroundImageUrl})`
      : linearPrimaryGradient,
    backgroundBlendMode: 'multiply, normal',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // border:
    //   theme.palette.mode === 'light'
    //     ? `2px solid ${theme.palette.primary.main}`
    //     : 'none',
    borderTop: 'none',
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
