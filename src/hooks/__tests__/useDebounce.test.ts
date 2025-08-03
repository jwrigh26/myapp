import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

// Mock timers
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('useDebounce', () => {
  it('should debounce function calls', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useDebounce(mockCallback, 500));

    // Call the debounced function multiple times
    act(() => {
      result.current('arg1');
      result.current('arg2');
      result.current('arg3');
    });

    // Callback should not be called immediately
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time by 400ms (less than delay)
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Still should not be called
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time by remaining 100ms (total 500ms)
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Now it should be called once with the last arguments
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('arg3');
  });

  it('should cancel previous timeout when called again', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useDebounce(mockCallback, 500));

    // First call
    act(() => {
      result.current('first');
    });

    // Wait 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Second call should cancel the first
    act(() => {
      result.current('second');
    });

    // Wait another 300ms (600ms total, but only 300ms since last call)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should not be called yet
    expect(mockCallback).not.toHaveBeenCalled();

    // Wait the remaining 200ms to complete the 500ms delay from second call
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Should be called once with second argument
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith('second');
  });

  it('should use default delay of 250ms when not specified', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useDebounce(mockCallback));

    act(() => {
      result.current();
    });

    // Should not be called before 250ms
    act(() => {
      vi.advanceTimersByTime(249);
    });
    expect(mockCallback).not.toHaveBeenCalled();

    // Should be called after 250ms
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should work with functions that have multiple parameters', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useDebounce(mockCallback, 100));

    act(() => {
      result.current('param1', 42, { key: 'value' }, true);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(
      'param1',
      42,
      { key: 'value' },
      true
    );
  });

  it('should work with functions that return values', () => {
    const mockCallback = vi.fn().mockReturnValue('return value');
    const { result } = renderHook(() => useDebounce(mockCallback, 100));

    // Note: debounced functions don't return the original return value
    // since they're called asynchronously
    const returnValue = result.current();
    expect(returnValue).toBeUndefined();

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should use the latest callback when callback changes', () => {
    let callbackVersion = 1;
    const mockCallback1 = vi.fn(() => `callback${callbackVersion}`);
    const mockCallback2 = vi.fn(() => `callback${callbackVersion}`);

    const { result, rerender } = renderHook(
      ({ callback }) => useDebounce(callback, 200),
      { initialProps: { callback: mockCallback1 } }
    );

    // Call with first callback
    act(() => {
      result.current();
    });

    // Change the callback before the debounce fires
    callbackVersion = 2;
    rerender({ callback: mockCallback2 });

    // Let the debounce fire
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Should call the latest callback (mockCallback2), not the original one
    expect(mockCallback1).not.toHaveBeenCalled();
    expect(mockCallback2).toHaveBeenCalledTimes(1);
  });

  it('should maintain stable reference when callback changes', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ callback }) => useDebounce(callback, 100),
      { initialProps: { callback: mockCallback1 } }
    );

    const debouncedRef1 = result.current;

    // Change the callback
    rerender({ callback: mockCallback2 });

    const debouncedRef2 = result.current;

    // The debounced function reference should remain the same
    expect(debouncedRef1).toBe(debouncedRef2);
  });

  it('should create new debounced function when delay changes', () => {
    const mockCallback = vi.fn();

    const { result, rerender } = renderHook(
      ({ delay }) => useDebounce(mockCallback, delay),
      { initialProps: { delay: 100 } }
    );

    const debouncedRef1 = result.current;

    // Change the delay
    rerender({ delay: 200 });

    const debouncedRef2 = result.current;

    // Should create a new debounced function when delay changes
    expect(debouncedRef1).not.toBe(debouncedRef2);
  });

  it('should respect new delay when delay changes', () => {
    const mockCallback = vi.fn();

    const { result, rerender } = renderHook(
      ({ delay }) => useDebounce(mockCallback, delay),
      { initialProps: { delay: 100 } }
    );

    // Call with original delay
    act(() => {
      result.current();
    });

    // Change delay before original fires
    rerender({ delay: 300 });

    // Wait original delay time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should still be using old debounced function, so it fires
    expect(mockCallback).toHaveBeenCalledTimes(1);

    // Reset mock
    mockCallback.mockClear();

    // Call with new delay
    act(() => {
      result.current();
    });

    // Wait old delay time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should not fire yet (using new 300ms delay)
    expect(mockCallback).not.toHaveBeenCalled();

    // Wait remaining time
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Now it should fire
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid successive calls correctly', () => {
    const mockCallback = vi.fn();
    const { result } = renderHook(() => useDebounce(mockCallback, 100));

    // Make 10 rapid calls
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current(i);
      }
    });

    // Should not be called yet
    expect(mockCallback).not.toHaveBeenCalled();

    // Wait for debounce
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should be called once with the last argument
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(9);
  });

  it('should work correctly when component unmounts during debounce', () => {
    const mockCallback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebounce(mockCallback, 100)
    );

    act(() => {
      result.current();
    });

    // Unmount before debounce fires
    unmount();

    // Wait for what would have been the debounce time
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Callback should still fire since debounce doesn't automatically clean up
    // This is expected behavior - if you need cleanup, you'd need to implement it
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('should not interfere with other instances', () => {
    const mockCallback1 = vi.fn();
    const mockCallback2 = vi.fn();

    const { result: result1 } = renderHook(() =>
      useDebounce(mockCallback1, 100)
    );
    const { result: result2 } = renderHook(() =>
      useDebounce(mockCallback2, 200)
    );

    // Call both debounced functions
    act(() => {
      result1.current('call1');
      result2.current('call2');
    });

    // Wait for first to fire but not second
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockCallback1).toHaveBeenCalledTimes(1);
    expect(mockCallback1).toHaveBeenCalledWith('call1');
    expect(mockCallback2).not.toHaveBeenCalled();

    // Wait for second to fire
    act(() => {
      vi.advanceTimersByTime(100); // Total 200ms
    });

    expect(mockCallback2).toHaveBeenCalledTimes(1);
    expect(mockCallback2).toHaveBeenCalledWith('call2');
  });
});

// Type checking tests (these will fail at compile time if types are wrong)
describe('useDebounce types', () => {
  it('should handle typed function parameters correctly', () => {
    const typedCallback = vi.fn((str: string, num: number): boolean => {
      return str.length > num;
    });

    const { result } = renderHook(() => useDebounce(typedCallback, 100));

    // These should be type-safe
    act(() => {
      result.current('hello', 3);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(typedCallback).toHaveBeenCalledWith('hello', 3);
  });

  it('should handle void functions', () => {
    const voidCallback = vi.fn(() => {
      // void function
    });

    const { result } = renderHook(() => useDebounce(voidCallback, 100));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(voidCallback).toHaveBeenCalledTimes(1);
  });

  it('should handle functions with no parameters', () => {
    const noParamCallback = vi.fn();

    const { result } = renderHook(() => useDebounce(noParamCallback, 100));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(noParamCallback).toHaveBeenCalledTimes(1);
  });
});
