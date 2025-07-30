# useCallback/useMemo Recommendations for Our Codebase

Based on analysis of our codebase against the principles in "The Useless useCallback" article, here are specific recommendations for improving our memoization patterns.

## Executive Summary

Our codebase exhibits the classic "cascading memoization" problem where `useCallback`s depend on frequently changing values, making them ineffective. Most of our current memoizations are likely adding overhead without providing benefits.

## Identified Issues

### 1. Snackbar Hooks - Broken Memoization Chain

**Location**: `/src/hooks/useSnackbar.ts`

**Problem**: All snackbar hooks follow this anti-pattern:

```typescript
return useCallback(
  (message: string, options: SnackbarOptions = {}) => {
    setSnackbar({...}); // setSnackbar from context
  },
  [setSnackbar] // This dependency breaks memoization
);
```

**Why it's broken**: `setSnackbar` comes from context and may not be stable. Even if it is stable, consumers likely use these functions in inline event handlers, negating any memoization benefits.

### 2. Context Provider Memoizations

#### ComponentStateContext.tsx

```typescript
const removeSnackbar = useCallback(
  (id: string) => () => {
    // implementation
  },
  [state] // Breaks on every state change!
);

const value = useMemo(
  () => ({
    reset,
    setClose,
    // ...other functions
    ...state, // This makes the memo useless
  }),
  [state] // Changes on every state update
);
```

**Problem**: Dependencies on frequently changing state make these memoizations pointless.

### 3. Custom Hooks with Unstable Dependencies

#### useDebounce/useThrottle

```typescript
const handleDebounce = useMemo(
  () => debounce((...args) => callback(...args), delay),
  [callback, delay] // callback is likely unstable
);
```

**Problem**: The `callback` parameter is typically an inline function from consumers, breaking memoization on every render.

## The Latest Ref Pattern - Detailed Explanation

The Latest Ref Pattern solves the problem of needing the latest value without breaking memoization. Here's how it works:

### The Problem

```typescript
// BAD: This breaks memoization
function useExample(callback) {
  const memoizedCallback = useCallback(() => {
    // Use callback here
    callback();
  }, [callback]); // callback changes every render

  useEffect(() => {
    document.addEventListener('click', memoizedCallback);
    return () => document.removeEventListener('click', memoizedCallback);
  }, [memoizedCallback]); // Effect re-runs every render
}
```

### The Solution - Latest Ref Pattern

There are two valid approaches to implementing the Latest Ref Pattern:

#### Approach 1: Direct Assignment (Simpler)

```typescript
// GOOD: Simple and works for most cases
function useExample(callback) {
  const callbackRef = useRef(callback);

  // Direct assignment - runs during render
  callbackRef.current = callback;

  const memoizedCallback = useCallback(() => {
    callbackRef.current();
  }, []);

  useEffect(() => {
    document.addEventListener('click', memoizedCallback);
    return () => document.removeEventListener('click', memoizedCallback);
  }, [memoizedCallback]);
}
```

#### Approach 2: useLayoutEffect (More Precise Timing)

```typescript
// BETTER: Ensures ref updates before any synchronous effects
function useExample(callback) {
  const callbackRef = useRef(callback);

  // Update ref before DOM mutations but after render
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const memoizedCallback = useCallback(() => {
    callbackRef.current();
  }, []);

  useEffect(() => {
    document.addEventListener('click', memoizedCallback);
    return () => document.removeEventListener('click', memoizedCallback);
  }, [memoizedCallback]);
}
```

### When to Use Which Approach

**Use Direct Assignment When:**

- Simple scenarios where timing isn't critical
- The callback is only used in async operations (setTimeout, event handlers, etc.)
- You want minimal overhead

**Use useLayoutEffect When:**

- The callback might be used immediately after render
- You need to ensure the ref is updated before any synchronous DOM effects
- Working with complex hooks where execution order matters
- Following patterns from libraries like React Query or established community practices

### Key Insights

1. **Timing matters**: `useLayoutEffect` runs synchronously after all DOM mutations but before the browser paints, ensuring the ref is updated before any effects that might use it.

2. **Direct assignment vs useLayoutEffect**: Direct assignment happens during render, while `useLayoutEffect` happens after render but before paint. For most cases, both work fine.

3. **Stable memoization**: The memoized function has no dependencies (`[]`), so it's created once and never changes.

4. **Latest values**: Inside the memoized function, you access the latest values via `callbackRef.current`.

5. **Effect stability**: Effects that depend on the memoized function only run when necessary (usually once).

## Specific Recommendations

### 1. Fix useDebounce Hook

**Current (Broken)**:

```typescript
export function useDebounce<T extends AnyFunction>(
  callback: T,
  delay: number = 250
): (...args: Parameters<T>) => void {
  const handleDebounce = useMemo(
    () =>
      debounce((...args: Parameters<T>) => {
        callback(...args);
      }, delay),
    [callback, delay] // callback breaks this
  );
  return handleDebounce;
}
```

**Recommended (Fixed with useLayoutEffect)**:

```typescript
export function useDebounce<T extends AnyFunction>(
  callback: T,
  delay: number = 250
): (...args: Parameters<T>) => void {
  // Latest Ref Pattern with useLayoutEffect for precise timing
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleDebounce = useMemo(
    () =>
      debounce((...args: Parameters<T>) => {
        callbackRef.current(...args); // Always use latest
      }, delay),
    [delay] // Only depend on delay
  );

  return handleDebounce;
}
```

### 2. Fix SnackbarContext

**Current (Broken)**:

```typescript
const removeSnackbar = useCallback(
  (id: string) => () => {
    const currentSnackbar = state.snackbars.find((s) => s.id === id);
    // ... use state
  },
  [state] // Breaks on every state change
);
```

**Recommended (Fixed)**:

```typescript
const removeSnackbar = useCallback(
  (id: string) => () => {
    // Access latest state directly from the reducer's closure
    // Or use a ref pattern if needed
    dispatch({ type: 'REMOVE_SNACKBAR', payload: { id } });
  },
  []
); // No dependencies!
```

### 3. Simplify ComponentStateContext

**Current (Over-memoized)**:

```typescript
const value = useMemo(
  () => ({
    reset,
    setClose,
    setOpen,
    // ...
    ...state, // This breaks the memo anyway
  }),
  [state]
);
```

**Recommended (Simplified)**:

```typescript
// Just create the object directly - no useMemo needed
const value = {
  reset,
  setClose,
  setOpen,
  // ...
  ...state,
};
// The individual functions are already memoized where it matters
```

### 4. Remove Useless Snackbar Hook Memoizations

**Current**:

```typescript
export function useInfoSnackbar() {
  const setSnackbar = useSetSnackbarContext();

  return useCallback(
    (message: string, options: SnackbarOptions = {}) => {
      // implementation
    },
    [setSnackbar]
  );
}
```

**Recommended**:

```typescript
export function useInfoSnackbar() {
  const setSnackbar = useSetSnackbarContext();

  // Just return the function directly - no useCallback needed
  return (message: string, options: SnackbarOptions = {}) => {
    // implementation
  };
}
```

**Rationale**: These functions are typically used in inline event handlers anyway, so memoizing them provides no benefit.

## Implementation Strategy

### Phase 1: Remove Obviously Useless Memoizations

1. Remove `useCallback` from snackbar hooks
2. Remove `useMemo` from context providers where state is spread
3. Audit components for `useCallback`s that end up in native DOM elements

### Phase 2: Apply Latest Ref Pattern

1. Fix `useDebounce` and `useThrottle` hooks
2. Fix any custom hooks that depend on unstable callback parameters
3. Update context providers to use refs for frequently changing state

### Phase 3: Audit Memoized Components

1. Find all `React.memo` usage
2. Verify that props passed to memoized components are actually stable
3. Remove memoizations where components aren't wrapped in `React.memo`

## Testing the Changes

After implementing these changes:

1. **Performance**: Use React DevTools Profiler to ensure no performance regressions
2. **Functionality**: Verify that debouncing/throttling still works correctly
3. **Memory**: Check for any memory leaks from the ref pattern (unlikely but good to verify)

## Future Considerations

1. **React's useEffectEvent**: When this lands, we can replace the Latest Ref Pattern with this official primitive
2. **React Compiler**: When available, it will handle most of these optimizations automatically
3. **ESLint Rules**: Consider adding rules to prevent problematic memoization patterns

## Example: Complete useHotkeys Implementation

Here's how to implement a robust `useHotkeys` hook using the Latest Ref Pattern:

````typescript
```typescript
export function useHotkeys(hotkeys: Hotkey[]) {
  // Store latest hotkeys in ref with useLayoutEffect for precise timing
  const hotkeysRef = useRef(hotkeys);

  useLayoutEffect(() => {
    hotkeysRef.current = hotkeys;
  });

  // Stable callback with no dependencies
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Always use latest hotkeys
    const currentHotkeys = hotkeysRef.current;

    for (const hotkey of currentHotkeys) {
      if (event.key === hotkey.match) {
        hotkey.callback();
        break;
      }
    }
  }, []); // No dependencies = stable reference

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]); // handleKeyDown never changes
}
````

// Usage - no memoization required from consumers!
function MyComponent() {
const [count, setCount] = useState(0);

// This is fine - no need to memoize the array or callbacks
useHotkeys([
{ match: 'ArrowUp', callback: () => setCount(c => c + 1) },
{ match: 'ArrowDown', callback: () => setCount(c => c - 1) },
]);

return <div>Count: {count}</div>;
}

```

## Conclusion

The goal is to **remove complexity** rather than add more memoization. Most memoizations in our codebase are either useless or actively harmful due to unstable dependencies. By applying the Latest Ref Pattern judiciously and removing unnecessary memoizations, we can:

1. Reduce code complexity
2. Improve maintainability
3. Eliminate false performance optimizations
4. Make the codebase more predictable

Remember: **Premature optimization is the root of all evil**. Only memoize when you have a proven performance problem and a clear benefit.
```
