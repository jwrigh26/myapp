# Dynamic Navigation System for Learn Routes

This document outlines the dynamic navigation system implemented for the learn section, which automatically generates table-of-contents navigation based on content structure.

## Overview

The system automatically parses React component files to extract heading structures and generates navigation items dynamically. This eliminates the need to manually maintain navigation items for each post.

## Architecture

### 1. Content Parser (`scripts/build-content-registry.js`)

An advanced content analyzer that:
- Parses React component files using regex patterns
- Extracts heading structures from JSX elements
- Builds hierarchical navigation trees
- Deduplicates and merges navigation items
- Generates a TypeScript registry file

**Key Features:**
- **Automatic Section Detection**: Finds `<Box id="section">` + `<Typography variant="h3">` patterns
- **Hierarchical Structure**: Supports 3 levels of nesting (h3→1, h4→2, h5→3)
- **Deduplication**: Merges duplicate IDs and keeps the best title
- **Metadata Extraction**: Pulls titles, descriptions, and tags from components

### 2. Generated Registry (`src/utils/contentRegistry.ts`)

Auto-generated TypeScript file containing:
```typescript
export const contentRegistry: Record<string, ContentEntry> = {
  "python/whiteboarding-essentials": {
    title: "Whiteboarding Essentials",
    description: "Complete guide to Python fundamentals...",
    items: [
      {
        id: "variables",
        title: "Variables & Dynamic Typing",
        anchor: "variables",
        level: 1,
        children: [...]
      }
    ]
  }
}
```

### 3. Navigation Hook (`src/hooks/useNavigationItems.ts`)

React hook that:
- Watches for route changes
- Loads navigation items for the current route
- Provides loading and error states
- Returns formatted navigation data

### 4. Dynamic Route Layout (`src/routes/learn/route.tsx`)

Layout component that:
- Uses the navigation hook
- Conditionally renders the SecondaryDrawer
- Shows loading/error states
- Adapts to different content types

## Usage Patterns

The system supports multiple markup patterns, giving you flexibility in styling while maintaining automatic navigation generation.

### Pattern 1: Box + Typography (Current/Legacy)

```tsx
<Box id="section-name" sx={{ mb: 4 }}>
  <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
    Section Title
  </Typography>
  {/* content */}
</Box>
```

### Pattern 2: className with Data Attributes (Most Explicit)

```tsx
<div className="anchor-section my-custom-styles" data-id="section-name">
  <h3 className="anchor-title my-title-styles" data-level="1">
    Section Title
  </h3>
  {/* content */}
</div>
```

### Pattern 3: className with Semantic HTML (Recommended)

```tsx
<section className="anchor-section prose-section" id="section-name">
  <h3 className="anchor-title section-heading">
    Section Title
  </h3>
  {/* content */}
  
  <div className="anchor-section" id="subsection">
    <h4 className="anchor-title">Subsection Title</h4>
    {/* subsection content */}
  </div>
</section>
```

### Pattern 4: Article-Based Semantic Markup

```tsx
<article className="anchor-section content-article" id="section-name">
  <header>
    <h3 className="anchor-title article-heading">
      Section Title
    </h3>
  </header>
  {/* content */}
</article>
```

### Pattern 5: Flexible Element Choice

```tsx
{/* Any HTML element works */}
<aside className="anchor-section sidebar-content" id="section-name">
  <h4 className="anchor-title sidebar-title">
    Sidebar Section
  </h4>
  {/* content */}
</aside>

<main className="anchor-section main-content" id="section-name">
  <h2 className="anchor-title main-heading">
    Main Section
  </h2>
  {/* content */}
</main>
```

## Adding New Content

### Step 1: Create Component File
Create a new `.tsx` file in `/src/routes/learn/posts/{category}/`

### Step 2: Use Structured Headings
Follow the Box + Typography pattern for sections you want in navigation:

```tsx
export const Route = createFileRoute('/learn/posts/python/my-new-post')({
  component: MyNewPost,
  head: () => ({
    getTitle: () => 'My New Post Title',
    meta: [
      {
        name: 'description',
        content: 'Post description for SEO and registry',
      },
    ],
  }),
});

function MyNewPost() {
  return (
    <>
      <TitleBlock 
        title="My New Post Title"
        subtitle="Engaging subtitle"
      />

      <IntroBlock>
        Introduction content that may be extracted as description.
      </IntroBlock>

      <Box id="first-section" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          First Main Section
        </Typography>
        {/* content */}
      </Box>

      <Box id="second-section" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Second Main Section  
        </Typography>
        
        <Box id="subsection">
          <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
            Important Subsection
          </Typography>
          {/* content */}
        </Box>
      </Box>
    </>
  );
}
```

### Step 3: Regenerate Registry

```bash
npm run content:generate
```

The navigation will automatically appear when you visit the route!

## Build Integration

The content registry generation is integrated into the build process:

```json
{
  "scripts": {
    "content:generate": "node scripts/build-content-registry.js",
    "build": "npm run images:generate && npm run content:generate && vite build"
  }
}
```

## Advanced Features

### Search Functionality

The generated registry includes search capability:

```typescript
import { searchContent } from '@/utils/contentRegistry';

const results = searchContent('python loops');
// Returns: [{ route: 'python/whiteboarding-essentials', entry: {...} }]
```

### Metadata Access

Access rich metadata for each post:

```typescript
import { contentRegistry } from '@/utils/contentRegistry';

const entry = contentRegistry['python/whiteboarding-essentials'];
console.log(entry.title);        // "Whiteboarding Essentials"
console.log(entry.description);  // "Complete guide to Python..."
console.log(entry.lastUpdated);  // "2025-09-26T15:28:30.220Z"
console.log(entry.tags);         // ["python", "interview", "algorithms"]
```

### Route Discovery

Get all available routes programmatically:

```typescript
import { getAllRoutes } from '@/utils/contentRegistry';

const routes = getAllRoutes();
// Returns: ["python/whiteboarding-essentials", "python/data-structures-deep-dive"]
```

## Benefits

### 1. **Zero Maintenance Navigation**
- Add new sections → navigation updates automatically
- Rename sections → navigation reflects changes
- No manual navigation configuration needed

### 2. **Complete Styling Freedom**
- Use any HTML element (div, section, article, aside, main, etc.)
- Apply any CSS framework (Tailwind, styled-components, emotion, vanilla CSS)
- No dependency on MUI or specific component libraries
- Maintain semantic HTML for accessibility and SEO

### 3. **Multiple Markup Patterns**
- Legacy Box + Typography support for existing content
- Modern className-based approach for new content  
- Semantic HTML5 elements for better accessibility
- Flexible data attributes for explicit control

### 4. **Performance Optimized**
- Generated at build time (no runtime parsing)
- Minimal bundle size impact
- Fast navigation rendering
- No client-side content parsing

### 5. **Developer Experience**
- Simple, predictable patterns
- Immediate feedback during development
- Easy to extend and customize
- Backward compatible with existing content

### 6. **SEO & Accessibility**
- Proper heading hierarchy for screen readers
- Semantic HTML structure with h1-h6 tags
- Rich metadata extraction for search engines
- ARIA-friendly navigation structure

## Styling Examples

### CSS Framework Integration

```css
/* Vanilla CSS */
.anchor-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-left: 4px solid #3b82f6;
  background: #f8fafc;
  border-radius: 8px;
}

.anchor-title {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
}

.anchor-title::before {
  content: "🔗";
  position: absolute;
  left: -2rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.anchor-section:hover .anchor-title::before {
  opacity: 1;
}

/* Tailwind CSS */
.anchor-section {
  @apply mb-8 p-6 border-l-4 border-blue-500 bg-slate-50 rounded-lg;
}

.anchor-title {
  @apply text-2xl font-semibold text-slate-900 mb-4 relative;
}

/* Styled Components */
const SectionContainer = styled.div.attrs({
  className: 'anchor-section'
})`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-left: 4px solid ${props => props.theme.primary};
  background: ${props => props.theme.sectionBg};
  border-radius: 8px;
  
  &:hover .anchor-title::before {
    opacity: 1;
  }
`;

const SectionTitle = styled.h3.attrs({
  className: 'anchor-title'
})`
  color: ${props => props.theme.headingColor};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  
  &::before {
    content: "🔗";
    position: absolute;
    left: -2rem;
    opacity: 0;
    transition: opacity 0.2s;
  }
`;
```

### CSS-in-JS Integration

```tsx
// Emotion/styled-components
const Section = styled.section`
  ${tw`mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500`}
`;

const Title = styled.h3`
  ${tw`text-2xl font-bold text-gray-900 mb-4`}
`;

// Usage
<Section className="anchor-section" id="my-section">
  <Title className="anchor-title">
    My Section Title
  </Title>
  {/* content */}
</Section>
```

## Customization

### Custom Patterns

Add new parsing patterns in `ContentAnalyzer`:

```javascript
constructor() {
  this.patterns = {
    // Add your custom pattern
    customSection: /<CustomSection[^>]*id="([^"]+)"[^>]*title="([^"]+)"/g,
    // ... existing patterns
  };
}
```

### Custom Metadata

Extend metadata extraction:

```javascript
extractMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return {
    title: this.extractTitle(content),
    description: this.extractDescription(content),
    tags: this.extractTags(content),
    // Add custom fields
    difficulty: this.extractDifficulty(content),
    estimatedTime: this.extractEstimatedTime(content),
  };
}
```

## Best Practices

### 1. **Consistent ID Naming**
- Use kebab-case: `data-structures`, `binary-search`
- Be descriptive: `trie-implementation` not `trie`
- Avoid spaces and special characters

### 2. **Meaningful Titles**
- Make titles scannable: "Variables & Dynamic Typing"
- Include context: "Heaps - Priority Queue Magic"
- Keep under 50 characters for mobile

### 3. **Logical Hierarchy**
- Use h3 for main sections
- Use h4 for subsections
- Use h5 for sub-subsections (sparingly)

### 4. **Performance Considerations**
- Regenerate registry after content changes
- Keep section titles concise
- Avoid deeply nested structures (>3 levels)

## Troubleshooting

### Navigation Not Appearing
1. Check if sections follow the Box + Typography pattern
2. Verify IDs are unique and properly formatted
3. Regenerate the registry: `npm run content:generate`
4. Check console for parsing errors

### Duplicate or Missing Sections
1. Ensure unique IDs across the file
2. Check Typography variant levels (h3, h4, h5)
3. Verify Box elements have proper `id` attributes

### Build Errors
1. Run registry generation separately: `node scripts/build-content-registry.js`
2. Check file permissions on the `/src/utils/` directory
3. Verify all component files are valid React components

## Future Enhancements

Potential improvements for the system:

1. **AST Parsing**: Use babel/typescript parser for more accurate extraction
2. **Real-time Updates**: Watch file changes and regenerate in development
3. **Visual Editor**: Admin interface for content management
4. **Analytics**: Track section engagement and reading patterns
5. **Validation**: Lint content structure and accessibility
6. **Internationalization**: Multi-language navigation support

This dynamic navigation system provides a robust, scalable foundation for content organization while maintaining developer productivity and user experience.
