import { useMemo } from 'react';

// Generic type for any function
type AnyFunction = (...args: any[]) => any;

const throttle = <T extends AnyFunction>(
  callback: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let isThrottled = false;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    // If we're throttled, store the latest arguments
    if (isThrottled) {
      lastArgs = args;
      return;
    }

    // Execute the function immediately
    callback.apply(null, args);
    isThrottled = true;

    // Set up the release after wait period
    window.setTimeout(() => {
      isThrottled = false;

      // If we have stored arguments, execute with those
      if (lastArgs) {
        callback.apply(null, lastArgs);
        lastArgs = null;

        // Start a new throttle period after executing the latest call
        isThrottled = true;
        window.setTimeout(() => {
          isThrottled = false;
        }, wait);
      }
    }, wait);
  };
};

export function useThrottle<T extends AnyFunction>(
  callback: T,
  delay: number = 250
): (...args: Parameters<T>) => void {
  const handleThrottle = useMemo(
    () =>
      throttle((...args: Parameters<T>) => {
        callback(...args);
      }, delay),
    [callback, delay] // Add dependencies
  );

  return handleThrottle;
}
