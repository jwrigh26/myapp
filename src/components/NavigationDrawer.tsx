import { MobileDrawer, Sheet } from '@/components/Drawer';
import Icon from '@/components/Icon';
import { useDrawer } from '@/hooks/useContext';
import {
  mdiArrowLeft,
  mdiBookOpen,
  mdiChevronRight,
  mdiGamepadVariant,
  mdiHome,
  mdiInformation,
  mdiPencilRuler,
  mdiReact,
} from '@mdi/js';
import Box from '@mui/material/Box';
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
import { useEffect, useState } from 'react';

// ################################################
// ### Types & Constants
// ################################################

// Define all possible navigation levels
enum NavLevel {
  MAIN = 'main',
  BLOG = 'blog',
  BLOG_CATEGORY = 'blog-category',
  BLOG_POST_DETAILS = 'blog-post-details',
}

// Navigation item structure
interface NavItem {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
}

// Navigation history entry
interface NavHistoryEntry {
  level: NavLevel;
  title: string;
  data?: any;
}

// Main navigation data
const mainNavItems: NavItem[] = [
  { id: 'home', title: 'Home', path: '/home', icon: mdiHome },
  { id: 'about', title: 'About', path: '/about', icon: mdiInformation },
  { id: 'blog', title: 'Blog', icon: mdiBookOpen },
  { id: 'game', title: 'Game', path: '/game', icon: mdiGamepadVariant },
];

// Blog categories
const blogCategories: NavItem[] = [
  {
    id: 'frontend-design',
    title: 'Frontend Design',
    icon: mdiPencilRuler,
    path: '/blog/posts/frontend-design',
  },
  {
    id: 'react-patterns',
    title: 'React Patterns',
    icon: mdiReact,
    path: '/blog/posts/react-patterns',
  },
];

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

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
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
  const theme = useTheme();

  // State for navigation
  const [currentLevel, setCurrentLevel] = useState<NavLevel>(NavLevel.MAIN);
  const [previousLevel, setPreviousLevel] = useState<NavLevel | null>(null);
  const [navigationDirection, setNavigationDirection] = useState<
    'forward' | 'backward'
  >('forward');
  const [navHistory, setNavHistory] = useState<NavHistoryEntry[]>([
    { level: NavLevel.MAIN, title: 'Menu' },
  ]);
  const [categoryPosts, setCategoryPosts] = useState<Record<string, NavItem[]>>(
    {}
  );

  // Current navigation context
  const currentContext = navHistory[navHistory.length - 1];

  // Load posts for a category when needed
  useEffect(() => {
    if (currentLevel === NavLevel.BLOG_CATEGORY) {
      const categoryId = currentContext.data?.id;
      const categoryPath = currentContext.data?.path;

      if (categoryId && categoryPath && !categoryPosts[categoryId]) {
        // Get posts for this category from router
        const postsInCategory = Object.values(router.routesByPath)
          .filter((route: any) => {
            return (
              route.fullPath.startsWith(categoryPath) &&
              route.fullPath !== categoryPath
            );
          })
          .map((route: any) => {
            const pathParts = route.fullPath.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            const formattedTitle = lastPart
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c: string) => c.toUpperCase());

            return {
              id: route.id,
              title: route.options?.title || formattedTitle,
              path: route.fullPath,
              icon: mdiBookOpen,
            };
          });

        setCategoryPosts((prev) => ({
          ...prev,
          [categoryId]: postsInCategory,
        }));
      }
    }
  }, [currentLevel, currentContext, router.routesByPath]);

  if (desktop) {
    return null; // Don't render the drawer on desktop
  }

  // Navigate forward to a new level
  const navigateForward = (level: NavLevel, title: string, data?: any) => {
    setPreviousLevel(currentLevel);
    setNavigationDirection('forward');
    setCurrentLevel(level);
    setNavHistory([...navHistory, { level, title, data }]);
  };

  // Navigate back one level
  const navigateBack = () => {
    if (navHistory.length > 1) {
      const newHistory = [...navHistory];
      newHistory.pop();
      setPreviousLevel(currentLevel);
      setNavigationDirection('backward');
      setCurrentLevel(newHistory[newHistory.length - 1].level);
      setNavHistory(newHistory);
    }
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
          <DrawerHeader title="Menu" showBack={false} onClose={closeDrawer} />
          <Divider />
          <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
            <List>
              {mainNavItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <StyledListItemButton
                    onClick={() => {
                      if (item.id === 'blog') {
                        navigateForward(NavLevel.BLOG, 'Blog');
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
                    {item.id === 'blog' && (
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
                    onClick={() => {
                      navigateForward(
                        NavLevel.BLOG_CATEGORY,
                        category.title,
                        category
                      );
                    }}
                  >
                    {category.icon && (
                      <StyledListItemIcon>
                        <Icon path={category.icon} />
                      </StyledListItemIcon>
                    )}
                    <ListItemText primary={category.title} />
                    <Icon path={mdiChevronRight} fontSize="small" />
                  </StyledListItemButton>
                </ListItem>
              ))}
            </List>
          </Sheet>
        </NavLevelPane>

        {/* Blog Posts in Category Level */}
        <NavLevelPane
          active={currentLevel === NavLevel.BLOG_CATEGORY}
          previous={previousLevel === NavLevel.BLOG_CATEGORY}
          direction={navigationDirection}
        >
          <DrawerHeader
            title={currentContext.title || 'Posts'}
            showBack={true}
            onBack={navigateBack}
            onClose={closeDrawer}
          />
          <Divider />
          <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
            {currentContext.data?.id &&
            categoryPosts[currentContext.data.id] ? (
              <List>
                {categoryPosts[currentContext.data.id].map((post) => (
                  <ListItem key={post.id} disablePadding>
                    <StyledListItemButton
                      onClick={() => {
                        if (post.path) {
                          navigateToRoute(post.path);
                        }
                      }}
                    >
                      <ListItemText
                        primary={post.title}
                        primaryTypographyProps={{
                          noWrap: true,
                          sx: { maxWidth: '210px' },
                        }}
                      />
                    </StyledListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Loading posts...
                </Typography>
              </Box>
            )}
          </Sheet>
        </NavLevelPane>

        {/* Blog Post Details Level (if needed in the future) */}
        <NavLevelPane
          active={currentLevel === NavLevel.BLOG_POST_DETAILS}
          previous={previousLevel === NavLevel.BLOG_POST_DETAILS}
          direction={navigationDirection}
        >
          <DrawerHeader
            title={currentContext.title || 'Post Details'}
            showBack={true}
            onBack={navigateBack}
            onClose={closeDrawer}
          />
          <Divider />
          <Sheet sx={{ flexGrow: 1, overflow: 'auto' }}>
            {/* Future implementation for post details if needed */}
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
      <Stack direction="row" spacing={1} alignItems="center">
        {showBack && onBack && (
          <IconButton
            edge="start"
            onClick={onBack}
            size="small"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <Icon path={mdiArrowLeft} />
          </IconButton>
        )}
        <Typography variant="h6" color="common.white">
          {title}
        </Typography>
      </Stack>
    </Box>
  );
}
