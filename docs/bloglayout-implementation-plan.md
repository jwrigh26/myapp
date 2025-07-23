# BlogLayout Implementation Plan

## Overview

Implement a new content-grid based `BlogLayout` system alongside existing `PageLayout` to provide flexible three-zone layouts for blog posts while preserving all existing functionality.

## Phase 1: Core Infrastructure

### 1.1 Remove Route-Level PageLayout Wrapper

- **File**: `/src/routes/blog/route.tsx`
- **Action**: Remove `<PageLayout>` wrapper from `AppLayoutComponent`
- **Impact**: Pages will need to declare their own layout
- **Time**: 2 minutes

### 1.2 Create BlogLayout Component

- **File**: `/src/layout/BlogLayout.tsx` (new)
- **Features**:
  - Content-grid CSS implementation
  - Three zones: content (900px), breakout (1200px), full-width (1536px)
  - CSS custom properties for responsive behavior
- **Time**: 15 minutes

### 1.3 Create Content-Grid CSS

- **File**: `/src/layout/blog-layout.css` (new)
- **Features**:
  - CSS Grid with named columns
  - Responsive padding and max-widths
  - Utility classes: `.content`, `.breakout`, `.full-width`
- **Time**: 10 minutes

### 1.4 Update Layout Index

- **File**: `/src/layout/index.ts`
- **Action**: Export new `BlogLayout` component
- **Time**: 1 minute

## Phase 2: Preserve Existing Functionality

### 2.1 Update Blog Index Page

- **File**: `/src/routes/blog/index.tsx`
- **Action**: Wrap content in `<PageLayout>`
- **Impact**: Maintains current design for blog listing
- **Time**: 2 minutes

### 2.2 Update Existing Blog Posts

- **Files**:
  - `/src/routes/blog/posts/frontend-design/microfrontends-part1.tsx`
  - `/src/routes/blog/posts/frontend-design/microfrontends-part2.tsx`
  - `/src/routes/blog/posts/frontend-design/microfrontends-part3.tsx`
- **Action**: Wrap each in `<PageLayout>`
- **Impact**: Zero visual changes to existing posts
- **Time**: 5 minutes

## Phase 3: Content-Grid Integration

### 3.1 Create Grid Zone Wrapper Components

- **File**: `/src/components/blog/ContentGridWrappers.tsx` (new)
- **Components**:
  - `ContentZone` - for regular text content
  - `BreakoutZone` - for wider images/code blocks
  - `FullWidthZone` - for hero sections
  - `ContentGridImageSection` - wrapper for `ResponsiveContentImageGrid`
- **Time**: 20 minutes

### 3.2 Update Learn Names Post

- **File**: `/src/routes/blog/posts/soft-skills/learn-names.jsx`
- **Actions**:
  - Replace `PageLayout` with `BlogLayout`
  - Wrap `ArticleLayout` in appropriate grid zones
  - Test responsive behavior
- **Time**: 15 minutes

## Phase 4: Documentation & Testing

### 4.1 Create BlogLayout Documentation

- **File**: `/src/layout/BlogLayout.md` (new)
- **Content**:
  - Usage examples for each grid zone
  - Migration guide from PageLayout
  - Best practices for content placement
- **Time**: 15 minutes

### 4.2 Update Component README

- **File**: `/src/components/blog/README.md`
- **Action**: Document new wrapper components and usage patterns
- **Time**: 10 minutes

### 4.3 Testing Checklist

- [ ] Existing blog posts render unchanged
- [ ] New BlogLayout responsive behavior works
- [ ] Content zones display correctly
- [ ] Navigation and drawer functionality preserved
- [ ] Mobile layout properly responsive
- **Time**: 20 minutes

## Phase 5: Future Enhancements (Optional)

### 5.1 Enhanced ArticleLayout

- **File**: `/src/components/blog/ArticleLayout.tsx`
- **Action**: Add optional `useContentGrid` prop for automatic zone assignment
- **Time**: 25 minutes

### 5.2 Content-Grid Aware BlogSection

- **File**: `/src/components/blog/BlogSection.tsx`
- **Action**: Add grid zone props for automatic content placement
- **Time**: 30 minutes

## Total Estimated Time: ~2.5 hours

## File Tree After Implementation

```
src/
├── layout/
│   ├── BlogLayout.tsx (new)
│   ├── blog-layout.css (new)
│   ├── BlogLayout.md (new)
│   ├── PageLayout.tsx (unchanged)
│   └── index.ts (updated)
├── components/blog/
│   ├── ContentGridWrappers.tsx (new)
│   ├── ArticleLayout.tsx (unchanged)
│   ├── BlogSection.tsx (unchanged)
│   └── README.md (updated)
└── routes/blog/
    ├── route.tsx (updated - remove PageLayout)
    ├── index.tsx (updated - add PageLayout)
    ├── posts/frontend-design/*.tsx (updated - add PageLayout)
    └── posts/soft-skills/learn-names.jsx (updated - use BlogLayout)
```

## Migration Strategy

- **Immediate**: All existing functionality preserved
- **Gradual**: New posts can opt into BlogLayout
- **Optional**: Legacy posts can be migrated individually
- **Zero Risk**: No breaking changes to published content

## Implementation Notes

### Content-Grid Zones Explained

```css
/* Three content zones available: */
.content {
  grid-column: content;
} /* 900px max - regular text */
.breakout {
  grid-column: breakout;
} /* 1200px max - images, code */
.full-width {
  grid-column: full-width;
} /* 1536px max - hero sections */
```

### Usage Examples

```tsx
// New BlogLayout posts
<BlogLayout>
  <div className="full-width">
    <CallToAction /> {/* Hero spans full width */}
  </div>

  <div className="content">
    <ProseBlock>Regular text content</ProseBlock>
  </div>

  <div className="breakout">
    <ResponsiveContentImageGrid /> {/* Wider images */}
  </div>
</BlogLayout>

// Legacy PageLayout posts (unchanged)
<PageLayout>
  <ArticleLayout>
    {/* All existing functionality preserved */}
  </ArticleLayout>
</PageLayout>
```

### Key Benefits

- **Zero Breaking Changes**: All existing posts continue working
- **Flexible Content Layout**: Three responsive zones for different content types
- **Gradual Adoption**: Can migrate posts individually
- **Future-Proof**: Easy to enhance with additional layout options
