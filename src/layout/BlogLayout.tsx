import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import './blog-layout.css';

interface BlogLayoutProps extends PropsWithChildren<{}> {
  id?: string;
  className?: string;
}

const StyledContentGrid = styled(Box)(({ theme }) => ({
  // CSS Custom Properties for content-grid system
  '--padding-inline': theme.spacing(2),
  '--content-max-width': '900px',
  '--breakout-max-width': '1200px',
  '--full-width-max-width': '1536px',
  '--breakout-size':
    'calc((var(--breakout-max-width) - var(--content-max-width)) / 2)',

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
  minHeight: '100vh',

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
    '--padding-inline': theme.spacing(1.5),
  },

  [theme.breakpoints.down('sm')]: {
    '--padding-inline': theme.spacing(1),
    '--content-max-width': '100%',
    '--breakout-max-width': '100%',
  },
}));

const BlogLayout = ({ children, id, className }: BlogLayoutProps) => {
  return (
    <StyledContentGrid id={id} className={className}>
      {children}
    </StyledContentGrid>
  );
};

export default BlogLayout;
