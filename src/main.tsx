import { ComponentStateProvider } from '@/context/ComponentStateContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import ThemeProvider from '@/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { queryClient } from './utils/queryClient';

interface MyRouterContext {
  user?: string;
}

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    user: undefined,
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

// We can use a hook to pass user down based on things

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SnackbarProvider>
          <ComponentStateProvider>
            <RouterProvider router={router} context={{ user: 'Me' }} />
          </ComponentStateProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
