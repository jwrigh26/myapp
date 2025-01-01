import Box from "@mui/material/Box";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const Content = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  position: "relative",
}));

// ################################################
// ### Drawer
// ################################################

export const StyledPermanentDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  width: theme.mixins.drawerWidth,
  display: "none",
  ["& .MuiDrawer-paper"]: {
    overFlowX: "hidden",
    height: "100%",
    width: "inherit",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "yellow",
  },
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

export function PermanentDrawer({
  anchor = "left",
  children,
  ...props
}: DrawerProps) {
  return (
    <StyledPermanentDrawer anchor={anchor} variant="permanent" {...props}>
      <Content>{children}</Content>
    </StyledPermanentDrawer>
  );
}

export const StyledTemporaryDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  boxSizing: "border-box",
  ["& .MuiDrawer-paper"]: {
    overFlowX: "hidden",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      width: theme.mixins.drawerWidth,
    },
  },
}));

export function TemporaryDrawer({
  anchor = "left",
  children,
  onClose,
  open,
  ...props
}: DrawerProps) {
  return (
    <StyledTemporaryDrawer anchor={anchor} variant="temporary" {...props}>
      <Content>{children}</Content>
    </StyledTemporaryDrawer>
  );
}
