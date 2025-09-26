import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse a React component file and extract navigation items
 * Looks for patterns like:
 * - <Box id="section-name">
 * - <Typography variant="h1|h2|h3|h4">Section Title</Typography>
 */
function parseReactFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const items = [];
    
    // Regex patterns to match different heading structures
    const patterns = [
      // Pattern 1: <Box id="section-id"> followed by <Typography variant="h3">
      /&lt;Box id="([^"]+)"[^&gt;]*&gt;[\s\S]*?&lt;Typography variant="h([1-6])"[^&gt;]*&gt;\s*([^&lt;]+)&lt;\/Typography&gt;/g,
      
      // Pattern 2: Direct Typography with id
      /&lt;Typography[^&gt;]*id="([^"]+)"[^&gt;]*variant="h([1-6])"[^&gt;]*&gt;\s*([^&lt;]+)&lt;\/Typography&gt;/g,
      
      // Pattern 3: Comments indicating sections
      /\/\*\s*([^*]+)\s*Section\s*\*\/[\s\S]*?&lt;Box id="([^"]+)"/g,
      
      // Pattern 4: className="anchor-section" with data-id + className="anchor-title"
      /className="[^"]*anchor-section[^"]*"[^&gt;]*data-id="([^"]+)"[^&gt;]*&gt;[\s\S]*?className="[^"]*anchor-title[^"]*"[^&gt;]*data-level="([1-3])"[^&gt;]*&gt;\s*([^&lt;]+)&lt;/g,
      
      // Pattern 5: Simpler className approach - any element with anchor-section + anchor-title
      /className="[^"]*anchor-section[^"]*"[^&gt;]*id="([^"]+)"[^&gt;]*&gt;[\s\S]*?className="[^"]*anchor-title[^"]*"[^&gt;]*&gt;\s*([^&lt;]+)&lt;/g
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const [, id, levelStr, title] = match;
        const level = Math.min(3, parseInt(levelStr) - 2); // h3->1, h4->2, h5->3, h6->3
        
        if (id && title) {
          items.push({
            id,
            title: title.trim(),
            anchor: id,
            level,
          });
        }
      }
    });

    // Group items by hierarchy (level 1 items can have level 2 children)
    const hierarchicalItems = [];
    let currentParent = null;

    items.forEach(item => {
      if (item.level === 1) {
        hierarchicalItems.push(item);
        currentParent = item;
      } else if (item.level === 2 && currentParent) {
        if (!currentParent.children) currentParent.children = [];
        currentParent.children.push(item);
      } else if (item.level === 3 && currentParent?.children?.length) {
        const lastChild = currentParent.children[currentParent.children.length - 1];
        if (!lastChild.children) lastChild.children = [];
        lastChild.children.push(item);
      }
    });

    return hierarchicalItems;
  } catch (error) {
    console.warn(`Could not parse file ${filePath}:`, error);
    return [];
  }
}

/**
 * Scan the learn directory and build content index
 */
export function generateContentIndex() {
  const contentIndex = {};
  const learnDir = path.join(__dirname, '../routes/learn/posts');
  
  if (!fs.existsSync(learnDir)) {
    console.warn('Learn posts directory not found');
    return contentIndex;
  }

  function scanDirectory(dir, baseRoute = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath, `${baseRoute}/${entry.name}`);
      } else if (entry.name.endsWith('.tsx') && entry.name !== 'index.tsx') {
        const routeName = entry.name.replace('.tsx', '');
        const routePath = `${baseRoute}/${routeName}`.substring(1); // Remove leading slash
        
        const items = parseReactFile(fullPath);
        const title = extractTitle(fullPath) || routeName;
        
        if (items.length > 0) {
          contentIndex[routePath] = { title, items };
        }
      }
    });
  }

  scanDirectory(learnDir);
  return contentIndex;
}

/**
 * Extract title from component file
 */
function extractTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Look for title in route head config
    const headTitleMatch = content.match(/getTitle:\s*\(\)\s*=&gt;\s*['"]([^'"]+)['"]/);
    if (headTitleMatch) return headTitleMatch[1];
    
    // Look for TitleBlock component
    const titleBlockMatch = content.match(/&lt;TitleBlock[^&gt;]*title="([^"]+)"/);
    if (titleBlockMatch) return titleBlockMatch[1];
    
    // Look for first h1/h2/h3
    const headingMatch = content.match(/&lt;Typography variant="h[1-3]"[^&gt;]*&gt;\s*([^&lt;]+)&lt;\/Typography&gt;/);
    if (headingMatch) return headingMatch[1].trim();
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Write content index to file for runtime use
 */
export function buildContentIndex() {
  console.log('🔍 Generating content navigation index...');
  
  const contentIndex = generateContentIndex();
  const outputPath = path.join(__dirname, 'contentIndex.ts');
  
  const output = `// Auto-generated content index - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}

export interface NavigationItem {
  id: string;
  title: string;
  anchor: string;
  level: 1 | 2 | 3;
  children?: NavigationItem[];
}

export interface ContentIndex {
  [routePath: string]: {
    title: string;
    items: NavigationItem[];
  };
}

export const contentIndex: ContentIndex = ${JSON.stringify(contentIndex, null, 2)};

export function getNavigationItems(routePath: string): NavigationItem[] {
  return contentIndex[routePath]?.items || [];
}

export function getContentTitle(routePath: string): string {
  return contentIndex[routePath]?.title || 'Learn';
}
`;

  fs.writeFileSync(outputPath, output);
  
  const routeCount = Object.keys(contentIndex).length;
  const totalSections = Object.values(contentIndex).reduce(
    (sum, content) => sum + content.items.length,
    0
  );
  
  console.log(`✅ Content index generated:`);
  console.log(`   - ${routeCount} routes`);
  console.log(`   - ${totalSections} sections`);
  console.log(`   - Saved to: ${outputPath}`);
  
  return contentIndex;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildContentIndex();
}
