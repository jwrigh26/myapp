import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/frontend-design/page-3')({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Page 3',
    meta: [
      {
        name: 'Post Page 3',
        content: 'My Post Page 3',
      },
      {
        title: 'Page3',
      },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/blog/posts/page-3"!</div>;
}
