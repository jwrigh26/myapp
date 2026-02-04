/**
 * Shared styled components for loop iteration displays
 * 
 * These components are used by LoopStepComponents to create
 * consistent layouts for algorithm step visualization.
 */

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// Spacing constants for consistent gaps
export const SPACING = {
  section: 12,
  block: 8,
  chunk: 4,
  node: 2,
} as const;

// Typography Components for step content
export const StepSubTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));

export const StepBodyText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
}));

export const StepMonoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  fontWeight: 500,
  margin: theme.spacing(0, 0.5),
  color: theme.palette.text.primary,
  paddingBottom: theme.spacing(0.5),
}));

// Grid Components - Grid layout for expression/result pairs
export const StepGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.grey[50],
  '& > *': {
    // borderRight: `1px solid ${theme.palette.divider}`,
  },
  '& > *:nth-of-type(2n)': {
    borderRight: 'none',
  },
}));

export const StepRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'noBorderBottom',
})<{ noBorderBottom?: boolean }>(({ theme, noBorderBottom = false }) => ({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
  '& > *': {
    borderBottom: noBorderBottom ? 'none' : `1px solid ${theme.palette.divider}`,
  },
  '&:last-child > *': {
    borderBottom: 'none',
  },
}));

export const StepHeader = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'align' && prop !== 'showBorderRight',
})<{ align?: 'left' | 'right' | 'center'; showBorderRight?: boolean }>(
  ({ theme, align = 'left', showBorderRight = true }) => ({
    ...theme.typography.subtitle2,
    fontWeight: theme.typography.fontWeightSemiBold,
    padding: theme.spacing(1.5, 2),
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    letterSpacing: '0.05em',
    textAlign: align,
    ...(showBorderRight && { borderRight: `1px solid ${theme.palette.divider}` }),
  })
);

export const StepExpression = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.5),
  padding: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.divider}`,
}));

export const StepCaptionWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showBorderRight',
})<{ showBorderRight?: boolean }>(({ theme, showBorderRight = false }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.5),
  flexDirection: 'column',
  padding: 0,
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
  ...(showBorderRight && { borderRight: `1px solid ${theme.palette.divider}` }),
}));

export const StepResult = styled(Box, {
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

// General box components for variable state and results
export const StepBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'noMarginBottom',
})<{ noMarginBottom?: boolean }>(({ theme, noMarginBottom = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0),
  ...(!noMarginBottom && { marginBottom: theme.spacing(2) }),
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

export const StepContainer = styled(Box, {
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

export const StepCaptionSubtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.secondary.main,
  fontWeight: theme.typography.fontWeightSemiBold,
  marginBottom: theme.spacing(0.5),
}));

export const StepCaptionText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
  '& code': {
    fontFamily: 'monospace',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    padding: theme.spacing(0.25, 0.5),
    borderRadius: theme.shape.borderRadius / 2,
    fontSize: '0.9em',
  },
  '& strong': {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
  },
}));

export const StepCaptionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1, 2),
  // borderTop: `1px solid ${theme.palette.divider}`,
  width: '100%',
  height: '100%',
}));
