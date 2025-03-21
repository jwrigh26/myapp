import { PermanentDrawer } from '@/components/Drawer';
import Icon from '@/components/Icon';
import { mdiPost } from '@mdi/js';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createLink, useRouter } from '@tanstack/react-router';
import { forwardRef, useState } from 'react';
import type { MUILinkProps } from './types';

export function BlogDrawer() {
  const router = useRouter();

  const blogPostRoutes = Object.values(router.routesByPath).filter((route) =>
    route.fullPath.startsWith('/blog/posts')
  );

  console.log('routesByPath', blogPostRoutes);
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((prev) => !prev);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
  };

  /**
   * Loop through each route
   * - If it's an index route, create an IndexListItem
   * - If it's a prefix route, create a PrefixListItem
   * - If it's a route, create a RouteListItem
   */

  return (
    <PermanentDrawer>
      <ToolbarSpacer />
      <DrawerHeader>
        <Icon
          path={mdiPost}
          fontSize="medium"
          sx={{ color: 'primary.light' }}
        />
        <Typography
          variant="h5"
          color="primary.contrastText"
          sx={{ fontWeight: 'fontWeightRegular' }}
        >
          Posts
        </Typography>
      </DrawerHeader>
      <StyledList>
        {blogPostRoutes.map((route) => {
          const title = route.options.head()?.getTitle?.() || route.id;
          // const [_, { title }] = route.options.head()?.meta;
          console.log(title);
          return (
            <NavButton key={route.id} to={route.id}>
              <ListItemText primary={title || route.id} />
            </NavButton>
          );
        })}
      </StyledList>
    </PermanentDrawer>
  );
}

// ################################################
// ### Components
// ################################################

// New awesome components go here

// ################################################
// ### Styles
// ################################################

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.primary.dark,
  paddingTop: 0,
  paddingBottom: theme.spacing(2),
  marginBottom: 48, // 48px current desktop footer height
}));

const ToggleButton = styled(ListItemButton)<{ level: number }>(
  ({ theme, level }) => ({
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2 + level),
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiListItemText-root > span': {
      ...theme.typography.subtitle1,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.primary,
    },
  })
);

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

const DrawerHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  gap: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  borderBottom: `1px solid ${theme.palette.primary.light}`, // subtle divider line
}));
