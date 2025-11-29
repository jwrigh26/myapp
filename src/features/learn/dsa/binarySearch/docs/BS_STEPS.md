# Binary Search Steps Module

Modular, well-organized components for visualizing binary search step-by-step.

## Structure

```
binarySearch/
├── index.tsx             # Main exports and combined component
├── styles.ts             # Shared styled components
├── useBunnyArrays.ts     # Hook for bunny arrays
├── LoopInvariant.tsx     # Loop invariant display component
├── Step0.tsx             # Initial setup step
├── Step1.tsx             # First iteration (mid = 3)
├── Step2.tsx             # Second iteration (mid = 5)
├── Step3.tsx             # Final iteration (mid = 4)
├── examples.tsx          # Example components (not used in production)
└── README.md             # This file
```

## Usage

### Import All Steps

```tsx
import BinarySearchSteps from '@/features/learn/dsa/binarySearch';

// Renders all steps in sequence
<BinarySearchSteps />
```

### Import Individual Steps

```tsx
import {
  BinarySearchStep0,
  BinarySearchStep1,
  BinarySearchStep2,
  BinarySearchStep3,
} from '@/features/learn/dsa/binarySearch';

// Use individual steps
<BinarySearchStep0 />
<BinarySearchStep1 />
```

### Import Shared Components

```tsx
import {
  LoopInvariant,
} from '@/features/learn/dsa/binarySearch';

// Use shared components
<LoopInvariant left={-1} right={7} mid={3} />
```

### Import Hooks

```tsx
import { useBunnyArrays } from '@/features/learn/dsa/binarySearch';

// Create custom step
const MyCustomStep = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();
  
  return (
    <DsaArray
      items={[...normalBunnies, ...honeyBunnies]}
      cellWidth="60px"
      cellHeight="60px"
    />
  );
};
```

### Import Styles

```tsx
import {
  StepContainer,
  StepTitle,
  StepText,
  SPACING,
} from '@/features/learn/dsa/binarySearch';

// Use shared styled components
<StepContainer>
  <StepTitle>My Custom Step</StepTitle>
  <StepText>Description...</StepText>
</StepContainer>
```

## Shared Styles

All styled components are exported from `styles.ts`:

- **Layout**: `StepContainer`
- **Typography**: `StepTitle`, `StepSubTitle`, `StepText`, `StepDescription`
- **Invariants**: `InvariantBox`, `InvariantContainer`, `InvariantText`
- **Constants**: `SPACING` (section, block, chunk, node)

## Shared Hooks

### `useBunnyArrays()`

Returns themed bunny arrays for visualization:

```tsx
const { normalBunnies, honeyBunnies } = useBunnyArrays();
// normalBunnies: 4 bunnies with primary color
// honeyBunnies: 3 bunnies with secondary color
```

## Components

### LoopInvariant

Displays the loop condition and mid calculation:

```tsx
<LoopInvariant 
  left={-1} 
  right={7} 
  mid={3}  // Optional
/>
```

## Example Components (examples.tsx)

These are for documentation/testing only and not used in production:

- **BunnyArrayBasic**: Simple array of all bunnies
- **BunnyArraySegmented**: Array split into Normal and Honey segments  
- **BinarySearchStepResult**: Final result display

## Adding New Steps

1. Create new file: `Step4.tsx`
2. Import shared styles and hooks
3. Follow existing step pattern
4. Export from `index.tsx`

Example:

```tsx
// Step4.tsx
import React from 'react';
import DsaArray from '@/components/DsaArray';
import { useBunnyArrays } from './useBunnyArrays';
import { LoopInvariant } from './LoopInvariant';
import { StepContainer, StepTitle, StepDescription } from './styles';

export const BinarySearchStep4: React.FC = () => {
  const { normalBunnies, honeyBunnies } = useBunnyArrays();

  return (
    <StepContainer>
      <StepTitle>Step 4: My New Step</StepTitle>
      <StepDescription>Description here...</StepDescription>
      {/* Your content */}
    </StepContainer>
  );
};
```

Then add to `index.tsx`:

```tsx
export { BinarySearchStep4 } from './Step4';
```

## Benefits of This Structure

✅ **Modular**: Each step is self-contained  
✅ **Reusable**: Shared styles, hooks, and components  
✅ **Maintainable**: Easy to find and update specific steps  
✅ **Scalable**: Simple to add new steps  
✅ **Type-safe**: Full TypeScript support  
✅ **Flexible**: Import what you need  

## Migration from Old BinarySearchSteps.tsx

The old monolithic file now simply re-exports from this folder:

```tsx
// Old and new - same API!
import BinarySearchSteps from '@/features/learn/dsa/BinarySearchSteps';
```

All exports are backward compatible!
