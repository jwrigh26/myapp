// Auto-generated content registry - DO NOT EDIT MANUALLY
// Generated on: 2025-09-26T16:02:49.619Z
// Total routes: 3

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
  'python/data-structures-deep-dive': {
    title: 'Data Structures Deep Dive',
    description:
      'Advanced Python data structures for competitive programming and system design',
    tags: [],
    items: [
      {
        id: 'trie',
        title: 'Trie (Prefix Tree) - String Search Powerhouse',
        anchor: 'trie',
        level: 1,
      },
      {
        id: 'union-find',
        title: 'Union-Find (Disjoint Set) - Connected Components',
        anchor: 'union-find',
        level: 1,
      },
      {
        id: 'segment-tree',
        title: 'Segment Tree - Range Query Master',
        anchor: 'segment-tree',
        level: 1,
        children: [
          {
            id: 'basic-segment-tree',
            title: 'Basic Range Sum Queries',
            anchor: 'basic-segment-tree',
            level: 2,
          },
          {
            id: 'lazy-propagation',
            title: 'Lazy Propagation for Range Updates',
            anchor: 'lazy-propagation',
            level: 2,
          },
        ],
      },
      {
        id: 'advanced-patterns',
        title: 'Advanced Problem-Solving Patterns',
        anchor: 'advanced-patterns',
        level: 1,
        children: [
          {
            id: 'fenwick-tree',
            title: 'Fenwick Tree (Binary Indexed Tree)',
            anchor: 'fenwick-tree',
            level: 2,
          },
        ],
      },
    ],
    lastUpdated: '2025-09-26T15:38:30.107Z',
    filepath:
      '/Users/maneki-neko/myapp/src/routes/learn/posts/python/data-structures-deep-dive.tsx',
  },
  'python/styling-example': {
    title: 'Styling Flexibility Example',
    description: 'Example showing flexible navigation markup patterns',
    tags: [],
    items: [
      {
        id: 'current-approach',
        title: 'Current Box + Typography Approach',
        anchor: 'current-approach',
        level: 1,
      },
      {
        id: 'section-name',
        title: 'Section Title',
        anchor: 'section-name',
        level: 1,
      },
      {
        id: 'explicit-data-attrs',
        title: 'Method 2: Explicit Data Attributes',
        anchor: 'explicit-data-attrs',
        level: 1,
      },
      {
        id: 'semantic-headings',
        title: 'Method 3: Semantic Heading Tags',
        anchor: 'semantic-headings',
        level: 1,
      },
      {
        id: 'nested-subsection',
        title: 'Nested Subsection Example',
        anchor: 'nested-subsection',
        level: 1,
      },
      {
        id: 'article-approach',
        title: 'Method 4: Article-Based Semantic Markup',
        anchor: 'article-approach',
        level: 1,
      },
      {
        id: 'styling-benefits',
        title: 'Styling Benefits',
        anchor: 'styling-benefits',
        level: 1,
      },
      {
        id: 'css-examples',
        title: 'CSS Styling Examples',
        anchor: 'css-examples',
        level: 1,
      },
    ],
    lastUpdated: '2025-09-26T15:53:19.927Z',
    filepath:
      '/Users/maneki-neko/myapp/src/routes/learn/posts/python/styling-example.tsx',
  },
  'python/whiteboarding-essentials': {
    title: 'Whiteboarding Essentials',
    description:
      'Complete guide to Python fundamentals for technical interviews and whiteboarding sessions',
    tags: [],
    items: [
      {
        id: 'variables',
        title: 'Variables & Dynamic Typing',
        anchor: 'variables',
        level: 1,
      },
      {
        id: 'conditionals',
        title: 'If Statements & Logic',
        anchor: 'conditionals',
        level: 1,
      },
      {
        id: 'loops',
        title: 'Loops & Iteration Patterns',
        anchor: 'loops',
        level: 1,
      },
      {
        id: 'math',
        title: 'Math Operations & Edge Cases',
        anchor: 'math',
        level: 1,
      },
      {
        id: 'arrays',
        title: 'Arrays (Lists) - The Interview Workhorse',
        anchor: 'arrays',
        level: 1,
      },
      {
        id: 'strings',
        title: 'Strings - Immutable but Powerful',
        anchor: 'strings',
        level: 1,
      },
      {
        id: 'data-structures',
        title: 'Essential Data Structures',
        anchor: 'data-structures',
        level: 1,
        children: [
          {
            id: 'queues',
            title: 'Queues (Collections.deque)',
            anchor: 'queues',
            level: 2,
          },
          {
            id: 'sets',
            title: 'Sets - O(1) Lookups',
            anchor: 'sets',
            level: 2,
          },
          {
            id: 'dictionaries',
            title: 'Dictionaries (Hash Maps)',
            anchor: 'dictionaries',
            level: 2,
          },
          {
            id: 'tuples',
            title: 'Tuples - Immutable Sequences',
            anchor: 'tuples',
            level: 2,
          },
        ],
      },
      {
        id: 'heaps',
        title: 'Heaps - Priority Queue Magic',
        anchor: 'heaps',
        level: 1,
      },
      {
        id: 'functions',
        title: 'Functions & Scope',
        anchor: 'functions',
        level: 1,
      },
      {
        id: 'classes',
        title: 'Classes for Data Structure Problems',
        anchor: 'classes',
        level: 1,
      },
      {
        id: 'lambdas',
        title: 'Lambda Functions - Concise Power',
        anchor: 'lambdas',
        level: 1,
      },
    ],
    lastUpdated: '2025-09-26T15:43:27.333Z',
    filepath:
      '/Users/maneki-neko/myapp/src/routes/learn/posts/python/whiteboarding-essentials.tsx',
  },
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

export function searchContent(
  query: string
): Array<{ route: string; entry: ContentEntry }> {
  const results: Array<{ route: string; entry: ContentEntry }> = [];
  const lowerQuery = query.toLowerCase();

  Object.entries(contentRegistry).forEach(([route, entry]) => {
    const searchableText = [
      entry.title,
      entry.description,
      ...entry.items.map((item) => item.title),
      ...(entry.tags || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    if (searchableText.includes(lowerQuery)) {
      results.push({ route, entry });
    }
  });

  return results;
}
