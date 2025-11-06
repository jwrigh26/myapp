# CSS Subgrid Tutorial: Building a Table-like Component

A practical guide to using CSS Grid's `subgrid` feature, demonstrated through our `InvariantGrid` component.

## Table of Contents
- [What is Subgrid?](#what-is-subgrid)
- [Why Use Subgrid?](#why-use-subgrid)
- [Real-World Example](#real-world-example)
- [Step-by-Step Implementation](#step-by-step-implementation)
- [Common Patterns](#common-patterns)
- [Browser Support](#browser-support)

## What is Subgrid?

`subgrid` is a CSS Grid value that allows a grid item to **inherit the track sizing** (columns/rows) from its parent grid. Instead of defining its own independent grid, the child grid aligns its tracks to the parent's.

### Basic Syntax

```css
.parent {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}

.child {
  display: grid;
  grid-template-columns: subgrid; /* Inherit parent's 3 columns */
  grid-column: 1 / -1;            /* Span all parent columns */
}
```

## Why Use Subgrid?

### Problem: Nested Grids Don't Align

Without subgrid, nested grids are independent:

```css
.parent {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.row {
  display: grid;
  grid-template-columns: 200px 1fr; /* ❌ Must manually match parent */
}
```

**Issues:**
- ❌ Columns can drift out of alignment
- ❌ Maintenance nightmare (change parent, must update all children)
- ❌ Dynamic content breaks alignment

### Solution: Subgrid Automatically Aligns

```css
.parent {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.row {
  display: grid;
  grid-template-columns: subgrid; /* ✅ Automatically matches parent */
  grid-column: 1 / -1;
}
```

**Benefits:**
- ✅ Perfect alignment guaranteed
- ✅ Change parent columns, children update automatically
- ✅ Works with dynamic content sizes

## Real-World Example

Let's build a table-like component that displays expressions and their evaluated results.

### Visual Goal

```
┌─────────────────────────────┬──────────┐
│ EXPRESSION                  │ RESULT   │  ← Headers
├─────────────────────────────┼──────────┤
│ while left + 1 < right      │ true     │  ← Row 1
├─────────────────────────────┼──────────┤
│ mid = (left + right) // 2   │ 6 // 2   │  ← Row 2
├─────────────────────────────┼──────────┤
│ mid = 3                     │ 3        │  ← Row 3
└─────────────────────────────┴──────────┘
```

### HTML Structure

```tsx
<InvariantGrid>
  {/* Headers - direct children of grid */}
  <InvariantHeader>Expression</InvariantHeader>
  <InvariantHeader>Result</InvariantHeader>
  
  {/* Rows - each is a subgrid */}
  <InvariantRow>
    <InvariantExpression>while left + 1 &lt; right</InvariantExpression>
    <InvariantResult>true</InvariantResult>
  </InvariantRow>
  
  <InvariantRow>
    <InvariantExpression>mid = (left + right) // 2</InvariantExpression>
    <InvariantResult>6 // 2</InvariantResult>
  </InvariantRow>
</InvariantGrid>
```

## Step-by-Step Implementation

### Step 1: Create the Parent Grid

Define the column structure in the parent:

```typescript
export const InvariantGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto', // 2 columns: flexible left, auto-sized right
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));
```

**Key points:**
- `1fr` - Expression column takes remaining space
- `auto` - Result column sizes to content
- Parent defines the "blueprint" for all children

### Step 2: Create the Subgrid Row

Make each row inherit the parent's columns:

```typescript
export const InvariantRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'subgrid', // ✨ Inherit parent's 2-column structure
  gridColumn: '1 / -1',            // Span from first to last column
  
  // Apply borders to all child cells
  '& > *': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  
  // Remove bottom border from last row
  '&:last-child > *': {
    borderBottom: 'none',
  },
}));
```

**Key points:**
- `gridTemplateColumns: 'subgrid'` - The magic! Inherit parent columns
- `gridColumn: '1 / -1'` - Span all parent columns (makes it a "row")
- Children of this subgrid align to parent's tracks

### Step 3: Create Cell Components

Cells are children of the subgrid row:

```typescript
export const InvariantExpression = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderRight: `1px solid ${theme.palette.divider}`,
  // Will occupy first column (1fr)
}));

export const InvariantResult = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  // Will occupy second column (auto)
}));
```

### Step 4: Headers (Direct Grid Children)

Headers are direct children of the parent grid:

```typescript
export const InvariantHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: theme.typography.fontWeightSemiBold,
  textTransform: 'uppercase',
}));
```

## How It Works: Grid Flow

```
┌─ InvariantGrid (2 columns: 1fr auto) ─────────────┐
│                                                    │
│  ┌─ Header (occupies column 1) ─┐                 │
│  │ EXPRESSION                    │                 │
│  └───────────────────────────────┘                 │
│                                                    │
│  ┌─ Header (occupies column 2) ─┐                 │
│                                 │ RESULT          │
│                                 └─────────────────┘│
│                                                    │
│  ┌─ InvariantRow (subgrid, spans columns 1-2) ───┐│
│  │  ┌─ Expression (col 1) ──┐  ┌─ Result (col 2)┐││
│  │  │ while left + 1 < right │  │ true           │││
│  │  └────────────────────────┘  └────────────────┘││
│  └─────────────────────────────────────────────────┘│
│                                                    │
│  ┌─ InvariantRow (subgrid, spans columns 1-2) ───┐│
│  │  ┌─ Expression (col 1) ──┐  ┌─ Result (col 2)┐││
│  │  │ mid = (l + r) // 2     │  │ 6 // 2         │││
│  │  └────────────────────────┘  └────────────────┘││
│  └─────────────────────────────────────────────────┘│
│                                                    │
└────────────────────────────────────────────────────┘
```

### Grid Item Placement

1. **Headers**: Placed in grid cells sequentially (cell 1, cell 2)
2. **InvariantRow**: Spans all columns (`grid-column: 1 / -1`)
3. **Row creates subgrid**: Children align to parent's tracks
4. **Expression & Result**: Flow into subgrid's columns

## Common Patterns

### Pattern 1: Table with Row Grouping

Perfect for data tables where you want to group cells into rows:

```typescript
const Table = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
});

const Row = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.05)', // Hover entire row
  },
});
```

### Pattern 2: Card Grid with Aligned Elements

Cards with internal elements that align across all cards:

```typescript
const CardGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1rem',
});

const Card = styled('div')({
  display: 'grid',
  gridTemplateRows: 'subgrid', // Align rows instead of columns!
  gridRow: 'span 3',           // Span 3 parent rows
});
```

### Pattern 3: Form with Aligned Labels

```typescript
const Form = styled('form')({
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
});

const FieldGroup = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
  gap: '1rem',
});
```

## Subgrid vs display: contents

### `display: contents` (Old Approach)

```typescript
const Row = styled('div')({
  display: 'contents', // Element becomes "invisible"
});
```

**How it works:**
- The element's box is removed from the layout
- Its children are promoted to be children of its parent
- Useful, but limited

**Limitations:**
- ❌ Can't style the row wrapper
- ❌ No row-level hover effects
- ❌ Breaks accessibility/semantics
- ❌ Can't use `grid-row` or `grid-column` on the wrapper

### `subgrid` (Modern Approach)

```typescript
const Row = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
});
```

**How it works:**
- Element is a real grid item
- It creates its own grid that inherits parent's tracks
- Full control over the wrapper

**Advantages:**
- ✅ Can style the row wrapper
- ✅ Row-level hover, focus, etc.
- ✅ Better semantics
- ✅ Can use grid properties on the wrapper

## Advanced Techniques

### Spanning Multiple Parent Tracks

```typescript
const WideRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '2 / 5', // Only inherit columns 2-4 from parent
});
```

### Subgrid Rows Instead of Columns

```typescript
const Parent = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto', // Header, content, footer
});

const Child = styled('div')({
  display: 'grid',
  gridTemplateRows: 'subgrid', // Inherit parent's row structure
  gridRow: '1 / -1',
});
```

### Named Grid Lines with Subgrid

```typescript
const Parent = styled('div')({
  display: 'grid',
  gridTemplateColumns: '[start] 1fr [middle] 1fr [end]',
});

const Child = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'subgrid', // Inherits named lines!
  gridColumn: 'start / end',
});

// Child's children can reference 'middle' line
```

## Debugging Tips

### Visualize the Grid

Use browser DevTools:
- Chrome: Inspect → Elements → Grid badge
- Firefox: Inspector → Layout → Grid

### Common Issues

**Problem: Subgrid not aligning**
```typescript
// ❌ Forgot to span parent columns
gridTemplateColumns: 'subgrid',
// ✅ Must span columns
gridTemplateColumns: 'subgrid',
gridColumn: '1 / -1',
```

**Problem: Subgrid children not flowing**
```typescript
// ❌ Parent doesn't have enough columns
.parent { gridTemplateColumns: '1fr'; }
.child { gridTemplateColumns: 'subgrid'; }
.child > div { /* Only 1 column available! */ }

// ✅ Parent defines all needed columns
.parent { gridTemplateColumns: '1fr 1fr 1fr'; }
```

## Browser Support

### Current Support (2025)

- ✅ Chrome 117+ (September 2023)
- ✅ Edge 117+ (September 2023)
- ✅ Firefox 71+ (December 2019)
- ✅ Safari 16+ (September 2022)

### Fallback Strategy

```typescript
const Row = styled('div')(({ theme }) => ({
  // Fallback for older browsers
  display: 'contents',
  
  // Modern browsers
  '@supports (grid-template-columns: subgrid)': {
    display: 'grid',
    gridTemplateColumns: 'subgrid',
    gridColumn: '1 / -1',
  },
}));
```

## When to Use Subgrid

### ✅ Perfect For:
- Table-like layouts with aligned columns
- Card grids with aligned internal elements
- Forms with consistent label/input alignment
- Any nested grid that should align to parent structure

### ❌ Not Needed For:
- Simple single-level grids
- Completely independent nested grids
- Flexbox might be simpler for the use case

## Complete Example: Our InvariantGrid

See the full implementation in `src/features/learn/dsa/binarySearch/styles.ts`:

```typescript
// Parent grid (defines column structure)
export const InvariantGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  // ... borders, styling
}));

// Row (subgrid that inherits columns)
export const InvariantRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
  // ... row-level styling
}));

// Cells (children of subgrid)
export const InvariantExpression = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRight: '1px solid ...',
}));

export const InvariantResult = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'flex-end',
}));
```

## Resources

- [MDN: Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid)
- [CSS-Tricks: Subgrid Guide](https://css-tricks.com/css-subgrid/)
- [Can I Use: Subgrid](https://caniuse.com/css-subgrid)
- [Rachel Andrew: Subgrid](https://rachelandrew.co.uk/archives/2019/03/12/css-grid-level-2-subgrid/)

## Summary

**Subgrid** allows nested grids to inherit their parent's track sizing, ensuring perfect alignment without manual coordination.

**Key takeaways:**
1. Use `gridTemplateColumns: 'subgrid'` to inherit parent columns
2. Must span parent tracks with `gridColumn` or `gridRow`
3. Perfect for table-like layouts with row grouping
4. Better than `display: contents` for semantic structure
5. Well-supported in modern browsers

Now you can build complex, perfectly aligned grid layouts with confidence! 🎯
