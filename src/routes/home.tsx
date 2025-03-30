import { PageLayout } from '@/layout';
import { styled, useTheme, alpha } from '@mui/system';
import Box from '@mui/material/Box';
import { createFileRoute } from '@tanstack/react-router';
import Image, { AspectRatioContainer } from '@/components/Image';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import splashImage from '@/assets/home_page_splash.jpg';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
});

function HomeComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const padding = isMobile ? 0 : 2;

  const linearPrimaryGradient = `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`;
  return (
    <PageLayout padding={padding}>
      <HeroSection id="hero-section">
        <HeroCallOut>
          <MainHeader variant="h1">Justin Wright</MainHeader>
          {/* <Statement1 variant="h4">Code</Statement1> */}
          {/* <Statement2 variant="h4">Designing for People</Statement2> */}
          {/* <Statement3 variant="h4">Building with Purpose</Statement3> */}
        </HeroCallOut>

        <HeroBackground id="hero-background">
          <AspectRatioContainer ratio={4 / 3} id="hero-image">
            <Image defaultSrc={splashImage} alt="Micro-Frontends Part 1" />
          </AspectRatioContainer>
        </HeroBackground>
      </HeroSection>
      {/* <CodeBlock code={codeBlock} language="python" /> */}
    </PageLayout>
  );
}

export const HeroSection = styled(Stack)(({ theme }) => {
  const linearPrimaryGradient = `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`;
  return {
    backgroundColor: theme.palette.primary.dark,
    backgroundImage: linearPrimaryGradient,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(4),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  };
});

export const HeroCallOut = styled(Box)(({ theme }) => ({
  // flex: '0 0 60%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  // padding: theme.spacing(2),
}));

export const HeroBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '100%',
  height: 'auto',
  zIndex: 1,
  // flex: '0 0 40%',
  flex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    zIndex: -1,
    top: '8px',
    left: '8px',
    width: '100%',
    height: '100%',
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, 0.3)'
        : 'rgba(255, 255, 255, 0.7)',
  },
}));

const MainHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: alpha(theme.palette.primary.contrastText, 0.7),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(2.8rem, 6vw, 4rem)',
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
    fontSize: 'clamp(4rem, 10vw, 7rem)',
  },
  zIndex: 2,
}));

const SupportingStatement = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 'clamp(1.25rem, 4vw, 2rem)',
  position: 'absolute',
  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
}));

// Font size variations
const XSmallStatement = styled(SupportingStatement)(({ theme }) => ({
  fontSize: 'clamp(0.75rem, 2vw, 1.1rem)',
  [theme.breakpoints.up('md')]: {
    fontSize: 'clamp(0.8rem, 1.8vw, 1.2rem)',
  },
}));

const SmallStatement = styled(SupportingStatement)(({ theme }) => ({
  fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)',
  [theme.breakpoints.up('md')]: {
    fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
  },
}));

const MediumStatement = styled(SupportingStatement)(({ theme }) => ({
  fontSize: 'clamp(1.2rem, 3.2vw, 1.8rem)',
  [theme.breakpoints.up('md')]: {
    fontSize: 'clamp(1.3rem, 2.8vw, 2rem)',
  },
}));

const LargeStatement = styled(SupportingStatement)(({ theme }) => ({
  fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)',
  [theme.breakpoints.up('md')]: {
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
  },
}));

const XLargeStatement = styled(SupportingStatement)(({ theme }) => ({
  fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
  [theme.breakpoints.up('md')]: {
    fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
  },
}));

// Now refactor your Statement1, Statement2, Statement3 to use these size variants
const Statement1 = styled(LargeStatement)(({ theme }) => ({
  marginLeft: 0,
  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  opacity: 0.3,
  top: 0,
  right: 24,
}));

const Statement2 = styled(SmallStatement)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.info.main}, ${theme.palette.info.light})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  opacity: 0.5,
  top: 0,
  left: 128,
  zIndex: 2,
}));

const Statement3 = styled(MediumStatement)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.common.white})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  opacity: 0.5,
  bottom: -24,
  left: 128,
  zIndex: 2,
}));
