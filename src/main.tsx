import { BreakpointProvider } from '@/context/BreakpointContext';
import { ComponentStateProvider } from '@/context/ComponentStateContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import ThemeProvider from '@/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { queryClient } from './utils/queryClient';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FB_API_URL,
  authDomain: import.meta.env.VITE_REACT_APP_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FB_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_FB_MEASUREMENT_ID,
};

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
        <BreakpointProvider>
          <SnackbarProvider>
            <ComponentStateProvider>
              <RouterProvider router={router} context={{ user: 'Me' }} />
            </ComponentStateProvider>
          </SnackbarProvider>
        </BreakpointProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
