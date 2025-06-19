// Navigation type definitions for better type safety

export enum NavLevel {
  MAIN = 'main',
  BLOG = 'blog',
  BLOG_CATEGORY = 'blog-category',
  BLOG_POST_DETAILS = 'blog-post-details',
}

// Base navigation item structure
export interface NavItem {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  children?: NavItem[];
  /** Indicates if this item has sub-levels */
  hasSublevels?: boolean;
  /** Navigation level this item leads to */
  targetLevel?: NavLevel;
}

// Navigation history entry with better typing
export interface NavHistoryEntry<T = unknown> {
  level: NavLevel;
  title: string;
  data?: T;
}

// Specific types for different navigation contexts
export interface NavCategory extends Omit<NavItem, 'children'> {
  path: string;
  icon: string;
}

export interface NavPost {
  id: string;
  title: string;
  path: string;
  icon?: string;
}

// Navigation state interface
export interface NavigationState {
  currentLevel: NavLevel;
  previousLevel: NavLevel | null;
  navigationDirection: 'forward' | 'backward';
  navHistory: NavHistoryEntry[];
}

// Navigation configuration interface
export interface NavigationConfig {
  mainItems: NavItem[];
  blogCategories: NavCategory[];
  /** Default navigation level */
  defaultLevel: NavLevel;
  /** Maximum navigation history depth */
  maxHistoryDepth?: number;
}
