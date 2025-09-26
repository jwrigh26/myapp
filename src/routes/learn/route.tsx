import { SecondaryDrawer as TableOfContents } from '@/components/SecondaryDrawer';
import { LearnDrawer } from '@/features/learn';
import { PageLayout } from '@/layout';
import { useNavigationItems } from '@/hooks/useNavigationItems';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  const { items: navigationItems, title: navigationTitle, loading, error } = useNavigationItems();

  return (
    <Box sx={{ display: 'flex', marginBottom: 2, minHeight: '100vh' }}>
      <LearnDrawer />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </Box>
      
      {/* Dynamic navigation - only show if items exist */}
      {navigationItems.length > 0 && (
        <TableOfContents
          items={navigationItems}
          title={navigationTitle}
        />
      )}
      
      {/* Loading state for navigation */}
      {loading && (
        <Box sx={{ width: 228, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      
      {/* Error state for navigation */}
      {error && (
        <Box sx={{ width: 228, p: 2 }}>
          <Alert severity="warning" variant="outlined">
            Navigation unavailable
          </Alert>
        </Box>
      )}
    </Box>
  );
}
