import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/frontend-design/page-2')({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Page 2',
    meta: [
      {
        name: 'Post Page 2',
        content: 'My Post Page 2',
      },
      {
        title: 'Page2',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/blog/posts/page-2"!</div>;
}
