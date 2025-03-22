import { mdiCloseBoxOutline } from '@mdi/js';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from './Icon';

const Content = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'relative',
}));

// ################################################
// ### Drawer
// ################################################

export const StyledPermanentDrawer = styled(Drawer, {
  shouldForwardProp: (prop: string) => prop !== 'width',
})<{ width?: number | string }>(({ theme, width }) => ({
  flexShrink: 0,
  width: width || theme.mixins.drawerWidth,
  display: 'none',
  ['& .MuiDrawer-paper']: {
    overFlowX: 'hidden',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.dark,
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      width: width || theme.mixins.drawerWidth,
      boxShadow: '4px 0 6px -3px rgba(0, 0, 0, 0.1)',
    },
  },
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    flexShrink: 0,
  },
}));

interface PermanentDrawerProps extends DrawerProps {
  width?: number;
}

export function PermanentDrawer({
  anchor = 'left',
  children,
  width,
  ...props
}: PermanentDrawerProps) {
  return (
    <StyledPermanentDrawer
      anchor={anchor}
      variant="permanent"
      width={width}
      {...props}
    >
      <Content>{children}</Content>
    </StyledPermanentDrawer>
  );
}

export const StyledTemporaryDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  boxSizing: 'border-box',
  zIndex: theme.zIndex.drawer + 1,
  ['& .MuiDrawer-paper']: {
    overFlowX: 'hidden',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      width: theme.mixins.drawerWidth,
    },
  },
}));

export function TemporaryDrawer({
  anchor = 'left',
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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing(1),
          backgroundColor: theme.palette.background.paper,
          '& *': {
            userSelect: 'none',
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
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
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
