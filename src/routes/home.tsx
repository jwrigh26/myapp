import BackdropSection from '@/components/BackdropSection';
import HomeCallout from '@/components/HomeCallout';
import { LatestBlogDeck } from '@/features/blog';
import { PageLayout as HomeLayout } from '@/layout';
import { useBackgroundImageSrc } from '@/utils/images';
import { generateOpenGraphMeta } from '@/utils/openGraph';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled, useTheme, Theme } from '@mui/system';
import { useIsMobile } from '@/context/BreakpointContext';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
  head: () => ({
    title: 'Justin Wright - Senior Frontend Engineer with UX + Product Brain',
    meta: generateOpenGraphMeta({
      title: 'Justin Wright - Senior Frontend Engineer',
      description:
        'Senior Frontend Engineer with UX + Product Brain. I build intuitive, performant web applications that solve real problems using React, TypeScript, and modern frontend architecture.',
      imageKey: '20250701-image-20250723-home1',
      url: '/home',
      type: 'website',
    }),
  }),
});

function HomeComponent() {
  const theme = useTheme();
  const heroBackgroundImage = useBackgroundImageSrc(
    '20250601-image-home-page-splash'
  );

  const isMobile = useIsMobile();

  return (
    <HomeLayout>
      {/* Hero section in content zone */}
      <HeroSection
        id="hero-section"
        backgroundImageUrl={heroBackgroundImage}
        className={isMobile ? 'full-width' : 'breakout'}
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
      <CalloutSection component="section">
        <HomeCallout
          title="Lightning-Fast Code with Steady Focus"
          description="By day, I pair with AI to write shockingly good code at lightning speed.
By night, I code solo with my hands on the keyboard. Slow and steady. It keeps my skills sharp.
"
          imageKey="20250701-image-20250723-home1"
          imageAlt="Justin Wright working on frontend development"
          imageOnRight={true}
          mobileImageFirst={false}
          fixedImageHeight="300px" // Consistent height for all home callouts
          glow
        />
      </CalloutSection>
      <CalloutSection component="section">
        <HomeCallout
          title="Crafting Apps, Block by Block"
          description="Legos fueled my passion for software design and development.
I visualize apps as Lego bricks while I build them up in a blaze of text on my IDE.
I love it!
"
          imageKey="20250701-image-home2-1"
          imageAlt="Product strategy and development planning"
          imageOnRight={false}
          objectFit="cover"
          mobileImageFirst={false}
          fixedImageHeight="300px" // Same consistent height
          glow
        />
      </CalloutSection>

      {/* Latest blog posts in content zone */}
      <BackdropSection backdrop="primary">
        <LatestBlogDeck />
      </BackdropSection>
    </HomeLayout>
  );
}

export const HeroSection = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'backgroundImageUrl',
})<{ backgroundImageUrl?: string }>(({ theme, backgroundImageUrl }) => {
  const alphaOffset = theme.palette.mode === 'dark' ? 0.64 : 0.44;
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

export const CalloutSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(8),
  },
})) as typeof Box;
