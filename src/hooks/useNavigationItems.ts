import { useState, useEffect } from 'react';
import { useRouter, useLocation } from '@tanstack/react-router';
import type { InlineDrawerItem } from '@/components/SecondaryDrawer';
import { getNavigationItems, getContentTitle } from '@/utils/contentRegistry';
import { getDrawerFooter } from '@/utils/drawerFooterRegistry';
import { getDrawerHeader } from '@/utils/drawerHeaderRegistry';

/**
 * Hook to dynamically load navigation items for the current route
 */
export function useNavigationItems(): {
  items: InlineDrawerItem[];
  title: string;
  header: React.ComponentType | null;
  footer: React.ComponentType | null;
  loading: boolean;
  error: string | null;
} {
  const location = useLocation();
  const [items, setItems] = useState<InlineDrawerItem[]>([]);
  const [title, setTitle] = useState('Learn');
  const [header, setHeader] = useState<React.ComponentType | null>(null);
  const [footer, setFooter] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { pathname } = location;

  useEffect(() => {
    function loadNavigation() {
      try {
        setLoading(true);
        setError(null);

        const currentPath = pathname;
        console.log('Current path for navigation:', currentPath);

        // Check if this is a specific post route
        if (currentPath.startsWith('/learn/') && currentPath !== '/learn') {
          // Extract route path (e.g., "/learn/python/whiteboarding-essentials" -> "python/whiteboarding-essentials")
          const routePath = currentPath.replace('/learn/', '');

          const navigationItems = getNavigationItems(routePath);
          const contentTitle = getContentTitle(routePath);
          const headerComponent = getDrawerHeader(routePath);
          const footerComponent = getDrawerFooter(routePath);

          setItems(navigationItems);
          setTitle(contentTitle);
          // Use functional update to avoid React treating the component as a state updater
          setHeader(() => headerComponent);
          setFooter(() => footerComponent);
        } else {
          // Default navigation for learn index
          setItems([]);
          setTitle('Learn');
          setHeader(null);
          setFooter(null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load navigation'
        );
        console.error('Navigation loading error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadNavigation();
  }, [pathname]);

  return { items, title, header, footer, loading, error };
}
