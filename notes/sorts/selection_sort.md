# Common ALl in one Apprach in JS

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    // Find the smallest element in the unsorted part
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the smallest with the first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

console.log(selectionSort([5, 3, 8, 4, 2])); // [2, 3, 4, 5, 8]


# Khans Version
// Finds the index of the smallest element in the array starting from `start`.
function findMinIndex(array, start) {
  let min = start;
  let minValue = array[start];

  for (let j = min + 1; j < array.length; j++) {
    if (array[j] < minValue) {
      minValue = array[j];
      min = j;
    }
  }
  return min;
}

// Swaps two elements in the array using their indices.
function swap(array, a, b) {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

// Sorts the array using selection sort.
function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    const min = findMinIndex(array, i); // Find the index of the minimum element
    swap(array, i, min); // Swap the minimum element with the current index
  }
}
