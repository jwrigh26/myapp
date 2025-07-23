import { ResponsiveContentImageGrid } from '@/components/Image';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

const CalloutBlurb = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
}));

const CalloutTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const CalloutDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

interface HomeCalloutProps {
  title: string;
  description: string;
  imageKey: string;
  imageAlt: string;
  imageOnRight?: boolean;
  aspectRatio?: number;
  caption?: string;
  mobileImageFirst?: boolean;
}

export default function HomeCallout({
  title,
  description,
  imageKey,
  imageAlt,
  imageOnRight = true,
  aspectRatio = 16 / 9,
  caption,
  mobileImageFirst = false,
}: HomeCalloutProps) {
  const theme = useTheme();

  // Use the 'home' asset category since this image is in the home directory
  const imageSources = createImageSources(imageKey as any, 'home');
  const defaultImageSrc = getDefaultImageSrc(imageKey as any, 'home');

  return (
    <ResponsiveContentImageGrid
      imageSrc={defaultImageSrc}
      sources={imageSources}
      imageAlt={imageAlt}
      imageOnRight={imageOnRight}
      aspectRatio={aspectRatio}
      caption={caption}
      mobileImageFirst={mobileImageFirst}
      gap={3}
      columns="1.2fr 1fr" // Give more space to content
    >
      <CalloutBlurb>
        <CalloutTitle variant="h3">{title}</CalloutTitle>
        <CalloutDescription variant="body1">{description}</CalloutDescription>
      </CalloutBlurb>
    </ResponsiveContentImageGrid>
  );
}
