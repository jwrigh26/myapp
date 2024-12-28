import { mdiMenu } from "@mdi/js";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Divider from "@mui/material/Divider";
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
import { ReactElement } from "react";

import { ReactNode } from "react";

interface IndexLayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
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
        <Main id="main">{children}</Main>
        {/* Desktop Footer -- Hidden on mobile */}
        <Footer id="footer" />
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
  gridTemplateRows: "auto 1fr auto",
  gridTemplateColumns: "1fr",
  gridTemplateAreas: `
    "header"
    "main"
    "footer"
  `,
  minHeight: "100svh",
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
  backgroundImage: `linear-gradient(45deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
  height: 48,
  [theme.breakpoints.down("sm")]: {
    height: 56,
    display: "hidden",
  },
}));

const Main = styled(Box)(({ theme }) => ({
  gridArea: "main",
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

const LogoDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.mixins.decomposeColor(
    theme.palette.primary.contrastText,
    0.5
  ),
  margin: theme.spacing(2, 2),
}));
