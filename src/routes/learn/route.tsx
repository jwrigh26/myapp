import { SecondaryDrawer as TableOfContents } from '@/components/SecondaryDrawer';
import { LearnDrawer, CompendiumDrawer } from '@/features/learn';
import { useNavigationItems } from '@/hooks/useNavigationItems';
import { useIsBreakpointUp } from '@/context/BreakpointContext';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useFocused } from '@/hooks/useContext';

export const Route = createFileRoute('/learn')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  const {
    items: navigationItems,
    title: navigationTitle,
    header: navigationHeader,
    footer: navigationFooter,
    loading,
    error,
  } = useNavigationItems();
  const isDesktop = useIsBreakpointUp('md');

  return (
    <Box sx={{ display: 'flex', marginBottom: 2 }}>
      <CompendiumDrawer />
      <LearnDrawer />
      <Outlet />

      {/* Dynamic navigation - desktop permanent drawer or mobile drawer */}
      {navigationItems.length > 0 && (
        <TableOfContents
          items={navigationItems}
          title={navigationTitle}
          header={navigationHeader}
          footer={navigationFooter}
          desktop={isDesktop}
        />
      )}

      {/* Loading state for navigation - only show on desktop */}
      {loading && isDesktop && (
        <Box
          sx={{
            width: 228,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}

      {/* Error state for navigation - only show on desktop */}
      {error && isDesktop && (
        <Box sx={{ width: 228, p: 2 }}>
          <Alert severity="warning" variant="outlined">
            Navigation unavailable
          </Alert>
        </Box>
      )}
    </Box>
  );
}
