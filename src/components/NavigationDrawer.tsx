import { MobileDrawer, Sheet } from '@/components/Drawer';
import Icon from '@/components/Icon';
import { navigationConfig } from '@/config/navigationConfig';
import { useDrawer } from '@/hooks/useContext';
import {
  NavLevel,
  type NavCategory,
  type NavHistoryEntry,
} from '@/types/navigation';
import { mdiArrowLeft, mdiChevronRight, mdiCloseBoxOutline } from '@mdi/js';
import { sleep } from '@/utils/utils';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';

// ################################################
// ### Configuration
// ################################################

// Import navigation data from configuration
const {
  mainItems: mainNavItems,
  blogCategories,
  learnCategories,
} = navigationConfig;

// ################################################
// ### Styled Components
// ################################################

// ################################################
// ### Helper Functions
// ################################################

/**
 * Determines the appropriate transform value for a navigation pane based on its state
 * @param active Whether this pane is the currently active one
 * @param previous Whether this pane was the previously active one
 * @param direction The navigation direction ('forward' or 'backward')
 * @returns The CSS transform value
 */
function getNavTransform(
  active: boolean,
  previous: boolean,
  direction: 'forward' | 'backward'
): string {
  // If active, the pane is centered in view
  if (active) {
    return 'translateX(0)';
  }

  // When navigating forward, inactive panels slide in from right or exit to left
  if (direction === 'forward') {
    // Previous screens exit to the left
    if (previous) {
      return 'translateX(-100%)';
    }
    // New screens enter from the right
    return 'translateX(100%)';
  }

  // When navigating backward, inactive panels slide in from left or exit to right
  else {
    // Previous screens exit to the right
    if (previous) {
      return 'translateX(100%)';
    }
    // New screens enter from the left
    return 'translateX(-100%)';
  }
}

const DrawerNavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  touchAction: 'none', // Prevents unwanted touch behaviors
  WebkitTapHighlightColor: 'transparent', // Removes default mobile tap highlight
  '&:hover': {
    backgroundColor: active
      ? theme.palette.action.selected
      : theme.palette.action.hover,
  },
  '&:active': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: theme.palette.primary.main,
}));

// Updated NavLevelPane component to handle transitions
const NavLevelPane = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'active' && prop !== 'previous' && prop !== 'direction',
})<{
  active: boolean;
  previous: boolean;
  direction: 'forward' | 'backward';
}>(({ theme, active, previous, direction }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backfaceVisibility: 'hidden',
  transition: theme.transitions.create(['transform', 'opacity'], {
    duration: theme.transitions.duration.standard,
    easing:
      direction === 'forward'
        ? theme.transitions.easing.easeOut
        : theme.transitions.easing.easeIn,
  }),
  transform: getNavTransform(active, previous, direction),
  opacity: 1, // Keep opacity at 1 for smoother transitions
  zIndex: active ? 2 : 1,
  // Only hide completely when not active or previous
  visibility: active || previous ? 'visible' : 'hidden',
}));

// ################################################
// ### Main Component
// ################################################

export function NavigationDrawer({ desktop }: { desktop: boolean }) {
  const { isOpen, closeDrawer } = useDrawer('navigation-drawer');
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  // State for navigation
  const [currentLevel, setCurrentLevel] = useState<NavLevel>(NavLevel.MAIN);
  const [previousLevel, setPreviousLevel] = useState<NavLevel | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<
    'forward' | 'backward'
  >('forward');
  const [navHistory, setNavHistory] = useState<NavHistoryEntry<NavCategory>[]>([
    { level: NavLevel.MAIN, title: 'Menu' },
  ]);

  // Current navigation context
  // const currentContext = navHistory[navHistory.length - 1];
  // console.log('Current Navigation Context:', currentContext);

  if (desktop) {
    return null; // Don't render the drawer on desktop
  }

  // Navigate back one level
  const navigateBack = async () => {
    let newHistory = null;
    if (navHistory.length > 1) {
      newHistory = [...navHistory];
      newHistory.pop();
      setPreviousLevel(currentLevel);
      setNavigationDirection('backward');
      setCurrentLevel(newHistory[newHistory.length - 1].level);
      setNavHistory(newHistory);
    }

    if (newHistory?.[0].level === NavLevel.MAIN) {
      // Wait for CSS transition to complete before resetting navigation state
      // This prevents the "slide from wrong direction" bug when navigating
      // Main → Blog → Back → Learn (ensures Learn slides from right, not left)
      // Duration matches theme.transitions.duration.standard (300ms)
      await sleep(300);

      setPreviousLevel(null);
      setNavigationDirection('forward');
      setCurrentLevel(NavLevel.MAIN);
      setNavHistory([{ level: NavLevel.MAIN, title: 'Menu' }]);
    }
  };

  // Navigate forward to a new level (only for blog/learn main levels)
  const navigateToSection = (level: NavLevel, title: string) => {
    setPreviousLevel(currentLevel);
    setNavigationDirection('forward');
    setCurrentLevel(level);
    setNavHistory([...navHistory, { level, title }]);
    router.navigate({ to: `/${level}` as any }); // ← This DOES change the route
  };

  // Navigate to a route and close drawer
  const navigateToRoute = (path: string) => {
    router.navigate({ to: path as any });
    closeDrawer();
  };

  return (
    <MobileDrawer anchor="left" open={isOpen} onClose={closeDrawer}>
      <DrawerNavContainer>
        {/* Main Navigation Level */}
        <NavLevelPane
          active={currentLevel === NavLevel.MAIN}
          previous={previousLevel === NavLevel.MAIN}
          direction={navigationDirection}
        >
          <DrawerHeader
            title="Menu"
            showBack={false}
            onBack={navigateBack}
            onClose={closeDrawer}
          />
          <Divider />
          <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
            <List>
              {mainNavItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <StyledListItemButton
                    active={
                      item.path
                        ? currentPath.startsWith(item.path)
                        : (item.id === 'blog' &&
                            currentLevel === NavLevel.BLOG) ||
                          (item.id === 'learn' &&
                            currentLevel === NavLevel.LEARN)
                    }
                    // In the main navigation onClick handler:
                    onClick={() => {
                      if (item.id === 'blog') {
                        navigateToSection(NavLevel.BLOG, 'Blog');
                      } else if (item.id === 'learn') {
                        navigateToSection(NavLevel.LEARN, 'Learn');
                      } else if (item.path) {
                        navigateToRoute(item.path);
                      }
                    }}
                  >
                    {item.icon && (
                      <StyledListItemIcon>
                        <Icon path={item.icon} />
                      </StyledListItemIcon>
                    )}
                    <ListItemText primary={item.title} />
                    {(item.id === 'blog' || item.id === 'learn') && (
                      <Icon path={mdiChevronRight} fontSize="small" />
                    )}
                  </StyledListItemButton>
                </ListItem>
              ))}
            </List>
            {/* Dark mode toggle removed as in your code */}
          </Sheet>
        </NavLevelPane>

        {/* Blog Categories Level */}
        <NavLevelPane
          active={currentLevel === NavLevel.BLOG}
          previous={previousLevel === NavLevel.BLOG}
          direction={navigationDirection}
        >
          <DrawerHeader
            title="Blog"
            showBack={true}
            onBack={navigateBack}
            onClose={closeDrawer}
          />
          <Divider />
          <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
            <List>
              {blogCategories.map((category) => (
                <ListItem key={category.id} disablePadding>
                  <StyledListItemButton
                    active={currentPath.startsWith(category.path || '')}
                    onClick={() => {
                      if (category.path) {
                        navigateToRoute(category.path + '/');
                      }
                    }}
                  >
                    {category.icon && (
                      <StyledListItemIcon>
                        <Icon path={category.icon} />
                      </StyledListItemIcon>
                    )}
                    <ListItemText primary={category.title} />
                  </StyledListItemButton>
                </ListItem>
              ))}
            </List>
          </Sheet>
        </NavLevelPane>

        {/* Learn Categories Level */}
        <NavLevelPane
          active={currentLevel === NavLevel.LEARN}
          previous={previousLevel === NavLevel.LEARN}
          direction={navigationDirection}
        >
          <DrawerHeader
            title="Learn"
            showBack={true}
            onBack={navigateBack}
            onClose={closeDrawer}
          />
          <Divider />
          <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
            <List>
              {learnCategories.map((category) => (
                <ListItem key={category.id} disablePadding>
                  <StyledListItemButton
                    active={currentPath.startsWith(category.path || '')}
                    onClick={() => {
                      if (category.path) {
                        navigateToRoute(category.path + '/');
                      }
                    }}
                  >
                    {category.icon && (
                      <StyledListItemIcon>
                        <Icon path={category.icon} />
                      </StyledListItemIcon>
                    )}
                    <ListItemText primary={category.title} />
                  </StyledListItemButton>
                </ListItem>
              ))}
            </List>
          </Sheet>
        </NavLevelPane>
      </DrawerNavContainer>
    </MobileDrawer>
  );
}

// ################################################
// ### Supporting Components
// ################################################

interface DrawerHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onClose: () => void;
}

function DrawerHeader({
  title,
  showBack = false,
  onBack,
  onClose,
}: DrawerHeaderProps) {
  const theme = useTheme();

  const handleOnClick = showBack && onBack ? onBack : onClose;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '& *': {
          userSelect: 'none',
        },
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          onClick={handleOnClick}
          sx={{
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': { opacity: 0.8 },
          }}
        >
          {showBack && onBack ? (
            <IconButton
              edge="start"
              onClick={onBack}
              size="small"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <Icon path={mdiArrowLeft} />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              onClick={onClose}
              size="small"
              sx={{ color: theme.palette.primary.contrastText }}
            >
              <Icon path={mdiCloseBoxOutline} />
            </IconButton>
          )}
          <Typography
            variant="h6"
            color="common.white"
            sx={{ '&:hover': { opacity: 0.8 } }}
          >
            {title}
          </Typography>
        </Stack>
        {showBack && onBack ? (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              ml: 'auto !important',
              color: theme.palette.primary.contrastText,
            }}
          >
            <Icon path={mdiCloseBoxOutline} />
          </IconButton>
        ) : null}
      </Stack>
    </Box>
  );
}
