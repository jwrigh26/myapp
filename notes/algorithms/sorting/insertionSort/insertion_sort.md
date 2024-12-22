# Iterative Insertion Sort

function insertionSortIterative(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements that are greater than `key` one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Insert the key into the correct position
    arr[j + 1] = key;
  }

  return arr;
}

// Example usage
console.log(insertionSortIterative([5, 3, 8, 4, 2])); // Output: [2, 3, 4, 5, 8]


# Recursive Insertion Sort

function insertionSortRecursive(arr, n = arr.length) {
  // Base case: An array of size 0 or 1 is already sorted
  if (n <= 1) {
    return;
  }

  // Sort the first n-1 elements recursively
  insertionSortRecursive(arr, n - 1);

  // Insert the nth element into the sorted portion
  let key = arr[n - 1];
  let j = n - 2;

  while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j];
    j--;
  }

  arr[j + 1] = key;
}

// Example usage
const arr = [5, 3, 8, 4, 2];
insertionSortRecursive(arr);
console.log(arr); // Output: [2, 3, 4, 5, 8]

# Key Differences

Iterative Approach: Uses a for loop and a while loop for comparisons. Easier to understand and implement.

Recursive Approach: Sorts smaller subarrays first and builds up to sorting the full array. Requires managing recursion depth but is an interesting functional approach.


# CORMENS INSERTION SORT

1. For i = 2 to n:
  A. Set key to A[i], and set j to i-1.
  B. While j > 0 and A[j] > key, do the following:
    i.  Set A[j+1] to A[j].
    ii. Decrement j (i.e., set j to j-1).
  C. Set A[j+1] to key.

# JS Version
function insertionSort(arr) {
  // Start from the second element (index 1) since the first element is trivially sorted
  for (let i = 1; i < arr.length; i++) {
    // Set key to the current element
    const key = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1] that are greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place the key in its correct position
    arr[j + 1] = key;
  }

  return arr; // Return the sorted array
}

// Example usage
const input = [5, 3, 8, 4, 2];
console.log(insertionSort(input)); // Output: [2, 3, 4, 5, 8]

# Key Points to Explain in an Interview
Outer Loop:

Starts from i = 1 because the subarray [0...0] (first element) is already sorted.
Key Variable:

Temporarily stores the value of the element being inserted into the sorted portion.
Inner While Loop:

Shifts elements greater than key one position to the right until the correct position for key is found.
Final Assignment:

Places key in its correct position after the while loop ends.

Bonus Interview Tip: Mention that insertion sort performs well on nearly sorted arrays and can be modified to be more efficient with binary search or other enhancements.