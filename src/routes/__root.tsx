import { IndexLayout } from '@/layout';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<{ user?: string }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  head: () => ({
    meta: [
      {
        title: 'My App',
      },
    ],
  }),
});

function RootComponent() {
  const matches = useRouterState({ select: (s) => s.matches });

  const matchWithUser = [...matches].reverse().find((d) => d.context.user);
  const user = matchWithUser?.context.user || 'The Vandals';

  return (
    <>
      <HeadContent />
      <IndexLayout>
        <Outlet />
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
      </IndexLayout>
      <Scripts />
    </>
  );
}

function NotFoundComponent() {
  return <div>404: Not Found</div>;
}
