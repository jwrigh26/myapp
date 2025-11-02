/**
 * VariableValue Component
 *
 * Displays a variable name (in a chip) positioned above its value.
 * Useful for showing code variables and their current values inline.
 */

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

const Container = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  margin: theme.spacing(0, 0.5),
}));

const VariableChip = styled(Chip)(({ theme }) => ({
  height: '20px',
  fontSize: '0.65rem',
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
  },
}));

const ValueText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '0.95rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[800]
      : theme.palette.grey[100],
}));

interface VariableValueProps {
  variable: string;
  value?: string | number;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export const VariableValue: React.FC<VariableValueProps> = ({
  variable,
  value,
  color = 'primary',
}) => {
  // If no value provided, just show the variable chip
  if (value === undefined) {
    return <VariableChip label={variable} size="small" color={color} />;
  }

  return (
    <Container>
      {variable && <VariableChip label={variable} size="small" color={color} />}
      <ValueText>{value}</ValueText>
    </Container>
  );
};

export default VariableValue;
