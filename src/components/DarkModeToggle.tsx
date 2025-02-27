import Icon from '@/components/Icon';
import { useThemeMode } from '@/ThemeProvider';
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled, useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useEffect } from 'react';

const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  '& svg': {
    backgroundColor: theme.palette.secondary.main,
    width: 32,
    height: 32,
    padding: theme.spacing(0.5),
    borderRadius: '50%',
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20 / 2,
  },
}));

export default function DarkModeToggle() {
  const { toggleTheme } = useThemeMode();
  const theme = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleToggle = () => {
    const newMode = theme.palette.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('themeMode', newMode);
    document.documentElement.setAttribute('data-theme', newMode);
    toggleTheme();
  };

  return (
    <FormControlLabel
      control={
        <DarkModeSwitch
          checked={theme.palette.mode === 'dark'}
          onChange={handleToggle}
          icon={<Icon path={mdiWeatherSunny} />}
          checkedIcon={<Icon path={mdiWeatherNight} />}
        />
      }
      label=""
    />
  );
}
