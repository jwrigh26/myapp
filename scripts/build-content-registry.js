import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Advanced content parser that extracts navigation items using regex patterns
 * to parse React JSX for id attributes and heading structures
 */
export class ContentAnalyzer {
  constructor() {
    this.patterns = {
      // Box with id followed by Typography heading (current approach)
      boxWithHeading: /<Box\s+[^>]*id="([^"]+)"[^>]*>[\s\S]*?<Typography\s+[^>]*variant="h([1-6])"[^>]*>\s*([^<]+?)\s*<\/Typography>/g,
      
      // Typography with id attribute
      typographyWithId: /<Typography[^>]*id="([^"]+)"[^>]*variant="h([1-6])"[^>]*>\s*([^<]+?)\s*<\/Typography>/g,
      
      // Comments indicating sections
      sectionComments: /\/\*[^*]*([^*]+?)\s*Section[^*]*\*\/[\s\S]*?<Box[^>]*id="([^"]+)"/g,
      
      // TitleBlock components
      titleBlock: /<TitleBlock[^>]*title="([^"]+)"/g,
      
      // NEW: className="anchor-section" with data-id + className="anchor-title" with data-level
      classNameWithDataAttrs: /className="[^"]*anchor-section[^"]*"[^>]*data-id="([^"]+)"[^>]*>[\s\S]*?className="[^"]*anchor-title[^"]*"[^>]*data-level="([1-3])"[^>]*>\s*([^<]+?)\s*</g,
      
      // NEW: Simpler className approach - anchor-section with id + anchor-title (infer level from heading tag)
      classNameWithId: /className="[^"]*anchor-section[^"]*"[^>]*id="([^"]+)"[^>]*>[\s\S]*?<(h[1-6])[^>]*className="[^"]*anchor-title[^"]*"[^>]*>\s*([^<]+?)\s*<\/\2>/g,
      
      // NEW: Most flexible - any element with anchor-section class containing anchor-title
      flexibleClassName: /<[^>]+className="[^"]*anchor-section[^"]*"[^>]*id="([^"]+)"[^>]*>[\s\S]*?<[^>]+className="[^"]*anchor-title[^"]*"[^>]*>\s*([^<]+?)\s*<\/[^>]+>/g,
    };
  }

  /**
   * Parse a React component and extract all headings with their hierarchy
   */
  parseComponent(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const items = [];
      
      // Extract all potential navigation items
      this.extractBoxWithHeadings(content, items);
      this.extractTypographyWithIds(content, items);
      this.extractFromComments(content, items);
      
      // Sort by position in file and build hierarchy
      const sorted = items.sort((a, b) => a.position - b.position);
      return this.buildHierarchy(sorted);
    } catch (error) {
      console.warn(`Failed to parse ${filePath}:`, error);
      return [];
    }
  }

  extractBoxWithHeadings(content, items) {
    let match;
    
    // Original Box + Typography pattern
    while ((match = this.patterns.boxWithHeading.exec(content)) !== null) {
      const [fullMatch, id, levelStr, title] = match;
      const level = this.normalizeLevel(parseInt(levelStr));
      const position = match.index;
      
      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level,
        position,
        source: 'box-heading'
      });
    }

    // NEW: className with data attributes
    while ((match = this.patterns.classNameWithDataAttrs.exec(content)) !== null) {
      const [fullMatch, id, levelStr, title] = match;
      const level = parseInt(levelStr);
      const position = match.index;
      
      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level,
        position,
        source: 'className-data-attrs'
      });
    }

    // NEW: className with id + heading tag
    while ((match = this.patterns.classNameWithId.exec(content)) !== null) {
      const [fullMatch, id, headingTag, title] = match;
      const level = this.normalizeLevel(parseInt(headingTag.charAt(1))); // h1 -> 1, h2 -> 2, etc.
      const position = match.index;
      
      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level,
        position,
        source: 'className-with-heading'
      });
    }

    // NEW: Flexible className (assume level 1 if no other indication)
    while ((match = this.patterns.flexibleClassName.exec(content)) !== null) {
      const [fullMatch, id, title] = match;
      const position = match.index;
      
      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1, // Default to level 1
        position,
        source: 'flexible-className'
      });
    }
  }

  extractTypographyWithIds(content, items) {
    let match;
    while ((match = this.patterns.typographyWithId.exec(content)) !== null) {
      const [fullMatch, id, levelStr, title] = match;
      const level = this.normalizeLevel(parseInt(levelStr));
      const position = match.index;
      
      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level,
        position,
        source: 'typography-id'
      });
    }
  }

  extractFromComments(content, items) {
    let match;
    while ((match = this.patterns.sectionComments.exec(content)) !== null) {
      const [fullMatch, title, id] = match;
      const position = match.index;
      
      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1, // Comments typically indicate major sections
        position,
        source: 'comment'
      });
    }
  }

  normalizeLevel(headingLevel) {
    // Convert h1-h6 to 1-3 levels for navigation
    // h1, h2, h3 -> level 1 (main sections)
    // h4 -> level 2 (subsections)  
    // h5, h6 -> level 3 (sub-subsections)
    if (headingLevel <= 3) return 1;
    if (headingLevel === 4) return 2;
    return 3;
  }

  cleanTitle(title) {
    return title
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\n/g, ' ')
      .replace(/\s{2,}/g, ' ');
  }

  buildHierarchy(items) {
    // Deduplicate and merge items by ID
    const itemMap = new Map();
    
    items.forEach(item => {
      if (!item.title || item.title.trim() === '') return; // Skip empty titles
      
      const existing = itemMap.get(item.id);
      if (existing) {
        // Keep the one with better title (longer, more descriptive)
        if (item.title.length > existing.title.length) {
          itemMap.set(item.id, item);
        }
      } else {
        itemMap.set(item.id, item);
      }
    });

    const uniqueItems = Array.from(itemMap.values())
      .sort((a, b) => a.position - b.position);

    const hierarchy = [];
    const stack = [];

    uniqueItems.forEach(item => {
      // Pop items from stack that are at same or higher level
      while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
        stack.pop();
      }

      const cleanItem = {
        id: item.id,
        title: item.title,
        anchor: item.anchor,
        level: item.level
      };

      if (stack.length === 0) {
        // Top level item
        hierarchy.push(cleanItem);
        stack.push(cleanItem);
      } else {
        // Child item
        const parent = stack[stack.length - 1];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(cleanItem);
        stack.push(cleanItem);
      }
    });

    return hierarchy;
  }

  /**
   * Extract metadata from component
   */
  extractMetadata(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      const metadata = {
        title: this.extractTitle(content),
        description: this.extractDescription(content),
        tags: this.extractTags(content),
      };

      return metadata;
    } catch (error) {
      return { title: null, description: null, tags: [] };
    }
  }

  extractTitle(content) {
    // Try multiple patterns for title extraction
    const patterns = [
      /getTitle:\s*\(\)\s*=>\s*['"`]([^'"`]+)['"`]/,
      /<TitleBlock[^>]*title="([^"]+)"/,
      /<Typography[^>]*variant="h1"[^>]*>\s*([^<]+?)\s*<\/Typography>/,
      /title:\s*['"`]([^'"`]+)['"`]/
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return this.cleanTitle(match[1]);
      }
    }

    return null;
  }

  extractDescription(content) {
    const patterns = [
      /content:\s*['"`]([^'"`]+)['"`]/,
      /<IntroBlock[^>]*>\s*([^<]+?)\s*<\/IntroBlock>/,
      /description:\s*['"`]([^'"`]+)['"`]/
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return this.cleanTitle(match[1]);
      }
    }

    return null;
  }

  extractTags(content) {
    // Look for tags in comments or metadata
    const tagMatches = content.match(/\/\*[^*]*tags?:\s*([^*]+?)\*\//i);
    if (tagMatches) {
      return tagMatches[1].split(',').map(tag => tag.trim());
    }
    return [];
  }
}

/**
 * Build complete content registry
 */
export function buildAdvancedContentRegistry() {
  console.log('🔍 Building advanced content registry...');
  
  const analyzer = new ContentAnalyzer();
  const registry = {};
  const postsDir = path.join(__dirname, '../src/routes/learn/posts');

  function scanDirectory(dir, routePrefix = '') {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath, `${routePrefix}/${entry.name}`);
      } else if (entry.name.endsWith('.tsx') && entry.name !== 'index.tsx') {
        const routeName = entry.name.replace('.tsx', '');
        const routePath = `${routePrefix}/${routeName}`.substring(1);
        
        console.log(`   📄 Analyzing: ${routePath}`);
        
        const items = analyzer.parseComponent(fullPath);
        const metadata = analyzer.extractMetadata(fullPath);
        
        if (items.length > 0) {
          registry[routePath] = {
            ...metadata,
            items,
            lastUpdated: fs.statSync(fullPath).mtime.toISOString(),
            filepath: fullPath
          };
          
          console.log(`      ✅ Found ${items.length} sections`);
        }
      }
    });
  }

  scanDirectory(postsDir);

  // Write the registry
  const outputPath = path.join(__dirname, '../src/utils/contentRegistry.ts');
  const output = `// Auto-generated content registry - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Total routes: ${Object.keys(registry).length}

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

export const contentRegistry: Record<string, ContentEntry> = ${JSON.stringify(registry, null, 2)};

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
`;

  fs.writeFileSync(outputPath, output);
  
  console.log(`✅ Advanced content registry generated:`);
  console.log(`   📊 ${Object.keys(registry).length} routes processed`);
  console.log(`   💾 Saved to: ${outputPath}`);
  
  return registry;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildAdvancedContentRegistry();
}
