/**
 * Binary Search specific styled components
 * 
 * For shared loop components, import from @/components/loop
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Re-export shared loop components for convenience
export * from '@/components/loop';

// Binary Search specific components
export const StepContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StepTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.h6,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));

export const StepDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));
