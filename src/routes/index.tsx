import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // This is how you programmatically redirect
    throw redirect({ to: '/home' });
  },
  component: () => null, // no need to render anything
});
