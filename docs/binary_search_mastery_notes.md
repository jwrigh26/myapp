# 🧠 Binary Search Mastery Notes

This document collects and polishes all the important binary search code examples and teaching moments discussed so far.  
They’re written to be clear, consistent, and educational — perfect for future reference or blog integration.

---

## 📘 Classic Binary Search (Find Target in Sorted Array)

```python
from typing import List

def binary_search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

✅ **Key idea:** Maintain a search range `[left, right]` and halve it each iteration.

---

## 🧩 The Transition Point Recipe (General Template)

```python
def binary_search_transition(arr, is_before):
    # Edge cases
    if not arr:
        return None

    left, right = -1, len(arr)  # sentinels: before/after regions
    while left + 1 < right:
        mid = (left + right) // 2
        if is_before(arr[mid]):
            left = mid
        else:
            right = mid

    # (left, right): left is last True, right is first False
    return left, right
```

✅ **Invariant:**

- `left` always points to a True region element (before the transition).
- `right` always points to a False region element (after the transition).

---

## 🔍 First Occurrence of Target

```python
def first_occurrence(nums, target):
    def is_before(x):
        return x < target

    left, right = -1, len(nums)
    while left + 1 < right:
        mid = (left + right) // 2
        if is_before(nums[mid]):
            left = mid
        else:
            right = mid

    if right < len(nums) and nums[right] == target:
        return right
    return -1
```

✅ **Key:** Predicate = `x < target` → all Trues before the first occurrence.

---

## 🔁 Last Occurrence of Target

```python
def last_occurrence(nums, target):
    def is_before(x):
        return x <= target

    left, right = -1, len(nums)
    while left + 1 < right:
        mid = (left + right) // 2
        if is_before(nums[mid]):
            left = mid
        else:
            right = mid

    if left >= 0 and nums[left] == target:
        return left
    return -1
```

✅ **Key:** Predicate = `x <= target` → all Trues through the last occurrence.

---

## 🪄 Find Minimum in Rotated Sorted Array (No Duplicates)

```python
from typing import List

def find_min_rotated(nums: List[int]) -> int:
    if not nums:
        raise ValueError("empty array")

    # If already sorted, the first element is minimum
    if nums[0] <= nums[-1]:
        return 0

    left, right = -1, len(nums)  # sentinels
    while left + 1 < right:
        mid = (left + right) // 2
        if nums[mid] >= nums[0]:  # still in the left block (True)
            left = mid
        else:                     # entered right block (False)
            right = mid

    return right  # first False → index of minimum
```

✅ **Predicate:** `nums[i] >= nums[0]`  
✅ **Transition:** True → False  
✅ **Answer:** `right` (first False)

---

## 🧮 Find Minimum in Rotated Sorted Array (With Duplicates)

```python
def find_min_rotated_with_dups(nums):
    if not nums:
        raise ValueError("empty array")
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        elif nums[mid] < nums[right]:
            right = mid
        else:
            right -= 1  # can't decide → shrink right
    return left
```

✅ **Key idea:** Compare mid vs right to keep a monotone boundary.  
Worst-case (many duplicates) → O(n).

---

## 🐇 Bunny Example — Teaching the Predicate

```python
from enum import IntEnum

# Define Bunny types
class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1

# Simple struct-like class
class Bunny:
    def __init__(self, bunny_type: BunnyType = BunnyType.NORMAL):
        self.name = "bunny"
        self.type = bunny_type

# Predicate
def is_before(x: BunnyType):
    return x < BunnyType.HONEY
```

✅ **Story concept:** “Are we before any honey bunnies?”  
The predicate splits our array into “before” (normal) and “after” (honey).

At the end of the binary search:

- `left` → last `NORMAL` bunny
- `right` → first `HONEY` bunny

---

## 💡 Concept Recap

| Concept                | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| **Predicate**          | Boolean test that splits the data into True/False regions       |
| **Invariant**          | A rule that stays true every loop iteration                     |
| **Sentinels**          | Start pointers outside valid indices to avoid off-by-one errors |
| **Transition Point**   | Boundary between True and False regions                         |
| **Monotone Predicate** | Predicate result changes once (all True → all False)            |

---

## 🧠 Common Binary Search Pitfalls

- Forgetting to update one side → infinite loop.
- Using `while left < right` incorrectly with sentinels.
- Mixing up `<` vs `<=` in predicates (changes meaning!).
- Not checking edge cases (empty, all True, all False).

---

## 🕰️ Time Complexity

All binary searches here (including transition-point style) run in **O(log n)** time  
and use **O(1)** extra space.

---

© 2025 — Binary Search Foundations (compiled with ChatGPT + Justin’s walkthroughs)
