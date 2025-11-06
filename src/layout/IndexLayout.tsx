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
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useRouter } from '@tanstack/react-router';
import { ReactElement } from 'react';
import {
  useIsBreakpointUp,
  useIsBreakpointDown,
} from '@/context/BreakpointContext';

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useIsBreakpointUp('sm'); // Just for readability
  const isMobile = !isDesktop;

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
  const router = useRouter();
  const isTablet = useIsBreakpointDown('sm');

  // Show secondary drawer icon on learn routes
  const showSecondaryDrawer =
    router.state.location.pathname.startsWith('/learn/') &&
    router.state.location.pathname !== '/learn';

  return (
    <StyledAppBar id="AppBar" elevation={0}>
      <Toolbar id="AppBarToolbar">
        <StyledButtonBase to="/">
          <Typography variant="h6" color="primary.contrastText">
            JW
          </Typography>
        </StyledButtonBase>
        <Navigation
          isTablet={isTablet}
          showSecondaryDrawer={showSecondaryDrawer}
        />
      </Toolbar>
    </StyledAppBar>
  );
}

function MobileAppToolbar() {
  const { toggleOpen } = useToggle('navigation-drawer');
  const router = useRouter();

  // Show secondary drawer icon on learn routes
  const showSecondaryDrawer =
    router.state.location.pathname.startsWith('/learn/') &&
    router.state.location.pathname !== '/learn';

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
          <Navigation
            isMobile
            isTablet
            showSecondaryDrawer={showSecondaryDrawer}
          />
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
