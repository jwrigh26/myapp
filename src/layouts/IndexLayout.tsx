import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomNavigation from "components/BottomNavigation";

import { ReactNode } from "react";

interface IndexLayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <LayoutGrid>
        <Header id="header">
          <ToolbarSpacer />
        </Header>
        <Main id="main">{children}</Main>
        <Footer id="footer" />
      </LayoutGrid>
      {isMobile && <BottomNavigation />}
    </>
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
  backgroundColor: theme.palette.primary.main,
  backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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
