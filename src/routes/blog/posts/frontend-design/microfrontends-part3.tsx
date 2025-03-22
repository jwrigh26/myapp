import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/blog/posts/frontend-design/microfrontends-part3'
)({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Micro-Frontends Part3',
    meta: [
      {
        name: 'Micro-Frontends Part3',
        content: 'My Post Page 1',
      },
      {
        title: 'Micro-Frontends Part3',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/blog/posts/frontend-design/microfrontends-part3"!</div>;
}
