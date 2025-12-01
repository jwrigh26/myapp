# Loop Step Components

Reusable components for displaying algorithm loop iterations with a consistent pattern.

## Components

### `VariableState`

Displays current variable values at the start of a loop iteration.

**Props:**
- `variables`: Array of `{ name, value, color }` objects
- `title?`: Optional section title (e.g., "Updated Values", "Initial State")
- `description?`: Optional explanatory text

**Example:**
```tsx
<VariableState
  title="Updated values"
  description="left was updated to 3."
  variables={[
    { name: 'left', value: 3, color: 'primary' },
    { name: 'right', value: 7, color: 'secondary' },
  ]}
/>
```

---

### `PredicateTest`

Shows a predicate/condition evaluation with expression and result in a grid layout.

**Props:**
- `expression`: React node for the left column (the test being performed)
- `result`: React node for the right column (the outcome)
- `title?`: Optional section title (e.g., "Test the Predicate")
- `description?`: Optional explanatory text above the grid
- `resultColor?`: Color for result text (`'primary' | 'secondary' | 'text'`, default: `'text'`)
- `caption?`: **[BONUS]** Optional caption shown below the result for additional context

**Example:**
```tsx
<PredicateTest
  title="Test the Predicate"
  description="Is the bunny at index 5 before a honey bunny?"
  expression={
    <>
      <InvariantText>is_before(</InvariantText>
      <InvariantText>arr[</InvariantText>
      <VariableValue variable="mid" value={5} color="info" />
      <InvariantText>].type</InvariantText>
      <InvariantText>)</InvariantText>
    </>
  }
  result={<InvariantText>false</InvariantText>}
  resultColor="text"
  caption="The is_before function checks if the bunny type is less than HONEY."
/>
```

---

### `ResultAssignment`

Shows the result of a loop iteration (which variable was updated).

**Props:**
- `variable`: Variable name being assigned
- `value`: New value
- `color?`: Color theme (`'primary' | 'secondary' | 'info' | 'default'`, default: `'primary'`)

**Example:**
```tsx
<ResultAssignment variable="left" value="3" color="primary" />
```

---

### `Section`

Simple wrapper for grouping related content with optional title/subtitle.

**Props:**
- `title?`: Section heading
- `subtitle?`: Explanatory text below title
- `children`: Content to display

**Example:**
```tsx
<Section title="Loop Invariant">
  <StepText>The loop compares left + 1 to right.</StepText>
  <LoopInvariant left={3} right={7} mid={5} />
</Section>
```

---

## Typical Loop Step Pattern

```tsx
import {
  VariableState,
  PredicateTest,
  ResultAssignment,
  Section,
} from './LoopStepComponents';

export const StepN: React.FC = () => {
  return (
    <StepContainer>
      <StepTitle>Step N: Description</StepTitle>

      {/* 1. Show current variable state */}
      <VariableState
        title="Updated values"
        description="Brief explanation of what changed."
        variables={[
          { name: 'left', value: n, color: 'primary' },
          { name: 'right', value: m, color: 'secondary' },
        ]}
      />

      <Spacer size={SPACING.node} />

      {/* 2. Show loop condition */}
      <Section title="Loop Invariant">
        <StepText>Explanation of loop condition.</StepText>
        <LoopInvariant left={n} right={m} mid={x} />
      </Section>

      <Spacer size={SPACING.node} />

      {/* 3. Test the predicate */}
      <PredicateTest
        title="Test the Predicate"
        description="Question about what we're testing."
        expression={<>Your expression JSX</>}
        result={<InvariantText>true/false</InvariantText>}
        caption="Optional clarification about the test."
      />

      {/* 4. Show array/data visualization */}
      <DsaArray {...} />

      {/* 5. Show result assignment */}
      <ResultAssignment variable="left" value="3" color="primary" />

      {/* 6. Explanation text */}
      <StepText>Explanation of what happened.</StepText>
    </StepContainer>
  );
};
```

---

## Benefits

1. **Consistency**: All loop steps follow the same visual pattern
2. **DRY**: No repeated JSX boilerplate for common patterns
3. **Reusability**: Can be used in other DSA learning modules (sorting, searching, etc.)
4. **Maintainability**: Change styling in one place affects all steps
5. **Flexibility**: Components accept React nodes for custom content

---

## Design Philosophy

- Components are **layout-focused**, not algorithm-specific
- Props use generic names (`expression`, `result`, `variables`) rather than domain-specific terms
- Styling comes from imported `styles.ts` components
- Components compose well with existing primitives (`VariableValue`, `InvariantText`, etc.)
