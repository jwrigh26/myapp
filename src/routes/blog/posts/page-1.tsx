import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/page-1')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/blog/posts/page-1"!</div>;
}
