import Icon from '@/components/Icon';
import { mdiArrowRight } from '@mdi/js';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/frontend-design/')({
  component: FrontendDesignIndex,
  head: () => ({
    getTitle: () => 'Frontend Design',
    meta: [
      {
        name: 'description',
        content:
          'Articles about frontend architecture, design systems, micro-frontends, and modern web development patterns.',
      },
      {
        title: 'Frontend Design',
      },
    ],
  }),
});

const PostCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const PostMeta = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(1),
}));

function FrontendDesignIndex() {
  const posts = [
    {
      title: 'Micro-Frontends Part 1: Not Quite Micro-Frontends',
      description:
        'How we built a modular front-end that scales without full micro-frontend complexity',
      path: '/blog/frontend-design/microfrontends-part1',
      date: '2024-12-15',
      readTime: '8 min read',
    },
    {
      title: 'Micro-Frontends Part 2: Module Federation Deep Dive',
      description:
        'Advanced patterns and practical implementation of Module Federation',
      path: '/blog/frontend-design/microfrontends-part2',
      date: '2024-12-16',
      readTime: '12 min read',
    },
    {
      title: 'Micro-Frontends Part 3: Shared Resources & Communication',
      description:
        'Managing shared state, styling, and inter-app communication in federated modules',
      path: '/blog/frontend-design/microfrontends-part3',
      date: '2024-12-17',
      readTime: '10 min read',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Frontend Design
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 3, fontWeight: 'normal' }}
        >
          Exploring modern frontend architecture, design systems, and scalable
          development patterns
        </Typography>
        <Typography variant="body1" paragraph>
          This section covers frontend architecture patterns, design systems,
          micro-frontends, and modern approaches to building scalable web
          applications. From component design to application architecture, we
          explore the tools and patterns that make frontend development more
          maintainable and performant.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Articles
        </Typography>

        {posts.map((post) => (
          <PostCard key={post.path}>
            <CardActionArea component={Link} to={post.path}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="h4" sx={{ mb: 1 }}>
                      {post.title}
                    </Typography>
                    <PostMeta>
                      {post.date} • {post.readTime}
                    </PostMeta>
                    <Typography variant="body2" color="text.secondary">
                      {post.description}
                    </Typography>
                  </Box>
                  <Icon
                    path={mdiArrowRight}
                    sx={{
                      ml: 2,
                      color: 'primary.main',
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </PostCard>
        ))}
      </Box>
    </Container>
  );
}
