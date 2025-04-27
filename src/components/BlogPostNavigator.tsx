import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { Link as RouterLink } from '@tanstack/react-router';

type PostNavInfo = {
  title: string;
  route: string;
  image: string;
  blurb?: string;
};

export default function BlogPostNavigator({
  prev,
  next,
  suggested,
}: {
  prev?: PostNavInfo;
  next?: PostNavInfo;
  suggested?: PostNavInfo;
}) {
  const items = [
    prev && { ...prev, label: 'Previous' },
    next && { ...next, label: 'Next' },
    !prev && !next && suggested && { ...suggested, label: 'Suggested' },
  ].filter(Boolean) as (PostNavInfo & { label: string })[];

  if (!items.length) return null;

  return (
    <Box
      sx={{
        pt: 2,
        mt: 8,
        mb: { xs: 8, sm: 2 },
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
                height: 'auto',
                minHeight: 140, // optional: for consistent card size
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  width: 120,
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
              <CardContent sx={{ flex: 1, pl: 2, py: 1, minWidth: 0 }}>
                <Typography variant="overline" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {item.title}
                </Typography>
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
                <Link
                  component={RouterLink}
                  to={item.route}
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 600, mt: 1, display: 'inline-block' }}
                >
                  Read &rarr;
                </Link>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
