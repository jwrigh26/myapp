# Drawer Footer System

Custom footer components for the SecondaryDrawer (Table of Contents) on desktop learn pages.

## Overview

The drawer footer system allows you to add custom footer content to the bottom of the desktop navigation drawer for specific learn routes. Footers are only displayed on desktop (tablet and larger) and stick to the bottom of the drawer.

## How It Works

1. **Create a footer component** in your feature folder
2. **Register it** in `src/utils/drawerFooterRegistry.ts`
3. **Footer automatically appears** when users visit that route

## Creating a Footer Component

### Example: Binary Search Footer

```tsx
// src/features/learn/dsa/binarySearch/DrawerFooter.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto', // Push to bottom
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export function BinarySearchDrawerFooter() {
  return (
    <FooterContainer>
      <Typography variant="caption" fontWeight={600} color="text.secondary">
        Binary Search Visualizer
      </Typography>
      <Typography variant="caption" display="block" color="text.disabled">
        Interactive learning module
      </Typography>
    </FooterContainer>
  );
}

export default BinarySearchDrawerFooter;
```

### Styling Guidelines

- Use `marginTop: 'auto'` to push footer to bottom
- Add `borderTop` for visual separation
- Use `caption` variant for compact text
- Keep content minimal (2-3 lines max)
- Match the drawer's color scheme

## Registering a Footer

Add your footer to the registry:

```typescript
// src/utils/drawerFooterRegistry.ts
import { BinarySearchDrawerFooter } from '@/features/learn/dsa/binarySearch/DrawerFooter';
import { MyOtherFooter } from '@/features/learn/path/to/footer';

export const drawerFooters: DrawerFooterRegistry = {
  'dsa/binary-search': BinarySearchDrawerFooter,
  'python/decorators': MyOtherFooter,
  // Add more as needed
};
```

**Route Path Format:**
- Relative to `/learn/`
- No leading or trailing slashes
- Example: `'dsa/binary-search'` for `/learn/dsa/binary-search`

## Footer Ideas

### Information Display
```tsx
<FooterContainer>
  <Typography variant="caption">
    📚 Tutorial Duration: ~15 min
  </Typography>
  <Typography variant="caption">
    ⭐ Difficulty: Intermediate
  </Typography>
</FooterContainer>
```

### Quick Links
```tsx
<FooterContainer>
  <Link href="#exercises">Practice Problems</Link>
  <Link href="#summary">Quick Summary</Link>
</FooterContainer>
```

### Progress Indicator
```tsx
<FooterContainer>
  <Typography variant="caption">Progress</Typography>
  <LinearProgress variant="determinate" value={60} />
  <Typography variant="caption">3 of 5 sections</Typography>
</FooterContainer>
```

### Related Content
```tsx
<FooterContainer>
  <Typography variant="caption" fontWeight={600}>
    Related Topics
  </Typography>
  <Link href="/learn/dsa/linear-search">Linear Search</Link>
  <Link href="/learn/dsa/complexity">Big O Notation</Link>
</FooterContainer>
```

## Technical Details

### How It Works

1. **`useNavigationItems` hook** checks the current route
2. **Calls `getDrawerFooter(routePath)`** to find registered footer
3. **Passes footer component** to `SecondaryDrawer`
4. **Desktop drawer renders footer** at the bottom (mobile ignores it)

### Component Flow

```
Route (/learn/dsa/binary-search)
  ↓
useNavigationItems()
  ↓
getDrawerFooter('dsa/binary-search')
  ↓
BinarySearchDrawerFooter component
  ↓
SecondaryDrawer (desktop only)
  ↓
Rendered at bottom of drawer
```

### Type Safety

All footers are typed as `React.ComponentType`, ensuring they're valid React components:

```typescript
export interface DrawerFooterRegistry {
  [routePath: string]: ComponentType;
}
```

## Best Practices

1. **Keep footers simple** - They're supplementary, not primary content
2. **Use theme variables** - Ensure footers work in light/dark mode
3. **Maintain consistency** - Similar styling across different footers
4. **Test responsiveness** - Footer should work at min drawer width (228px)
5. **Avoid dynamic imports** - Footers are small, direct imports are fine

## Limitations

- **Desktop only** - Mobile drawer doesn't show footers
- **No state management** - Footers are presentational components
- **Static content** - If you need interactivity, keep it minimal

## Future Enhancements

Potential improvements:
- Auto-generate footers from metadata
- Lazy load footers for performance
- Support footer animations on scroll
- Add footer templates for common patterns

## Example: Full Footer Implementation

```tsx
// 1. Create component
// src/features/learn/python/loops/DrawerFooter.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export function PythonLoopsFooter() {
  return (
    <FooterContainer>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <Chip label="Python 3.11+" size="small" />
        <Chip label="Beginner" size="small" color="success" />
      </Box>
      <Typography variant="caption" color="text.secondary">
        Learn while, for, and comprehension loops
      </Typography>
    </FooterContainer>
  );
}

// 2. Register in drawerFooterRegistry.ts
export const drawerFooters: DrawerFooterRegistry = {
  'python/loops': PythonLoopsFooter,
};

// 3. Footer automatically appears on /learn/python/loops
```

## Troubleshooting

**Footer not appearing?**
- Check route path matches exactly (no extra slashes)
- Verify component is exported correctly
- Ensure you're on desktop (tablet size or larger)
- Check browser console for errors

**Footer not sticking to bottom?**
- Add `marginTop: 'auto'` to container
- Parent drawer uses flexbox with `flexDirection: 'column'`

**Footer styling broken?**
- Use theme variables, not hardcoded colors
- Test in both light and dark mode
- Check drawer width (228px minimum)
