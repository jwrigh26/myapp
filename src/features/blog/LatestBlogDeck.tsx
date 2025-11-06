import { formatDisplayDate } from '@/utils/date';
import { getThumbImageSrc } from '@/utils/images';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Link as RouterLink } from '@tanstack/react-router';
import { BlogPostCard, BlogPostGrid } from '@/components/blog';
import './blog.css'; // Import custom styles for the blog deck
import { useLatestBlogPosts } from './hooks/useBlogPosts';

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

export default function LatestBlogDeck() {
  const theme = useTheme();
  const { data: posts = [] } = useLatestBlogPosts(3);

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        p: 2,
      }}
    >
      <HeroCallout variant="h2">Latest Blog Posts</HeroCallout>
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
  );
}
