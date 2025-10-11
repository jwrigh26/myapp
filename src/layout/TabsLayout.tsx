import { useRouter, useRouterState } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import PageLayout from './PageLayout';

interface TabItem {
  path: string;
  label: string;
}

interface TabsLayoutProps extends PropsWithChildren {
  tabs: TabItem[];
  id?: string;
  className?: string;
}

const Wrapper = styled('div')(({ theme }) => ({
  display: 'block',
  maxWidth: '1536px',
  position: 'relative',
  margin: '0 auto',
  overflow: 'visible',
}));

const StyledTabs = styled(Tabs)(({ theme }) => {
  const isLight = theme.palette.mode === 'light';
  const glowColor = isLight
    ? theme.palette.primary.dark
    : theme.palette.primary.main;

  return {
    // Keep all your existing positioning
    width: '100%',
    maxWidth: '1536px',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      marginTop: 0,
    },

    // Very subtle container styling
    ...(theme.palette.mode === 'dark' && {
      boxShadow: `0 1px 3px ${glowColor}11`,
    }),

    // Responsive tab styles - keep your positioning
    '& .MuiTabs-flexContainer': {
      justifyContent: 'flex-start',
    },

    '& .MuiTab-root': {
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(13), // Smaller text as requested
      marginRight: theme.spacing(1),
      borderRadius: theme.spacing(2), // More circular/pill shape
      transition: 'color 0.2s ease, background-color 0.2s ease',
      minHeight: 32, // Reduce overall tab height
      padding: theme.spacing(0.5, 1.5), // Less top/bottom padding
      position: 'relative',
      border: '1px solid transparent', // Always have border space

      // Animated border using pseudo-element
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        border: `1px solid ${glowColor}`,
        opacity: 0,
        transform: 'scale(0.8)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        pointerEvents: 'none',
        
        // Glow effect that animates in
        ...(theme.palette.mode === 'dark' && {
          boxShadow: `
            0 0 0 1px ${glowColor}22,
            0 0 8px ${glowColor}33,
            0 0 12px ${glowColor}11
          `,
        }),
        ...(theme.palette.mode === 'light' && {
          border: `1px solid ${theme.palette.primary.main}22`,
        }),
      },

      '&:hover': {
        color: theme.palette.primary.main,
        opacity: 1,
        backgroundColor: isLight
          ? 'rgba(0, 0, 0, 0.02)'
          : 'rgba(255, 255, 255, 0.05)',
      },

      '&.Mui-selected': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightSemiBold,
        backgroundColor: isLight 
          ? `${theme.palette.primary.main}08`
          : 'transparent',
        
        // Animate the border in
        '&::before': {
          opacity: 1,
          transform: 'scale(1)',
        },
      },
    },

    // Hide the default indicator since we're using border styling
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  };
});

export function TabsLayout({ tabs, children, id, className }: TabsLayoutProps) {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // For tabbed lessons, the pathname patterns are:
  // Layout/Index: /learn/math/hello-world
  // Tab routes:   /learn/math/hello-world/advanced

  // Find the base path by looking for a tab match
  let basePath = pathname;
  let currentTab = '';

  // Check if current path ends with a known tab
  const matchingTab = tabs.find(
    (tab) => tab.path !== '' && pathname.endsWith(`/${tab.path}`)
  );

  if (matchingTab) {
    // We're on a tab route like /learn/math/hello-world/advanced
    basePath = pathname.slice(0, -(matchingTab.path.length + 1)); // Remove /tabname
    currentTab = matchingTab.path;
  } else {
    // We're on the main route like /learn/math/hello-world
    // basePath is already correct, currentTab should be empty (index)
    currentTab = '';
  }

  const handleTabChange = (event: React.SyntheticEvent, newPath: string) => {
    const targetPath = newPath === '' ? basePath : `${basePath}/${newPath}`;
    router.navigate({ to: targetPath });
  };

  return (
    <PageLayout id="tabs-layout">
      <StyledTabs
        id={id}
        className={className}
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.label} value={tab.path} />
        ))}
      </StyledTabs>
      {children}
    </PageLayout>
  );
}
