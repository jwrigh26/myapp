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

export const Route = createFileRoute('/learn/python/')({
  component: PythonIndex,
  head: () => ({
    getTitle: () => 'Python Programming',
    meta: [
      {
        name: 'description',
        content:
          'Mastering Python programming from fundamentals to advanced concepts and real-world applications.',
      },
      {
        title: 'Python Programming',
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

function PythonIndex() {
  const posts = [
    {
      title: 'Whiteboarding Essentials',
      description:
        'Complete guide to Python fundamentals for technical interviews and whiteboarding sessions',
      path: '/learn/python/whiteboarding-essentials',
      date: '2025-09-23',
      readTime: '15 min read',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Python Programming
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ mb: 3, fontWeight: 'normal' }}
        >
          From basics to advanced Python programming and applications
        </Typography>
        <Typography variant="body1" paragraph>
          Python is one of the most versatile and beginner-friendly programming
          languages. Whether you're interested in web development, data science,
          machine learning, automation, or just learning to code, Python
          provides an excellent foundation. This section covers everything from
          Python basics to advanced features and real-world applications.
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
