import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import { ReactNode } from "react";

interface IndexLayoutProps {
  children: ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <LayoutGrid>
      <Header>
        <ToolbarSpacer />
      </Header>
      <Main>{children}</Main>
      <Footer />
    </LayoutGrid>
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
}));

const Footer = styled(Box)(({ theme }) => ({
  gridArea: "footer",
  padding: 0,
  margin: 0,
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.secondary.main,
  height: 48,
}));

const Main = styled(Box)(({ theme }) => ({
  gridArea: "main",
  padding: 0,
  margin: 0,
  backgroundColor: theme.palette.background.default,
}));

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);
