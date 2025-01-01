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
      index("pages/foundations/index.tsx"), // Here we can outline what foundations is about
      // ## Foundational Math
      ...prefix("math", [
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
      // ## Data Structures
      ...prefix("datastructures", [
        // ### Hashing
        ...prefix("hashing", [
          route(
            "hash-tables",
            "pages/foundations/datastructures/hashing/hash-tables.tsx"
          ),
          route(
            "hash-maps",
            "pages/foundations/datastructures/hashing/hash-maps.tsx"
          ),
          route(
            "hash-sets",
            "pages/foundations/datastructures/hashing/hash-sets.tsx"
          ),
          route(
            "hash-functions",
            "pages/foundations/datastructures/hashing/hash-functions.tsx"
          ),
          route(
            "collision-resolution",
            "pages/foundations/datastructures/hashing/collision-resolution.tsx"
          ),
        ]),
        // ### Linear
        ...prefix("linear", [
          // arrays and dynamic arrays
          route("arrays", "pages/foundations/datastructures/linear/arrays.tsx"),
          // singly, doubly, and circular linked lists
          route(
            "linked-lists",
            "pages/foundations/datastructures/linear/linked-lists.tsx"
          ),
          route("stacks", "pages/foundations/datastructures/linear/stacks.tsx"),
          // queus and priority queues and deques
          route("queues", "pages/foundations/datastructures/linear/queues.tsx"),
        ]),
        // ### Non-Linear
        ...prefix("non-linear", [
          // Binary Trees, AVL Trees, Red-Black Trees, B-Trees, Tries ( Prefix Trees )
          route(
            "trees",
            "pages/foundations/datastructures/nonlinear/trees.tsx"
          ),
          route(
            "heaps",
            "pages/foundations/datastructures/nonlinear/heaps.tsx"
          ),
          route(
            "graphs",
            "pages/foundations/datastructures/nonlinear/graphs.tsx"
          ),
          // Adjacency List, Adjacency Matrix, Incidence Matrix, Edge List
          route(
            "matrix",
            "pages/foundations/datastructures/nonlinear/matrix.tsx"
          ),
          route("bfs", "pages/foundations/datastructures/nonlinear/bfs.tsx"),
          route("dfs", "pages/foundations/datastructures/nonlinear/dfs.tsx"),
          route(
            "shortest-path",
            "pages/foundations/datastructures/nonlinear/shortest-path.tsx"
          ),
        ]),
      ]),
      // ## Algorithms
      ...prefix("algorithms", [
        //
        // ### Searching
        ...prefix("searching", [
          route(
            "binary-search",
            "pages/foundations/algorithms/searching/binary-search.tsx"
          ),
          route(
            "linear-search",
            "pages/foundations/algorithms/searching/linear-search.tsx"
          ),
          route(
            "exponential-search",
            "pages/foundations/algorithms/searching/exponential-search.tsx"
          ),
        ]),
        // ### Sorting
        ...prefix("sorting", [
          route(
            "bubble-sort",
            "pages/foundations/algorithms/sorting/bubble-sort.tsx"
          ),
          route(
            "selection-sort",
            "pages/foundations/algorithms/sorting/selection-sort.tsx"
          ),
          route(
            "insertion-sort",
            "pages/foundations/algorithms/sorting/insertion-sort.tsx"
          ),
          route(
            "merge-sort",
            "pages/foundations/algorithms/sorting/merge-sort.tsx"
          ),
          route(
            "quick-sort",
            "pages/foundations/algorithms/sorting/quick-sort.tsx"
          ),
          route(
            "heap-sort",
            "pages/foundations/algorithms/sorting/heap-sort.tsx"
          ),
          route(
            "counting-sort",
            "pages/foundations/algorithms/sorting/counting-sort.tsx"
          ),
          route(
            "radix-sort",
            "pages/foundations/algorithms/sorting/radix-sort.tsx"
          ),
        ]),
        // ### sliding-window
        ...prefix("sliding-window", [
          // Maximum Sum Subarray (Kadane's Algorithm)
          route(
            "max-sum",
            "pages/foundations/algorithms/slidingwindow/max-sum.tsx"
          ),
          // Minimu Window Substring
          route(
            "min-substring",
            "pages/foundations/algorithms/slidingwindow/min-substring.tsx"
          ),
          // No Repeat characters
          route(
            "longest-subarray",
            "pages/foundations/algorithms/slidingwindow/longest-subarray.tsx"
          ),
        ]),
        // ### Dynamic Programming
        ...prefix("dynamic-programming", [
          route(
            "fibonacci",
            "pages/foundations/algorithms/dynamicprogramming/fibonacci.tsx"
          ),
          route(
            "coin-change",
            "pages/foundations/algorithms/dynamicprogramming/coin-change.tsx"
          ),
          route(
            "knapsack",
            "pages/foundations/algorithms/dynamicprogramming/knapsack.tsx"
          ),
          route(
            "longest-increasing-subsequence",
            "pages/foundations/algorithms/dynamicprogramming/lis.tsx"
          ),
        ]),
      ]),
      // ## Strings
      ...prefix("strings", [
        // ### Basics
        ...prefix("basics", [
          route("anagrams", "pages/foundations/strings/basics/anagrams.tsx"),
          route(
            "palindromes",
            "pages/foundations/strings/basics/palindromes.tsx"
          ),
          route(
            "permutations",
            "pages/foundations/strings/basics/permutations.tsx"
          ),
          route("reversal", "pages/foundations/strings/basics/reversal.tsx"),
          route(
            "sliding-window",
            "pages/foundations/strings/basics/sliding-window.tsx"
          ),
        ]),
        // ### Advanced
        ...prefix("advanced", [
          route("regex", "pages/foundations/strings/advanced/regex.tsx"),
          route(
            "substring-search",
            "pages/foundations/strings/advanced/substring-search.tsx"
          ),
          route(
            "string-matching",
            "pages/foundations/strings/advanced/string-matching.tsx"
          ),
          // Longest Common Subsequence
          route("LCS", "pages/foundations/strings/advanced/lcs.tsx"),
        ]),
      ]),
    ]),
  ]),
] satisfies RouteConfig;

// #######################################
// ### Route Generation
// #######################################

export interface RouteItem {
  path: string;
  text: string;
  children?: RouteItem[];
}

export const foundationRoutes: RouteItem[] = [
  {
    path: "/foundations",
    text: "foundations",
    children: [
      {
        path: "/foundations/math",
        text: "math",
        children: [
          {
            path: "/foundations/math/asymptotic-notation",
            text: "asymptotic-notation",
          },
          {
            path: "/foundations/math/modular-arithmetic",
            text: "modular-arithmetic",
          },
          {
            path: "/foundations/math/complexity-analysis",
            text: "complexity-analysis",
          },
        ],
      },
      {
        path: "/foundations/recursion",
        text: "recursion",
        children: [
          {
            path: "/foundations/recursion/basics",
            text: "basics",
            children: [
              {
                path: "/foundations/recursion/basics/backtracking",
                text: "backtracking",
              },
              {
                path: "/foundations/recursion/basics/divide-and-conquer",
                text: "divide-and-conquer",
              },
              {
                path: "/foundations/recursion/basics/factorials-and-fibonacci",
                text: "factorials-and-fibonacci",
              },
              {
                path: "/foundations/recursion/basics/tail-recursion",
                text: "tail-recursion",
              },
            ],
          },
          {
            path: "/foundations/recursion/advanced",
            text: "advanced",
            children: [
              {
                path: "/foundations/recursion/advanced/memoization",
                text: "memoization",
              },
              {
                path: "/foundations/recursion/advanced/recursion-vs-iteration",
                text: "recursion-vs-iteration",
              },
              {
                path: "/foundations/recursion/advanced/power-of-numbers",
                text: "power-of-numbers",
              },
              { path: "/foundations/recursion/advanced/dfs", text: "dfs" },
            ],
          },
        ],
      },
      {
        path: "/foundations/datastructures",
        text: "datastructures",
        children: [
          {
            path: "/foundations/datastructures/hashing",
            text: "hashing",
            children: [
              {
                path: "/foundations/datastructures/hashing/hash-tables",
                text: "hash-tables",
              },
              {
                path: "/foundations/datastructures/hashing/hash-maps",
                text: "hash-maps",
              },
              {
                path: "/foundations/datastructures/hashing/hash-sets",
                text: "hash-sets",
              },
              {
                path: "/foundations/datastructures/hashing/hash-functions",
                text: "hash-functions",
              },
              {
                path: "/foundations/datastructures/hashing/collision-resolution",
                text: "collision-resolution",
              },
            ],
          },
          {
            path: "/foundations/datastructures/linear",
            text: "linear",
            children: [
              {
                path: "/foundations/datastructures/linear/arrays",
                text: "arrays",
              },
              {
                path: "/foundations/datastructures/linear/linked-lists",
                text: "linked-lists",
              },
              {
                path: "/foundations/datastructures/linear/stacks",
                text: "stacks",
              },
              {
                path: "/foundations/datastructures/linear/queues",
                text: "queues",
              },
            ],
          },
          {
            path: "/foundations/datastructures/nonlinear",
            text: "nonlinear",
            children: [
              {
                path: "/foundations/datastructures/nonlinear/trees",
                text: "trees",
              },
              {
                path: "/foundations/datastructures/nonlinear/heaps",
                text: "heaps",
              },
              {
                path: "/foundations/datastructures/nonlinear/graphs",
                text: "graphs",
              },
              {
                path: "/foundations/datastructures/nonlinear/matrix",
                text: "matrix",
              },
              {
                path: "/foundations/datastructures/nonlinear/bfs",
                text: "bfs",
              },
              {
                path: "/foundations/datastructures/nonlinear/dfs",
                text: "dfs",
              },
              {
                path: "/foundations/datastructures/nonlinear/shortest-path",
                text: "shortest-path",
              },
            ],
          },
        ],
      },
      {
        path: "/foundations/algorithms",
        text: "algorithms",
        children: [
          {
            path: "/foundations/algorithms/searching",
            text: "searching",
            children: [
              {
                path: "/foundations/algorithms/searching/binary-search",
                text: "binary-search",
              },
              {
                path: "/foundations/algorithms/searching/linear-search",
                text: "linear-search",
              },
              {
                path: "/foundations/algorithms/searching/exponential-search",
                text: "exponential-search",
              },
            ],
          },
          {
            path: "/foundations/algorithms/sorting",
            text: "sorting",
            children: [
              {
                path: "/foundations/algorithms/sorting/bubble-sort",
                text: "bubble-sort",
              },
              {
                path: "/foundations/algorithms/sorting/selection-sort",
                text: "selection-sort",
              },
              {
                path: "/foundations/algorithms/sorting/insertion-sort",
                text: "insertion-sort",
              },
              {
                path: "/foundations/algorithms/sorting/merge-sort",
                text: "merge-sort",
              },
              {
                path: "/foundations/algorithms/sorting/quick-sort",
                text: "quick-sort",
              },
              {
                path: "/foundations/algorithms/sorting/heap-sort",
                text: "heap-sort",
              },
              {
                path: "/foundations/algorithms/sorting/counting-sort",
                text: "counting-sort",
              },
              {
                path: "/foundations/algorithms/sorting/radix-sort",
                text: "radix-sort",
              },
            ],
          },
          {
            path: "/foundations/algorithms/slidingwindow",
            text: "sliding-window",
            children: [
              {
                path: "/foundations/algorithms/slidingwindow/max-sum",
                text: "max-sum",
              },
              {
                path: "/foundations/algorithms/slidingwindow/min-substring",
                text: "min-substring",
              },
              {
                path: "/foundations/algorithms/slidingwindow/longest-subarray",
                text: "longest-subarray",
              },
            ],
          },
          {
            path: "/foundations/algorithms/dynamicprogramming",
            text: "dynamic-programming",
            children: [
              {
                path: "/foundations/algorithms/dynamicprogramming/fibonacci",
                text: "fibonacci",
              },
              {
                path: "/foundations/algorithms/dynamicprogramming/coin-change",
                text: "coin-change",
              },
              {
                path: "/foundations/algorithms/dynamicprogramming/knapsack",
                text: "knapsack",
              },
              {
                path: "/foundations/algorithms/dynamicprogramming/lis",
                text: "longest-increasing-subsequence",
              },
            ],
          },
        ],
      },
      {
        path: "/foundations/strings",
        text: "strings",
        children: [
          {
            path: "/foundations/strings/basics",
            text: "basics",
            children: [
              {
                path: "/foundations/strings/basics/anagrams",
                text: "anagrams",
              },
              {
                path: "/foundations/strings/basics/palindromes",
                text: "palindromes",
              },
              {
                path: "/foundations/strings/basics/permutations",
                text: "permutations",
              },
              {
                path: "/foundations/strings/basics/reversal",
                text: "reversal",
              },
              {
                path: "/foundations/strings/basics/sliding-window",
                text: "sliding-window",
              },
            ],
          },
          {
            path: "/foundations/strings/advanced",
            text: "advanced",
            children: [
              { path: "/foundations/strings/advanced/regex", text: "regex" },
              {
                path: "/foundations/strings/advanced/substring-search",
                text: "substring-search",
              },
              {
                path: "/foundations/strings/advanced/string-matching",
                text: "string-matching",
              },
              { path: "/foundations/strings/advanced/lcs", text: "LCS" },
            ],
          },
        ],
      },
    ],
  },
];
