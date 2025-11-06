/**
 * Drawer Footer Registry
 * 
 * Maps route paths to custom footer components for the SecondaryDrawer.
 * Footers are displayed at the bottom of the desktop drawer only.
 */

import type { ComponentType } from 'react';
import { BinarySearchDrawerFooter } from '@/features/learn/dsa/binarySearch/DrawerFooter';

export interface DrawerFooterRegistry {
  [routePath: string]: ComponentType;
}

/**
 * Registry of drawer footers by route path.
 * Route paths should be relative to /learn/ (e.g., 'dsa/binary-search')
 */
export const drawerFooters: DrawerFooterRegistry = {
  'dsa/binary-search': BinarySearchDrawerFooter,
};

/**
 * Get the drawer footer component for a given route path
 * @param routePath - Route path relative to /learn/ (e.g., 'dsa/binary-search')
 * @returns Footer component or null if not found
 */
export function getDrawerFooter(routePath: string): ComponentType | null {
  return drawerFooters[routePath] || null;
}
