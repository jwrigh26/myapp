import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/index-layout.tsx", [
    index("pages/home.tsx"),
    route("about", "pages/about.tsx"),
    route("dashboard", "pages/dashboard.tsx"),
    // * matches all URLs, the ? makes it optional so it will match / as well
    route("*?", "catchall.tsx"),
  ]),
] satisfies RouteConfig;

// #######################################
// ### Route Generation
// #######################################

export enum RouteType {
  Index = 0,
  Prefix = 1,
  Route = 2,
}

export interface RouteItem {
  path: string;
  text: string;
  children?: RouteItem[];
  level: number;
  type?: RouteType;
}
