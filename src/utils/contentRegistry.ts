// Auto-generated content registry - DO NOT EDIT MANUALLY
// Generated on: 2025-10-21T17:09:23.118Z
// Total routes: 20

export interface NavigationItem {
  id: string;
  title: string;
  anchor: string;
  level: 1 | 2 | 3;
  children?: NavigationItem[];
}

export interface ContentEntry {
  title?: string;
  description?: string;
  tags?: string[];
  items: NavigationItem[];
  lastUpdated: string;
  filepath: string;
}

export const contentRegistry: Record<string, ContentEntry> = {
  "dsa/binary-search": {
    "title": "Binary Search",
    "description": "plaeholder for binary search",
    "tags": [],
    "items": [
      {
        "id": "classic-binary-search",
        "title": "Classic Binary Search",
        "anchor": "classic-binary-search",
        "level": 1
      },
      {
        "id": "the-transition-point",
        "title": "The Transition Point",
        "anchor": "the-transition-point",
        "level": 1
      },
      {
        "id": "before-vs-after",
        "title": "A Recipe for Binary Search",
        "anchor": "before-vs-after",
        "level": 1,
        "children": [
          {
            "id": "ingredients",
            "title": "Ingredients",
            "anchor": "ingredients",
            "level": 2
          },
          {
            "id": "instructions",
            "title": "Instructions",
            "anchor": "instructions",
            "level": 2
          }
        ]
      }
    ],
    "lastUpdated": "2025-10-21T17:09:08.069Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/dsa/binary-search/index.tsx"
  },
  "dsa": {
    "title": "Data Structures & Algorithms",
    "description": "Exploring data structures, algorithms, and problem-solving techniques for efficient computing.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:28:55.358Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/dsa/index.tsx"
  },
  "git/branching": {
    "title": "Branching",
    "description": "Understanding the evolution from git checkout to git switch for branching workflows",
    "tags": [],
    "items": [
      {
        "id": "why-switch",
        "title": "Why Git Switch Exists",
        "anchor": "why-switch",
        "level": 1
      },
      {
        "id": "switching-existing",
        "title": "Switching to an Existing Branch",
        "anchor": "switching-existing",
        "level": 1
      },
      {
        "id": "create-and-switch",
        "title": "Create and Switch to a New Branch",
        "anchor": "create-and-switch",
        "level": 1
      },
      {
        "id": "force-create",
        "title": "Force Create a Branch",
        "anchor": "force-create",
        "level": 1
      },
      {
        "id": "renaming",
        "title": "Renaming Branches",
        "anchor": "renaming",
        "level": 1
      },
      {
        "id": "comparison",
        "title": "Side-by-Side Comparison",
        "anchor": "comparison",
        "level": 1
      },
      {
        "id": "migration-tips",
        "title": "Making the Switch",
        "anchor": "migration-tips",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-15T15:09:02.273Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/branching.tsx"
  },
  "git/cherry-picking": {
    "title": "Cherry-Picking",
    "description": "Learn how to cherry-pick specific commits from one branch to another without merging everything",
    "tags": [],
    "items": [
      {
        "id": "what-is-cherry-picking",
        "title": "What Is Cherry-Picking?",
        "anchor": "what-is-cherry-picking",
        "level": 1
      },
      {
        "id": "basic-cherry-pick",
        "title": "Basic Cherry-Picking",
        "anchor": "basic-cherry-pick",
        "level": 1
      },
      {
        "id": "multiple-commits",
        "title": "Cherry-Picking Multiple Commits",
        "anchor": "multiple-commits",
        "level": 1
      },
      {
        "id": "temp-branches",
        "title": "Working with Temp Branches",
        "anchor": "temp-branches",
        "level": 1
      },
      {
        "id": "conflicts",
        "title": "Handling Cherry-Pick Conflicts",
        "anchor": "conflicts",
        "level": 1
      },
      {
        "id": "workflows",
        "title": "Common Cherry-Pick Workflows",
        "anchor": "workflows",
        "level": 1
      },
      {
        "id": "best-practices",
        "title": "Best Practices & Warnings",
        "anchor": "best-practices",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-15T14:33:29.621Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/cherry-picking.tsx"
  },
  "git/every-day-git": {
    "title": "Every Day Git",
    "description": "Quick reference guide for git commands I use every day",
    "tags": [],
    "items": [
      {
        "id": "pushing-branch",
        "title": "Pushing a New Branch",
        "anchor": "pushing-branch",
        "level": 1
      },
      {
        "id": "deleting-branches",
        "title": "Deleting Branches",
        "anchor": "deleting-branches",
        "level": 1
      },
      {
        "id": "switching-branches",
        "title": "Creating & Switching Branches",
        "anchor": "switching-branches",
        "level": 1
      },
      {
        "id": "renaming-branches",
        "title": "Renaming Branches",
        "anchor": "renaming-branches",
        "level": 1
      },
      {
        "id": "git-logs",
        "title": "Viewing Git Logs",
        "anchor": "git-logs",
        "level": 1
      },
      {
        "id": "commit-messages",
        "title": "Better Commit Messages",
        "anchor": "commit-messages",
        "level": 1
      },
      {
        "id": "interactive-rebase",
        "title": "Cleaning Up Commits",
        "anchor": "interactive-rebase",
        "level": 1
      },
      {
        "id": "merge-conflicts",
        "title": "Resolving Merge Conflicts",
        "anchor": "merge-conflicts",
        "level": 1
      },
      {
        "id": "cleanup-branches",
        "title": "Cleaning Up Local Branches",
        "anchor": "cleanup-branches",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-15T00:52:31.191Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/every-day-git.tsx"
  },
  "git": {
    "title": "Git & Version Control",
    "description": "Mastering Git version control from basic commands to advanced workflows and collaboration.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:28:55.380Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/index.tsx"
  },
  "git/reset": {
    "title": "Reset",
    "description": "Understanding git reset modes and git stash for safely managing uncommitted changes",
    "tags": [],
    "items": [
      {
        "id": "git-reset",
        "title": "Understanding Git Reset",
        "anchor": "git-reset",
        "level": 1
      },
      {
        "id": "reset-soft",
        "title": "Reset --soft",
        "anchor": "reset-soft",
        "level": 1
      },
      {
        "id": "reset-mixed",
        "title": "Reset --mixed (default)",
        "anchor": "reset-mixed",
        "level": 1
      },
      {
        "id": "reset-hard",
        "title": "Reset --hard",
        "anchor": "reset-hard",
        "level": 1
      },
      {
        "id": "git-stash",
        "title": "Git Stash Basics",
        "anchor": "git-stash",
        "level": 1
      },
      {
        "id": "applying-stashes",
        "title": "Applying and Popping Stashes",
        "anchor": "applying-stashes",
        "level": 1
      },
      {
        "id": "stash-conflicts",
        "title": "Handling Stash Conflicts",
        "anchor": "stash-conflicts",
        "level": 1
      },
      {
        "id": "stash-branch",
        "title": "Stash Branch",
        "anchor": "stash-branch",
        "level": 1
      },
      {
        "id": "recovering-stashes",
        "title": "Recovering Lost Stashes",
        "anchor": "recovering-stashes",
        "level": 1
      },
      {
        "id": "managing-stashes",
        "title": "Managing Stashes",
        "anchor": "managing-stashes",
        "level": 1
      },
      {
        "id": "best-practices",
        "title": "Best Practices",
        "anchor": "best-practices",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-15T15:18:20.708Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/reset.tsx"
  },
  "git/stashing": {
    "title": "Stashing",
    "description": "Learn how to stash uncommitted changes safely and apply them later",
    "tags": [],
    "items": [
      {
        "id": "core-commands",
        "title": "Core Stash Commands",
        "anchor": "core-commands",
        "level": 1
      },
      {
        "id": "stash-options",
        "title": "Stash Options",
        "anchor": "stash-options",
        "level": 1
      },
      {
        "id": "apply-vs-pop",
        "title": "Apply vs Pop",
        "anchor": "apply-vs-pop",
        "level": 1
      },
      {
        "id": "stash-branch",
        "title": "Creating a Branch from Stash",
        "anchor": "stash-branch",
        "level": 1
      },
      {
        "id": "workflows",
        "title": "Real-World Workflows",
        "anchor": "workflows",
        "level": 1
      },
      {
        "id": "git-add",
        "title": "Git Add: -A vs . (dot)",
        "anchor": "git-add",
        "level": 1
      },
      {
        "id": "conflicts-recovery",
        "title": "Conflicts and Recovery",
        "anchor": "conflicts-recovery",
        "level": 1
      },
      {
        "id": "cleanup",
        "title": "Cleaning Up Stashes",
        "anchor": "cleanup",
        "level": 1
      },
      {
        "id": "safety-notes",
        "title": "Safety Notes & Best Practices",
        "anchor": "safety-notes",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-15T15:15:56.852Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/stashing.tsx"
  },
  "git/tagging": {
    "title": "Tagging",
    "description": "Learn how to use Git tags to mark releases, versions, and important points in your repository history",
    "tags": [],
    "items": [
      {
        "id": "what-are-tags",
        "title": "What Are Tags?",
        "anchor": "what-are-tags",
        "level": 1
      },
      {
        "id": "lightweight-tags",
        "title": "Creating Lightweight Tags",
        "anchor": "lightweight-tags",
        "level": 1
      },
      {
        "id": "annotated-tags",
        "title": "Creating Annotated Tags",
        "anchor": "annotated-tags",
        "level": 1
      },
      {
        "id": "listing-tags",
        "title": "Listing and Viewing Tags",
        "anchor": "listing-tags",
        "level": 1
      },
      {
        "id": "pushing-tags",
        "title": "Pushing Tags to Remote",
        "anchor": "pushing-tags",
        "level": 1
      },
      {
        "id": "deleting-tags",
        "title": "Deleting Tags",
        "anchor": "deleting-tags",
        "level": 1
      },
      {
        "id": "workflows",
        "title": "Common Tagging Workflows",
        "anchor": "workflows",
        "level": 1
      },
      {
        "id": "semver",
        "title": "Semantic Versioning",
        "anchor": "semver",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-15T14:27:56.936Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/tagging.tsx"
  },
  "": {
    "title": "Learn",
    "description": "My Learning Journey",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-13T20:16:56.885Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/index.tsx"
  },
  "math/dividing-fractions/advanced": {
    "title": "Deep dive into complex mathematical ideas",
    "tags": [],
    "items": [
      {
        "id": "overview",
        "title": "Overview",
        "anchor": "overview",
        "level": 1
      },
      {
        "id": "complex-numbers",
        "title": "Complex Numbers",
        "anchor": "complex-numbers",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-08T14:37:04.297Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/dividing-fractions/advanced.lazy.tsx"
  },
  "math/dividing-fractions/examples": {
    "title": "Real-world applications and practice problems",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-08T14:37:04.633Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/dividing-fractions/examples.lazy.tsx"
  },
  "math/dividing-fractions": {
    "title": "Dividing Fractions",
    "description": "Learn how to divide fractions step by step with clear explanations and examples",
    "tags": [],
    "items": [
      {
        "id": "division-example",
        "title": "Division Example",
        "anchor": "division-example",
        "level": 1
      },
      {
        "id": "simplifying-fractions",
        "title": "Simplifying with Cancellation",
        "anchor": "simplifying-fractions",
        "level": 1
      },
      {
        "id": "mixed-numbers",
        "title": "Mixed Numbers",
        "anchor": "mixed-numbers",
        "level": 1
      },
      {
        "id": "interpret-fractions",
        "title": "Interpret Fraction Division",
        "anchor": "interpret-fractions",
        "level": 1,
        "children": [
          {
            "id": "repeated-groups",
            "title": "Repeated Groups",
            "anchor": "repeated-groups",
            "level": 2
          },
          {
            "id": "multiplicative-comparision",
            "title": "Multiplicative Comparison",
            "anchor": "multiplicative-comparision",
            "level": 2
          },
          {
            "id": "rectangular-area",
            "title": "Rectangular Area (Geometric Model)",
            "anchor": "rectangular-area",
            "level": 2
          }
        ]
      },
      {
        "id": "how-they-fit-together",
        "title": "How They Fit Together",
        "anchor": "how-they-fit-together",
        "level": 1
      },
      {
        "id": "in-short",
        "title": "In Short",
        "anchor": "in-short",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-16T15:56:26.740Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/dividing-fractions/index.tsx"
  },
  "math/division": {
    "title": "Division",
    "description": "Learn the basics of division, long division, and dividing with decimals",
    "tags": [],
    "items": [
      {
        "id": "key-vocabulary",
        "title": "Key Vocabulary",
        "anchor": "key-vocabulary",
        "level": 1
      },
      {
        "id": "division-notation",
        "title": "Ways to Write Division",
        "anchor": "division-notation",
        "level": 1
      },
      {
        "id": "basic-division",
        "title": "Basic Division",
        "anchor": "basic-division",
        "level": 1
      },
      {
        "id": "division-remainders",
        "title": "Division with Remainders",
        "anchor": "division-remainders",
        "level": 1
      },
      {
        "id": "long-division",
        "title": "Long Division",
        "anchor": "long-division",
        "level": 1
      },
      {
        "id": "division-decimals",
        "title": "Division with Decimals",
        "anchor": "division-decimals",
        "level": 1
      },
      {
        "id": "common-mistakes",
        "title": "Common Mistakes to Avoid",
        "anchor": "common-mistakes",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-16T15:56:17.782Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/division/index.tsx"
  },
  "math/division/problems": {
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-13T14:01:15.604Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/division/problems.lazy.tsx"
  },
  "math/exponents": {
    "title": "Exponents & Roots",
    "description": "Master exponents, roots, fractional exponents, and logarithmic form",
    "tags": [],
    "items": [
      {
        "id": "what-are-exponents",
        "title": "What Are Exponents?",
        "anchor": "what-are-exponents",
        "level": 1
      },
      {
        "id": "special-cases",
        "title": "Special Cases",
        "anchor": "special-cases",
        "level": 1
      },
      {
        "id": "exponent-rules",
        "title": "The 5 Essential Rules",
        "anchor": "exponent-rules",
        "level": 1,
        "children": [
          {
            "id": "rule-multiplication",
            "title": "Rule 1: Multiplying Same Base",
            "anchor": "rule-multiplication",
            "level": 2
          },
          {
            "id": "rule-division",
            "title": "Rule 2: Dividing Same Base",
            "anchor": "rule-division",
            "level": 2
          },
          {
            "id": "rule-power-of-power",
            "title": "Rule 3: Power of a Power",
            "anchor": "rule-power-of-power",
            "level": 2
          },
          {
            "id": "rule-power-of-product",
            "title": "Rule 4: Power of a Product",
            "anchor": "rule-power-of-product",
            "level": 2
          },
          {
            "id": "rule-power-of-quotient",
            "title": "Rule 5: Power of a Quotient",
            "anchor": "rule-power-of-quotient",
            "level": 2
          }
        ]
      },
      {
        "id": "negative-exponents",
        "title": "Negative Exponents",
        "anchor": "negative-exponents",
        "level": 1
      },
      {
        "id": "fractional-exponents",
        "title": "Fractional Exponents (Roots)",
        "anchor": "fractional-exponents",
        "level": 1,
        "children": [
          {
            "id": "fractional-with-power",
            "title": "When the Numerator Isn't 1",
            "anchor": "fractional-with-power",
            "level": 2
          }
        ]
      },
      {
        "id": "negative-fractional",
        "title": "Negative Fractional Exponents",
        "anchor": "negative-fractional",
        "level": 1
      },
      {
        "id": "roots-in-fractions",
        "title": "Roots in Fractions",
        "anchor": "roots-in-fractions",
        "level": 1
      },
      {
        "id": "logarithms",
        "title": "Introduction to Logarithms",
        "anchor": "logarithms",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-16T15:56:10.034Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/exponents/index.tsx"
  },
  "math": {
    "title": "Mathematics",
    "description": "Mathematical concepts, proofs, and practical applications in computer science and engineering.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-08T14:37:04.758Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/index.tsx"
  },
  "math/sigma-notation": {
    "title": "Sigma Notation",
    "description": "Master sigma notation for mathematics and algorithm analysis",
    "tags": [],
    "items": [
      {
        "id": "what-is-sigma",
        "title": "What is Sigma Notation?",
        "anchor": "what-is-sigma",
        "level": 1
      },
      {
        "id": "how-to-read",
        "title": "How to Read Sigma Notation",
        "anchor": "how-to-read",
        "level": 1
      },
      {
        "id": "basic-examples",
        "title": "Basic Examples",
        "anchor": "basic-examples",
        "level": 1
      },
      {
        "id": "expressions",
        "title": "Expressions as Terms",
        "anchor": "expressions",
        "level": 1
      },
      {
        "id": "constants",
        "title": "Working with Constants",
        "anchor": "constants",
        "level": 1
      },
      {
        "id": "formulas",
        "title": "Useful Formulas",
        "anchor": "formulas",
        "level": 1
      },
      {
        "id": "algorithm-analysis",
        "title": "Sigma in Algorithm Analysis",
        "anchor": "algorithm-analysis",
        "level": 1,
        "children": [
          {
            "id": "loop-analysis",
            "title": "Counting Loop Operations",
            "anchor": "loop-analysis",
            "level": 2
          },
          {
            "id": "insertion-sort",
            "title": "Real Example: Insertion Sort",
            "anchor": "insertion-sort",
            "level": 2
          },
          {
            "id": "nested-loops",
            "title": "Nested Loops",
            "anchor": "nested-loops",
            "level": 2
          }
        ]
      },
      {
        "id": "properties",
        "title": "Sigma Properties",
        "anchor": "properties",
        "level": 1
      },
      {
        "id": "quick-reference",
        "title": "Quick Reference",
        "anchor": "quick-reference",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-16T15:56:33.647Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/sigma-notation/index.tsx"
  },
  "python": {
    "title": "Python Programming",
    "description": "Mastering Python programming from fundamentals to advanced concepts and real-world applications.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:28:55.381Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/python/index.tsx"
  },
  "python/whiteboarding-essentials": {
    "title": "Whiteboarding Essentials",
    "description": "Complete guide to Python fundamentals for technical interviews and whiteboarding sessions",
    "tags": [],
    "items": [
      {
        "id": "variables",
        "title": "Variables",
        "anchor": "variables",
        "level": 1
      },
      {
        "id": "conditionals",
        "title": "If Statements & Logic",
        "anchor": "conditionals",
        "level": 1
      },
      {
        "id": "loops",
        "title": "Loops & Iteration Patterns",
        "anchor": "loops",
        "level": 1
      },
      {
        "id": "math",
        "title": "Math Operations & Edge Cases",
        "anchor": "math",
        "level": 1
      },
      {
        "id": "arrays",
        "title": "Arrays (Lists) - The Interview Workhorse",
        "anchor": "arrays",
        "level": 1
      },
      {
        "id": "strings",
        "title": "Strings - Immutable but Powerful",
        "anchor": "strings",
        "level": 1
      },
      {
        "id": "data-structures",
        "title": "Essential Data Structures",
        "anchor": "data-structures",
        "level": 1,
        "children": [
          {
            "id": "queues",
            "title": "Queues (Collections.deque)",
            "anchor": "queues",
            "level": 2
          },
          {
            "id": "sets",
            "title": "Sets - O(1) Lookups",
            "anchor": "sets",
            "level": 2
          },
          {
            "id": "dictionaries",
            "title": "Dictionaries (Hash Maps)",
            "anchor": "dictionaries",
            "level": 2
          },
          {
            "id": "tuples",
            "title": "Tuples - Immutable Sequences",
            "anchor": "tuples",
            "level": 2
          }
        ]
      },
      {
        "id": "heaps",
        "title": "Heaps - Priority Queue Magic",
        "anchor": "heaps",
        "level": 1
      },
      {
        "id": "functions",
        "title": "Functions & Scope",
        "anchor": "functions",
        "level": 1
      },
      {
        "id": "classes",
        "title": "Classes for Data Structure Problems",
        "anchor": "classes",
        "level": 1
      },
      {
        "id": "lambdas",
        "title": "Lambda Functions - Concise Power",
        "anchor": "lambdas",
        "level": 1
      }
    ],
    "lastUpdated": "2025-10-16T18:06:35.218Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/python/whiteboarding-essentials.tsx"
  }
};

export function getNavigationItems(routePath: string): NavigationItem[] {
  return contentRegistry[routePath]?.items || [];
}

export function getContentTitle(routePath: string): string {
  return contentRegistry[routePath]?.title || 'Learn';
}

export function getAllRoutes(): string[] {
  return Object.keys(contentRegistry);
}

export function searchContent(query: string): Array<{ route: string; entry: ContentEntry }> {
  const results: Array<{ route: string; entry: ContentEntry }> = [];
  const lowerQuery = query.toLowerCase();
  
  Object.entries(contentRegistry).forEach(([route, entry]) => {
    const searchableText = [
      entry.title,
      entry.description,
      ...entry.items.map(item => item.title),
      ...(entry.tags || [])
    ].filter(Boolean).join(' ').toLowerCase();
    
    if (searchableText.includes(lowerQuery)) {
      results.push({ route, entry });
    }
  });
  
  return results;
}
