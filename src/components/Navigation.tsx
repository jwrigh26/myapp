import LinkButton from '@/components/LinkButton';
import ToggleButton from '@/components/ToggleButton';
import { useDrawer } from '@/hooks/useContext';
import { mdiCog } from '@mdi/js';
import Divider from '@mui/material/Divider';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export default function Navigation() {
  const { isOpen, openDrawer } = useDrawer('settings-drawer');

  return (
    <NavStack direction="row" component="nav" gap={1}>
      <NavDivider orientation="vertical" flexItem sx={{ ml: 2 }} />
      <NavButton to="/Home">Home</NavButton>
      <NavButton to="/About">About</NavButton>
      <ToggleButton
        icon={mdiCog}
        onChange={openDrawer}
        selected={isOpen}
        value="settings"
      />
    </NavStack>
  );
}

// ################################################
// ### Styled Components
// ################################################

const NavButton = styled(LinkButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightRegular,
  textDecoration: 'none',
  padding: theme.spacing(0.5, 1),
  opacity: 0.8,
  borderRadius: 2,
  '&:hover': {
    // opacity: 0.6,
    backgroundColor: theme.mixins.decomposeColor(
      theme.palette.primary.light,
      0.5
    ),
  },
  '&.active': {
    opacity: 1.0,
    backgroundImage:
      theme.palette.mode === 'light'
        ? `linear-gradient(45deg, ${theme.palette.secondary.main} 60%, ${theme.palette.secondary.light} 100%)`
        : `linear-gradient(45deg, ${theme.palette.secondary.dark} 70%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.text.primary,
  },
}));

const NavStack = styled(Stack)<StackProps>(({ theme }) => ({
  width: '100%',
  padding: 0,
  margin: 0,
}));

const NavDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.mixins.decomposeColor(
    theme.palette.primary.contrastText,
    0.5
  ),
  // margin: theme.spacing(2, 2),
  margin: theme.spacing(0, 1),
}));
