// Auto-generated content registry - DO NOT EDIT MANUALLY
// Generated on: 2025-10-13T15:44:04.539Z
// Total routes: 16

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
  "ai/hello-world": {
    "title": "Hello AI World",
    "description": "Introduction to artificial intelligence and machine learning concepts",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-01T19:42:04.107Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/ai/hello-world.tsx"
  },
  "ai": {
    "title": "AI & Machine Learning",
    "description": "Exploring artificial intelligence, machine learning algorithms, and the future of intelligent systems.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:28:55.381Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/ai/index.tsx"
  },
  "dsa/hello-world": {
    "title": "Hello DSA World",
    "description": "Introduction to data structures and algorithms learning journey",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-01T19:42:04.108Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/dsa/hello-world.tsx"
  },
  "dsa": {
    "title": "Data Structures & Algorithms",
    "description": "Exploring data structures, algorithms, and problem-solving techniques for efficient computing.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:28:55.358Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/dsa/index.tsx"
  },
  "git/hello-world": {
    "title": "Hello Git World",
    "description": "Introduction to Git version control fundamentals and collaborative development",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-01T19:42:04.110Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/hello-world.tsx"
  },
  "git": {
    "title": "Git & Version Control",
    "description": "Mastering Git version control from basic commands to advanced workflows and collaboration.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:28:55.380Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/git/index.tsx"
  },
  "": {
    "title": "Learn",
    "description": "My Learning Journey",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-09-24T02:46:33.196Z",
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
    "lastUpdated": "2025-10-13T14:44:02.202Z",
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
    "lastUpdated": "2025-10-13T15:03:37.528Z",
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
    "lastUpdated": "2025-10-13T15:37:32.710Z",
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
    "lastUpdated": "2025-10-11T16:48:18.584Z",
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
