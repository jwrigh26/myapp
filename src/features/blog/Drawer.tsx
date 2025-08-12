import { MiniVariantDrawer } from '@/components/Drawer';
import Icon from '@/components/Icon';
import { useDrawer, useToggle } from '@/hooks/useContext';
import { mdiAccountGroup, mdiChevronRight, mdiReact, mdiPencilRuler } from '@mdi/js';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { RegisteredRouter } from '@tanstack/react-router';
import { createLink, useMatchRoute, useRouter } from '@tanstack/react-router';
import { forwardRef } from 'react';
import type { MUILinkProps } from './types';

const blogPaths = {
  frontendDesign: '/blog/posts/frontend-design',
  softSkills: '/blog/posts/soft-skills',
  react: '/blog/posts/react',
};

export function BlogDrawer() {
  const router = useRouter();
  const theme = useTheme();
  const matchRoute = useMatchRoute();

  // Use useMatchRoute for reactive route matching
  const isFrontendDesignRoute = !!matchRoute({
    to: blogPaths.frontendDesign,
    fuzzy: true, // This makes it match child routes too
  });

  const isSoftSkillsRoute = !!matchRoute({
    to: blogPaths.softSkills,
    fuzzy: true,
  });

  // These can stay the same since they're just filtering static route data
  const fontendDesignRoutes = filterRoutes(router, blogPaths.frontendDesign);
  const softSkillsRoutes = filterRoutes(router, blogPaths.softSkills);

  const isReactRoute = !!matchRoute({
    to: blogPaths.react,
    fuzzy: true,
  });
  const reactRoutes = filterRoutes(router, blogPaths.react);

  return (
    <MiniVariantDrawer width={256} drawerKey="blog-drawer">
      <PostCategory
        title="Frontend Design"
        icon={mdiPencilRuler}
        isActive={isFrontendDesignRoute}
        routes={fontendDesignRoutes}
        categoryPath={blogPaths.frontendDesign + '/'}
      />

      <PostCategory
        title="React"
        icon={mdiReact}
        isActive={isReactRoute}
        routes={reactRoutes}
        categoryPath={blogPaths.react + '/'}
      />

      <PostCategory
        title="Soft Skills"
        icon={mdiAccountGroup}
        isActive={isSoftSkillsRoute}
        routes={softSkillsRoutes}
        categoryPath={blogPaths.softSkills + '/'}
      />

    </MiniVariantDrawer>
  );
}

// ################################################
// ### Components
// ################################################

interface PostHeaderProps {
  title: string;
  icon: string;
}

interface PostSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  categoryPath?: string;
  isActive?: boolean;
}

interface PostCategoryProps {
  title: string;
  icon: string;
  isActive: boolean;
  routes: Route[];
  categoryPath: string;
}

function PostSubHeader({ title, icon }: PostHeaderProps) {
  const theme = useTheme();

  const headerColor = theme.mixins.decomposeColor(
    theme.palette.primary.contrastText,
    0.5
  );

  return (
    <Header>
      <Icon path={icon} fontSize="small" sx={{ color: headerColor }} />
      <Typography variant="subtitle2" sx={{ color: headerColor }}>
        {title}
      </Typography>
    </Header>
  );
}

function PostHeader({
  title,
  icon,
  categoryPath,
  isActive = false,
}: PostHeaderProps & { categoryPath: string; isActive?: boolean }) {
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
  // Create a unique key for this PostSection using title
  const sectionKey = `post-section-${title.toLowerCase().replace(/\s+/g, '-')}`;
  // Use isActive to determine if this section should start open
  const { isOpen, toggleOpen } = useToggle(sectionKey, isActive);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Just toggle the section open/closed
    // console.log('PostSection key:', sectionKey);
    e.preventDefault();
    e.stopPropagation();
    toggleOpen();
  };

  return (
    <>
      <ToggleButton onClick={handleClick} level={0}>
        {categoryPath ? (
          <PostHeader
            title={title}
            icon={icon}
            categoryPath={categoryPath}
            isActive={isActive}
          />
        ) : (
          <PostSubHeader title={title} icon={icon} />
        )}
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
}: PostCategoryProps) {
  return (
    <>
      {/* Icon-only version for collapsed drawer */}
      <div className="collapsed-icon">
        <CollapsedCategoryIcon
          title={title}
          icon={icon}
          isActive={isActive}
          drawerKey="blog-drawer"
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
}: {
  title: string;
  icon: string;
  isActive: boolean;
  drawerKey: string;
}) {
  const theme = useTheme();
  const router = useRouter();

  // Get the same section key as PostSection uses
  // const sectionKey = `post-section-${title.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCategoryClick = () => {
    // Generate section keys dynamically from blogPaths
    const allSectionKeys = Object.keys(blogPaths).map((pathKey) => {
      // Convert camelCase to kebab-case for section keys
      // e.g., 'frontendDesign' -> 'frontend-design'
      const kebabCase = pathKey.replace(
        /[A-Z]/g,
        (letter) => `-${letter.toLowerCase()}`
      );
      return `post-section-${kebabCase}`;
    });

    // Determine the category base path based on title
    let categoryBasePath = '';
    if (title === 'Frontend Design') {
      categoryBasePath = blogPaths.frontendDesign;
    }
    if (title === 'Soft Skills') {
      categoryBasePath = blogPaths.softSkills;
    }

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
      targetPath = categoryRoutes[0]?.fullPath || categoryBasePath + '/';
    }

    // Navigate to the determined path
    // console.log('Smart navigation:', {
    //   currentPath,
    //   categoryBasePath,
    //   isAlreadyInCategory,
    //   targetPath,
    //   sectionKey,
    // });
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

const ToggleButton = styled(ListItemButton)<{ level: number }>(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  marginTop: theme.spacing(4),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.dark, // hover style is now default
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  transition: 'background-color 0.3s ease',

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 18%)`,
    opacity: 0, // reversed: start with nothing
    transition: 'opacity 0.5s ease',
    zIndex: 0,
  },
  '&:hover::before': {
    opacity: 1, // reveal the gradient on hover
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
})(({ theme, level = 0, isPrefix, isRoute }) => ({
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2 + level),
  width: '100%',
  backgroundColor: theme.palette.primary.dark, // Let the drawer's background show through
  borderRadius: theme.shape.borderRadius, // A little rounding for a softer look
  transition: 'background-color 0.3s ease', // Smooth transition on hover
  '&:hover': {
    backgroundColor: theme.palette.primary.light, // Lighter shade on hover
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main, // Active state gets primary main
    '&:hover': {
      backgroundColor: theme.palette.primary.main, // Keep it consistent when active
    },
  },
  // For route text styling:
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

const ToolbarSpacer = styled((props) => <Toolbar disableGutters {...props} />)(
  ({ theme }) => ({
    marginTop: 0,
  })
);

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
interface Route {
  id: string;
  fullPath: string;
  options: {
    head?: () => {
      getTitle?: () => string;
      meta?: any[];
      title?: string;
    };
  };
  // Add other properties you need
}

const filterRoutes = (router: RegisteredRouter, path: string): Route[] => {
  const routes = Object.values(router.routesByPath).filter((route) => {
    const routePath = (route as Route).fullPath;
    return (
      routePath.startsWith(path) && !routePath.endsWith('/') // Exclude index pages (they end with /)
    );
  });

  return routes;
};
