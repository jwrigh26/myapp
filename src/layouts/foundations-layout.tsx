import { mdiMenu } from "@mdi/js";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Icon from "components/Icon";
import MobileNavigation from "components/MobileNavigation";
import Navigation from "components/Navigation";
import { Drawer as DesktopDrawer } from "features/foundations";
import { ReactElement } from "react";
import { Outlet } from "react-router";

// TODOs:
// - Add desktop drawer
// - Add mobile drawer

export default function FoundationsLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = !isMobile; // Just for readability

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
        <Main id="main">
          <Outlet />
        </Main>
        {/* Desktop Footer -- Hidden on mobile */}
        <Footer id="footer" />
        {/* Desktop Drawer */}
        <Drawer id="drawer">
          <DesktopDrawer />
        </Drawer>
      </LayoutGrid>
      {/* Only shown on mobile for navigation */}
      {isMobile && <MobileNavigation />}
    </>
  );
}

// ################################################
// ### AppBars
// ################################################

function AppBarToolbar() {
  const navigate = () => {
    console.log("Navigate");
  };
  return (
    <StyledAppBar id="AppBar" elevation={0}>
      <Toolbar id="AppBarToolbar">
        <StyledButtonBase onClick={navigate}>
          <Typography variant="h6">JW</Typography>
        </StyledButtonBase>
        <Navigation />
      </Toolbar>
    </StyledAppBar>
  );
}

function MobileAppToolbar() {
  const navigate = () => {
    console.log("Navigate");
  };
  const openDrawer = () => {
    console.log("Open Drawer");
  };

  const hasMenu = true;
  return (
    <HideOnScroll>
      <StyledAppBar id="AppBar" elevation={1}>
        <Toolbar id="AppBarToolbar">
          {hasMenu && (
            <IconButton
              sx={{ mr: 1 }}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openDrawer}
            >
              <Icon path={mdiMenu} />
            </IconButton>
          )}
          <StyledButtonBase onClick={navigate}>
            <Typography variant="h6">JW</Typography>
          </StyledButtonBase>
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
  display: "grid",
  minHeight: "100svh",
  gridTemplateRows: "auto 1fr auto",
  gridTemplateColumns: "1fr",
  gridTemplateAreas: `
    "header"
    "main"
    "footer"
  `,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: `${theme.mixins.drawerWidth || 240}px 1fr`,
    gridTemplateAreas: `
    "header header"
    "drawer main"
    "drawer footer"
  `,
  },
}));

const Header = styled(Box)(({ theme }) => ({
  gridArea: "header",
  padding: 0,
  margin: 0,
  // backgroundColor: theme.palette.primary.main,
  // backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
}));

const Footer = styled(Box)(({ theme }) => ({
  gridArea: "footer",
  padding: 0,
  margin: 0,
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.secondary.dark,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  height: 48,
  [theme.breakpoints.down("sm")]: {
    height: 56,
    display: "hidden",
    marginLeft: 0,
  },
}));

const Drawer = styled(Box)(({ theme }) => ({
  gridArea: "drawer",
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const Main = styled(Box)(({ theme }) => ({
  gridArea: "main",
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.background.paper,
  // Old way of setting width
  // marginLeft: theme.mixins.drawerWidth,
  // width: `calc(100% - ${theme.mixins.drawerWidth}px)`,
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
  [theme.breakpoints.up("md")]: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  "&:hover": {
    opacity: 0.8,
  },
  "&:active": {
    opacity: 0.6,
  },
}));
