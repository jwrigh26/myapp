// 1. Write a function to implement selection sort.
/** 
 * Basic implementation of selection sort.
 * Loop through an array, find the smallest element in the unsorted part,
 * and swap it into the correct position.
 * Example: [5, 3, 8, 4, 2] => [2, 3, 4, 5, 8]
 */

// 2. Modify selection sort to sort in descending order.
/** 
 * Modify the algorithm to find the largest element in the unsorted part 
 * and place it at the beginning of the sorted part.
 * Example: [5, 3, 8, 4, 2] => [8, 5, 4, 3, 2]
 */

// 3. Count the number of swaps performed in selection sort.
/**
 * Extend the selection sort implementation to track how many swaps occur.
 * This helps understand the efficiency of the algorithm for different inputs.
 * Example Input: [4, 3, 1, 2]
 * Example Output: 3 (number of swaps)
 */

// 4. Optimize selection sort to skip unnecessary swaps.
/** 
 * Modify the algorithm to avoid swapping elements when the smallest element 
 * is already in the correct position.
 * This reduces redundant operations.
 */

// 5. Analyze the time complexity of selection sort.
/** 
 * Explain why selection sort has a time complexity of O(n^2) in all cases.
 * Think about the nested loops: for each element, you look through the rest
 * of the array to find the smallest.
 */

// 6. Can selection sort be stable? If yes, implement a stable version.
/** 
 * Selection sort is not inherently stable because swapping can change the 
 * relative order of equal elements. 
 * Implement a stable version by inserting the smallest element 
 * instead of swapping.
 */

// 7. Compare selection sort with bubble sort. Which is better and why?
/** 
 * Both are O(n^2), but selection sort usually performs fewer swaps, 
 * making it slightly more efficient in practice.
 * Discuss cases where one might be preferred over the other.
 */

// 8. Implement selection sort for a linked list.
/** 
 * Instead of using an array, implement selection sort on a singly linked list.
 * This requires pointer manipulation instead of index-based swaps.
 */

// 9. How does selection sort perform on nearly sorted arrays?
/** 
 * Discuss how selection sort behaves when the array is already sorted 
 * or nearly sorted. Explain why it still requires O(n^2) comparisons.
 */

// 10. Implement selection sort with recursion.
/** 
 * Convert the iterative selection sort into a recursive algorithm.
 * Base case: when the array size is 1, it’s already sorted.
 * Recursive case: find the smallest element, place it at the start,
 * and recursively sort the rest.
 */

// 11. Explain the space complexity of selection sort.
/** 
 * Selection sort has a space complexity of O(1) because it sorts in-place
 * and uses no extra data structures.
 * Explain why this is advantageous for low-memory environments.
 */

// 12. Sort an array of objects by a specific property using selection sort.
/** 
 * Extend selection sort to work with objects.
 * Example: Sort an array of people by age.
 * Input: [{name: "Alice", age: 30}, {name: "Bob", age: 25}]
 * Output: [{name: "Bob", age: 25}, {name: "Alice", age: 30}]
 */

// 13. Can selection sort handle duplicate values? Demonstrate with an example.
/** 
 * Discuss how selection sort works with arrays containing duplicates 
 * and ensure duplicates remain in the sorted result.
 * Example: [4, 2, 2, 1, 3] => [1, 2, 2, 3, 4]
 */

// 14. Compare selection sort’s performance on small vs. large arrays.
/** 
 * Discuss why selection sort may be acceptable for small arrays 
 * but is inefficient for large datasets.
 */

// 15. Modify selection sort to sort only part of an array (e.g., first `k` elements).
/** 
 * Implement a variation of selection sort to sort only the first `k` 
 * smallest elements of an array.
 * Example: [5, 3, 8, 4, 2], k = 3 => [2, 3, 4, 8, 5]
 */

