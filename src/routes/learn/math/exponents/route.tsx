import { createFileRoute, Outlet } from '@tanstack/react-router';
import { TabsLayout } from '@/layout/TabsLayout';

export const Route = createFileRoute('/learn/math/exponents')({
  component: LayoutComponent,
});

function LayoutComponent() {
  // Manually declare tabs with custom labels
  const tabs = [
    { path: '', label: 'Lesson' },              // index.tsx -> main lesson
    // { path: 'problems', label: 'Problems'},
  ];

  return (
    <TabsLayout tabs={tabs}>
      <Outlet />
    </TabsLayout>
  );
}