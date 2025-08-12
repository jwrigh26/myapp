import {
  NavigationConfig,
  NavLevel,
  type NavCategory,
  type NavItem,
} from '@/types/navigation';
import { mdiAccountGroup, mdiBookOpen, mdiHome, mdiReact, mdiPencilRuler } from '@mdi/js';

// Main navigation items configuration
const mainNavItems: NavItem[] = [
  {
    id: 'home',
    title: 'Home',
    path: '/home',
    icon: mdiHome,
  },
  // Commented out items from original code
  // {
  //   id: 'about',
  //   title: 'About',
  //   path: '/about',
  //   icon: mdiInformation
  // },
  {
    id: 'blog',
    title: 'Blog',
    path: '/blog',
    icon: mdiBookOpen,
    hasSublevels: true,
    targetLevel: NavLevel.BLOG,
  },
  // {
  //   id: 'game',
  //   title: 'Game',
  //   path: '/game',
  //   icon: mdiGamepadVariant
  // },
];

// Blog categories configuration
const blogCategories: NavCategory[] = [
  {
    id: 'frontend-design',
    title: 'Frontend Design',
    icon: mdiPencilRuler,
    path: '/blog/posts/frontend-design',
  },
  {
    id: 'react',
    title: 'React',
    icon: mdiReact,
    path: '/blog/posts/react',
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    icon: mdiAccountGroup,
    path: '/blog/posts/soft-skills',
  },
];

// Complete navigation configuration
export const navigationConfig: NavigationConfig = {
  mainItems: mainNavItems,
  blogCategories: blogCategories,
  defaultLevel: NavLevel.MAIN,
  maxHistoryDepth: 10,
};

// Re-export individual configurations for backward compatibility
export { blogCategories, mainNavItems };

// Helper functions for navigation configuration
export const getNavItemById = (id: string) => {
  return navigationConfig.mainItems.find((item) => item.id === id);
};

export const getBlogCategoryById = (id: string) => {
  return navigationConfig.blogCategories.find((category) => category.id === id);
};

export const getNavItemByPath = (path: string) => {
  return navigationConfig.mainItems.find((item) => item.path === path);
};

export const getBlogCategoryByPath = (path: string) => {
  return navigationConfig.blogCategories.find(
    (category) => category.path === path
  );
};
