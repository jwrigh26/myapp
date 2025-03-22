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


const StyledToggleButton = styled(MUIToggleButton)(({ theme }) => {
  console.log('Current palette mode:', theme.palette.mode);

  const isDarkMode = theme.palette.mode === 'dark';
  const opacity = isDarkMode ? 0.7 : 0.6;
  const color = theme.mixins.decomposeColor(theme.palette.common.white, opacity); 

  return {
    color,
    borderColor: color, 
    '&:hover': {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      opacity: 1.0,
    },
    '&.Mui-selected': {
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
      opacity: 1.0,
    },
  };
});
