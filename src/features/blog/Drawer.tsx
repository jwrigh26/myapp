import { PermanentDrawer } from '@/components/Drawer';
import Icon from '@/components/Icon';
import { mdiChevronRight, mdiPencilRuler, mdiReact } from '@mdi/js';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import type { RegisteredRouter } from '@tanstack/react-router';
import { createLink, useRouter } from '@tanstack/react-router';
import { forwardRef, useState } from 'react';
import type { MUILinkProps } from './types';

const blogPaths = {
  frontendDesign: '/blog/posts/frontend-design',
  reactPatterns: '/blog/posts/react-patterns',
};

export function BlogDrawer() {
  const router = useRouter();
  const theme = useTheme();
  const currentRoute = router.state.resolvedLocation?.pathname ?? '/';

  const isFrontendDesignRoute = currentRoute.startsWith(
    blogPaths.frontendDesign
  );
  const fontendDesignRoutes = filterRoutes(router, blogPaths.frontendDesign);

  const isReactPatternsRoute = currentRoute.startsWith(blogPaths.reactPatterns);
  const reactPatternsRoutes = filterRoutes(router, blogPaths.reactPatterns);

  return (
    <PermanentDrawer width={256}>
      <ToolbarSpacer />
      <PostCategory
        title="Frontend Design"
        icon={mdiPencilRuler}
        isActive={isFrontendDesignRoute}
        routes={fontendDesignRoutes}
      />

      <PostCategory
        title="React Patterns"
        icon={mdiReact} // You might want a different icon here
        isActive={isReactPatternsRoute}
        routes={reactPatternsRoutes}
      />
    </PermanentDrawer>
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
  open?: boolean;
}

interface PostCategoryProps {
  title: string;
  icon: string;
  isActive: boolean;
  routes: Route[];
}

function PostHeader({ title, icon }: PostHeaderProps) {
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

function PostSection({
  title,
  icon,
  children,
  open: isOpen = false,
}: PostSectionProps) {
  const [open, setOpen] = useState(isOpen);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
    console.log(children);
  };

  return (
    <>
      <ToggleButton onClick={handleClick} level={0}>
        <PostHeader title={title} icon={icon} />
        <RotateIcon path={mdiChevronRight} rotate={open ? 1 : 0} />
      </ToggleButton>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
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
}: PostCategoryProps) {
  return (
    <PostSection title={title} icon={icon} open={isActive}>
      <StyledList>
        {routes.map((route) => {
          const routeTitle = route.options.head?.()?.getTitle?.() || route.id;
          return (
            <NavButton key={route.id} to={route.id}>
              <ListItemText primary={routeTitle} />
            </NavButton>
          );
        })}
      </StyledList>
    </PostSection>
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
  const routes = Object.values(router.routesByPath).filter((route) =>
    (route as Route).fullPath.startsWith(path)
  );

  return routes;
};
