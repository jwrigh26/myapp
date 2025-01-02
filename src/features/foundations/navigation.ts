import { RouteItem, RouteType } from "src/routes";

export const foundationRoutes: RouteItem[] = [
  {
    path: "/foundations",
    text: "Getting Started",
    level: 0,
    type: RouteType.Index,
  },
  {
    path: "/foundations/math",
    text: "math",
    level: 0,
    type: RouteType.Index,
  },
  // ### Math
  {
    path: "/foundations/math/asymptotic-notation",
    text: "asymptotic-notation",
    level: 1,
  },
  {
    path: "/foundations/math/modular-arithmetic",
    text: "modular-arithmetic",
    level: 1,
  },
  {
    path: "/foundations/math/complexity-analysis",
    text: "complexity-analysis",
    level: 1,
  },
  // ### Recursion
  {
    path: "/foundations/recursion",
    text: "recursion",
    type: RouteType.Index,
    level: 0,
  },
  {
    path: "/foundations/recursion/basics",
    text: "basics",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/recursion/basics/backtracking",
    text: "backtracking",
    level: 2,
  },
  {
    path: "/foundations/recursion/basics/divide-and-conquer",
    text: "divide-and-conquer",
    level: 2,
  },
  {
    path: "/foundations/recursion/basics/factorials-and-fibonacci",
    text: "factorials-and-fibonacci",
    level: 2,
  },
  {
    path: "/foundations/recursion/basics/tail-recursion",
    text: "tail-recursion",
    level: 2,
  },
  {
    path: "/foundations/recursion/advanced",
    text: "advanced",
    type: RouteType.Prefix,
    level: 1,
  },
  {
    path: "/foundations/recursion/advanced/memoization",
    text: "memoization",
    level: 2,
  },
  {
    path: "/foundations/recursion/advanced/recursion-vs-iteration",
    text: "recursion-vs-iteration",
    level: 2,
  },
  {
    path: "/foundations/recursion/advanced/power-of-numbers",
    text: "power-of-numbers",
    level: 2,
  },
  {
    path: "/foundations/recursion/advanced/dfs",
    text: "dfs",
    level: 2,
  },
  {
    path: "/foundations/datastructures",
    text: "datastructures",
    level: 0,
  },
  {
    path: "/foundations/datastructures/hashing",
    text: "hashing",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/datastructures/hashing/hash-tables",
    text: "hash-tables",
    level: 2,
  },
  {
    path: "/foundations/datastructures/hashing/hash-maps",
    text: "hash-maps",
    level: 2,
  },
  {
    path: "/foundations/datastructures/hashing/hash-sets",
    text: "hash-sets",
    level: 2,
  },
  {
    path: "/foundations/datastructures/hashing/hash-functions",
    text: "hash-functions",
    level: 2,
  },
  {
    path: "/foundations/datastructures/hashing/collision-resolution",
    text: "collision-resolution",
    level: 2,
  },
  {
    path: "/foundations/datastructures/linear",
    text: "linear",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/datastructures/nonlinear/trees",
    text: "trees",
    level: 2,
  },
  {
    path: "/foundations/datastructures/nonlinear/heaps",
    text: "heaps",
    level: 2,
  },
  {
    path: "/foundations/datastructures/nonlinear/graphs",
    text: "graphs",
    level: 2,
  },
  {
    path: "/foundations/datastructures/nonlinear/matrix",
    text: "matrix",
    level: 2,
  },
  {
    path: "/foundations/datastructures/nonlinear/bfs",
    text: "bfs",
    level: 2,
  },
  {
    path: "/foundations/datastructures/nonlinear/dfs",
    text: "dfs",
    level: 2,
  },
  {
    path: "/foundations/datastructures/nonlinear/shortest-path",
    text: "shortest-path",
    level: 2,
  },
  {
    path: "/foundations/algorithms",
    text: "algorithms",
    level: 0,
  },
  {
    path: "/foundations/algorithms/searching",
    text: "searching",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/algorithms/searching/binary-search",
    text: "binary-search",
    level: 2,
  },
  {
    path: "/foundations/algorithms/searching/linear-search",
    text: "linear-search",
    level: 2,
  },
  {
    path: "/foundations/algorithms/searching/exponential-search",
    text: "exponential-search",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting",
    text: "sorting",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/algorithms/sorting/bubble-sort",
    text: "bubble-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting/selection-sort",
    text: "selection-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting/insertion-sort",
    text: "insertion-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting/merge-sort",
    text: "merge-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting/quick-sort",
    text: "quick-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting/heap-sort",
    text: "heap-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting/counting-sort",
    text: "counting-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/sorting/radix-sort",
    text: "radix-sort",
    level: 2,
  },
  {
    path: "/foundations/algorithms/slidingwindow",
    text: "sliding-window",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/algorithms/slidingwindow/max-sum",
    text: "max-sum",
    level: 2,
  },
  {
    path: "/foundations/algorithms/slidingwindow/min-substring",
    text: "min-substring",
    level: 2,
  },
  {
    path: "/foundations/algorithms/slidingwindow/longest-subarray",
    text: "longest-subarray",
    level: 2,
  },
  {
    path: "/foundations/algorithms/dynamicprogramming",
    text: "dynamic-programming",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/algorithms/dynamicprogramming/fibonacci",
    text: "fibonacci",
    level: 2,
  },
  {
    path: "/foundations/algorithms/dynamicprogramming/coin-change",
    text: "coin-change",
    level: 2,
  },
  {
    path: "/foundations/algorithms/dynamicprogramming/knapsack",
    text: "knapsack",
    level: 2,
  },
  {
    path: "/foundations/algorithms/dynamicprogramming/lis",
    text: "longest-increasing-subsequence",
    level: 2,
  },
  {
    path: "/foundations/strings",
    text: "strings",
    level: 0,
  },
  {
    path: "/foundations/strings/basics",
    text: "basics",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/strings/basics/anagrams",
    text: "anagrams",
    level: 2,
  },
  {
    path: "/foundations/strings/basics/palindromes",
    text: "palindromes",
    level: 2,
  },
  {
    path: "/foundations/strings/basics/permutations",
    text: "permutations",
    level: 2,
  },
  {
    path: "/foundations/strings/basics/reversal",
    text: "reversal",
    level: 2,
  },
  {
    path: "/foundations/strings/basics/sliding-window",
    text: "sliding-window",
    level: 2,
  },
  {
    path: "/foundations/strings/advanced",
    text: "advanced",
    level: 1,
    type: RouteType.Prefix,
  },
  {
    path: "/foundations/strings/advanced/regex",
    text: "regex",
    level: 2,
  },
  {
    path: "/foundations/strings/advanced/substring-search",
    text: "substring-search",
    level: 2,
  },
  {
    path: "/foundations/strings/advanced/string-matching",
    text: "string-matching",
    level: 2,
  },
  {
    path: "/foundations/strings/advanced/lcs",
    text: "LCS",
    level: 2,
  },
];
