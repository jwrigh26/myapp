import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/page-1')({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Page 1',
    meta: [
      {
        name: 'Post Page 1',
        content: 'My Post Page 1',
      },
      {
        title: 'Page 1',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/blog/posts/page-1"!</div>;
}
