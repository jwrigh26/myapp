# What a walkthrough is
1. The goal: what are we solving?
2. The invariants and reasoning: Why does this step make sense?
3. The outcome: what pattern or lesson can we reuse next time?

## The Walkthrough Structure

1. Problem setup ( the goal )
  - State the task in one line like a thesis statement:
    - We want to find teh target value `5` in a sorted array using the transtion point recipe.
  - List the inputs and outputs clearly:
    - Input: `[1, 2, 3, 4, 5, 7]`
    - Target: `5`
    - Output: index `3`
  - Write the intuitive idea before touchign the code:
    - "We'll keep shrinking our search range until we cross from values `< 5` to values `>= 5`".

2. The ingredients recap ( Mental Setup )
  - Remind the reader of what the algorithm needs to start:
    - Prediacte: ( `is_before(x) = x < target` )
    - Left = `-1`
    - Right = `len(arr)`
    - Loop condition = `while left + 1 < right`
  - Optional: Use a tiny table to show inital values:
    - `left = -1, right = 5, mid = ?`
3. Step-by-Step Trace ( The Process )
  - This is where most people get messy, but you can keep it clean by making it tabular or state-based rather than long paragraphs. See example format below.
4. Explain the Invariant
  - This is your reflection section. What stayed true each iteration?
    > `left` always pointed to a value `< target`. `right` always pointed to a value `>= target`.
  - Why does that guaranteed correctness?
    > Because once the two pointers are adjacent, the transtiion happens exactly between them.
5. Code snippets where applicable

Example format:

| Iteration | left | right | mid | arr[mid] | is_before(arr[mid]) | Action | Invariant holds? |
|-----------|------|-------|-----|----------|---------------------|--------|------------------|
| 1 | -1 | 5 | 2 | 4 | True | left = mid | ✅ |
| 2 | 2 | 5 | 3 | 5 | False | right = mid | ✅ |
| 3 | stop (left+1 == right) | | | | | | |

The conclude:
"At the end, `left` = 2 (last True), `right` = 3 (first False).
The first index where `arr[right] >= target` -> index `3`."
