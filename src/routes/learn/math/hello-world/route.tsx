import { createFileRoute, Outlet } from '@tanstack/react-router';
import { TabsLayout } from '@/components/TabsLayout';

export const Route = createFileRoute('/learn/math/hello-world')({
  component: LayoutComponent,
});

function LayoutComponent() {
  // Manually declare tabs with custom labels
  const tabs = [
    { path: '', label: 'Lesson' },              // index.tsx -> main lesson
    { path: 'advanced', label: 'Deep Dive' },   // advanced.lazy.tsx
    { path: 'examples', label: 'Examples' },    // examples.lazy.tsx  
  ];

  return (
    <TabsLayout tabs={tabs}>
      <Outlet />
    </TabsLayout>
  );
}
