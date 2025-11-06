import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/system';
import { ReactNode } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';

interface BackdropSectionProps {
  children: ReactNode;
  backdrop?: 'default' | 'primary';
}

const BackdropBackground = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<{ drawerWidth?: number }>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const PrimaryBackground = styled(BackdropBackground)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : theme.palette.primary.dark,
  backgroundImage:
    theme.palette.mode === 'dark'
      ? undefined
      : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
}));

const ForeGround = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(1),
  },
}));

export default function BackdropSection({
  backdrop = 'default',
  children,
  ...props
}: BackdropSectionProps) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  // const className = isMobile ? 'full-width' : 'breakout';
  const className = 'full-width'; // Default className for full-width sections

  const BackgroundComponent =
    backdrop === 'primary' ? PrimaryBackground : BackdropBackground;

  return (
    <BackgroundComponent className={className} {...props}>
      <ForeGround>{children}</ForeGround>
    </BackgroundComponent>
  );
}
