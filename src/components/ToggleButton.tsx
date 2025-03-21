import Icon from '@/components/Icon';
import { styled } from '@mui/material/styles';
import MUIToggleButton from '@mui/material/ToggleButton';

interface ToggleButtonProps {
  icon: string;
  onChange: (event?: React.MouseEvent<HTMLElement>) => void;
  selected: boolean;
  value: string;
  color?: string;
}

export default function ToggleButton({
  icon,
  onChange: handleChange,
  selected: isSeleted,
  value = 'defaultValue',
  color = 'primary',
}: ToggleButtonProps) {
  return (
    <StyledToggleButton
      value={value}
      onChange={handleChange}
      selected={isSeleted}
      // selected={open[drawerId] || false}
      size="small"
    >
      <Icon path={icon} fontSize="small" />
    </StyledToggleButton>
  );
}

const StyledToggleButton = styled(MUIToggleButton)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.secondary.main,
  borderColor:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.secondary.main,
  '&:hover': {
    borderColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.secondary.light,
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.secondary.light,
  },
  '&.Mui-selected': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.secondary.light,
  },
}));
