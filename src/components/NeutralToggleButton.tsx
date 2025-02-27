import Icon from '@/components/Icon';
import { styled } from '@mui/material/styles';
import MUIToggleButton from '@mui/material/ToggleButton';

interface NeutralToggleButtonProps {
  icon: string;
  onChange: (event?: React.MouseEvent<HTMLElement>) => void;
  selected: boolean;
  value: string;
  sx?: React.CSSProperties;
}

export default function NeutralToggleButton({
  icon,
  onChange: handleChange,
  selected: isSelected,
  value = 'neutralValue',
  sx,
}: NeutralToggleButtonProps) {
  return (
    <StyledNeutralToggleButton
      value={value}
      onChange={handleChange}
      selected={isSelected}
      size="small"
      sx={sx}
    >
      <Icon path={icon} fontSize="small" />
    </StyledNeutralToggleButton>
  );
}

const StyledNeutralToggleButton = styled(MUIToggleButton)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[400]
      : theme.palette.grey[700],
  borderColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[400]
      : theme.palette.grey[700],
  backgroundColor: 'transparent',
  transition: theme.transitions.create(
    ['color', 'border-color', 'background-color'],
    {
      duration: theme.transitions.duration.shortest,
    }
  ),

  '&:hover': {
    borderColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.05)',
  },

  '&.Mui-selected': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    borderColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.05)',

    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.12)',
    },
  },
}));
