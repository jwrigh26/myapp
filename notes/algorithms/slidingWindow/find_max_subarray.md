# Find Max Subarray

function findMaxSubarray(array, size) {
    if (size > array.length) {
        throw new Error('size is greater than array length!');
    }

    let maxSum = -Infinity; // Initialize to negative infinity for arrays with negative numbers
    let winSum = 0;

    for (let i = 0; i < array.length; i++) {
        winSum += array[i]; // Add current element to the window sum

        // Check if we've filled the first window
        if (i >= size - 1) {
            maxSum = Math.max(winSum, maxSum); // Update the maximum sum
            winSum -= array[i - size + 1]; // Slide the window: remove the leftmost element
        }
    }

    return maxSum;
}

# With additional loop

// Find Max Subarray Sum using Sliding Window
function findMaxSubarray(array, size) {
    if (array.length < size) {
        throw new Error("Window size cannot be greater than the array length");
    }

    let maxSum = 0;
    let winSum = 0;

    // Calculate the sum of the first window
    for (let i = 0; i < size; i++) {
        winSum += array[i];
    }

    maxSum = winSum;

    // Slide the window across the array
    for (let i = size; i < array.length; i++) {
        winSum += array[i] - array[i - size]; // Add new element and remove the element sliding out
        maxSum = Math.max(maxSum, winSum); // Update the maximum sum
    }

    return maxSum;
}

Let’s break the code down step by step with a simple example to help you understand exactly what happens in each iteration.

---

### Example Input:
```javascript
findMaxSubarray([2, 1, 5, 1, 3, 2], 3);
```

### Key Points:
- `array = [2, 1, 5, 1, 3, 2]`
- `size = 3` (window size)
- Initial values:
  - `maxSum = -Infinity`
  - `winSum = 0`

We’ll iterate through the array and follow what happens at each step.

---

### Step-by-Step Execution:

#### Iteration 1: `i = 0` (Processing element `2`)
1. **Add current element to `winSum`:**
   - `winSum = 0 + 2 = 2`

2. **Check if window size is met (`i >= size - 1`):**
   - `i = 0`, and `size - 1 = 2`.  
     Since `i < 2`, we don’t process the window yet.

3. **`maxSum` remains unchanged.**

---

#### Iteration 2: `i = 1` (Processing element `1`)
1. **Add current element to `winSum`:**
   - `winSum = 2 + 1 = 3`

2. **Check if window size is met (`i >= size - 1`):**
   - `i = 1`, and `size - 1 = 2`.  
     Since `i < 2`, we don’t process the window yet.

3. **`maxSum` remains unchanged.**

---

#### Iteration 3: `i = 2` (Processing element `5`)
1. **Add current element to `winSum`:**
   - `winSum = 3 + 5 = 8`

2. **Check if window size is met (`i >= size - 1`):**
   - `i = 2`, and `size - 1 = 2`.  
     Since `i >= 2`, we process the first full window.

3. **Update `maxSum`:**
   - `maxSum = Math.max(-Infinity, 8) = 8`

4. **Slide the window (subtract the leftmost element):**
   - Remove `array[i - size + 1] = array[2 - 3 + 1] = array[0] = 2`
   - `winSum = 8 - 2 = 6`

---

#### Iteration 4: `i = 3` (Processing element `1`)
1. **Add current element to `winSum`:**
   - `winSum = 6 + 1 = 7`

2. **Check if window size is met (`i >= size - 1`):**
   - `i = 3`, and `size - 1 = 2`.  
     Since `i >= 2`, we process this window.

3. **Update `maxSum`:**
   - `maxSum = Math.max(8, 7) = 8`

4. **Slide the window (subtract the leftmost element):**
   - Remove `array[i - size + 1] = array[3 - 3 + 1] = array[1] = 1`
   - `winSum = 7 - 1 = 6`

---

#### Iteration 5: `i = 4` (Processing element `3`)
1. **Add current element to `winSum`:**
   - `winSum = 6 + 3 = 9`

2. **Check if window size is met (`i >= size - 1`):**
   - `i = 4`, and `size - 1 = 2`.  
     Since `i >= 2`, we process this window.

3. **Update `maxSum`:**
   - `maxSum = Math.max(8, 9) = 9`

4. **Slide the window (subtract the leftmost element):**
   - Remove `array[i - size + 1] = array[4 - 3 + 1] = array[2] = 5`
   - `winSum = 9 - 5 = 4`

---

#### Iteration 6: `i = 5` (Processing element `2`)
1. **Add current element to `winSum`:**
   - `winSum = 4 + 2 = 6`

2. **Check if window size is met (`i >= size - 1`):**
   - `i = 5`, and `size - 1 = 2`.  
     Since `i >= 2`, we process this window.

3. **Update `maxSum`:**
   - `maxSum = Math.max(9, 6) = 9`

4. **Slide the window (subtract the leftmost element):**
   - Remove `array[i - size + 1] = array[5 - 3 + 1] = array[3] = 1`
   - `winSum = 6 - 1 = 5`

---

### Final Result
- The loop ends since we’ve processed all elements.
- The maximum sum of any subarray of size 3 is **9**.

---

### Visualization of Windows

| Window (3 elements) | Sum | `maxSum` |
|----------------------|-----|----------|
| `[2, 1, 5]`         | 8   | 8        |
| `[1, 5, 1]`         | 7   | 8        |
| `[5, 1, 3]`         | 9   | 9        |
| `[1, 3, 2]`         | 6   | 9        |

---

### Key Concepts:
1. **Sliding Window:**  
   The window starts from the first `size` elements and "slides" one step at a time across the array by adding the next element and removing the first.

2. **Efficient Calculation:**  
   By maintaining a running sum (`winSum`), the loop avoids recalculating the sum of the entire window repeatedly, making it \(O(n)\) instead of \(O(n \cdot k)\).

3. **Edge Handling:**  
   The condition `i >= size - 1` ensures that only complete windows are processed.

Let me know if you need further clarification!



--- 


# Not as commmon

function findMaxSubarray(array, size) {
    if (size > array.length) {
        throw new Error('size is greater than array length!');
    }

    let maxSum = -Infinity; // Initialize to negative infinity
    let winSum = 0;

    for (let i = 0; i < array.length; i++) {
        winSum += array[i]; // Add current element to the window sum

        if (i > size - 2) { // Equivalent to i >= size - 1
            maxSum = Math.max(maxSum, winSum); // Update maxSum
            winSum -= array[i - size + 1]; // Slide the window
        }
    }

    return maxSum;
}
