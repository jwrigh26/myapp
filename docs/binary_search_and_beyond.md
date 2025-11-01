# 🧭 Binary Search and Beyond

A structured guide for deciding **when** to use binary search, what problems share its DNA,  
and what to study next.

---

## 1️⃣ When Binary Search Works

Binary search (including the transition-point recipe) applies whenever you can define a **monotone predicate**:

> As you move along the search space, the answer switches **once** from True → False (or vice versa).

✅ **Requirements**
- The data or predicate output is *monotonic* — no back-and-forth flipping.
- You can efficiently test whether an element belongs to the “before” or “after” region.
- The space can be ordered or implicitly indexed (e.g., integer range, time, answer value).

💡 Examples
| Problem | Predicate | Transition Meaning |
|----------|------------|--------------------|
| First occurrence | `x < target` | First element ≥ target |
| Rotated array min | `nums[i] ≥ nums[0]` | First value < first element |
| Search insert position | `x < target` | Insertion index |
| Minimum days to ship packages | `can_ship_in(days)` | First True that satisfies constraint |

---

## 2️⃣ When Binary Search *Doesn’t* Work

Binary search breaks down when:
- The relation is **non-monotonic** (predicate flips multiple times).  
- You can’t define a total order (e.g., unordered graph traversal).  
- Evaluating midpoints has side effects or randomness (e.g., hash collisions).  
- The function has **plateaus or oscillations** that violate single transition behavior.

🚫 Examples
- Searching for a *local maximum* in noisy data without ordering.
- Detecting patterns in cyclic sequences (no linear order).
- Problems requiring enumeration, not decision.

---

## 3️⃣ Monotonic vs Non-Monotonic

| Property | Monotonic | Non-Monotonic |
|-----------|------------|---------------|
| **Behavior** | Only one direction of change (↑ or ↓, or True→False once) | May rise, fall, rise again |
| **Binary Search?** | ✅ Yes | ❌ No |
| **Examples** | Sorted arrays, cumulative sums, feasibility tests | Wave patterns, cyclical data |

🧩 *Think of binary search as a tool for any “threshold” problem*  
— find where a condition first changes.

---

## 4️⃣ Divide & Conquer Family

Binary search belongs to the broader **Divide and Conquer** paradigm:

| Step | Description |
|------|--------------|
| Divide | Split the problem into smaller subproblems (often halves). |
| Conquer | Solve each recursively (or pick the correct half). |
| Combine | Merge or interpret the results. |

🔗 Related algorithms:
- Merge Sort  
- Quick Sort  
- Binary Search Tree operations  
- FFT (Fast Fourier Transform)

All share one thing: **logarithmic depth** due to repeated halving.

---

## 5️⃣ Recursive Selection Problems

Another sibling of binary search is **selection** — finding the *k-th smallest element*.

### Example: Quickselect
```python
def quickselect(nums, k):
    pivot = random.choice(nums)
    lows  = [x for x in nums if x < pivot]
    highs = [x for x in nums if x > pivot]
    if k < len(lows):
        return quickselect(lows, k)
    elif k < len(nums) - len(highs):
        return pivot
    else:
        return quickselect(highs, k - (len(nums) - len(highs)))
```
- Same “divide and conquer” intuition, but **no monotone predicate**.
- Average complexity: **O(n)**.

When to use: You can’t order by index but can *partition* by a pivot condition.

---

## 6️⃣ Peak Finding (a Close Cousin)

**Peak finding** looks for an element greater than or equal to its neighbors.  
It’s *not* classic binary search, but still *logarithmic* by halving the search range.

### 1D Example
```python
def find_peak(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < nums[mid + 1]:
            left = mid + 1
        else:
            right = mid
    return left
```
- Works because **the slope direction is monotone** (one consistent rise/fall).  
- Related to **bitonic arrays** (increase → decrease).

---

## 7️⃣ Boundaries vs Values

Binary search has two modes:

| Mode | Goal | Output |
|------|------|---------|
| **Value Search** | Find element equal to target | Index or -1 |
| **Boundary Search** | Find where condition changes | Left/right transition indices |

You’ve already mastered the boundary flavor via the transition-point recipe — that’s the form used in rotated arrays, insert positions, and “minimum feasible X” problems.

---

## 8️⃣ Next Topics to Explore

| Area | Why It Matters |
|------|----------------|
| **Binary Search on Answers** | Learn to apply binary search to *numeric ranges* instead of arrays (e.g., “minimum time to finish X”). |
| **Bitonic Arrays** | Practice problems where arrays rise then fall — good mental exercise on monotonic reasoning. |
| **Binary Search Trees** | Apply the same divide logic in data structures. |
| **Ternary Search** | Similar reasoning on unimodal functions (one minimum). |
| **Parametric Search** | Generalized framework for decision problems. |
| **Dynamic Programming** | Builds on invariants, loop correctness, and divide-and-conquer structure. |

---

## 9️⃣ Big Picture Takeaways

- Binary search is a **pattern of reasoning**, not just an array trick.  
- Always ask: “Can I define a monotone predicate?”  
- Invariants and boundaries keep your logic bulletproof.  
- Most advanced algorithms are just smarter or multidimensional versions of this same reasoning pattern.

---

🧩 *Binary search is your first taste of algorithmic thinking —  
master its invariants, and the rest of DSA becomes far less mysterious.*

---

© 2025 Justin Wright — Binary Search and Beyond Reference
