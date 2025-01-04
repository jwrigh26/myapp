import { RouteItem, RouteType } from "src/routes";

export const foundationRoutes: RouteItem[] = [
  {
    path: "/foundations",
    text: "Foundations",
    type: RouteType.Index,
    level: 0,
    children: [
      {
        path: "/foundations/getting-started",
        text: "Getting Started",
        level: 1,
      },
    ],
  },
  {
    path: "/foundations/algorithms",
    text: "Algorithms",
    type: RouteType.Index,
    level: 0,
    children: [
      {
        path: "/foundations/algorithms/searching",
        text: "Searching",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/algorithms/searching/binary-search",
        text: "Binary Search",
        level: 1,
      },
      {
        path: "/foundations/algorithms/searching/linear-search",
        text: "Linear Search",
        level: 1,
      },
      {
        path: "/foundations/algorithms/searching/exponential-search",
        text: "Exponential Search",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting",
        text: "Sorting",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/algorithms/sorting/bubble-sort",
        text: "Bubble Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting/selection-sort",
        text: "Selection Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting/insertion-sort",
        text: "Insertion Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting/merge-sort",
        text: "Merge Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting/quick-sort",
        text: "Quick Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting/heap-sort",
        text: "Heap Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting/counting-sort",
        text: "Counting Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/sorting/radix-sort",
        text: "Radix Sort",
        level: 1,
      },
      {
        path: "/foundations/algorithms/slidingwindow",
        text: "Sliding Window",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/algorithms/slidingwindow/max-sum",
        text: "Max Sum",
        level: 1,
      },
      {
        path: "/foundations/algorithms/slidingwindow/min-substring",
        text: "Min Substring",
        level: 1,
      },
      {
        path: "/foundations/algorithms/slidingwindow/longest-subarray",
        text: "Longest Subarray",
        level: 1,
      },
      {
        path: "/foundations/algorithms/dynamicprogramming",
        text: "Dynamic Programming",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/algorithms/dynamicprogramming/fibonacci",
        text: "Fibonacci",
        level: 1,
      },
      {
        path: "/foundations/algorithms/dynamicprogramming/coin-change",
        text: "Coin Change",
        level: 1,
      },
      {
        path: "/foundations/algorithms/dynamicprogramming/knapsack",
        text: "Knapsack",
        level: 1,
      },
      {
        path: "/foundations/algorithms/dynamicprogramming/lis",
        text: "LIS",
        level: 1,
      },
    ],
  },
  {
    path: "/foundations/datastructures",
    text: "Data Structures",
    type: RouteType.Index,
    level: 0,
    children: [
      {
        path: "/foundations/datastructures/hashing",
        text: "Hashing",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/datastructures/hashing/hash-tables",
        text: "Hash Tables",
        level: 1,
      },
      {
        path: "/foundations/datastructures/hashing/hash-maps",
        text: "Hash Maps",
        level: 1,
      },
      {
        path: "/foundations/datastructures/hashing/hash-sets",
        text: "Hash Sets",
        level: 1,
      },
      {
        path: "/foundations/datastructures/hashing/hash-functions",
        text: "Hash Functions",
        level: 1,
      },
      {
        path: "/foundations/datastructures/hashing/collision-resolution",
        text: "Collision Resolution",
        level: 1,
      },
      {
        path: "/foundations/datastructures/linear",
        text: "Linear",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/datastructures/linear/arrays",
        text: "Arrays",
        level: 1,
      },
      {
        path: "/foundations/datastructures/linear/linked-lists",
        text: "Linked Lists",
        level: 1,
      },
      {
        path: "/foundations/datastructures/linear/stacks",
        text: "Stacks",
        level: 1,
      },
      {
        path: "/foundations/datastructures/linear/queues",
        text: "Queues",
        level: 1,
      },
      {
        path: "/foundations/datastructures/nonlinear",
        text: "Nonlinear",
        type: RouteType.Prefix,
        level: 0,
        children: [
          {
            path: "/foundations/datastructures/nonlinear/trees",
            text: "Trees",
            level: 1,
          },
          {
            path: "/foundations/datastructures/nonlinear/heaps",
            text: "Heaps",
            level: 1,
          },
          {
            path: "/foundations/datastructures/nonlinear/graphs",
            text: "Graphs",
            level: 1,
          },
          {
            path: "/foundations/datastructures/nonlinear/matrix",
            text: "Matrix",
            level: 1,
          },
          {
            path: "/foundations/datastructures/nonlinear/bfs",
            text: "BFS",
            level: 1,
          },
          {
            path: "/foundations/datastructures/nonlinear/dfs",
            text: "DFS",
            level: 1,
          },
          {
            path: "/foundations/datastructures/nonlinear/shortest-path",
            text: "Shortest Path",
            level: 1,
          },
        ],
      },
    ],
  },
  {
    path: "/foundations/math",
    text: "Math",
    level: 0,
    type: RouteType.Index,
    children: [
      {
        path: "/foundations/math/asymptotic-notation",
        text: "Asymptotic Notation",
        level: 1,
      },
      {
        path: "/foundations/math/modular-arithmetic",
        text: "Modular Arithmetic",
        level: 1,
      },
      {
        path: "/foundations/math/complexity-analysis",
        text: "Complexity Analysis",
        level: 1,
      },
    ],
  },
  {
    path: "/foundations/recursion",
    text: "Recursion",
    type: RouteType.Index,
    level: 0,
    children: [
      {
        path: "/foundations/recursion/basics",
        text: "Basics",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/recursion/basics/backtracking",
        text: "Backtracking",
        level: 1,
      },
      {
        path: "/foundations/recursion/basics/divide-and-conquer",
        text: "Divide and Conquer",
        level: 1,
      },
      {
        path: "/foundations/recursion/basics/factorials-and-fibonacci",
        text: "Factorials and Fibonacci",
        level: 1,
      },
      {
        path: "/foundations/recursion/basics/tail-recursion",
        text: "Tail Recursion",
        level: 1,
      },
      {
        path: "/foundations/recursion/advanced",
        text: "Advanced",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/recursion/advanced/memoization",
        text: "Memoization",
        level: 1,
      },
      {
        path: "/foundations/recursion/advanced/recursion-vs-iteration",
        text: "Recursion vs Iteration",
        level: 1,
      },
      {
        path: "/foundations/recursion/advanced/power-of-numbers",
        text: "Power of Numbers",
        level: 1,
      },
      {
        path: "/foundations/recursion/advanced/dfs",
        text: "DFS",
        level: 1,
      },
    ],
  },
  {
    path: "/foundations/strings",
    text: "Strings",
    type: RouteType.Index,
    level: 0,
    children: [
      {
        path: "/foundations/strings/basics",
        text: "Basics",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/strings/basics/anagrams",
        text: "Anagrams",
        level: 1,
      },
      {
        path: "/foundations/strings/basics/palindromes",
        text: "Palindromes",
        level: 1,
      },
      {
        path: "/foundations/strings/basics/permutations",
        text: "Permutations",
        level: 1,
      },
      {
        path: "/foundations/strings/basics/reversal",
        text: "Reversal",
        level: 1,
      },
      {
        path: "/foundations/strings/basics/sliding-window",
        text: "Sliding Window",
        level: 1,
      },
      {
        path: "/foundations/strings/advanced",
        text: "Advanced",
        type: RouteType.Prefix,
        level: 0,
      },
      {
        path: "/foundations/strings/advanced/regex",
        text: "Regex",
        level: 1,
      },
      {
        path: "/foundations/strings/advanced/substring-search",
        text: "Substring Search",
        level: 1,
      },
      {
        path: "/foundations/strings/advanced/string-matching",
        text: "String Matching",
        level: 1,
      },
      {
        path: "/foundations/strings/advanced/lcs",
        text: "LCS",
        level: 1,
      },
    ],
  },
];
