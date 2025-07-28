import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

interface HomeLayoutProps extends PropsWithChildren<{}> {
  id?: string;
  className?: string;
}

const StyledContentGrid = styled(Box)(({ theme }) => ({
  // CSS Custom Properties for content-grid system
  '--padding-inline': theme.spacing(2),
  '--content-max-width': '1000px', // Stays comfortably under lg breakpoint
  '--breakout-max-width': '1200px', // Fits nicely between lg (1200) and xl (1536)
  '--full-width-max-width': '1536px', // For full-width sections
  '--breakout-size':
    'calc((var(--breakout-max-width) - var(--content-max-width)) / 2)',

  marginTop: theme.spacing(2),
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
    marginTop: 0,
  },
}));

const HomeLayout = ({ children, id, className }: HomeLayoutProps) => {
  return (
    <StyledContentGrid id={id} className={className}>
      {children}
    </StyledContentGrid>
  );
};

export default HomeLayout;
