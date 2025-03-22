import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/blog/posts/frontend-design/microfrontends-part2'
)({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Micro-Frontends Part 2',
    meta: [
      {
        name: 'Micro-Frontends Part 2',
        content: 'My Post Page 1',
      },
      {
        title: 'Micro-Frontends Part 2',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/blog/posts/frontend-design/microfrontends-part2"!</div>;
}
