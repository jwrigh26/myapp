import '@tanstack/react-router';

declare module '@tanstack/react-router' {
  interface AnyContext {
    getTitle?: () => string;
  }
}
