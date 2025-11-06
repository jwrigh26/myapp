import { ComponentType } from 'react';
import { BinarySearchDrawerHeader } from '@/features/learn/dsa/binarySearch/DrawerHeader';

export interface DrawerHeaderRegistry {
  [routePath: string]: ComponentType;
}

/**
 * Registry of drawer header components for learn routes.
 * 
 * Key: Route path relative to /learn/ (e.g., 'dsa/binary-search')
 * Value: React component to render at the top of the drawer
 * 
 * Headers are only displayed on desktop (tablet and larger).
 */
export const drawerHeaders: DrawerHeaderRegistry = {
  'dsa/binary-search': BinarySearchDrawerHeader,
};

/**
 * Get the drawer header component for a given route path.
 * 
 * @param routePath - The route path relative to /learn/ (e.g., 'dsa/binary-search')
 * @returns The header component if registered, null otherwise
 */
export function getDrawerHeader(routePath: string): ComponentType | null {
  return drawerHeaders[routePath] || null;
}
