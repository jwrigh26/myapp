import LinkButton from '@/components/LinkButton';
import ToggleButton from '@/components/ToggleButton';
import { useDrawer } from '@/hooks/useContext';
import { mdiCog, mdiLink } from '@mdi/js';
import Divider from '@mui/material/Divider';
import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Icon from '@/components/Icon';
import IconButton from '@mui/material/IconButton';
import LinkIconButton from '@/components/LinkIconButton';
import { mdiLinkedin } from '@mdi/js';
import { mdiGithub } from '@mdi/js';
import MuiLink from '@mui/material/Link';

export default function Navigation({ isMobile = false }: { isMobile?: boolean }) {
  const { isOpen, openDrawer } = useDrawer('settings-drawer');

  return (
    <NavStack direction="row" component="nav" gap={1}>
      {!isMobile && (
        <>
          <NavDivider orientation="vertical" flexItem sx={{ ml: 2 }} />
          <NavButton to="/home">Home</NavButton>
          <NavButton to="/about">About</NavButton>
          <NavButton to="/blog">Blog</NavButton>
          <NavDivider orientation="vertical" flexItem sx={{ ml: 2 }} />
          <NavButton to="/learn">Learn</NavButton>
          <NavButton to="/game">Game</NavButton>
        </>
      )}
      <Stack direction="row" gap={0} sx={{ ml: 'auto' }}>
        <NavLinkIconButton
          to="https://github.com/jwrigh26"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon path={mdiGithub} />
        </NavLinkIconButton>
        <NavLinkIconButton
          to="https://www.linkedin.com/in/justin-wright-00147621/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon path={mdiLinkedin} />
        </NavLinkIconButton>
        <NavDivider orientation="vertical" flexItem sx={{ ml: 2 }} />
        <NavIconButton edge="end" onClick={openDrawer}>
          <Icon path={mdiCog} />
        </NavIconButton>
      </Stack>
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

const NavIconButton = styled(IconButton)(({ theme }) => {
  const isDarkMode = theme.palette.mode === 'dark';
  const opacity = 0.5;
  const color = theme.mixins.decomposeColor(
    theme.palette.common.white,
    opacity
  );
  return {
    borderRadius: theme.shape.borderRadius,
    color,
    '&:hover': {
      color: theme.palette.common.white,
      opacity: 1.0,
    },
  };
});

const NavLinkIconButton = styled(LinkIconButton)(({ theme }) => {
  const isDarkMode = theme.palette.mode === 'dark';
  const opacity = 0.5;
  const color = theme.mixins.decomposeColor(
    theme.palette.common.white,
    opacity
  );
  return {
    borderRadius: theme.shape.borderRadius,
    color,
    '&:hover': {
      color: theme.palette.common.white,
      opacity: 1.0,
    },
  };
});
