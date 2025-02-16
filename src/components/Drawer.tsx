import Box from "@mui/material/Box";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Icon from "components/Icon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { mdiCloseBoxOutline } from "@mdi/js";

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
    backgroundColor: theme.palette.background.paper,
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
  onClose: handleClose,
  open,
  ...props
}: DrawerProps) {
  return (
    <StyledTemporaryDrawer
      anchor={anchor}
      variant="temporary"
      open={open}
      onClose={handleClose}
      {...props}
    >
      <Content>{children}</Content>
    </StyledTemporaryDrawer>
  );
}

// ################################################
// ### Drawer Header
// ################################################

interface HeaderProps {
  icon?: string;
  title: string;
  onClose: () => void;
}

export function DrawerHeader({
  icon,
  title,
  onClose: handleClose,
}: HeaderProps) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.spacing(1),
          backgroundColor: theme.palette.background.paper,
          "& *": {
            userSelect: "none",
          },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {icon && <Icon fontSize="medium" path={icon} />}
          <Typography variant="h6">{title}</Typography>
        </Stack>
        <IconButton onClick={handleClose}>
          <Icon fontSize="medium" path={mdiCloseBoxOutline} />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
}

// ################################################
// ### Drawer Content
// ################################################

interface SheetProps {
  children?: React.ReactNode;
}
const SheetPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const SheetContent = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  flex: 1,
}));

export function Sheet({ children }: SheetProps) {
  return (
    <SheetPaper>
      <SheetContent gap={2}>{children}</SheetContent>
    </SheetPaper>
  );
}
