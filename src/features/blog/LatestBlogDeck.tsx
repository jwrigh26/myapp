import { formatDisplayDate } from '@/utils/date';
import { getThumbImageSrc } from '@/utils/images';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Link as RouterLink } from '@tanstack/react-router';
import './blog.css'; // Import custom styles for the blog deck

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

const HeroCallout = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
  position: 'relative',
  display: 'inline-block',
  padding: theme.spacing(2),
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

const BlogPostCard = styled(Card)(({ theme }) => ({
  flex: 1,
  minWidth: 260,
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 480,
  },
  // Only show border in light mode
  border:
    theme.palette.mode === 'light'
      ? `1px solid ${theme.palette.primary.dark}`
      : 'none',
  minHeight: '380px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 3px 6px rgba(0,0,0,0.12), 0px 1.5px 3px rgba(0,0,0,0.08)',
  width: '100%',
  height: '440px',
  [theme.breakpoints.up('md')]: {
    width: 'auto',
  },
  alignSelf: 'stretch',
  [theme.breakpoints.up('md')]: {
    alignSelf: 'flex-start',
  },
}));

export default function LatestBlogDeck() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        p: 2,
      }}
    >
      <HeroCallout variant="h2">Latest Blog Posts</HeroCallout>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        {latestBlogPosts.map((post) => (
          <BlogPostCard key={post.route}>
            <div className="glowing-border" />
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
          </BlogPostCard>
        ))}
      </Box>
    </Box>
  );
}
