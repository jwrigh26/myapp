import { createFileRoute, Link as RouterLink } from '@tanstack/react-router';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import { styled } from '@mui/system';
import { formatDisplayDate } from '@/utils/date';

import CallOutImage from '@/assets/Slide0.jpeg';
import CallOutImage2 from '@/assets/Slide10.jpeg';
import TechDebt from '@/assets/Slide19.jpeg';

export const Route = createFileRoute('/blog/')({
  component: BlogHome,
  head: () => ({
    meta: [
      {
        name: 'Blog',
        content: 'My Blog',
      },
      {
        title: 'Blog',
      },
    ],
  }),
});

function BlogHome() {
  return (
    <PageLayout>
      <BlogHeader>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
          Blog
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Thoughts, lessons, and stories from the front lines of software engineering.
        </Typography>
      </BlogHeader>
      <Box sx={{ px: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          gap={3}
          spacing={2}
          alignItems="stretch"
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          flexWrap="wrap"
        >
          {allBlogPosts.map((post) => (
            <Card
              key={post.route}
              sx={{
                flex: 1,
                minWidth: 260,
                maxWidth: { xs: '100%', md: 420 },
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                width: { xs: '100%', md: 'auto' },
                alignSelf: { xs: 'stretch', md: 'flex-start' },
              }}
            >
              <CardActionArea
                component={RouterLink}
                to={post.route}
                sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
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
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
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

const BlogHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

// For now, reuse the same posts as home page
const allBlogPosts = [
  {
    title: 'Micro-Frontends Part 1: How We Built a Modular Front-End that Scales',
    blurb:
      'Discover how we built a scalable modular front-end using iframes, tackled inter-module communication, and managed version drift.',
    image: CallOutImage,
    route: '/blog/posts/frontend-design/microfrontends-part1',
    date: '2025-03-15',
  },
  {
    title: 'Micro-Frontends Part 2: Comparing Modern Alternatives',
    blurb:
      'Explore the pros and cons of Module Federation, Single-Spa, and iframe-based micro-frontends, and why we chose our approach.',
    image: CallOutImage2,
    route: '/blog/posts/frontend-design/microfrontends-part2',
    date: '2025-04-21',
  },
  {
    title: 'Micro-Frontends Part 3: Lessons Learned',
    blurb:
      'Lessons from our micro-frontend journey: communication, messaging gotchas, and hard-won advice for modular front-end teams.',
    image: TechDebt,
    route: '/blog/posts/frontend-design/microfrontends-part3',
    date: '2025-05-01',
  },
];
