// Auto-generated content registry - DO NOT EDIT MANUALLY
// Generated on: 2025-10-02T02:43:49.725Z
// Total routes: 11

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
  "math/hello-world": {
    "title": "Hello Math World",
    "description": "A friendly introduction to mathematical concepts and learning",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:43:23.196Z",
    "filepath": "/Users/maneki-neko/myapp/src/routes/learn/math/hello-world/index.tsx"
  },
  "math": {
    "title": "Mathematics",
    "description": "Mathematical concepts, proofs, and practical applications in computer science and engineering.",
    "tags": [],
    "items": [],
    "lastUpdated": "2025-10-02T02:28:55.371Z",
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
    "lastUpdated": "2025-10-01T19:42:04.113Z",
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
