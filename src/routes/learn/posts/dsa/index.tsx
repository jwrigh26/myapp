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

export const Route = createFileRoute('/learn/posts/dsa/')({
  component: DsaIndex,
  head: () => ({
    getTitle: () => 'Data Structures & Algorithms',
    meta: [
      {
        name: 'description',
        content:
          'Exploring data structures, algorithms, and problem-solving techniques for efficient computing.',
      },
      {
        title: 'Data Structures & Algorithms',
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

function DsaIndex() {
  const posts = [
    {
      title: 'Hello DSA World',
      description:
        'Starting our journey through data structures and algorithms with fundamental concepts',
      path: '/learn/posts/dsa/hello-world',
      date: '2025-01-01',
      readTime: '4 min read',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Data Structures & Algorithms
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 3, fontWeight: 'normal' }}
        >
          Building blocks of efficient computing and problem-solving
        </Typography>
        <Typography variant="body1" paragraph>
          Data structures and algorithms are the heart of computer science. This
          section covers everything from basic arrays and linked lists to
          advanced topics like graph algorithms and dynamic programming. We'll
          explore not just how these concepts work, but when and why to use them
          in real-world applications.
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
