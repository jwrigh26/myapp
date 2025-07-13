import Image, { AspectRatioContainer } from '@/components/Image';
import { PageLayout } from '@/layout';
import { formatDisplayDate } from '@/utils/date';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, styled, useTheme } from '@mui/system';
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router';

import { getDefaultImageSrc, getThumbImageSrc } from '@/utils/images';

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
            <Image
              defaultSrc={getDefaultImageSrc('20250601-image-home-page-splash')}
              alt="Micro-Frontends Part 1"
            />
          </AspectRatioContainer>
        </HeroBackground>
      </HeroSection>

      {/* Latest Blog Posts Section */}
      <Box sx={{ mt: 2, mb: 4, px: 2 }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
          Latest Blog Posts
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          gap={3}
          spacing={2}
          alignItems="stretch"
          justifyContent={{ xs: 'center', md: 'space-around' }}
        >
          {latestBlogPosts.map((post) => (
            <Card
              key={post.route}
              sx={{
                flex: 1,
                minWidth: 260,
                maxWidth: { xs: '100%', md: 480 },
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                width: { xs: '100%', md: 'auto' }, // Make cards full width on mobile
                alignSelf: { xs: 'stretch', md: 'flex-start' }, // Ensure stretch on mobile
              }}
            >
              <CardActionArea
                component={RouterLink}
                to={post.route}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                }}
              >
                <CardMedia
                  component="img"
                  image={post.image}
                  alt={post.title}
                  sx={{
                    height: 180,
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 0.5, display: 'block' }}
                  >
                    {formatDisplayDate(post.date)}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.blurb}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ px: 2, pb: 2 }}>
                <Link
                  component={RouterLink}
                  to={post.route}
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  Read more &rarr;
                </Link>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>
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

// Hardcoded latest blog posts
const latestBlogPosts = [
  {
    title:
      'Micro-Frontends Part 1: How We Built a Modular Front-End that Scales',
    blurb:
      'Discover how we built a scalable modular front-end using iframes, tackled inter-module communication, and managed version drift.',
    image: getThumbImageSrc('20250601-image-slide0'),
    route: '/blog/posts/frontend-design/microfrontends-part1',
    date: '2025-03-15',
  },
  {
    title: 'Micro-Frontends Part 2: Comparing Modern Alternatives',
    blurb:
      'Explore the pros and cons of Module Federation, Single-Spa, and iframe-based micro-frontends, and why we chose our approach.',
    image: getThumbImageSrc('20250601-image-slide10'),
    route: '/blog/posts/frontend-design/microfrontends-part2',
    date: '2025-04-21',
  },
  {
    title: 'Micro-Frontends Part 3: Lessons Learned',
    blurb:
      'Lessons from our micro-frontend journey: communication, messaging gotchas, and hard-won advice for modular front-end teams.',
    image: getThumbImageSrc('20250601-image-slide19'),
    route: '/blog/posts/frontend-design/microfrontends-part3',
    date: '2025-05-01',
  },
];
