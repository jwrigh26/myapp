import { BlogDrawer as Drawer } from '@/features/blog';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <Box sx={{ display: 'flex', marginBottom: 2, overflow: 'auto' }}>
      <DrawerComponent />
      <PageLayout>
        <Outlet />
      </PageLayout>
    </Box>
  );
}

function DrawerComponent() {
  return <Drawer />;
}
