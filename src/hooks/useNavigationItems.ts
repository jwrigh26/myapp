import { useState, useEffect } from 'react';
import { useRouter, useLocation } from '@tanstack/react-router';
import type { InlineDrawerItem } from '@/components/SecondaryDrawer';
import { getNavigationItems, getContentTitle } from '@/utils/contentRegistry';

/**
 * Hook to dynamically load navigation items for the current route
 */
export function useNavigationItems(): {
  items: InlineDrawerItem[];
  title: string;
  loading: boolean;
  error: string | null;
} {
  const router = useRouter();
  const location = useLocation();
  const [items, setItems] = useState<InlineDrawerItem[]>([]);
  const [title, setTitle] = useState('Learn');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { pathname } = location;

  useEffect(() => {
    function loadNavigation() {
      try {
        setLoading(true);
        setError(null);

        const currentPath = pathname;

        // Check if this is a specific post route
        if (currentPath.startsWith('/learn/') && currentPath !== '/learn') {
          // Extract route path (e.g., "/learn/python/whiteboarding-essentials" -> "python/whiteboarding-essentials")
          const routePath = currentPath.replace('/learn/', '');

          const navigationItems = getNavigationItems(routePath);
          const contentTitle = getContentTitle(routePath);

          setItems(navigationItems);
          setTitle(contentTitle);
        } else {
          // Default navigation for learn index
          setItems([]);
          setTitle('Learn');
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

  return { items, title, loading, error };
}
