import { useDrawer } from '@/hooks/useContext';
import { mdiCloseBoxOutline } from '@mdi/js';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMatchRoute } from '@tanstack/react-router';
import Icon from './Icon';
import CustomLink from './LinkButton';

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
  flexShrink: 1,
  width: width || theme.mixins.drawerWidth,
  display: 'block',
  ['& .MuiDrawer-paper']: {
    overFlowX: 'hidden',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      width: width || theme.mixins.drawerWidth,
      boxShadow: '4px 0 6px -3px rgba(0, 0, 0, 0.1)',
    },
  },
}));

interface PermanentDrawerProps extends DrawerProps {
  width?: number;
  secondary?: boolean; // If true, use secondary color scheme
  anchor?: 'left' | 'right';
}

export function PermanentDrawer({
  anchor = 'left',
  children,
  width,
}: PermanentDrawerProps) {
  const StyledDrawer = StyledPermanentDrawer;
  return (
    <StyledPermanentDrawer anchor={anchor} variant="permanent" width={width}>
      <ToolbarSpacer />
      {children}
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
}: DrawerProps) {
  return (
    <StyledTemporaryDrawer
      anchor={anchor}
      variant="temporary"
      open={open}
      onClose={handleClose}
    >
      {children}
    </StyledTemporaryDrawer>
  );
}

export const StyledMobileDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  boxSizing: 'border-box',
  zIndex: theme.zIndex.drawer + 2,
  ['& .MuiDrawer-paper']: {
    overFlowX: 'hidden',
    height: '100%',
    width: '80vw',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export function MobileDrawer({
  anchor = 'left',
  children,
  onClose: handleClose,
  open,
}: DrawerProps) {
  return (
    <StyledMobileDrawer
      anchor={anchor}
      variant="temporary"
      open={open}
      onClose={handleClose}
    >
      {/* <ToolbarSpacer /> */}
      {children}
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

export const MiniDrawerHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'space-between' : 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledMiniPrimaryDrawer = styled(Drawer, {
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
  header?: React.ReactNode;
  width?: number;
  drawerKey: string;
  anchor?: 'left' | 'right';
  secondary?: boolean; // If true, use secondary color scheme
}

export function MiniVariantDrawer({
  children,
  header,
  width = 256,
  drawerKey,
  anchor = 'left',
  secondary = false,
}: MiniVariantDrawerProps) {
  const theme = useTheme();
  const { isOpen: open, openDrawer, closeDrawer } = useDrawer(drawerKey, true);
  const matchRoute = useMatchRoute();

  const handleDrawerToggle = () => {
    if (open) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const headerColor = theme.mixins.decomposeColor(
    theme.palette.primary.contrastText,
    0.5
  );

  // Check if we're on the exact /blog route
  const isOnBlogOverview = !!matchRoute({
    to: '/blog',
    fuzzy: false, // Exact match only
  });

  // const StyledDrawer = secondary ? StyledMiniSecondaryDrawer : StyledMiniPrimaryDrawer;
  const StyledDrawer = StyledMiniPrimaryDrawer;

  return (
    <StyledDrawer variant="permanent" open={open} width={width} anchor={anchor}>
      <ToolbarSpacer />
      {header}
      <MiniContent open={open}>{children}</MiniContent>
    </StyledDrawer>
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

// Currently being used in NavigationDrawer and Settings

interface SheetProps {
  children?: React.ReactNode;
  sx?: object;
  className?: string;
  gap?: number;
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

export function Sheet({ children, sx, className, gap = 2 }: SheetProps) {
  return (
    <SheetPaper sx={sx} className={className}>
      <SheetContent gap={gap}>{children}</SheetContent>
    </SheetPaper>
  );
}

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);
