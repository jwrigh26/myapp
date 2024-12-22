# Baisc version of Merge Sort in JS
## Uses pointers instead of managing a subarray with indices.
function mergeSort(array) {
    // Base case: Arrays with 0 or 1 element are already sorted
    if (array.length <= 1) {
        return array;
    }

    // Divide the array into two halves
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    // Recursively sort both halves
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    // Merge the sorted halves
    return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    const result = [];
    let i = 0; // Pointer for the left array
    let j = 0; // Pointer for the right array

    // Compare elements from both arrays and pick the smallest
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Add any remaining elements from the left array
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    // Add any remaining elements from the right array
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}

// Example usage
const array = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(array);
console.log("Sorted Array:", sortedArray);


# ALOGRITHMS UNLOCKED
## Thomas H. Cormen

### Procedure MERGE-SORT(A, p, r)
Inputs:
- A: an array.
- p, r: starting and ending indices of a subarray of A.

Result:
The elments of subarray A[p..r] are sorted into nondecreasing order.

1. If p >= r, then subarray A[p..r] has at most one element, and so it is already sorted. Just return without doing anything.
2. Otherwise, do the following:
- A. Set q to (p+r)/2 floored.
- B. Recursively call MERGE-SORT(A, p, q).
- C. Recursively call MERGE-SORT(A, q+1, r).
- D. MERGE(A, p, q, r).

### Procedure MERGE(A, p, q, r)
Inputs: 
- A: an array.
- p, q, r: indices into A. Each of the subarrays A[p..q] and A[q+1..r] is assumed to be already sorted.

Result: The subarray A[p..r] contains the elements originally in A[p..r] and A[q+1..r], but now the entire subarray A[p..r] is sorted.

1. Set n1 to q-p +1, and set n2 to r-q. ( I think this sets the indice to where it needs to be in the oringal array but not sure ).
2. Let B[1..n1 + 1] and C[1..n2 + 1] be new arrays.
3. Copy A[p..q] into B[1..n1], and copy A[q+1..r] into C[1..n2].
4. Set both B[n1 + 1] and C[n2 + 1] to Infinity ( Why? )
5. Set both i and j to 1.
6. For k = p to r: ( I get this is a loop but not understanding )
    - A. If B[i] <= C[j] then set A[k] to B[i] and increment i.
    - B. Otherwise (B[i] > C[j]), set A]k] to C[j] and increment j.

### JS version of Cormen's MERGE-SORT
function mergeSortCormen(A, p, r) {
    // Base case: If the subarray has 1 or no elements, it's already sorted
    if (p >= r) {
        return;
    }

    // Calculate the midpoint
    const q = Math.floor((p + r) / 2);

    // Recursively sort the two halves
    mergeSortCormen(A, p, q);     // Left subarray A[p..q]
    mergeSortCormen(A, q + 1, r); // Right subarray A[q+1..r]

    // Merge the sorted halves
    merge(A, p, q, r);
}

function merge(A, p, q, r) {
    // Determine the sizes of the two subarrays
    const n1 = q - p + 1;
    const n2 = r - q;

    // Create temporary arrays B and C
    const B = new Array(n1 + 1);
    const C = new Array(n2 + 1);

    // Copy data from A[p..q] into B[0..n1-1]
    for (let i = 0; i < n1; i++) {
        B[i] = A[p + i];
    }

    // Copy data from A[q+1..r] into C[0..n2-1]
    for (let j = 0; j < n2; j++) {
        C[j] = A[q + 1 + j];
    }

    // Add sentinel values (Infinity) to the end of both arrays
    B[n1] = Infinity;
    C[n2] = Infinity;

    // Merge back into A[p..r]
    let i = 0; // Pointer for B
    let j = 0; // Pointer for C

    for (let k = p; k <= r; k++) {
        if (B[i] <= C[j]) {
            A[k] = B[i];
            i++;
        } else {
            A[k] = C[j];
            j++;
        }
    }
}
