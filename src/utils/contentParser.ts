// Utility to parse content metadata and generate navigation items
import type { InlineDrawerItem } from '@/components/SecondaryDrawer';

export interface ContentMetadata {
  title: string;
  sections: Array<{
    id: string;
    title: string;
    level: 1 | 2 | 3;
    subsections?: Array<{
      id: string;
      title: string;
      level: 2 | 3;
    }>;
  }>;
}

// Registry of content metadata - each post exports this
export const contentRegistry: Record<string, ContentMetadata> = {};

// Register content (called by each post file)
export function registerContent(path: string, metadata: ContentMetadata) {
  contentRegistry[path] = metadata;
}

// Generate navigation items from metadata
export function generateNavigationItems(path: string): InlineDrawerItem[] {
  const metadata = contentRegistry[path];
  if (!metadata) return [];

  return metadata.sections.map((section) => ({
    id: section.id,
    title: section.title,
    anchor: section.id,
    level: section.level,
    children: section.subsections?.map((sub) => ({
      id: sub.id,
      title: sub.title,
      anchor: sub.id,
      level: sub.level,
    })),
  }));
}

// Lazy load navigation for a specific route
export async function getNavigationForRoute(
  route: string
): Promise<InlineDrawerItem[]> {
  // Extract the clean path (e.g., "/learn/python/whiteboarding-essentials" -> "python/whiteboarding-essentials")
  const pathParts = route.split('/').slice(2); // Remove '/learn'
  const contentPath = pathParts.join('/');

  // Try to dynamically import the content to ensure it's registered
  try {
    await import(`@/routes/learn/${contentPath}.tsx`);
    return generateNavigationItems(contentPath);
  } catch (error) {
    console.warn(`Could not load navigation for ${contentPath}:`, error);
    return [];
  }
}
