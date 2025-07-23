import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { ReactNode } from 'react';

interface BackdropSectionProps {
  children: ReactNode;
  showBackdrop?: boolean;
  className?: string;
}

const SectionContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
}));

const BackdropBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100vw',
  backgroundColor: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  zIndex: -1,
}));

export default function BackdropSection({
  children,
  showBackdrop = true,
  className = 'content',
  ...props
}: BackdropSectionProps) {
  return (
    <SectionContainer className={className} {...props}>
      {showBackdrop && <BackdropBackground />}
      {children}
    </SectionContainer>
  );
}
