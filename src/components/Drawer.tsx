import { useDrawer } from '@/hooks/useContext';
import { mdiChevronLeft, mdiChevronRight, mdiCloseBoxOutline } from '@mdi/js';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
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

export const StyledMobileDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  boxSizing: 'border-box',
  zIndex: theme.zIndex.appBar + 1,
  ['& .MuiDrawer-paper']: {
    overFlowX: 'hidden',
    height: '100%',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export function MobileDrawer({
  anchor = 'left',
  children,
  onClose: handleClose,
  open,
  ...props
}: DrawerProps) {
  return (
    <StyledMobileDrawer
      anchor={anchor}
      variant="temporary"
      open={open}
      onClose={handleClose}
      {...props}
    >
      {/* <ToolbarSpacer /> */}
      <Content>{children}</Content>
    </StyledMobileDrawer>
  );
}

// ################################################
// ### Mini Variant Drawer
// ################################################

const openedMixin = (theme: Theme, width: number): CSSObject => ({
  width,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const MiniDrawerHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-end' : 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledMiniDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'width',
})<{ open?: boolean; width?: number }>(({ theme, width = 256 }) => ({
  width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  display: 'none',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme, width),
        '& .MuiDrawer-paper': {
          ...openedMixin(theme, width),
          backgroundColor: theme.palette.primary.dark,
          border: 'none',
          boxShadow: '4px 0 6px -3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
          ...closedMixin(theme),
          backgroundColor: theme.palette.primary.dark,
          border: 'none',
          boxShadow: '4px 0 6px -3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  ],
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    flexShrink: 0,
  },
}));

interface MiniVariantDrawerProps {
  children: React.ReactNode;
  width?: number;
  drawerKey: string;
}

export function MiniVariantDrawer({
  children,
  width = 256,
  drawerKey,
}: MiniVariantDrawerProps) {
  const theme = useTheme();
  const { isOpen: open, openDrawer, closeDrawer } = useDrawer(drawerKey, true);

  const handleDrawerToggle = () => {
    if (open) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  return (
    <StyledMiniDrawer variant="permanent" open={open} width={width}>
      <ToolbarSpacer />
      <MiniDrawerHeader open={open}>
        <IconButton onClick={handleDrawerToggle}>
          <Icon
            path={theme.direction === 'rtl' ? mdiChevronRight : mdiChevronLeft}
            sx={{
              color: theme.palette.primary.contrastText,
              transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          />
        </IconButton>
      </MiniDrawerHeader>
      <Divider sx={{ borderColor: theme.palette.primary.main }} />
      <MiniContent open={open}>{children}</MiniContent>
    </StyledMiniDrawer>
  );
}

const MiniContent = styled(Box)<{ open?: boolean }>(({ theme, open }) => ({
  height: '100%',
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  // Collapsed icons - show when closed, hide when open
  '& .collapsed-icon': {
    display: open ? 'none' : 'block',
  },

  // Expanded content - show when open, hide when closed
  '& .mini-drawer-content': {
    display: open ? 'block' : 'none',
  },
}));

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
  sx?: object;
  className?: string;
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

export function Sheet({ children, sx, className }: SheetProps) {
  return (
    <SheetPaper sx={sx} className={className}>
      <SheetContent gap={2}>{children}</SheetContent>
    </SheetPaper>
  );
}

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);
