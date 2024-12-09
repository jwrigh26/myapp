/*
1️⃣ Basic Binary Search
   Problem: Given a sorted array, find the index of a target value.
   Example:
     Input: nums = [1, 3, 5, 7, 9], target = 5
     Output: 2 (index of 5)
   Tip: Use classic binary search logic.

2️⃣ Search Insert Position
   Problem: Find the index where a target should be inserted in a sorted array.
   Example:
     Input: nums = [1, 3, 5, 6], target = 2
     Output: 1 (position where 2 would go)
   Tip: Modify binary search to return the position instead of -1.

3️⃣ Find First and Last Position of Element
   Problem: In a sorted array, find the starting and ending positions of a target element.
   Example:
     Input: nums = [5, 7, 7, 8, 8, 10], target = 8
     Output: [3, 4]
   Tip: Use binary search twice — once for the first occurrence and once for the last.

4️⃣ Peak Element
   Problem: Find a peak element in an array where a peak is an element greater than its neighbors.
   Example:
     Input: nums = [1, 2, 3, 1]
     Output: 2 (index of peak element 3)
   Tip: Use binary search to move toward the larger neighbor.

5️⃣ Square Root (or Integer Square Root)
   Problem: Find the integer square root of a number using binary search.
   Example:
     Input: x = 8
     Output: 2 (since 2² = 4 and 3² = 9, 2 is closest)
   Tip: Binary search the range [0, x].

6️⃣ Find Minimum in Rotated Sorted Array
   Problem: A sorted array is rotated at some pivot. Find the minimum element.
   Example:
     Input: nums = [4, 5, 6, 7, 0, 1, 2]
     Output: 0
   Tip: Compare middle with rightmost value to determine which half to search.

7️⃣ Search in Rotated Sorted Array
   Problem: Find the index of a target in a rotated sorted array.
   Example:
     Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
     Output: 4
   Tip: Use binary search to locate the pivot and adjust the search range accordingly.

8️⃣ Guess the Number (LeetCode 374)
   Problem: Guess a number between 1 and n. Check if your guess is too high, too low, or correct.
   Example:
     Input: n = 10, pick = 6
     Output: 6
   Tip: Binary search minimizes the number of guesses.

9️⃣ Kth Smallest Element in a Sorted Matrix
   Problem: Given a sorted matrix (rows and columns sorted), find the k-th smallest element.
   Example:
     Input: matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]], k = 8
     Output: 13
   Tip: Use binary search on values rather than indices.

🔟 Capacity to Ship Packages Within D Days
   Problem: Find the minimum capacity of a ship to deliver all packages within D days.
   Example:
     Input: weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], D = 5
     Output: 15
   Tip: Binary search the possible capacities to minimize the result.
*/
