// React Router generated types for route:
// pages/foundations/algorithms/sorting/insertion-sort.tsx

import type * as T from "react-router/route-module"

import type { Info as Parent0 } from "../../../../../+types/root"
import type { Info as Parent1 } from "../../../../../layouts/+types/foundations-layout"

type Module = typeof import("../insertion-sort")

export type Info = {
  parents: [Parent0, Parent1],
  id: "pages/foundations/algorithms/sorting/insertion-sort"
  file: "pages/foundations/algorithms/sorting/insertion-sort.tsx"
  path: "foundations/algorithms/sorting/insertion-sort"
  params: {}
  module: Module
  loaderData: T.CreateLoaderData<Module>
  actionData: T.CreateActionData<Module>
}

export namespace Route {
  export type LinkDescriptors = T.LinkDescriptors
  export type LinksFunction = () => LinkDescriptors

  export type MetaArgs = T.CreateMetaArgs<Info>
  export type MetaDescriptors = T.MetaDescriptors
  export type MetaFunction = (args: MetaArgs) => MetaDescriptors

  export type HeadersArgs = T.HeadersArgs
  export type HeadersFunction = (args: HeadersArgs) => Headers | HeadersInit

  export type LoaderArgs = T.CreateServerLoaderArgs<Info>
  export type ClientLoaderArgs = T.CreateClientLoaderArgs<Info>
  export type ActionArgs = T.CreateServerActionArgs<Info>
  export type ClientActionArgs = T.CreateClientActionArgs<Info>

  export type HydrateFallbackProps = T.CreateHydrateFallbackProps<Info>
  export type ComponentProps = T.CreateComponentProps<Info>
  export type ErrorBoundaryProps = T.CreateErrorBoundaryProps<Info>
}