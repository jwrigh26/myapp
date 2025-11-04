# Copilot Instructions for myapp

## Project Overview

React + TypeScript educational blog/learning platform built with Vite, TanStack Router, MUI, and Firebase hosting. Features blog posts, interactive learning modules (math, DSA, Python), and educational games with drag-and-drop.

## Core Architecture

### Build Process & Asset Generation

**Critical**: The build pipeline generates TypeScript registries at build time:

- `npm run images:generate` → Creates `src/utils/imageRegistry.ts` from `src/assets/*` (structured as `YYYY/MM` for blog, flat for other categories)
- `npm run content:generate` → Scans `src/routes/learn/**/*.tsx` for anchor sections, builds `src/utils/contentRegistry.ts` with navigation hierarchy
- Both run before every build. **Never edit these generated files manually**.

Image naming convention: `{date}-{name}-{large|medium|small}.{ext}` (e.g., `20250115-hero-large.webp`)

### Routing (TanStack Router v5)

- **File-based**: Routes auto-generated in `src/routeTree.gen.ts`
- Route structure: `src/routes/{route}/index.tsx` or `{route}.tsx` or `{route}.lazy.tsx`
- Categories defined in `src/config/navigationConfig.ts` (main nav, blog categories, learn categories)
- Context propagation: Use `createRootRouteWithContext<{ user?: string }>()` pattern (see `__root.tsx`)

### State Management Pattern

Global state via context providers (order matters in `main.tsx`):

1. **QueryClient** (TanStack Query) - API/async state
2. **ThemeProvider** - Dark/light mode with localStorage persistence
3. **BreakpointProvider** - Centralized responsive breakpoints (custom: `mobile: 375`, `mobileLg: 414`, `tablet: 720`)
4. **SnackbarProvider** - Toast notifications
5. **ComponentStateProvider** - Ephemeral UI state (drawers, modals, temp data)

**ComponentStateContext pattern**: Use `setOpen(id)`, `setClose(id)`, `toggleOpen(id)` with unique IDs instead of local useState for cross-component coordination. Also provides `temp`, `bag`, `items` for transient data.

### Theming & Styling

- **MUI v6** with custom theme in `src/ThemeProvider.tsx`
- Custom breakpoints: `xs`, `mobile`, `mobileLg`, `sm`, `tablet`, `md`, `lg`, `xl`
- Custom palette: `custom.neutral`, `custom.secondary`, extends `PaletteColor` with `superLight`, `veryLight`
- **NO ripple effects**: `disableRipple: true` is default (performance + design choice)
- **styled-components pattern**: Use `styled(Component, { shouldForwardProp: ... })` to avoid passing non-DOM props
- Typography: `fontWeightSemiBold: 600`, custom `comic` variant for comic strips

### Content Grid System (PageLayout)

Uses CSS Grid with named areas for responsive layouts:

```tsx
<PageLayout>
  <div className="content">Default: stays in content zone (max 1000px)</div>
  <div className="breakout">Wider: extends to 1200px</div>
  <div className="full-width">Full bleed: 1536px</div>
</PageLayout>
```

Configured via CSS custom properties in `src/layout/PageLayout.tsx`.

### Component Patterns

#### Anchor Sections (for auto-navigation)

Components support `anchor` prop + `id` for content registry:

```tsx
<ProseBlock anchor id="section-id" title="Title">...</ProseBlock>
<MathBlock anchor id="equation-1" title="Pythagorean Theorem">...</MathBlock>
```

Content registry parser looks for `anchor-section` + `anchor-title` classNames or component props.

#### Image Components

- **ResponsiveImage** (`src/components/Image.tsx`): Handles `<picture>` with srcSet, lazy loading, skeleton states
- Use `createImageSources(imageName)` helper from `src/utils/images.ts` to generate sources from registry
- Pattern: `const sources = createImageSources('20250115-hero')` → returns array for large/medium/small
- `objectFit` prop: `cover` (default, fills container), `contain` (shows all, may letterbox), `scale-down` (never enlarges)

#### Block Components

Core content blocks (all in `src/components/`):

- **ProseBlock**: Formatted text with title/subtitle, supports inline `<span className="code">` and `<span className="name">`
- **CodeBlock**: Syntax highlighted code with Prism
- **MathBlock**: KaTeX math rendering with title/subtitle
- **ComicStrip**: Responsive comic layouts (mobile: 1 col, tablet: 2 col grid, desktop: horizontal strip)

#### Memoization Convention

Performance-critical components use `React.memo` with custom comparison:

```tsx
React.memo(Component, (prevProps, nextProps) => {
  // Compare primitives + stable references
  return (
    prevProps.id === nextProps.id && prevProps.children === nextProps.children
  );
});
```

### Environment Variables

Vite env vars use `VITE_REACT_APP_` prefix (dev/local) transformed in `vite.config.ts`:

- Accessed as `import.meta.env.VITE_REACT_APP_FB_API_URL`
- Keys defined in `getDefineObject()` (see `vite.config.ts`)
- Firebase config in `main.tsx` uses these vars

### Utilities (`src/utils/`)

- **Safety utils**: `_get`, `_padStart`, `_sortBy` (lodash-style, no dependencies)
- **Theme helpers**: `resolveThemeColor(value)(theme)` - accepts palette paths or CSS colors
- **Image helpers**: `createImageSources`, `getDefaultImageSrc`, `useBackgroundImageSrc`
- **Open Graph**: `generateOpenGraphMeta`, `generateBlogPostMeta` for social previews

## Development Workflow

### Commands

```bash
npm run build          # Full build with asset generation
npm run build:prod     # Production build (checks env vars)
npm start              # Build then dev server on :3001
npm test               # Vitest
npm run typecheck      # TypeScript validation
npm run format         # Prettier formatting
```

### Firebase Hosting

```bash
npm run firebase:emulate       # Local preview
npm run firebase:deploy        # Deploy to staging
npm run firebase:deploy:prod   # Deploy to production
```

### Testing

- **Vitest** with `jsdom` environment
- Setup in `src/test/setup.ts`
- Use `@testing-library/react` patterns

## Critical Conventions

1. **Path aliases**: Use `@/` for `src/` imports (configured in `tsconfig.json` + `vite.config.ts`)
2. **No manual registry edits**: `imageRegistry.ts` and `contentRegistry.ts` are auto-generated
3. **Breakpoint Context over useMediaQuery**: Use `useBreakpoint()` hook for performance (centralized subscriptions)
4. **ComponentStateContext for UI state**: Prefer over local useState when state needs coordination across components
5. **Anchor sections need consistent IDs**: Format as `kebab-case`, unique per route
6. **Image assets must follow structure**: Blog images in `YYYY/MM/`, others flat in category folder
7. **TypeScript strict mode**: All files must pass `tsc --noEmit`
8. **Modular folder structure**: When files grow beyond ~500 lines, refactor into modular folders (see `binarySearch/` example)
9. **Folder naming**: Use camelCase for feature folders (e.g., `binarySearch/` not `binary-search/`)
10. **Hook naming**: Use specific names for hooks (e.g., `useBunnyArrays.ts` not `hooks.ts`)
11. **Example components**: Separate production components from examples (use `examples.tsx` file)


## Common Gotchas

- **Drawer z-index**: ComponentStateContext manages zIndex state (default 1003), increment for nested modals
- **Theme mode persistence**: ThemeProvider syncs to localStorage + listens to `storage` event for cross-tab sync
- **Route context**: TanStack Router context flows down, use `createRootRouteWithContext<T>()` for type safety
- **MUI `shouldForwardProp`**: Always filter custom props when using `styled()` to avoid React warnings
- **Content registry updates**: Requires rebuild if you change anchor IDs or component structure

## Where to Find Things

- **Navigation config**: `src/config/navigationConfig.ts`
- **Route layouts**: `src/layout/` (PageLayout, BlogLayout, TabsLayout)
- **Context providers**: `src/context/`
- **Reusable components**: `src/components/` (see README.md for ComicStrip, Image docs)
- **Feature modules**: `src/features/{about|blog|game|learn|settings}/`
- **Generated files**: `src/utils/imageRegistry.ts`, `src/utils/contentRegistry.ts`, `src/routeTree.gen.ts`

### Modular Pattern Example: `binarySearch/`

When a component file grows large (~500+ lines), refactor into a modular folder structure:

```
src/features/learn/dsa/binarySearch/
├── index.tsx             # Main exports and combined component
├── styles.ts             # Shared styled components
├── useBunnyArrays.ts     # Specific hook (not generic "hooks.ts")
├── LoopInvariant.tsx     # Shared component
├── Step0.tsx             # Individual step components
├── Step1.tsx
├── Step2.tsx
├── Step3.tsx
├── examples.tsx          # Example components (not used in production)
└── README.md             # Usage documentation
```

**Key principles:**
- **Backward compatibility**: Old import paths continue to work via re-export file (`BinarySearchSteps.tsx`)
- **Specific naming**: `useBunnyArrays.ts` instead of generic `hooks.ts`
- **CamelCase folders**: `binarySearch/` not `binary-search/`
- **Shared resources**: `styles.ts` exports styled components, spacing constants
- **Examples separation**: `examples.tsx` for documentation/testing, not production use
- **Clear exports**: `index.tsx` exports all components for easy import
- **Documentation**: README.md with usage examples and API reference

This pattern keeps related code organized while maintaining a clean import API for consumers.


## Design Principles

- **Performance first**: Memoization within reason, centralized breakpoints, hardware-accelerated CSS transitions over JS animations
- **Type safety**: Strict TypeScript, no `any` without justification
- **Responsive by default**: Mobile-first, use BreakpointContext, test all breakpoints
- **Accessibility**: Proper ARIA labels, alt text, keyboard navigation for interactive components
- **Progressive enhancement**: Core content works without JS (SSG-friendly patterns)
- **reactHooks best practices**: Custom hooks for reusable logic, follow rules of hooks, avoid side effects in render, furthermore adapt a policy that we don't need to use useCallback, useMemo, useEffect unless it's necessary for performance or functionality. Keep components clean and focused on rendering. Adapt this principle throughout the codebase while also looking for clean and clever useRef patterns when applicable to avoid unnecessary re-renders.

---

## TODO: Workflow Guides

### TODO: How to Create a New Blog Post

- Document folder structure (`src/routes/blog/{category}/{post-slug}/`)
- Image asset preparation and placement (`src/assets/blog/YYYY/MM/`)
- Required metadata and Open Graph setup
- Using ProseBlock, CodeBlock, and other content components
- Testing anchor navigation
- Running `npm run images:generate` and `npm run content:generate`
- Deployment workflow

### TODO: How to Create a New Learn Module

- Document route structure (`src/routes/learn/{category}/{topic}/`)
- Anchor section requirements for auto-navigation
- MathBlock and equation components
- Interactive elements and drag-and-drop patterns
- Content registry integration
- TabsLayout usage for multi-page lessons
- Testing and validation
