import type { ListItemButtonProps } from '@mui/material/ListItemButton';
import { RouteType } from './constants';

export interface RouteItem {
  path?: string;
  text: string;
  level?: number;
  type?: RouteType;
  children?: RouteItem[];
}

// Define NavLinkProps for the NavButton component
export interface NavLinkProps {
  to: string;
  children?: React.ReactNode;
}

export interface MUILinkProps
  extends Omit<ListItemButtonProps, 'href'>,
    NavLinkProps {
  level?: number;
  isIndex?: boolean;
  isPrefix?: boolean;
  isRoute?: boolean;
  isActive?: boolean;
}

export interface BlogRouteMeta {
  title?: string;
  description?: string;
  // Add any other optional properties here
}

// MyHeadConfig.ts
export interface MyHeadConfig {
  getTitle?: () => string;
  meta?: Array<{
    name?: string;
    content?: string;
    // Add other common meta attributes here if needed
  }>;
}

export interface MyRouterContext {
  title: string;
}
