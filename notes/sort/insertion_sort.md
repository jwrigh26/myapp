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