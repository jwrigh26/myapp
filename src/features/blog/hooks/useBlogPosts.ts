import { useQuery } from '@tanstack/react-query';
import { getThumbImageSrc } from '@/utils/images';
import { routeTree } from '@/routeTree.gen';

export interface BlogPostSummary {
  title: string;
  blurb: string;
  image: string;
  route: string;
  date: string; // ISO date
}

// #################################################
// ### Blog Post Generation
// #################################################

/**
 * Generates a list of blog post summaries from the route tree.
 *
 * This function traverses the route tree, filters for routes that represent blog posts
 * (identified by the presence of a `staticData.blog` object), and maps them to
 * a `BlogPostSummary` format. This allows for a single source of truth for blog posts,
 * driven by the file-based routing setup.
 *
 * @returns An array of `BlogPostSummary` objects.
 */
function generateBlogPostsFromRoutes(): BlogPostSummary[] {
  const blogPosts: BlogPostSummary[] = [];

  // The any is not ideal, but it's a pragmatic way to traverse the unknown shape of the route tree.
  // A more robust solution might involve Zod or other schema validation libraries if the structure
  // becomes more complex or if type safety is critical.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverse(node: any): void {
    if (node.options?.head) {
      const { staticData } = node.options.head() ?? {};
      if (staticData) {
        const {
          title,
          description: blurb,
          publishedDate: date,
          imageKey,
          route,
        } = staticData;
        blogPosts.push({
          title,
          blurb,
          date,
          image: getThumbImageSrc(imageKey),
          route: `/blog${route}`, // Ensure route is prefixed correctly
        });
      }
    }

    if (node.children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node.children.forEach((child: any) => traverse(child));
    }
  }

  traverse(routeTree);
  return blogPosts;
}

const ALL_BLOG_POSTS = generateBlogPostsFromRoutes();

// #################################################
// ### Data Access Hooks & Functions
// #################################################

// Sort newest first by date (desc)
function sortPosts(posts: BlogPostSummary[]): BlogPostSummary[] {
  return [...posts].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );
}

interface UseBlogPostsOptions {
  limit?: number; // default 25
  select?: (posts: BlogPostSummary[]) => BlogPostSummary[];
}

export function useBlogPosts(options: UseBlogPostsOptions = {}) {
  const { limit = 25, select } = options;

  return useQuery({
    queryKey: ['blogPosts', { limit }],
    queryFn: async () => {
      // Simulate async boundary (e.g., fetch or dynamic import)
      // Could later be: const data = await fetch('/api/blog?limit=' + limit).then(r => r.json())
      const posts = sortPosts(ALL_BLOG_POSTS);
      return posts.slice(0, limit);
    },
    staleTime: 1000 * 60 * 10,
    select,
  });
}

export function useLatestBlogPosts(limit = 3) {
  return useBlogPosts({ limit });
}

// Simple accessor for non-hook environments (build-time, meta tags, etc.)
export function getAllBlogPosts(): BlogPostSummary[] {
  return sortPosts(ALL_BLOG_POSTS);
}
