# Two Sum
function twoSum(array, target) {

    // Error handling
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error("Input must be an array of at least two numbers");
    }

    const indexMap = {}; 

    for (let i = 0; i < array.length; i++) {
        const complement = target - array[i];

        if (complement in indexMap) {
            return [i, indexMap[complement]]; 
        }

        indexMap[array[i]] = i; // Store the index of the current number.
    }

    return []; // No solution found, return an empty array.
}

Great! Let’s walk through this improved version step by step, using the function name `indexMap` for the object that stores indices. This will help make it clear how the function operates.

---

### Example Input:
- **Array**: `[2, 7, 11, 15]`
- **Target**: `9`

---

### Step-by-Step Walkthrough:

---

#### **Initial Setup**
- The function starts with error handling:
  ```javascript
  if (!Array.isArray(array) || array.length < 2) {
      throw new Error("Input must be an array of at least two numbers");
  }
  ```
  - Here, the input is valid (`[2, 7, 11, 15]` is an array of numbers), so no error is thrown.

- Then, initialize `indexMap`:
  ```javascript
  const indexMap = {};
  ```

---

#### **First Iteration (`i = 0`)**
- **Current Element**: `array[0] = 2`
- **Complement**: `target - array[0] = 9 - 2 = 7`
- **Check if `7` is in `indexMap`**:
  - `7` is **not** in `indexMap` (the object is still empty at this point).
- **Store the Current Number and Its Index**:
  - Add `2` as a key in `indexMap`, with its index (`0`) as the value:
    ```javascript
    indexMap = { 2: 0 };
    ```

---

#### **Second Iteration (`i = 1`)**
- **Current Element**: `array[1] = 7`
- **Complement**: `target - array[1] = 9 - 7 = 2`
- **Check if `2` is in `indexMap`**:
  - `2` **is** in `indexMap` (we added it during the first iteration).
  - The value for the key `2` in `indexMap` is `0` (its index in the array).
- **Return the Indices**:
  - We have found the pair that sums to `9`: the current index (`1`) and the stored index of `2` (`0`).
  - Return:
    ```javascript
    return [1, 0];
    ```

---

#### **Function Ends Here**
The function terminates early because we found a valid pair. There's no need to continue iterating through the rest of the array (`11` and `15` are skipped).

---

### Final Output:
- The returned result is:
  ```javascript
  [1, 0]
  ```

This means that the numbers at indices `1` (`7`) and `0` (`2`) add up to `9`.

---

### Summary of `indexMap` at Each Step:
| Step | Current Index (`i`) | Current Number (`array[i]`) | Complement (`target - array[i]`) | `indexMap` State | Match Found? |
|------|----------------------|----------------------------|----------------------------------|------------------|--------------|
| 1    | 0                    | 2                          | 7                                | `{ 2: 0 }`       | No           |
| 2    | 1                    | 7                          | 2                                | `{ 2: 0 }`       | Yes          |

---

### Key Points:
1. **Efficiency**: The function finds the solution in just 2 iterations (O(n) time complexity).
2. **Early Return**: The function stops as soon as it finds a solution, avoiding unnecessary iterations.
3. **Error Handling**: Ensures robust inputs with the initial validation check.
4. **Visualization of `indexMap`**: Helps to see how it "remembers" previously visited elements and their indices.

This breakdown shows how each step logically builds up to the result. Let me know if you'd like a different example or further clarification!


### Could also use a map instead:

function twoSum(array, target) {
    const indexMap = new Map();

    for (let i = 0; i < array.length; i++) {
        const complement = target - array[i];

        if (indexMap.has(complement)) {
            return [i, indexMap.get(complement)];
        }

        indexMap.set(array[i], i);
    }

    return [];
}
