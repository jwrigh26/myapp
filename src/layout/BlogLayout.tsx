import { useDrawer } from '@/hooks/useContext';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import './blog-layout.css';

interface BlogLayoutProps extends PropsWithChildren<{}> {
  id?: string;
  className?: string;
  drawerWidth?: number;
}

// Add shouldForwardProp to filter out drawerWidth
const StyledContentGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth',
})<{ drawerWidth?: number }>(({ theme, drawerWidth = 0 }) => ({
  // CSS Custom Properties for content-grid system
  '--padding-inline': theme.spacing(2),
  '--content-max-width': `${1000 - 0}px`,
  '--breakout-max-width': `${1200 - 0}px`,
  '--full-width-max-width': `${1536 - 0}px`,
  '--breakout-size':
    'calc((var(--breakout-max-width) - var(--content-max-width)) / 2)',

  marginBottom: theme.spacing(2),
  gap: 0,
  rowGap: 0,
  display: 'grid',
  gridTemplateColumns: `
    [full-width-start] minmax(var(--padding-inline), 1fr)
    [breakout-start] minmax(0, var(--breakout-size))
    [content-start] min(
      calc(100% - (var(--padding-inline) * 2)),
      var(--content-max-width)
    )
    [content-end]
    minmax(0, var(--breakout-size)) [breakout-end]
    minmax(var(--padding-inline), 1fr) [full-width-end]
  `,
  backgroundColor: theme.palette.background.paper,

  // Default all children to content zone
  '& > *': {
    gridColumn: 'content',
  },

  // Content grid zone classes
  '& .content': {
    gridColumn: 'content',
  },

  '& .breakout': {
    gridColumn: 'breakout',
  },

  '& .full-width': {
    gridColumn: 'full-width',
  },

  // Responsive behavior
  [theme.breakpoints.down('md')]: {
    '--padding-inline': theme.spacing(2),
  },

  [theme.breakpoints.down('sm')]: {
    '--padding-inline': theme.spacing(2),
    '--content-max-width': '100%',
    '--breakout-max-width': '100%',
  },

  // Responsive behavior
  // [theme.breakpoints.down('md')]: {
  //   '--padding-inline': theme.spacing(1),
  //   '--content-max-width': '100%',
  //   '--breakout-max-width': '100%',
  //   '--full-width-max-width': '100%',
  // },

  // [theme.breakpoints.down('sm')]: {
  //   '--content-max-width': '100%',
  //   '--breakout-max-width': '100%',
  //   '--full-width-max-width': '100%',
  // },
}));

const BlogLayout = ({ children, id, className }: BlogLayoutProps) => {
  // Get drawer state to determine width
  const { isOpen: isDrawerOpen } = useDrawer('blog-drawer');
  const drawerWidth = isDrawerOpen ? 256 : 65;

  return (
    <StyledContentGrid id={id} className={className} drawerWidth={drawerWidth}>
      {children}
    </StyledContentGrid>
  );
};

export default BlogLayout;
