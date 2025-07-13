import { formatDisplayDate } from '@/utils/date';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from '@tanstack/react-router';

type BlogPostProps = {
  title: string;
  route: string;
  image: string;
  blurb?: string;
  date?: string;
};

interface BlogPostNavigatorProps {
  prev?: BlogPostProps;
  next?: BlogPostProps;
  suggested?: BlogPostProps;
}

export default function BlogPostNavigator({
  prev,
  next,
  suggested,
}: BlogPostNavigatorProps) {
  const items = [
    prev && { ...prev, label: 'Previous' },
    next && { ...next, label: 'Next' },
    !prev && !next && suggested && { ...suggested, label: 'Suggested' },
  ].filter(Boolean) as (BlogPostProps & { label: string })[];

  if (!items.length) return null;

  return (
    <Box
      sx={{
        pt: 2,
        mt: 8,
        mb: { xs: 4, sm: 2 },
        backgroundColor: 'background.default',
        borderTop: '2px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: 700,
          pl: 2,
          mb: 1,
          textAlign: { xs: 'left', sm: 'left' },
        }}
      >
        Quick Navigation
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="stretch"
        justifyContent={{ xs: 'stretch', sm: 'flex-start' }}
        sx={{ p: 2, gap: 2 }}
      >
        {items.map((item) => (
          <Card
            key={item.route}
            sx={{
              minWidth: { xs: 'unset', sm: 260 },
              maxWidth: { xs: 'unset', sm: 400 },
              width: { xs: '100%', sm: 'auto' },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 2,
              height: 'auto',
            }}
          >
            <CardActionArea
              component={RouterLink}
              to={item.route}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                height: '100%', // Make CardActionArea fill the Card height
                minHeight: 140,
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  width: 120,
                  objectFit: 'cover',
                  borderTopLeftRadius: 1,
                  borderBottomLeftRadius: 1,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  alignSelf: 'stretch',
                }}
              />
              <CardContent
                sx={{
                  flex: 1,
                  pl: 2,
                  py: 1,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: 200,
                }}
              >
                <Typography variant="overline" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
                {item.date && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, mb: 2, display: 'block' }}
                  >
                    {formatDisplayDate(item.date)}
                  </Typography>
                )}
                {item.blurb && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      mt: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      lineHeight: 1.4,
                      maxHeight: '2.8em',
                    }}
                  >
                    {item.blurb}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="primary.main"
                  sx={{ fontWeight: 600, mt: 1, display: 'inline-block' }}
                >
                  Read &rarr;
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
