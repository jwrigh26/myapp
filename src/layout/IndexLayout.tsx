import Icon from '@/components/Icon';
import LinkButtonBase from '@/components/LinkButtonBase';
import Navigation from '@/components/Navigation';
import { NavigationDrawer } from '@/components/NavigationDrawer';
import { SettingsDrawer } from '@/features/settings';
import { useToggle } from '@/hooks/useContext';
import { mdiMenu } from '@mdi/js';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useRouter } from '@tanstack/react-router';
import { ReactElement } from 'react';

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = !isMobile; // Just for readability

  const router = useRouter();

  const isGameRoute = router.state.location.pathname
    .toLowerCase()
    .includes('game');

  return (
    <>
      <LayoutGrid>
        <Header id="header">
          {/* Desktop Appbar */}
          {isDesktop && <AppBarToolbar />}
          {/* Mobile Appbar */}
          {isMobile && <MobileAppToolbar />}
          <ToolbarSpacer />
        </Header>
        <Main id="main">{children}</Main>
        {/* Desktop Footer -- Hidden on mobile and game routes */}
        {!isGameRoute && isDesktop && <Footer id="footer" />}
        <SettingsDrawer desktop={isDesktop} />
        <NavigationDrawer desktop={isDesktop} />
      </LayoutGrid>
    </>
  );
}

// ################################################
// ### AppBars
// ################################################

function AppBarToolbar() {
  return (
    <StyledAppBar id="AppBar" elevation={0}>
      <Toolbar id="AppBarToolbar">
        <StyledButtonBase to="/">
          <Typography variant="h6" color="primary.contrastText">
            JW
          </Typography>
        </StyledButtonBase>
        <Navigation />
      </Toolbar>
    </StyledAppBar>
  );
}

function MobileAppToolbar() {
  const { isOpen, toggleOpen } = useToggle('navigation-drawer');
  const router = useRouter();
  const pathname = router.state.location.pathname;

  // Get the base path (e.g., "blog" from "/blog/posts/foo1")
  const pathParts = pathname.split('/').filter(Boolean);
  const basePath = pathParts.length > 0 ? pathParts[0] : null;

  const routePaths = {
    blog: '/blog',
    about: '/about',
    game: '/game',
    home: '/home',
  };

  // Format the base path to be capitalized (e.g., "Blog")
  const formattedBasePath = basePath
    ? basePath.charAt(0).toUpperCase() + basePath.slice(1)
    : null;

  // Note on how link below works safely with TS:
  // typeof routePaths gets the type of the object (its structure)
  // keyof then extracts all possible key names as a union type
  // The 'as' keyword performs a type assertion, ensuring basePath
  // can only be one of the valid keys

  return (
    <HideOnScroll>
      <StyledAppBar id="AppBar" elevation={1}>
        <Toolbar id="AppBarToolbar">
          <IconButton
            sx={{ mr: 1 }}
            edge="start"
            color="inherit"
            aria-label="open menu"
            onClick={toggleOpen}
          >
            <Icon path={mdiMenu} />
          </IconButton>
          <StyledButtonBase to="/">
            <Typography variant="h6" color="primary.contrastText">
              JW
            </Typography>
          </StyledButtonBase>
          <Navigation isMobile />
        </Toolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
}

// ################################################
// Hide Appbar on scroll
// ################################################

interface HideOnScrollProps {
  children: ReactElement<unknown>;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

// ################################################
// ### Styled Components
// ################################################

const LayoutGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: `
    "header"
    "main"
    "footer"
  `,
  minHeight: '100svh',
}));

const Header = styled(Box)(({ theme }) => ({
  gridArea: 'header',
  padding: 0,
  margin: 0,
}));

const Footer = styled(Box)(({ theme }) => ({
  gridArea: 'footer',
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.secondary.dark,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  height: 48,
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.down('sm')]: {
    height: 56,
    display: 'hidden',
  },
}));

const Main = styled(Box)(({ theme }) => ({
  gridArea: 'main',
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.background.paper,
}));

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  [theme.breakpoints.up('sm')]: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const StyledButtonBase = styled(LinkButtonBase)(({ theme }) => ({
  '&:hover': {
    opacity: 0.5,
  },
  '&:active': {
    opacity: 0.5,
  },
}));
