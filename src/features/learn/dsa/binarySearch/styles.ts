/**
 * Shared styled components for Binary Search steps
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Spacing constants
export const SPACING = {
  section: 12,
  block: 8,
  chunk: 4,
  node: 2,
} as const;

// Step Container
export const StepContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

// Typography Components
export const StepTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.h6,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));

export const StepSubTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));

export const StepText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));

export const StepDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));

// Invariant Display Components
export const InvariantGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden', // Ensures border-radius clips internal borders
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.grey[50],
  // Add right border to all direct children except the last one
  '& > *': {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  '& > *:nth-child(2n)': {
    borderRight: 'none', // Remove right border from every 2nd child (last column)
  },
}));

export const InvariantRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'subgrid', // Inherit parent's column structure
  gridColumn: '1 / -1',            // Span the full width of parent grid
  '& > *': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '&:last-child > *': {
    borderBottom: 'none', // Remove bottom border from last row
  },
  '&:hover > *': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const InvariantHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  fontWeight: theme.typography.fontWeightSemiBold,
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  letterSpacing: '0.05em',
}));

export const InvariantExpression = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.5),
  padding: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.divider}`,
}));

export const InvariantResult = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: 'primary' | 'secondary' | 'text' }>(({ theme, color = 'text' }) => {
  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'text':
        return theme.palette.text.primary;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: theme.spacing(0.5),
    padding: theme.spacing(2),
    '& .MuiTypography-root': {
      fontWeight: theme.typography.fontWeightBold,
      color: getColor(),
    },
  };
});

// General Info/Display Box Components (for explanatory content in steps)
export const InvariantBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.grey[50],
  '& > :last-child': {
    borderBottom: 'none',
  },
}));

export const InvariantContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showBorderBottom',
})<{ showBorderBottom?: boolean }>(({ theme, showBorderBottom = true }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 2),
  ...(showBorderBottom && {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
}));

export const InvariantText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  fontWeight: 500,
  margin: theme.spacing(0, 0.5),
  color: theme.palette.text.primary,
  // Align with the value text (account for padding)
  paddingBottom: theme.spacing(0.5),
}));
