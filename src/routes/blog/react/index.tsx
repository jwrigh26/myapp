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

export const Route = createFileRoute('/blog/react/')({
  component: ReactIndex,
  head: () => ({
    getTitle: () => 'React',
    meta: [
      {
        name: 'description',
        content:
          'Articles about React patterns, hooks, performance optimization, and modern React development practices.',
      },
      {
        title: 'React',
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

function ReactIndex() {
  const posts = [
    {
      title: 'Attack of the Memo Monster',
      description:
        'My haunted past with React and memoization - why remembering names is important',
      path: '/blog/react/memo-monster',
      date: '2025-08-12',
      readTime: '8 min read',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          React
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 3, fontWeight: 'normal' }}
        >
          Exploring React patterns, hooks, performance optimization, and modern
          development practices
        </Typography>
        <Typography variant="body1" paragraph>
          This section covers React development patterns, component design,
          hooks, performance optimization, and modern React practices. From
          basic concepts to advanced patterns, we explore the tools and
          techniques that make React applications more maintainable and
          performant.
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
