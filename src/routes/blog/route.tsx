import { BlogDrawer as Drawer } from '@/features/blog';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerComponent />
      <PageLayout>
        <h1>App Layout</h1>
        <Outlet />
      </PageLayout>
    </Box>
  );
}

function DrawerComponent() {
  return <Drawer />;
}
