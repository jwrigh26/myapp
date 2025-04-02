import Image, { AspectRatioContainer } from '@/components/Image';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, styled, useTheme } from '@mui/system';
import { createFileRoute } from '@tanstack/react-router';

import splashImage from '@/assets/home_page_splash.jpg';

export const Route = createFileRoute('/home')({
  component: HomeComponent,
});

function HomeComponent() {
  const theme = useTheme();
  const isSizeXL = useMediaQuery(theme.breakpoints.down('xl'));
  const padding = isSizeXL ? 0 : 2;

  return (
    <PageLayout padding={padding}>
      <HeroSection id="hero-section">
        <HeroCallOut>
          <MainHeader variant="h1">Justin Wright</MainHeader>
          <StatementBlock>
            <Statement1 variant="h4">Think</Statement1>
            <Statement2 variant="h4">Code</Statement2>
            <Statement3 variant="h4">Run</Statement3>
          </StatementBlock>
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
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(4),
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
  };
});

export const HeroCallOut = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  padding: theme.spacing(2),
}));

export const HeroBackground = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '100%',
  height: 'auto',
  zIndex: 1,
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
