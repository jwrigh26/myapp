import { BlogDrawer as Drawer } from '@/features/blog';
import Box from '@mui/material/Box';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <Box sx={{ display: 'flex', marginBottom: 2, overflow: 'auto' }}>
      <DrawerComponent />
      <Outlet />
    </Box>
  );
}

function DrawerComponent() {
  return <Drawer />;
}
