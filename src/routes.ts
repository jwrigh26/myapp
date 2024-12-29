import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/IndexLayout.tsx", [
    index("pages/Home.tsx"),
    route("about", "pages/About.tsx"),
    // * matches all URLs, the ? makes it optional so it will match / as well
    route("*?", "catchall.tsx"),
  ]),
] satisfies RouteConfig;
