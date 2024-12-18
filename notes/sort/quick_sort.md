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
