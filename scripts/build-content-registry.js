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
      boxWithHeading:
        /<Box\s+[^>]*id="([^"]+)"[^>]*>[\s\S]*?<Typography\s+[^>]*variant="h([1-6])"[^>]*>\s*([^<]+?)\s*<\/Typography>/g,

      // Typography with id attribute
      typographyWithId:
        /<Typography[^>]*id="([^"]+)"[^>]*variant="h([1-6])"[^>]*>\s*([^<]+?)\s*<\/Typography>/g,

      // Comments indicating sections
      sectionComments:
        /\/\*[^*]*([^*]+?)\s*Section[^*]*\*\/[\s\S]*?<Box[^>]*id="([^"]+)"/g,

      // TitleBlock components
      titleBlock: /<TitleBlock[^>]*title="([^"]+)"/g,

      // ProseBlock with title and anchor (may also have subtitle) - multiline support
      proseBlockTitleAnchor: 
        /<ProseBlock(?:[^>]|\n)*?\btitle="([^"]+)"(?:[^>]|\n)*?\banchor\b(?:[^>]|\n)*?\bid="([^"]+)"(?:[^>]|\n)*?>/g,
      // ProseBlock with anchor and title (anchor comes first) - multiline support
      proseBlockAnchorTitle:
        /<ProseBlock(?:[^>]|\n)*?\banchor\b(?:[^>]|\n)*?\btitle="([^"]+)"(?:[^>]|\n)*?\bid="([^"]+)"(?:[^>]|\n)*?>/g,
      // ProseBlock with subtitle and anchor (no title) - simple multiline
      proseBlockSubtitleAnchor:
        /<ProseBlock[^>]*subtitle="([^"]+)"[^>]*anchor[^>]*id="([^"]+)"/g,
      // ProseBlock with anchor first, then subtitle (no title) - simple multiline 
      proseBlockAnchorSubtitle:
        /<ProseBlock[^>]*anchor[^>]*id="([^"]+)"[^>]*subtitle="([^"]+)"/g,

      // NEW: className="anchor-section" with data-id + className="anchor-title" with data-level
      classNameWithDataAttrs:
        /className="[^"]*anchor-section[^"]*"[^>]*data-id="([^"]+)"[^>]*>[\s\S]*?className="[^"]*anchor-title[^"]*"[^>]*data-level="([1-3])"[^>]*>\s*([^<]+?)\s*</g,

      // NEW: Simpler className approach - anchor-section with id + anchor-title (infer level from heading tag)
      classNameWithId:
        /className="[^"]*anchor-section[^"]*"[^>]*id="([^"]+)"[^>]*>[\s\S]*?<(h[1-6])[^>]*className="[^"]*anchor-title[^"]*"[^>]*>\s*([^<]+?)\s*<\/\2>/g,

      // NEW: Most flexible - any element with anchor-section class containing anchor-title
      flexibleClassName:
        /<[^>]+className="[^"]*anchor-section[^"]*"[^>]*id="([^"]+)"[^>]*>[\s\S]*?<[^>]+className="[^"]*anchor-title[^"]*"[^>]*>\s*([^<]+?)\s*<\/[^>]+>/g,

      // MathBlock components with anchor
      mathBlockAnchor:
        /<MathBlock[^>]*\banchor\b[^>]*\bid="([^"]+)"[^>]*\btitle="([^"]+)"/g,
      mathBlockAnchorReverse:
        /<MathBlock[^>]*\btitle="([^"]+)"[^>]*\banchor\b[^>]*\bid="([^"]+)"/g,
      
      // EquationCard components with anchor
      equationCardAnchor:
        /<EquationCard[^>]*\banchor\b[^>]*\bid="([^"]+)"[^>]*\btitle="([^"]+)"/g,
      equationCardAnchorReverse:
        /<EquationCard[^>]*\btitle="([^"]+)"[^>]*\banchor\b[^>]*\bid="([^"]+)"/g,
      
      // EquationSteps components with anchor
      equationStepsAnchor:
        /<EquationSteps[^>]*\banchor\b[^>]*\bid="([^"]+)"[^>]*\btitle="([^"]+)"/g,
      equationStepsAnchorReverse:
        /<EquationSteps[^>]*\btitle="([^"]+)"[^>]*\banchor\b[^>]*\bid="([^"]+)"/g,
      
      // ProseMathBlock components with anchor
      proseMathBlockAnchor:
        /<ProseMathBlock[^>]*\banchor\b[^>]*\bid="([^"]+)"[^>]*\btitle="([^"]+)"/g,
      proseMathBlockAnchorReverse:
        /<ProseMathBlock[^>]*\btitle="([^"]+)"[^>]*\banchor\b[^>]*\bid="([^"]+)"/g,
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
      this.extractProseBlockAnchors(content, items, filePath);
      this.extractMathBlockAnchors(content, items);

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
        source: 'box-heading',
      });
    }

    // NEW: className with data attributes
    while (
      (match = this.patterns.classNameWithDataAttrs.exec(content)) !== null
    ) {
      const [fullMatch, id, levelStr, title] = match;
      const level = parseInt(levelStr);
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level,
        position,
        source: 'className-data-attrs',
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
        source: 'className-with-heading',
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
        source: 'flexible-className',
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
        source: 'typography-id',
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
        source: 'comment',
      });
    }
  }

  extractProseBlockAnchors(content, items, filePath = '') {
    let match;
    
    // Extract ProseBlocks with title (level 1)
    while ((match = this.patterns.proseBlockTitleAnchor.exec(content)) !== null) {
      const [fullMatch, title, id] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'proseblock-title-anchor',
      });
    }
    
    // Extract ProseBlocks with anchor first, then title (level 1)
    while ((match = this.patterns.proseBlockAnchorTitle.exec(content)) !== null) {
      const [fullMatch, title, id] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'proseblock-anchor-title',
      });
    }
    
    // Extract ProseBlocks with anchor+subtitle (exclude those with titles)
    // First find all ProseBlock opening tags with anchor
    const proseBlockStart = /<ProseBlock(?:[^>]|\n)*?>/g;
    let startMatch;
    
    while ((startMatch = proseBlockStart.exec(content)) !== null) {
      const fullProseBlockTag = startMatch[0];
      
      // Check if it has anchor, id, subtitle but NOT title
      const hasAnchor = /\banchor\b/.test(fullProseBlockTag);
      const hasTitle = /\btitle\s*=/.test(fullProseBlockTag);
      const idMatch = fullProseBlockTag.match(/\bid="([^"]+)"/);
      const subtitleMatch = fullProseBlockTag.match(/\bsubtitle="([^"]+)"/);
      
      if (hasAnchor && !hasTitle && idMatch && subtitleMatch) {
        const id = idMatch[1];
        const subtitle = subtitleMatch[1];
        const position = startMatch.index;
        
        items.push({
          id: id.trim(),
          title: this.cleanTitle(subtitle),
          anchor: id.trim(),
          level: 2,
          position,
          source: 'proseblock-subtitle-only',
        });
      }
    }
  }

  extractMathBlockAnchors(content, items) {
    let match;
    
    // Extract MathBlock with anchor and title
    while ((match = this.patterns.mathBlockAnchor.exec(content)) !== null) {
      const [fullMatch, id, title] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'mathblock-anchor',
      });
    }
    
    // Extract MathBlock with title first, then anchor
    while ((match = this.patterns.mathBlockAnchorReverse.exec(content)) !== null) {
      const [fullMatch, title, id] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'mathblock-anchor-reverse',
      });
    }
    
    // Extract EquationCard with anchor and title
    while ((match = this.patterns.equationCardAnchor.exec(content)) !== null) {
      const [fullMatch, id, title] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'equationcard-anchor',
      });
    }
    
    // Extract EquationCard with title first, then anchor
    while ((match = this.patterns.equationCardAnchorReverse.exec(content)) !== null) {
      const [fullMatch, title, id] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'equationcard-anchor-reverse',
      });
    }
    
    // Extract EquationSteps with anchor and title
    while ((match = this.patterns.equationStepsAnchor.exec(content)) !== null) {
      const [fullMatch, id, title] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'equationsteps-anchor',
      });
    }
    
    // Extract EquationSteps with title first, then anchor
    while ((match = this.patterns.equationStepsAnchorReverse.exec(content)) !== null) {
      const [fullMatch, title, id] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'equationsteps-anchor-reverse',
      });
    }
    
    // Extract ProseMathBlock with anchor and title
    while ((match = this.patterns.proseMathBlockAnchor.exec(content)) !== null) {
      const [fullMatch, id, title] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'prosemathblock-anchor',
      });
    }
    
    // Extract ProseMathBlock with title first, then anchor
    while ((match = this.patterns.proseMathBlockAnchorReverse.exec(content)) !== null) {
      const [fullMatch, title, id] = match;
      const position = match.index;

      items.push({
        id: id.trim(),
        title: this.cleanTitle(title),
        anchor: id.trim(),
        level: 1,
        position,
        source: 'prosemathblock-anchor-reverse',
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

    items.forEach((item) => {
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

    const uniqueItems = Array.from(itemMap.values()).sort(
      (a, b) => a.position - b.position
    );

    const hierarchy = [];
    const stack = [];

    uniqueItems.forEach((item) => {
      // Pop items from stack that are at same or higher level
      while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
        stack.pop();
      }

      const cleanItem = {
        id: item.id,
        title: item.title,
        anchor: item.anchor,
        level: item.level,
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
      return { title: undefined, description: undefined, tags: [] };
    }
  }

  extractTitle(content) {
    // Try multiple patterns for title extraction
    const patterns = [
      /getTitle:\s*\(\)\s*=>\s*['"`]([^'"`]+)['"`]/,
      /<TitleBlock[^>]*title="([^"]+)"/,
      /<Typography[^>]*variant="h1"[^>]*>\s*([^<]+?)\s*<\/Typography>/,
      /title:\s*['"`]([^'"`]+)['"`]/,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return this.cleanTitle(match[1]);
      }
    }

    return undefined;
  }

  extractDescription(content) {
    const patterns = [
      /content:\s*['"`]([^'"`]+)['"`]/,
      /<IntroBlock[^>]*>\s*([^<]+?)\s*<\/IntroBlock>/,
      /description:\s*['"`]([^'"`]+)['"`]/,
    ];

    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return this.cleanTitle(match[1]);
      }
    }

    return undefined;
  }

  extractTags(content) {
    // Look for tags in comments or metadata
    const tagMatches = content.match(/\/\*[^*]*tags?:\s*([^*]+?)\*\//i);
    if (tagMatches) {
      return tagMatches[1].split(',').map((tag) => tag.trim());
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
  const postsDir = path.join(__dirname, '../src/routes/learn');

  function scanDirectory(dir, routePrefix = '') {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath, `${routePrefix}/${entry.name}`);
      } else if (entry.name.endsWith('.tsx') && 
                 entry.name !== 'route.tsx') {
        
        // Handle index.tsx specially - it represents the main lesson
        let routeName;
        if (entry.name === 'index.tsx') {
          routeName = '';
        } else if (entry.name.endsWith('.lazy.tsx')) {
          routeName = entry.name.replace('.lazy.tsx', '');
        } else {
          routeName = entry.name.replace('.tsx', '');
        }
        const routePath = routePrefix.substring(1) + (routeName ? `/${routeName}` : '');

        console.log(`   📄 Analyzing: ${routePath}`);

        const items = analyzer.parseComponent(fullPath);
        const metadata = analyzer.extractMetadata(fullPath);

        // Always register the route (even with 0 items) but note whether it has content
        registry[routePath] = {
          ...metadata,
          items,
          lastUpdated: fs.statSync(fullPath).mtime.toISOString(),
          filepath: fullPath,
        };

        console.log(`      ✅ Found ${items.length} sections`);
        if (metadata.title) {
          console.log(`      📋 Title: "${metadata.title}"`);
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
