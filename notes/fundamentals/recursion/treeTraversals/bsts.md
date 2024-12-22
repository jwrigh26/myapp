### Understanding Binary Search Trees (BSTs)

A **Binary Search Tree (BST)** is a binary tree where each node follows these rules:

1. **Left Subtree:** All values are smaller than the node's value.
2. **Right Subtree:** All values are greater than the node's value.
3. **No Duplicates:** No two nodes have the same value (this may vary in implementation).

This structure ensures efficient **search, insertion, and deletion**, making it a favorite topic in interviews.

---

### Operations to Learn

1. **Insert a Node**
2. **Search for a Value**
3. **Delete a Node**
4. **Find Min/Max**
5. **Validate a BST**

---

### BST Implementation in JavaScript

Let’s start with the BST structure and build the operations step-by-step.

#### Step 1: Define the TreeNode Class

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

#### Step 2: Insert a Node

**Algorithm:**

- Recursively traverse the tree.
- Insert the node in the correct position based on BST rules.

```javascript
function insert(root, value) {
  if (root === null) return new TreeNode(value); // Base case: Insert new node

  if (value < root.value) {
    root.left = insert(root.left, value); // Insert into left subtree
  } else if (value > root.value) {
    root.right = insert(root.right, value); // Insert into right subtree
  }

  return root; // Return the unchanged root
}

// Example: Build the BST
let bstRoot = null;
[8, 3, 10, 1, 6, 4, 7, 14, 13].forEach((value) => {
  bstRoot = insert(bstRoot, value);
});
```

Tree now looks like this:

```
        8
      /   \
     3    10
    / \      \
   1   6     14
      / \    /
     4   7  13
```

---

#### Step 3: Search for a Value

**Algorithm:**

- Traverse the tree recursively.
- Return `true` if the value matches, or continue searching in the left/right subtree.

```javascript
function search(root, value) {
  if (root === null) return false; // Base case: Not found
  if (root.value === value) return true; // Found the value

  return value < root.value
    ? search(root.left, value) // Search left subtree
    : search(root.right, value); // Search right subtree
}

console.log(search(bstRoot, 6)); // Output: true
console.log(search(bstRoot, 15)); // Output: false
```

---

#### Step 4: Delete a Node

**Algorithm:**

1. Search for the node.
2. Handle three cases:
   - **No children:** Delete the node.
   - **One child:** Replace the node with its child.
   - **Two children:** Find the minimum value in the right subtree, replace the node with that value, and delete the duplicate.

```javascript
function deleteNode(root, value) {
  if (root === null) return null; // Base case: Value not found

  if (value < root.value) {
    root.left = deleteNode(root.left, value); // Delete from left subtree
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value); // Delete from right subtree
  } else {
    // Node to be deleted found
    if (!root.left) return root.right; // Case 1 & 2: No left child
    if (!root.right) return root.left; // Case 1 & 2: No right child

    // Case 3: Two children
    let minValue = findMin(root.right); // Find min in right subtree
    root.value = minValue; // Replace value
    root.right = deleteNode(root.right, minValue); // Delete duplicate
  }

  return root; // Return the updated root
}

function findMin(node) {
  while (node.left) node = node.left;
  return node.value;
}

bstRoot = deleteNode(bstRoot, 3);
console.log(inOrderTraversal(bstRoot)); // Output: [1, 4, 6, 7, 8, 10, 13, 14]
```

---

#### Step 5: Validate a BST

**Algorithm:**

- Ensure that every node satisfies the BST property: `left < root < right`.
- Use recursion with a range `[min, max]`.

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true; // Base case: Empty tree is valid

  if (root.value <= min || root.value >= max) return false; // Violates BST property

  return (
    isValidBST(root.left, min, root.value) && // Left subtree must be < root
    isValidBST(root.right, root.value, max) // Right subtree must be > root
  );
}

console.log(isValidBST(bstRoot)); // Output: true
```

### Suggested Next Steps:

1. Practice **constructing BSTs** from arrays (sorted and unsorted).
2. Solve common BST problems:
   - Find Kth smallest/largest element.
   - Find the distance between two nodes in a BST.
   - Convert a BST to a doubly linked list.
3. Explore balanced trees like AVL or Red-Black trees (conceptually).
