Behaviors of **stack** and **queue** with examples, focusing on their core principles and how JavaScript arrays can mimic them.

---

### **Stack: Last In, First Out (LIFO)**

- Think of a stack as a stack of plates: the last plate you put on top is the first one you take off.
- **Key operations**:
  - **`push()`**: Add an element to the top of the stack.
  - **`pop()`**: Remove and return the top element from the stack.

#### Example in JavaScript:

```javascript
const stack = [];

// Push elements onto the stack
stack.push(1); // Stack: [1]
stack.push(2); // Stack: [1, 2]
stack.push(3); // Stack: [1, 2, 3]

// Pop elements off the stack
console.log(stack.pop()); // Output: 3, Stack: [1, 2]
console.log(stack.pop()); // Output: 2, Stack: [1]
console.log(stack.pop()); // Output: 1, Stack: []
```

**LIFO Behavior**: The **last** element added (`3`) is the **first** one removed.

---

### **Queue: First In, First Out (FIFO)**

- Think of a queue as a line at a coffee shop: the first person to join the line is the first to get served.
- **Key operations**:
  - **`push()`**: Add an element to the end of the queue.
  - **`shift()`**: Remove and return the element at the front of the queue.

#### Example in JavaScript:

```javascript
const queue = [];

// Enqueue elements (add to the back)
queue.push(1); // Queue: [1]
queue.push(2); // Queue: [1, 2]
queue.push(3); // Queue: [1, 2, 3]

// Dequeue elements (remove from the front)
console.log(queue.shift()); // Output: 1, Queue: [2, 3]
console.log(queue.shift()); // Output: 2, Queue: [3]
console.log(queue.shift()); // Output: 3, Queue: []
```

**FIFO Behavior**: The **first** element added (`1`) is the **first** one removed.

---

### **Key Array Methods and Their Use**

| Method        | Behavior                      | Use for Stack/Queue      |
| ------------- | ----------------------------- | ------------------------ |
| **`push`**    | Adds to the end of the array  | Both Stack and Queue     |
| **`pop`**     | Removes from the end of array | Stack (LIFO)             |
| **`shift`**   | Removes from the start        | Queue (FIFO)             |
| **`unshift`** | Adds to the start             | Rare for these use cases |

---

### Quick Comparison Table: Stack vs. Queue

| **Concept**            | **Stack (LIFO)**   | **Queue (FIFO)**      |
| ---------------------- | ------------------ | --------------------- |
| **Order**              | Last In, First Out | First In, First Out   |
| **Add operation**      | `push`             | `push`                |
| **Remove operation**   | `pop`              | `shift`               |
| **Real-world analogy** | Stack of plates    | Line at a coffee shop |

---

### Why You Might Be Confused:

- Both stacks and queues use arrays in JavaScript, and `push` is common to both.
- The **difference lies in how you remove items**:
  - Stack uses `pop` (end of array).
  - Queue uses `shift` (start of array).

Understanding the mental models (stack of plates vs. a line of people) can help make it clearer! 😊
