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

export const Route = createFileRoute('/learn/git/')({
  component: GitIndex,
  head: () => ({
    getTitle: () => 'Git & Version Control',
    meta: [
      {
        name: 'description',
        content:
          'Mastering Git version control from basic commands to advanced workflows and collaboration.',
      },
      {
        title: 'Git & Version Control',
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

function GitIndex() {
  const posts = [
    {
      title: 'Hello Git World',
      description:
        'Starting our Git journey with version control fundamentals and best practices',
      path: '/learn/git/hello-world',
      date: '2025-01-01',
      readTime: '6 min read',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Git & Version Control
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 3, fontWeight: 'normal' }}
        >
          Mastering version control and collaborative development
        </Typography>
        <Typography variant="body1" paragraph>
          Git is the backbone of modern software development. Whether you're
          working alone on a personal project or collaborating with a team of
          hundreds, understanding Git is essential for any developer. This
          section covers everything from basic Git commands to advanced
          workflows, branching strategies, and collaborative development
          practices.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Topics
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
