import { ComponentStateProvider } from '@/context/ComponentStateContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import ThemeProvider from '@/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { queryClient } from './utils/queryClient';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SnackbarProvider>
          <ComponentStateProvider>
            <RouterProvider router={router} />
          </ComponentStateProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
