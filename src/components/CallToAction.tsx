import { isFunction } from '@/utils/safety';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

const CallToActionContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.superLight,
  margin: 0,
}));

const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.main} 70%, ${theme.palette.secondary.dark} 100%)`,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

interface CallToActionProps {
  title?: string;
  preSubtitle?: string;
  subtitle?: string;
  buttonText?: string;
  onClick?: () => void;
}

export default function CallToAction({
  title,
  preSubtitle,
  subtitle,
  buttonText,
  onClick,
}: CallToActionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <CallToActionContainer>
      {title && (
        <Typography variant="h1" color="common.white" gutterBottom={!isMobile}>
          {title}
        </Typography>
      )}
      <Stack direction={isMobile ? 'column' : 'row'} gap={1}>
        {preSubtitle && (
          <Typography
            variant="subtitle1"
            color="secondary.main"
            gutterBottom={!isMobile}
          >
            {preSubtitle}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant="subtitle1"
            color="primary.light"
            gutterBottom={!isMobile}
          >
            {subtitle}
          </Typography>
        )}
      </Stack>
      {isFunction(onClick) && (
        <CTAButton variant="contained" onClick={onClick}>
          {buttonText}
        </CTAButton>
      )}
    </CallToActionContainer>
  );
}
