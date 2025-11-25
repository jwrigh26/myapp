# Learn Components

Reusable components for learn section content, including interactive steppers and walkthroughs.

## StepperContainer

A generic stepper component that dynamically lazy-loads step components with slide animations.

### Features

- **Dynamic Lazy Loading**: Automatically imports step components based on topic path
- **Slide Animations**: CSS-based directional transitions (hardware-accelerated)
- **Non-linear Navigation**: Jump to any step by clicking step numbers
- **Responsive**: Adapts button labels and spacing for mobile/tablet
- **Styled to Theme**: Matches primary color scheme with glow effects in dark mode
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Usage

```tsx
import StepperContainer from '@/features/learn/components/StepperContainer';

function BinarySearchPage() {
  return (
    <PageLayout>
      <StepperContainer
        topic="dsa/binarySearch"
        totalSteps={4}
        title="Binary Search Step-by-Step"
        subtitle="Follow along as we find the first honey bunny."
      />
    </PageLayout>
  );
}
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `topic` | `string` | ✅ | - | Topic path relative to `src/features/learn/` (e.g., `"dsa/binary-search"`) |
| `totalSteps` | `number` | ✅ | - | Total number of steps (0-indexed) |
| `title` | `string` | ❌ | - | Optional title displayed above stepper |
| `subtitle` | `string` | ❌ | - | Optional subtitle/description |
| `initialStep` | `number` | ❌ | `0` | Starting step index |

### File Structure

Each topic must have numbered step components with default exports:

```
src/features/learn/
└── dsa/
    └── binarySearch/
        ├── Step0.tsx  // export default BinarySearchStep0
        ├── Step1.tsx  // export default BinarySearchStep1
        ├── Step2.tsx  // export default BinarySearchStep2
        └── Step3.tsx  // export default BinarySearchStep3
```

### Animation Details

**CSS Transitions (not react-transition-group):**
- Zero bundle size overhead
- Hardware-accelerated GPU transforms
- Consistent with existing codebase patterns
- Simpler mental model for directional slides

**Slide Direction Logic:**
```tsx
direction === 'next' ? slideInRight : slideInLeft
```

### Customization

Override styles by wrapping in a styled component or using `sx` prop:

```tsx
<Box sx={{ '& .MuiStepper-root': { padding: 4 } }}>
  <StepperContainer {...props} />
</Box>
```

### Performance

- **Code Splitting**: Each step is lazy-loaded only when accessed
- **Memoization**: Dynamic imports cached via `useMemo`
- **Suspense**: Graceful loading states with CircularProgress
- **No Layout Thrashing**: Pure CSS animations with `transform`

### Example Topics

**Binary Search:**
```tsx
<StepperContainer topic="dsa/binarySearch" totalSteps={4} />
```

**Python Loops:**
```tsx
<StepperContainer topic="python/loops" totalSteps={6} />
```

**Math Proofs:**
```tsx
<StepperContainer topic="math/induction" totalSteps={3} />
```

### Troubleshooting

**Import Error: Cannot find module**
- Ensure step files exist at `src/features/learn/{topic}/Step{N}.tsx`
- Verify each step has a default export
- Check file naming matches exactly (case-sensitive)

**Animation Not Working**
- Check browser DevTools for CSS animation support
- Verify `theme.transitions` values exist
- Try reducing `animation` duration in `SlideWrapper`

**Steps Not Loading**
- Open browser console for lazy load errors
- Verify dynamic import path matches file structure
- Check total steps count matches actual files
