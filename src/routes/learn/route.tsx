import { InlineDrawer } from '@/components/InlineDrawer';
import { LearnDrawer as Drawer } from '@/features/learn';
import { PageLayout } from '@/layout';
import Box from '@mui/material/Box';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn')({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  // Mock navigation items for now
  const navigationItems = [
    {
      id: 'variables',
      title: 'Variables & Dynamic Typing',
      anchor: 'variables',
      level: 1 as const,
    },
    {
      id: 'conditionals',
      title: 'If Statements & Logic',
      anchor: 'conditionals',
      level: 1 as const,
    },
    {
      id: 'loops',
      title: 'Loops & Iteration Patterns',
      anchor: 'loops',
      level: 1 as const,
    },
    {
      id: 'math',
      title: 'Math Operations & Edge Cases',
      anchor: 'math',
      level: 1 as const,
    },
    {
      id: 'arrays',
      title: 'Arrays (Lists)',
      anchor: 'arrays',
      level: 1 as const,
    },
    {
      id: 'strings',
      title: 'Strings',
      anchor: 'strings',
      level: 1 as const,
    },
    {
      id: 'data-structures',
      title: 'Essential Data Structures',
      anchor: 'data-structures',
      level: 1 as const,
      children: [
        {
          id: 'queues',
          title: 'Queues (Collections.deque)',
          anchor: 'queues',
          level: 2 as const,
        },
        {
          id: 'sets',
          title: 'Sets - O(1) Lookups',
          anchor: 'sets',
          level: 2 as const,
        },
        {
          id: 'dictionaries',
          title: 'Dictionaries (Hash Maps)',
          anchor: 'dictionaries',
          level: 2 as const,
        },
        {
          id: 'tuples',
          title: 'Tuples - Immutable Sequences',
          anchor: 'tuples',
          level: 2 as const,
        },
      ],
    },
    {
      id: 'heaps',
      title: 'Heaps - Priority Queue Magic',
      anchor: 'heaps',
      level: 1 as const,
    },
    {
      id: 'functions',
      title: 'Functions & Scope',
      anchor: 'functions',
      level: 1 as const,
    },
    {
      id: 'classes',
      title: 'Classes for Data Structure Problems',
      anchor: 'classes',
      level: 1 as const,
    },
    {
      id: 'lambdas',
      title: 'Lambda Functions - Concise Power',
      anchor: 'lambdas',
      level: 1 as const,
    },
  ];

  return (
    <Box sx={{ display: 'flex', marginBottom: 2, minHeight: '100vh' }}>
      <DrawerComponent />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </Box>
      <InlineDrawer
        items={navigationItems}
        title="Table of Contents"
      />
    </Box>
  );
}

function DrawerComponent() {
  return <Drawer />;
}
