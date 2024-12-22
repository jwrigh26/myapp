In JavaScript, **tail recursion** occurs when a recursive function makes its recursive call as the last operation before it returns. This allows certain JavaScript engines to optimize the recursive calls to avoid growing the call stack, which prevents stack overflow for deep recursions.

Here's an example of a **tail-recursive** function for calculating the factorial of a number:

```javascript
function factorial(n, accumulator = 1) {
  if (n === 0 || n === 1) {
    return accumulator; // Base case: return the accumulated result
  }
  return factorial(n - 1, accumulator * n); // Tail call
}

console.log(factorial(5)); // Output: 120
```

### Explanation:

1. The **`accumulator`** argument stores the ongoing product as the recursion progresses.
2. The recursive call `factorial(n - 1, accumulator * n)` is the last operation performed before returning.
3. Modern JavaScript engines (like those implementing ES6+ standards) are capable of optimizing tail-recursive calls, but not all engines do this in practice.

This structure ensures that each recursive call doesn't add a new stack frame if tail call optimization (TCO) is supported. If TCO is not supported, you can achieve similar behavior using an iterative approach.
