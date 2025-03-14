import { IndexLayout } from '@/layout';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  head: () => ({
    meta: [
      {
        name: 'My personal site',
        content: 'A personal site built with development in mind',
      },
      {
        title: 'My App',
      },
    ],
  }),
});

function RootComponent() {
  return (
    <IndexLayout>
      {/* <Box>
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to="/about"
          activeProps={{
            className: 'font-bold',
          }}
        >
          About
        </Link>
      </Box>
      <Divider /> */}
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </IndexLayout>
  );
}

function NotFoundComponent() {
  return <div>404: Not Found</div>;
}
