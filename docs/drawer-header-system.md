# Drawer Header System

Custom header components for the SecondaryDrawer (Table of Contents) on desktop learn pages.

## Overview

The drawer header system allows you to add custom header content to the top of the desktop navigation drawer for specific learn routes. Headers are only displayed on desktop (tablet and larger) and appear above the table of contents navigation.

## How It Works

1. **Create a header component** in your feature folder
2. **Register it** in `src/utils/drawerHeaderRegistry.ts`
3. **Header automatically appears** when users visit that route

## Creating a Header Component

### Example: Binary Search Header

```tsx
// src/features/learn/dsa/binarySearch/DrawerHeader.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@/components/Icon';
import { styled } from '@mui/material/styles';
import { mdiRabbit } from '@mdi/js';

const HeaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export function BinarySearchDrawerHeader() {
  return (
    <HeaderContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <Icon path={mdiRabbit} size={0.8} />
        <Typography variant="caption" fontWeight={600} color="primary">
          Binary Search
        </Typography>
      </Box>
      <Typography variant="caption" display="block" color="text.secondary">
        Find the honey bunny
      </Typography>
    </HeaderContainer>
  );
}

export default BinarySearchDrawerHeader;
```

### Styling Guidelines

- Add `borderBottom` for visual separation from navigation
- Use `caption` variant for compact text
- Keep content minimal (2-3 lines max)
- Match the drawer's color scheme
- Consider adding icons for visual interest

## Registering a Header

Add your header to the registry:

```typescript
// src/utils/drawerHeaderRegistry.ts
import { BinarySearchDrawerHeader } from '@/features/learn/dsa/binarySearch/DrawerHeader';
import { MyOtherHeader } from '@/features/learn/path/to/header';

export const drawerHeaders: DrawerHeaderRegistry = {
  'dsa/binary-search': BinarySearchDrawerHeader,
  'python/decorators': MyOtherHeader,
  // Add more as needed
};
```

**Route Path Format:**
- Relative to `/learn/`
- No leading or trailing slashes
- Example: `'dsa/binary-search'` for `/learn/dsa/binary-search`

## Header Ideas

### Module Title with Icon
```tsx
<HeaderContainer>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Icon path={mdiAlgorithm} />
    <Typography variant="subtitle2">Algorithm Study</Typography>
  </Box>
</HeaderContainer>
```

### Difficulty Badge
```tsx
<HeaderContainer>
  <Typography variant="caption" color="text.secondary">
    Difficulty
  </Typography>
  <Chip label="Intermediate" size="small" color="warning" />
</HeaderContainer>
```

### Progress Indicator
```tsx
<HeaderContainer>
  <Typography variant="caption" gutterBottom>
    Your Progress
  </Typography>
  <LinearProgress variant="determinate" value={40} />
  <Typography variant="caption" color="text.disabled">
    2 of 5 sections
  </Typography>
</HeaderContainer>
```

### Learning Path
```tsx
<HeaderContainer>
  <Typography variant="caption" color="text.disabled">
    Part of: DSA Fundamentals
  </Typography>
  <Typography variant="body2" fontWeight={600}>
    Binary Search
  </Typography>
</HeaderContainer>
```

## Technical Details

### How It Works

1. **`useNavigationItems` hook** checks the current route
2. **Calls `getDrawerHeader(routePath)`** to find registered header
3. **Passes header component** to `SecondaryDrawer`
4. **Desktop drawer renders header** at the top (mobile ignores it)

### Component Flow

```
Route (/learn/dsa/binary-search)
  ↓
useNavigationItems()
  ↓
getDrawerHeader('dsa/binary-search')
  ↓
BinarySearchDrawerHeader component
  ↓
SecondaryDrawer (desktop only)
  ↓
Rendered at top of drawer
```

### Type Safety

All headers are typed as `React.ComponentType`, ensuring they're valid React components:

```typescript
export interface DrawerHeaderRegistry {
  [routePath: string]: ComponentType;
}
```

## Best Practices

1. **Keep headers simple** - They're supplementary context, not primary content
2. **Use theme variables** - Ensure headers work in light/dark mode
3. **Maintain consistency** - Similar styling across different headers
4. **Test responsiveness** - Header should work at min drawer width (228px)
5. **Avoid dynamic imports** - Headers are small, direct imports are fine
6. **Don't duplicate title** - The main navigation already shows the page title
7. **Add value** - Use headers to provide context, not repeat information

## Limitations

- **Desktop only** - Mobile drawer doesn't show headers
- **No state management** - Headers are presentational components
- **Static content** - If you need interactivity, keep it minimal

## Future Enhancements

Potential improvements:
- Auto-generate headers from metadata
- Lazy load headers for performance
- Support header animations on scroll
- Add header templates for common patterns
- Collapsible headers for extra content

## Example: Full Header Implementation

```tsx
// 1. Create component
// src/features/learn/python/loops/DrawerHeader.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Icon from '@/components/Icon';
import { styled } from '@mui/material/styles';
import { mdiLanguagePython } from '@mdi/js';

const HeaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export function PythonLoopsHeader() {
  return (
    <HeaderContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Icon path={mdiLanguagePython} size={0.8} color="primary" />
        <Typography variant="caption" fontWeight={600} color="primary">
          Python Fundamentals
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip label="Beginner" size="small" color="success" />
        <Chip label="~20 min" size="small" variant="outlined" />
      </Box>
    </HeaderContainer>
  );
}

// 2. Register in drawerHeaderRegistry.ts
export const drawerHeaders: DrawerHeaderRegistry = {
  'python/loops': PythonLoopsHeader,
};

// 3. Header automatically appears on /learn/python/loops
```

## Combining Headers and Footers

You can use both headers and footers on the same drawer:

```tsx
// Headers provide context at the top
<DrawerHeader>
  <ModuleTitle>Binary Search</ModuleTitle>
  <DifficultyBadge level="intermediate" />
</DrawerHeader>

// Navigation in the middle
<TableOfContents items={items} />

// Footers provide actions or summary at the bottom
<DrawerFooter>
  <ProgressIndicator current={3} total={5} />
  <NextModuleLink to="/learn/dsa/linear-search" />
</DrawerFooter>
```

## Troubleshooting

**Header not appearing?**
- Check route path matches exactly (no extra slashes)
- Verify component is exported correctly
- Ensure you're on desktop (tablet size or larger)
- Check browser console for errors

**Header layout broken?**
- Use theme variables, not hardcoded colors
- Test in both light and dark mode
- Check drawer width (228px minimum)
- Verify borderBottom is added for separation

**Header vs. Title confusion?**
- Headers are optional context above navigation
- Page title appears in main content area
- Don't duplicate the title in the header
