import { BlogDrawer as Drawer } from '@/features/blog';
import { PageLayout } from '@/layout';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <>
      <DrawerComponent />
      <PageLayout>
        <h1>App Layout</h1>
        <Outlet />
      </PageLayout>
    </>
  );
}

function DrawerComponent() {
  return <Drawer />;
}
