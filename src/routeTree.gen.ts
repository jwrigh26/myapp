/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as HomeImport } from './routes/home'
import { Route as GameImport } from './routes/game'
import { Route as AboutImport } from './routes/about'
import { Route as BlogRouteImport } from './routes/blog/route'
import { Route as IndexImport } from './routes/index'
import { Route as BlogIndexImport } from './routes/blog/index'
import { Route as BlogPostsReactPatternsPage2Import } from './routes/blog/posts/react-patterns/page-2'
import { Route as BlogPostsReactPatternsPage1Import } from './routes/blog/posts/react-patterns/page-1'
import { Route as BlogPostsFrontendDesignPage3Import } from './routes/blog/posts/frontend-design/page-3'
import { Route as BlogPostsFrontendDesignPage2Import } from './routes/blog/posts/frontend-design/page-2'
import { Route as BlogPostsFrontendDesignPage1Import } from './routes/blog/posts/frontend-design/page-1'

// Create/Update Routes

const HomeRoute = HomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => rootRoute,
} as any)

const GameRoute = GameImport.update({
  id: '/game',
  path: '/game',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const BlogRouteRoute = BlogRouteImport.update({
  id: '/blog',
  path: '/blog',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const BlogIndexRoute = BlogIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => BlogRouteRoute,
} as any)

const BlogPostsReactPatternsPage2Route =
  BlogPostsReactPatternsPage2Import.update({
    id: '/posts/react-patterns/page-2',
    path: '/posts/react-patterns/page-2',
    getParentRoute: () => BlogRouteRoute,
  } as any)

const BlogPostsReactPatternsPage1Route =
  BlogPostsReactPatternsPage1Import.update({
    id: '/posts/react-patterns/page-1',
    path: '/posts/react-patterns/page-1',
    getParentRoute: () => BlogRouteRoute,
  } as any)

const BlogPostsFrontendDesignPage3Route =
  BlogPostsFrontendDesignPage3Import.update({
    id: '/posts/frontend-design/page-3',
    path: '/posts/frontend-design/page-3',
    getParentRoute: () => BlogRouteRoute,
  } as any)

const BlogPostsFrontendDesignPage2Route =
  BlogPostsFrontendDesignPage2Import.update({
    id: '/posts/frontend-design/page-2',
    path: '/posts/frontend-design/page-2',
    getParentRoute: () => BlogRouteRoute,
  } as any)

const BlogPostsFrontendDesignPage1Route =
  BlogPostsFrontendDesignPage1Import.update({
    id: '/posts/frontend-design/page-1',
    path: '/posts/frontend-design/page-1',
    getParentRoute: () => BlogRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/blog': {
      id: '/blog'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof BlogRouteImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/game': {
      id: '/game'
      path: '/game'
      fullPath: '/game'
      preLoaderRoute: typeof GameImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/blog/': {
      id: '/blog/'
      path: '/'
      fullPath: '/blog/'
      preLoaderRoute: typeof BlogIndexImport
      parentRoute: typeof BlogRouteImport
    }
    '/blog/posts/frontend-design/page-1': {
      id: '/blog/posts/frontend-design/page-1'
      path: '/posts/frontend-design/page-1'
      fullPath: '/blog/posts/frontend-design/page-1'
      preLoaderRoute: typeof BlogPostsFrontendDesignPage1Import
      parentRoute: typeof BlogRouteImport
    }
    '/blog/posts/frontend-design/page-2': {
      id: '/blog/posts/frontend-design/page-2'
      path: '/posts/frontend-design/page-2'
      fullPath: '/blog/posts/frontend-design/page-2'
      preLoaderRoute: typeof BlogPostsFrontendDesignPage2Import
      parentRoute: typeof BlogRouteImport
    }
    '/blog/posts/frontend-design/page-3': {
      id: '/blog/posts/frontend-design/page-3'
      path: '/posts/frontend-design/page-3'
      fullPath: '/blog/posts/frontend-design/page-3'
      preLoaderRoute: typeof BlogPostsFrontendDesignPage3Import
      parentRoute: typeof BlogRouteImport
    }
    '/blog/posts/react-patterns/page-1': {
      id: '/blog/posts/react-patterns/page-1'
      path: '/posts/react-patterns/page-1'
      fullPath: '/blog/posts/react-patterns/page-1'
      preLoaderRoute: typeof BlogPostsReactPatternsPage1Import
      parentRoute: typeof BlogRouteImport
    }
    '/blog/posts/react-patterns/page-2': {
      id: '/blog/posts/react-patterns/page-2'
      path: '/posts/react-patterns/page-2'
      fullPath: '/blog/posts/react-patterns/page-2'
      preLoaderRoute: typeof BlogPostsReactPatternsPage2Import
      parentRoute: typeof BlogRouteImport
    }
  }
}

// Create and export the route tree

interface BlogRouteRouteChildren {
  BlogIndexRoute: typeof BlogIndexRoute
  BlogPostsFrontendDesignPage1Route: typeof BlogPostsFrontendDesignPage1Route
  BlogPostsFrontendDesignPage2Route: typeof BlogPostsFrontendDesignPage2Route
  BlogPostsFrontendDesignPage3Route: typeof BlogPostsFrontendDesignPage3Route
  BlogPostsReactPatternsPage1Route: typeof BlogPostsReactPatternsPage1Route
  BlogPostsReactPatternsPage2Route: typeof BlogPostsReactPatternsPage2Route
}

const BlogRouteRouteChildren: BlogRouteRouteChildren = {
  BlogIndexRoute: BlogIndexRoute,
  BlogPostsFrontendDesignPage1Route: BlogPostsFrontendDesignPage1Route,
  BlogPostsFrontendDesignPage2Route: BlogPostsFrontendDesignPage2Route,
  BlogPostsFrontendDesignPage3Route: BlogPostsFrontendDesignPage3Route,
  BlogPostsReactPatternsPage1Route: BlogPostsReactPatternsPage1Route,
  BlogPostsReactPatternsPage2Route: BlogPostsReactPatternsPage2Route,
}

const BlogRouteRouteWithChildren = BlogRouteRoute._addFileChildren(
  BlogRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/blog': typeof BlogRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/game': typeof GameRoute
  '/home': typeof HomeRoute
  '/blog/': typeof BlogIndexRoute
  '/blog/posts/frontend-design/page-1': typeof BlogPostsFrontendDesignPage1Route
  '/blog/posts/frontend-design/page-2': typeof BlogPostsFrontendDesignPage2Route
  '/blog/posts/frontend-design/page-3': typeof BlogPostsFrontendDesignPage3Route
  '/blog/posts/react-patterns/page-1': typeof BlogPostsReactPatternsPage1Route
  '/blog/posts/react-patterns/page-2': typeof BlogPostsReactPatternsPage2Route
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/game': typeof GameRoute
  '/home': typeof HomeRoute
  '/blog': typeof BlogIndexRoute
  '/blog/posts/frontend-design/page-1': typeof BlogPostsFrontendDesignPage1Route
  '/blog/posts/frontend-design/page-2': typeof BlogPostsFrontendDesignPage2Route
  '/blog/posts/frontend-design/page-3': typeof BlogPostsFrontendDesignPage3Route
  '/blog/posts/react-patterns/page-1': typeof BlogPostsReactPatternsPage1Route
  '/blog/posts/react-patterns/page-2': typeof BlogPostsReactPatternsPage2Route
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/blog': typeof BlogRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/game': typeof GameRoute
  '/home': typeof HomeRoute
  '/blog/': typeof BlogIndexRoute
  '/blog/posts/frontend-design/page-1': typeof BlogPostsFrontendDesignPage1Route
  '/blog/posts/frontend-design/page-2': typeof BlogPostsFrontendDesignPage2Route
  '/blog/posts/frontend-design/page-3': typeof BlogPostsFrontendDesignPage3Route
  '/blog/posts/react-patterns/page-1': typeof BlogPostsReactPatternsPage1Route
  '/blog/posts/react-patterns/page-2': typeof BlogPostsReactPatternsPage2Route
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/blog'
    | '/about'
    | '/game'
    | '/home'
    | '/blog/'
    | '/blog/posts/frontend-design/page-1'
    | '/blog/posts/frontend-design/page-2'
    | '/blog/posts/frontend-design/page-3'
    | '/blog/posts/react-patterns/page-1'
    | '/blog/posts/react-patterns/page-2'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/game'
    | '/home'
    | '/blog'
    | '/blog/posts/frontend-design/page-1'
    | '/blog/posts/frontend-design/page-2'
    | '/blog/posts/frontend-design/page-3'
    | '/blog/posts/react-patterns/page-1'
    | '/blog/posts/react-patterns/page-2'
  id:
    | '__root__'
    | '/'
    | '/blog'
    | '/about'
    | '/game'
    | '/home'
    | '/blog/'
    | '/blog/posts/frontend-design/page-1'
    | '/blog/posts/frontend-design/page-2'
    | '/blog/posts/frontend-design/page-3'
    | '/blog/posts/react-patterns/page-1'
    | '/blog/posts/react-patterns/page-2'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BlogRouteRoute: typeof BlogRouteRouteWithChildren
  AboutRoute: typeof AboutRoute
  GameRoute: typeof GameRoute
  HomeRoute: typeof HomeRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BlogRouteRoute: BlogRouteRouteWithChildren,
  AboutRoute: AboutRoute,
  GameRoute: GameRoute,
  HomeRoute: HomeRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/blog",
        "/about",
        "/game",
        "/home"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/blog": {
      "filePath": "blog/route.tsx",
      "children": [
        "/blog/",
        "/blog/posts/frontend-design/page-1",
        "/blog/posts/frontend-design/page-2",
        "/blog/posts/frontend-design/page-3",
        "/blog/posts/react-patterns/page-1",
        "/blog/posts/react-patterns/page-2"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/game": {
      "filePath": "game.tsx"
    },
    "/home": {
      "filePath": "home.tsx"
    },
    "/blog/": {
      "filePath": "blog/index.tsx",
      "parent": "/blog"
    },
    "/blog/posts/frontend-design/page-1": {
      "filePath": "blog/posts/frontend-design/page-1.tsx",
      "parent": "/blog"
    },
    "/blog/posts/frontend-design/page-2": {
      "filePath": "blog/posts/frontend-design/page-2.tsx",
      "parent": "/blog"
    },
    "/blog/posts/frontend-design/page-3": {
      "filePath": "blog/posts/frontend-design/page-3.tsx",
      "parent": "/blog"
    },
    "/blog/posts/react-patterns/page-1": {
      "filePath": "blog/posts/react-patterns/page-1.tsx",
      "parent": "/blog"
    },
    "/blog/posts/react-patterns/page-2": {
      "filePath": "blog/posts/react-patterns/page-2.tsx",
      "parent": "/blog"
    }
  }
}
ROUTE_MANIFEST_END */
