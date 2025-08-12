import '@/features/blog/blog.css';
import { BlogPostCard, BlogPostGrid } from '@/components/blog';
import { PageLayout } from '@/layout';
import { formatDisplayDate } from '@/utils/date';
import { getThumbImageSrc } from '@/utils/images';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router';
import { useBlogPosts } from '@/features/blog';

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

const BlogHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

function BlogHome() {
  const { data: posts = [] } = useBlogPosts({ limit: 25 });

  return (
    <PageLayout>
      <BlogHeader>
        <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
          Blog
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Thoughts, lessons, and stories from the front lines of software
          engineering.
        </Typography>
      </BlogHeader>
      <Box sx={{ px: 2 }}>
        <BlogPostGrid>
          {posts.map((post) => (
            <BlogPostCard key={post.route} glow>
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
        </BlogPostGrid>
      </Box>
    </PageLayout>
  );
}
