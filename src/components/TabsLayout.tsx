import { useRouter, useRouterState } from '@tanstack/react-router';
import { Tabs, Tab, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

interface TabItem {
  path: string;
  label: string;
}

interface TabsLayoutProps extends PropsWithChildren {
  tabs: TabItem[];
  id?: string;
  className?: string;
}

const StyledContentGrid = styled(Box)(({ theme }) => ({
  // CSS Custom Properties for content-grid system (mirrored from PageLayout)
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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(3),
  
  // Ensure tabs are in content zone
  gridColumn: 'content',
  
  // Responsive tab styles
  '& .MuiTabs-flexContainer': {
    justifyContent: 'flex-start',
  },
  
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightSemiBold,
    },
  },
  
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '3px 3px 0 0',
  },
}));

const TabContent = styled(Box)(() => ({
  // Tab content also follows content grid
  gridColumn: 'content',
  width: '100%',
}));

export function TabsLayout({ tabs, children, id, className }: TabsLayoutProps) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  
  // For tabbed lessons, the pathname patterns are:
  // Layout/Index: /learn/posts/math/hello-world  
  // Tab routes:   /learn/posts/math/hello-world/advanced
  
  // Find the base path by looking for a tab match
  let basePath = pathname;
  let currentTab = '';
  
  // Check if current path ends with a known tab
  const matchingTab = tabs.find(tab => 
    tab.path !== '' && pathname.endsWith(`/${tab.path}`)
  );
  
  if (matchingTab) {
    // We're on a tab route like /learn/posts/math/hello-world/advanced
    basePath = pathname.slice(0, -(matchingTab.path.length + 1)); // Remove /tabname
    currentTab = matchingTab.path;
  } else {
    // We're on the main route like /learn/posts/math/hello-world
    // basePath is already correct, currentTab should be empty (index)
    currentTab = '';
  }
  
  const handleTabChange = (event: React.SyntheticEvent, newPath: string) => {
    const targetPath = newPath === '' ? basePath : `${basePath}/${newPath}`;
    router.navigate({ to: targetPath });
  };

  return (
    <StyledContentGrid id={id} className={className}>
      <StyledTabs 
        value={currentTab} 
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.path}
            label={tab.label}
            value={tab.path}
          />
        ))}
      </StyledTabs>
      
      <TabContent>
        {children}
      </TabContent>
    </StyledContentGrid>
  );
}
