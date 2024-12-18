function binarySearch(arr, target) {
  let left = 0;               // Start of the search range
  let right = arr.length - 1; // End of the search range

  while (left <= right) {     // Keep searching until the range is valid
    const middle = Math.floor((left + right) / 2); // Find the middle index
    const middleValue = arr[middle];              // Value at the middle index

    if (middleValue === target) {
      return middle;          // Target found, return its index
    } else if (middleValue < target) {
      left = middle + 1;      // Search the right half
    } else {
      right = middle - 1;     // Search the left half
    }
  }

  return -1;                  // Target not found
}
