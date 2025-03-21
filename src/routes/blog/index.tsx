import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: 'Blog',
        content: 'My Blog',
      },
      {
        title: 'Blog',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/blog"!</div>;
}
