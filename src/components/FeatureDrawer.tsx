import { useMemo } from 'react';
import { MiniVariantDrawer, MiniDrawerHeader } from '@/components/Drawer';
import Icon from '@/components/Icon';
import { useDrawer, useToggle } from '@/hooks/useContext';
import { mdiBookOpen, mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import type { RegisteredRouter } from '@tanstack/react-router';
import { createLink, useMatchRoute, useRouter } from '@tanstack/react-router';
import { forwardRef } from 'react';
import CustomLink from './LinkButton';

// ################################################
// ### Types
// ################################################

export interface FeatureCategory {
  id: string;
  title: string;
  icon: string;
  path: string;
}

export interface FeatureDrawerConfig {
  categories: FeatureCategory[];
  drawerKey: string;
  featureName: 'blog' | 'learn';
}

interface MUILinkProps {
  to: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

interface Route {
  id: string;
  fullPath: string;
  options: {
    head?: () => {
      getTitle?: () => string;
      meta?: any[];
      title?: string;
      includeInDrawer?: boolean; // New property to control drawer inclusion
    };
  };
}

// ################################################
// ### Main Component
// ################################################

export function FeatureDrawer({
  categories,
  drawerKey,
  featureName,
}: FeatureDrawerConfig) {
  const router = useRouter();
  const matchRoute = useMatchRoute();

  // Create paths object from categories
  const paths = categories.reduce(
    (acc, category) => {
      acc[category.id] = category.path;
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <MiniVariantDrawer
      width={256}
      drawerKey={drawerKey}
      header={<DrawerHeader drawerKey={drawerKey} featureName={featureName} />}
      anchor="left"
    >
      {categories.map((category) => {
        const isActiveRoute = !!matchRoute({
          to: category.path,
          fuzzy: true,
        });

        const routes = filterRoutes(router, category.path);

        return (
          <PostCategory
            key={category.id}
            title={category.title}
            icon={category.icon}
            isActive={isActiveRoute}
            routes={routes}
            categoryPath={category.path + '/'}
            drawerKey={drawerKey}
            paths={paths}
          />
        );
      })}
    </MiniVariantDrawer>
  );
}

// ################################################
// ### Drawer Header
// ################################################

function DrawerHeader({
  drawerKey,
  featureName: type,
}: {
  drawerKey: string;
  featureName: 'blog' | 'learn';
}) {
  const theme = useTheme();
  const matchRoute = useMatchRoute();

   const localOpen = useMemo(() => {
    const storageKey = `mini-variant-${drawerKey}`;
    try {
      const stored = localStorage.getItem(storageKey);
      // Default to true (open) if nothing is stored
      if (stored === null) {
        return true;
      }
      return JSON.parse(stored) as boolean;
    } catch {
      return true;
    }
  }, []);

  const { isOpen: open, openDrawer, closeDrawer } = useDrawer(drawerKey, localOpen);

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
    to: `/${type}`,
    fuzzy: false, // Exact match only
  });

  return (
    <>
      <MiniDrawerHeader open={open}>
        {open && (
          <CustomLink
            to={`/${type}`}
            variant="text"
            size="small"
            startIcon={
              <Icon
                path={mdiBookOpen}
                fontSize="small"
                sx={{
                  color: isOnBlogOverview
                    ? theme.palette.primary.contrastText
                    : headerColor,
                }}
              />
            }
            sx={{
              color: isOnBlogOverview
                ? theme.palette.primary.contrastText
                : headerColor,
              textTransform: 'none',
              fontSize: '0.875rem',
              minWidth: 'auto',
              padding: theme.spacing(0.5, 1),
              backgroundColor: isOnBlogOverview
                ? 'rgba(255, 255, 255, 0.08)'
                : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: theme.palette.primary.contrastText,
                '& .MuiSvgIcon-root': {
                  color: theme.palette.primary.contrastText,
                },
              },
            }}
          >
            {type === 'blog' ? 'Blog' : 'Learn'}
          </CustomLink>
        )}
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
    </>
  );
}

// ################################################
// ### Components
// ################################################

interface PostHeaderProps {
  title: string;
  icon: string;
  isActive?: boolean;
}

interface PostSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  categoryPath: string;
  isActive?: boolean;
}

interface PostCategoryProps {
  title: string;
  icon: string;
  isActive: boolean;
  routes: Route[];
  categoryPath: string;
  drawerKey: string;
  paths: Record<string, string>;
}

function PostHeader({ title, icon, isActive = false }: PostHeaderProps) {
  const theme = useTheme();
  const headerColor = theme.mixins.decomposeColor(
    theme.palette.primary.contrastText,
    0.5
  );
  const headerActiveColor = theme.palette.primary.contrastText;

  return (
    <Header>
      <Icon path={icon} fontSize="small" sx={{ color: headerColor }} />
      <Typography
        variant="subtitle2"
        sx={{
          color: isActive ? headerActiveColor : headerColor,
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        {title}
      </Typography>
    </Header>
  );
}

function PostSection({
  title,
  icon,
  children,
  categoryPath,
  isActive = false,
}: PostSectionProps) {
  const sectionKey = `post-section-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const { isOpen, toggleOpen } = useToggle(sectionKey, isActive);
  const router = useRouter();

  // Single click handler: toggle drawer AND navigate to index page
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Toggle the drawer open/closed
    toggleOpen();

    // Navigate to the category index page
    if (categoryPath) {
      router.navigate({ to: categoryPath as any });
    }
  };

  return (
    <>
      <ToggleButton onClick={handleClick} level={0}>
        <PostHeader title={title} icon={icon} isActive={isActive} />
        <RotateIcon path={mdiChevronRight} rotate={isOpen ? 1 : 0} />
      </ToggleButton>

      {children && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

export function PostCategory({
  title,
  icon,
  isActive,
  routes,
  categoryPath,
  drawerKey,
  paths,
}: PostCategoryProps) {
  return (
    <>
      {/* Icon-only version for collapsed drawer */}
      <div className="collapsed-icon">
        <CollapsedCategoryIcon
          title={title}
          icon={icon}
          isActive={isActive}
          drawerKey={drawerKey}
          categoryPath={categoryPath}
          paths={paths}
        />
      </div>

      {/* Full version for expanded drawer */}
      <div className="mini-drawer-content">
        <PostSection
          title={title}
          icon={icon}
          categoryPath={categoryPath}
          isActive={isActive}
        >
          <StyledList>
            {routes.map((route) => {
              const routeTitle =
                route.options.head?.()?.getTitle?.() || route.id;
              return (
                <NavButton key={route.id} to={route.id}>
                  <ListItemText primary={routeTitle} />
                </NavButton>
              );
            })}
          </StyledList>
        </PostSection>
      </div>
    </>
  );
}

function CollapsedCategoryIcon({
  title,
  icon,
  isActive,
  drawerKey,
  categoryPath,
  paths,
}: {
  title: string;
  icon: string;
  isActive: boolean;
  drawerKey: string;
  categoryPath: string;
  paths: Record<string, string>;
}) {
  const theme = useTheme();
  const router = useRouter();

  const handleCategoryClick = () => {
    // Determine the category base path based on title
    let categoryBasePath = '';

    // Find the matching path by comparing titles or use the provided categoryPath
    categoryBasePath = categoryPath.replace('/', ''); // Remove trailing slash

    // Smart navigation: stay on current page if in category, otherwise go to first route
    const currentPath = router.state.location.pathname;
    const isAlreadyInCategory = currentPath.startsWith(categoryBasePath);

    let targetPath;
    if (isAlreadyInCategory) {
      // Stay on current page
      targetPath = currentPath;
    } else {
      // Go to first route in category
      const categoryRoutes = filterRoutes(router, categoryBasePath);
      targetPath = categoryRoutes[0]?.fullPath || categoryPath;
    }

    // Navigate to the determined path
    router.navigate({ to: targetPath as any });
  };

  return (
    <CollapsedIconButton
      isActive={isActive}
      title={title}
      onClick={handleCategoryClick}
    >
      <Icon
        path={icon}
        fontSize="small"
        sx={{
          color: isActive
            ? theme.palette.primary.contrastText
            : theme.mixins.decomposeColor(
                theme.palette.primary.contrastText,
                0.7
              ),
        }}
      />
    </CollapsedIconButton>
  );
}

// ################################################
// ### Styles
// ################################################

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.dark,
  paddingTop: 0,
}));

const CollapsedIconButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 48,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: isActive
      ? theme.palette.primary.main
      : theme.palette.primary.light,
  },
}));

// NEW: Split button container
const ToggleButton = styled(ListItemButton)<{ level: number }>(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  marginTop: theme.spacing(4),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.dark,
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  transition: 'background-color 0.3s ease',

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 18%)`,
    opacity: 0,
    transition: 'opacity 0.5s ease',
    zIndex: 0,
  },
  '&:hover::before': {
    opacity: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}));

const LinkListButton = forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => {
    return <ListItemButton component={'a'} ref={ref} {...props} />;
  }
);

const excludedProps = ['level', 'isPrefix', 'isRoute', 'to', 'isActive'];

const StyledLinkListButton = styled(LinkListButton, {
  shouldForwardProp: (prop: PropertyKey) =>
    !excludedProps.includes(prop as any),
})(({ theme }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  width: '100%',
  backgroundColor: theme.palette.primary.dark,
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  '& .MuiListItemText-root > span': {
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.primary.contrastText,
  },
}));

const NavButton = createLink(StyledLinkListButton);

const RotateIcon = styled(Icon, {
  shouldForwardProp: (prop) => prop !== 'rotate',
})<{ rotate: number }>(({ theme, rotate }) => ({
  color: theme.mixins.decomposeColor(theme.palette.primary.contrastText, 0.7),
  transform: rotate ? 'rotate(90deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Header = styled(Box)(({ theme }) => ({
  gap: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
}));

// ################################################
// ### Helpers
// ################################################

const filterRoutes = (router: RegisteredRouter, path: string): Route[] => {
  const routes = Object.values(router.routesByPath).filter((route) => {
    const routePath = (route as Route).fullPath;
    const routeId = (route as Route).id;
    const routeOptions = (route as Route).options;

    // Must be in our category path
    if (!routePath.startsWith(path)) {
      return false;
    }

    // Exclude layout routes
    if (routeId.endsWith('/route')) {
      return false;
    }

    // Check for explicit inclusion in drawer
    const headData = routeOptions.head?.();
    if (headData?.includeInDrawer === true) {
      return true;
    }

    // Default behavior: include non-index routes at exactly one level deeper
    if (routePath.endsWith('/')) {
      return false; // Exclude index routes by default
    }

    const segments = routePath.split('/').filter(Boolean);
    const baseSegments = path.split('/').filter(Boolean);

    // We want exactly one more segment than the base path
    return segments.length === baseSegments.length + 1;
  });

  return routes;
};
