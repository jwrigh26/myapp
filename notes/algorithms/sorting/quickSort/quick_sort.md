Here’s a clean, interview-ready JavaScript implementation of Cormen’s Quick Sort that closely follows the pseudocode, using `p >= r` for the base case and ensuring it is concise, clear, and easily explainable.

```javascript
function quickSort(A, p = 0, r = A.length - 1) {
  // Base case: if the subarray has one or no elements, it is already sorted
  if (p >= r) {
    return;
  }

  // Partition the array and get the pivot index
  const q = partition(A, p, r);

  // Recursively sort the left and right subarrays
  quickSort(A, p, q - 1);
  quickSort(A, q + 1, r);
}

function partition(A, p, r) {
  const pivot = A[r]; // Use the last element as the pivot
  let i = p - 1; // Tracks the end of the "less than or equal to pivot" group

  for (let j = p; j < r; j++) {
    // If the current element is less than or equal to the pivot
    if (A[j] <= pivot) {
      i++; // Expand the "less than or equal to pivot" group
      swap(A, i, j); // Move the current element into that group
    }
  }

  // Place the pivot in its correct position
  swap(A, i + 1, r);

  return i + 1; // Return the pivot index
}

function swap(A, i, j) {
  const temp = A[i];
  A[i] = A[j];
  A[j] = temp;
}

// Example usage for testing:
const array = [5, 3, 8, 4, 2, 7, 1, 10];
quickSort(array);
console.log(array); // Output: [1, 2, 3, 4, 5, 7, 8, 10]
```

---

### Key Points for an Interview:

#### 1. **Base Case (`p >= r`)**:
- The recursion stops when the subarray is either empty or contains only one element, which is already sorted.
- This is clear and aligns with the pseudocode in Cormen’s book.

#### 2. **Partition Function**:
- The `partition` function rearranges the elements around the pivot:
  - Elements less than or equal to the pivot are moved to the left.
  - Elements greater than the pivot remain on the right.
  - The pivot is then placed in its correct sorted position.

#### 3. **Use of Indices**:
- `i` starts at `p - 1` (just before the beginning of the subarray) to ensure proper placement of elements smaller than or equal to the pivot.
- `j` iterates from `p` to `r - 1` to check each element.

#### 4. **In-Place Sorting**:
- This implementation modifies the array in place, achieving `O(1)` extra space usage (aside from recursion).

#### 5. **Time Complexity**:
- Best and average case: `O(n log n)` when the pivot divides the array roughly equally.
- Worst case: `O(n^2)` when the pivot is poorly chosen (e.g., smallest or largest element in a sorted array).

#### 6. **Space Complexity**:
- Recursive calls use `O(log n)` space on average (due to the call stack).

---

### Why This Implementation is Ideal for Interviews:
- **Clarity**: Each part (base case, partition, and recursion) is clearly defined and follows Cormen’s pseudocode.
- **Simplicity**: Uses a minimal number of variables and avoids unnecessary abstractions.
- **Familiarity**: The structure is recognizable to interviewers and easy to explain.
- **Versatility**: You can quickly adapt it with enhancements like randomized pivot selection if the interviewer asks.

This version should make you confident and prepared for a Quick Sort question in any coding interview! Let me know if you want additional optimizations or explanation strategies.



# Bad Way of doing quick sort
function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[array.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage:
const unsortedArray = [5, 3, 8, 4, 2];
const sortedArray = quickSort(unsortedArray);
console.log(sortedArray); // Output: [2, 3, 4, 5, 8]
