import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/index-layout.tsx", [
    index("pages/home.tsx"),
    route("about", "pages/about.tsx"),
    // * matches all URLs, the ? makes it optional so it will match / as well
    route("*?", "catchall.tsx"),
  ]),
  // # Foundations
  ...prefix("foundations", [
    layout("layouts/foundations-layout.tsx", [
      index("pages/foundations/index.tsx"),
      // ## Foundational Math
      ...prefix("math", [
        index("pages/foundations/math/index.tsx"),
        route(
          "asymptotic-notation",
          "pages/foundations/math/asymptotic-notation.tsx"
        ),
        route(
          "modular-arithmetic",
          "pages/foundations/math/modular-arithmetic.tsx"
        ),
        route(
          "complexity-analysis",
          "pages/foundations/math/complexity-analysis.tsx"
        ),
      ]),
      // ## Recursion
      ...prefix("recursion", [
        // ### Basics
        ...prefix("basics", [
          route(
            "backtracking",
            "pages/foundations/recursion/basics/backtracking.tsx"
          ),
          route(
            "divide-and-conquer",
            "pages/foundations/recursion/basics/divide-and-conquer.tsx"
          ),
          route(
            "factorials-and-fibonacci",
            "pages/foundations/recursion/basics/factorials-and-fibonacci.tsx"
          ),
          route(
            "tail-recursion",
            "pages/foundations/recursion/basics/tail-recursion.tsx"
          ),
        ]),
        ...prefix("advanced", [
          // ### Advanced
          route(
            "memoization",
            "pages/foundations/recursion/advanced/memoization.tsx"
          ),
          route(
            "recursion-vs-iteration",
            "pages/foundations/recursion/advanced/recursion-vs-iteration.tsx"
          ),
          route(
            "power-of-numbers",
            "pages/foundations/recursion/advanced/power-of-numbers.tsx"
          ),
          route("dfs", "pages/foundations/recursion/advanced/dfs.tsx"),
        ]),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
