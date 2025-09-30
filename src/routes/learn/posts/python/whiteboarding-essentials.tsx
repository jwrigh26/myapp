import BackdropSection from '@/components/BackdropSection';
import CodeBlock from '@/components/CodeBlock';
import IntroBlock from '@/components/IntroBlock';
import NoteBlock from '@/components/NoteBlock';
import ProseBlock from '@/components/ProseBlock';
import QuoteBlock from '@/components/QuoteBlock';
import { SectionSpacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/learn/posts/python/whiteboarding-essentials'
)({
  component: PythonWhiteboardingGuide,
  head: () => ({
    getTitle: () => 'Whiteboarding Essentials',
    meta: [
      {
        name: 'description',
        content:
          'Complete guide to Python fundamentals for technical interviews and whiteboarding sessions',
      },
      {
        title: 'Whiteboarding Essentials',
      },
    ],
  }),
});

function PythonWhiteboardingGuide() {
  return (
    <>
      <TitleBlock
        title="Python Whiteboarding Essentials"
        subtitle="Your complete guide to acing technical interviews"
      />

      <IntroBlock>
        Master the Python fundamentals that matter most in technical interviews.
        This comprehensive guide covers everything from basic syntax to advanced
        data structures, with practical examples you'll actually use in coding
        challenges.
      </IntroBlock>

      <ProseBlock>
        Whether you're preparing for your first technical interview or
        refreshing your Python knowledge, this guide distills the essential
        concepts into practical, interview-focused examples. Let's dive into the
        Python patterns that will make you confident at the whiteboard.
      </ProseBlock>

      <SectionSpacer />

      {/* Variables Section */}
      <Box id="variables" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Variables & Dynamic Typing
        </Typography>

        <ProseBlock>
          Python's dynamic typing is both a blessing and a potential pitfall in
          interviews. Understanding how variables work is crucial for writing
          clean, bug-free code under pressure.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`# Variables are dynamically typed
# Meaning we don't need to declare the type of n.
# It happens at runtime.
n = 0
print('n =', n)  # n = 0

# Redeclare as a string because type is determined at runtime
n = 'abc'
print('n =', n)  # n = abc

# Multiple Assignments - great for swapping!
n, m = 0, 'abc'
a, b = b, a  # Classic Python swap

# Increment (note: no ++ operator!)
n = n + 1  # good
n += 1     # good
# n++      # bad - syntax error!

# None is null (absence of value)
result = None
if result is None:
    print("No result yet")`}
        />

        <NoteBlock>
          <strong>Interview Tip:</strong> Python doesn't have{' '}
          <span className="code">++</span> or <span className="code">--</span>{' '}
          operators. Use <span className="code">+=</span> and{' '}
          <span className="code">-=</span> instead. This is a common gotcha for
          developers coming from other languages!
        </NoteBlock>
      </Box>

      {/* If Statements Section */}
      <Box id="conditionals" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          If Statements & Logic
        </Typography>

        <ProseBlock>
          Python's clean syntax shines in conditional statements. No parentheses
          or curly braces needed - just clean, readable logic.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`# If statements don't need parentheses or curly braces
# Note: elif is NOT else if
n = 1
if n > 2:
    n -= 1
elif n == 2:
    n *= 2
else:
    n += 2

print('n =', n)  # n = 3

# Parentheses needed for multi-line conditions
# and = &&, or = ||
n, m = 1, 2
if ((n > 2 and
     n != m) or n == m):
    n += 1

# Truthy and Falsy values - interview gold!
if not []:          # Empty list is falsy
    print("Empty!")
    
if not "":          # Empty string is falsy
    print("No text!")
    
if not 0:           # Zero is falsy
    print("Zero!")

# Use 'is None' for explicit None checks
value = None
if value is None:   # Preferred
    print("Explicitly None")
    
if not value:       # Catches None AND empty values
    print("Falsy value")`}
        />

        <BackdropSection backdrop="primary">
          <Stack gap={2} sx={{ py: 2 }}>
            <ProseBlock backgroundColor="transparent" color="white">
              <strong>Critical Interview Distinction:</strong> Use{' '}
              <span className="code" style={{ color: 'white' }}>
                foo is None
              </span>{' '}
              when checking explicitly for None, and{' '}
              <span className="code" style={{ color: 'white' }}>
                if not foo
              </span>{' '}
              when checking for any falsy value (None, empty list, empty string,
              0, False).
            </ProseBlock>
            <ProseBlock backgroundColor="transparent" color="white">
              This distinction can save you from subtle bugs in algorithmic
              problems!
            </ProseBlock>
          </Stack>
        </BackdropSection>
      </Box>

      {/* Loops Section */}
      <Box id="loops" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Loops & Iteration Patterns
        </Typography>

        <ProseBlock>
          Mastering Python's loop patterns is essential for algorithmic
          problems. From basic iteration to advanced techniques, these patterns
          appear constantly in interviews.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`# While loops - classic for unknown iterations
n = 0
while n < 5:
    print(n)
    n += 1

# For loops with range() - interview staple
for i in range(5):          # 0 to 4
    print(i)

for i in range(2, 6):       # 2 to 5 (6 not included)
    print(i)

for i in range(5, 1, -1):   # 5 to 2 (descending)
    print(i)

# Iterating through arrays - multiple patterns
nums = [1, 2, 3, 4, 5]

# By index (when you need position)
for i in range(len(nums)):
    print(f"Index {i}: {nums[i]}")

# By value (when you don't need index)
for num in nums:
    print(num)

# Both index and value - enumerate is powerful!
for i, num in enumerate(nums):
    print(f"nums[{i}] = {num}")

# Multiple arrays simultaneously - zip magic!
nums1 = [1, 3, 5]
nums2 = [2, 4, 6]
for n1, n2 in zip(nums1, nums2):
    print(f"{n1} + {n2} = {n1 + n2}")`}
        />

        <NoteBlock>
          <strong>Pro Tip:</strong> <span className="code">enumerate()</span>{' '}
          and <span className="code">zip()</span> are incredibly useful in
          interviews. They often lead to cleaner solutions than manual index
          management!
        </NoteBlock>
      </Box>

      {/* Math Section */}
      <Box id="math" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Math Operations & Edge Cases
        </Typography>

        <ProseBlock>
          Python's math operations have some unique behaviors that can trip you
          up in interviews. Understanding these quirks is crucial for
          algorithmic problems.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`# Division behavior - Python 3 gotcha!
print(5 / 2)    # 2.5 (always returns float)
print(5 // 2)   # 2 (floor division)

# Negative numbers and floor division - INTERVIEW TRAP!
print(-3 // 2)  # -2 (rounds DOWN, not toward zero!)
# Most languages would give -1, but Python gives -2

# Workaround for rounding toward zero
print(int(-3 / 2))  # -1 (what you probably expected)

# Modulo with negative numbers - another gotcha!
print(10 % 3)   # 1 (normal)
print(-10 % 3)  # 2 (not -1 like other languages!)

# Consistent with other languages using math.fmod
import math
print(math.fmod(-10, 3))  # -1.0

# Essential math functions for interviews
print(math.floor(3.7))   # 3 (round down)
print(math.ceil(3.2))    # 4 (round up)
print(abs(-5))           # 5 (absolute value - built-in!)
print(math.sqrt(25))     # 5.0
print(pow(2, 3))         # 8 (built-in)
print(2 ** 3)            # 8 (power operator)

# Infinity - useful for algorithm initialization
pos_inf = float('inf')
neg_inf = float('-inf')
print(pos_inf > 1000000)  # True
print(2**200 < pos_inf)   # True - Python handles big numbers!`}
        />

        <QuoteBlock>
          <strong>Critical Interview Knowledge:</strong> Python's floor division
          with negative numbers behaves differently than most languages. It
          always rounds DOWN (toward negative infinity), not toward zero. This
          can break algorithms if you're not careful!
        </QuoteBlock>
      </Box>

      {/* Arrays Section */}
      <Box id="arrays" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Arrays (Lists) - The Interview Workhorse
        </Typography>

        <ProseBlock>
          Python lists are incredibly versatile and appear in almost every
          coding interview. From basic operations to advanced slicing, mastering
          lists is non-negotiable.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`# Basic list operations
arr = [1, 2, 3]
arr.append(4)        # Add to end - O(1)
arr.insert(1, 99)    # Insert at index - O(n)
last = arr.pop()     # Remove last - O(1)
arr.pop(0)          # Remove first - O(n)

# Negative indexing - interview gold!
arr = [1, 2, 3, 4, 5]
print(arr[-1])      # 5 (last element)
print(arr[-2])      # 4 (second to last)

# Slicing - powerful for subproblems
print(arr[1:4])     # [2, 3, 4] (index 1 to 3)
print(arr[:3])      # [1, 2, 3] (first 3)
print(arr[2:])      # [3, 4, 5] (from index 2)
print(arr[::-1])    # [5, 4, 3, 2, 1] (reverse!)

# Initialize arrays - common interview pattern
n = 5
zeros = [0] * n              # [0, 0, 0, 0, 0]
filled = [1] * n             # [1, 1, 1, 1, 1]

# 2D arrays - CAREFUL with the trap!
# Wrong way (shares references):
wrong = [[0] * 3] * 3
wrong[0][0] = 1  # Changes ALL rows!

# Correct way:
matrix = [[0] * 3 for _ in range(3)]
matrix[0][0] = 1  # Only changes first row

# Essential list methods for interviews
nums = [3, 1, 4, 1, 5]
nums.sort()                  # [1, 1, 3, 4, 5] - in-place
sorted_nums = sorted(nums)   # Returns new list
nums.reverse()               # Reverse in-place
nums.sort(reverse=True)      # Descending order

# Advanced sorting - interview power tool
words = ['python', 'java', 'c', 'javascript']
words.sort(key=len)          # Sort by length
words.sort(key=lambda x: x[0])  # Sort by first character

# List comprehensions - concise and Pythonic
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i+j for j in range(3)] for i in range(3)]`}
        />

        <NoteBlock>
          <strong>2D Array Gotcha:</strong> Never use{' '}
          <span className="code">[[0] * cols] * rows</span> - this creates
          shared references! Always use list comprehension:{' '}
          <span className="code">[[0] * cols for _ in range(rows)]</span>
        </NoteBlock>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Strings Section */}
      <Box id="strings" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Strings - Immutable but Powerful
        </Typography>

        <CodeBlock
          language="python"
          code={`# String basics - similar to arrays but immutable
s = 'hello'
print(len(s))      # 5
print(s[0])        # 'h'
print(s[1:4])      # 'ell'
print(s[::-1])     # 'olleh' (reverse)

# Strings are immutable - creates new string
s += ' world'      # Creates new string object

# String conversions - interview essentials
num_str = '123'
print(int(num_str) * 2)    # 246 (converted to int)
print(str(456) + '789')    # '456789' (concatenation)

# ASCII values - useful for character problems
print(ord('a'))    # 97
print(ord('A'))    # 65
print(chr(97))     # 'a'

# String joining - more efficient than concatenation
chars = ['h', 'e', 'l', 'l', 'o']
word = ''.join(chars)      # 'hello'
sentence = ' '.join(['hello', 'world'])  # 'hello world'

# String methods for interviews
text = "Hello World"
print(text.lower())        # 'hello world'
print(text.upper())        # 'HELLO WORLD'
print(text.split())        # ['Hello', 'World']
print('l' in text)         # True
print(text.count('l'))     # 3
print(text.replace('l', 'x'))  # 'Hexxo Worxd'`}
        />
      </Box>

      {/* Data Structures Section */}
      <Box id="data-structures" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Essential Data Structures
        </Typography>

        <Box id="queues">
          <Typography variant="h4" component="h4" sx={{ mb: 2, mt: 3 }}>
            Queues (Collections.deque)
          </Typography>

          <CodeBlock
            language="python"
            code={`from collections import deque

# Queues - O(1) operations on both ends!
queue = deque()
queue.append(1)        # Add to right
queue.append(2)
queue.appendleft(0)    # Add to left
print(queue)           # deque([0, 1, 2])

# BFS pattern - classic interview use
queue.popleft()        # Remove from left - O(1)
queue.pop()           # Remove from right - O(1)

# Use as stack or queue efficiently
stack = deque([1, 2, 3])
stack.append(4)        # Push
top = stack.pop()      # Pop (LIFO)

bfs_queue = deque([1])
bfs_queue.append(2)    # Enqueue
first = bfs_queue.popleft()  # Dequeue (FIFO)`}
          />
        </Box>

        <Box id="sets">
          <Typography variant="h4" component="h4" sx={{ mb: 2, mt: 3 }}>
            Sets - O(1) Lookups
          </Typography>

          <CodeBlock
            language="python"
            code={`# Sets - no duplicates, O(1) operations
my_set = set()
my_set.add(1)
my_set.add(2)
my_set.add(1)          # Duplicate ignored
print(len(my_set))     # 2

# Membership testing - O(1)
print(1 in my_set)     # True - O(1) lookup!
print(3 in my_set)     # False

# Set operations for interviews
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1 & set2)     # {3} (intersection)
print(set1 | set2)     # {1, 2, 3, 4, 5} (union)
print(set1 - set2)     # {1, 2} (difference)

# Set comprehension
evens = {x for x in range(10) if x % 2 == 0}
print(evens)           # {0, 2, 4, 6, 8}

# Convert list to set for O(1) lookups
nums = [1, 2, 3, 4, 5]
num_set = set(nums)    # Now O(1) to check if value exists`}
          />
        </Box>

        <Box id="dictionaries">
          <Typography variant="h4" component="h4" sx={{ mb: 2, mt: 3 }}>
            Dictionaries (Hash Maps)
          </Typography>

          <CodeBlock
            language="python"
            code={`# Dictionaries - the interview MVP!
my_dict = {}
my_dict['key'] = 'value'    # Insert/Update - O(1)
print(my_dict['key'])       # Access - O(1)
print('key' in my_dict)     # Membership - O(1)

# Initialization patterns
counts = {}                 # Empty
mapping = {'a': 1, 'b': 2}  # With values
default_dict = {i: 0 for i in range(5)}  # Comprehension

# Safe access patterns
value = my_dict.get('missing', 0)  # Returns 0 if missing
my_dict.setdefault('new', []).append(1)  # Create if missing

# Counter pattern - super common in interviews
text = "hello"
char_count = {}
for char in text:
    char_count[char] = char_count.get(char, 0) + 1
print(char_count)  # {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Iteration patterns
for key in my_dict:                    # Keys only
    print(key)
    
for value in my_dict.values():         # Values only
    print(value)
    
for key, value in my_dict.items():     # Both
    print(f"{key}: {value}")`}
          />
        </Box>

        <Box id="tuples">
          <Typography variant="h4" component="h4" sx={{ mb: 2, mt: 3 }}>
            Tuples - Immutable Sequences
          </Typography>

          <CodeBlock
            language="python"
            code={`# Tuples - immutable, hashable
coords = (1, 2)
point = (x, y) = (3, 4)  # Unpacking
print(coords[0])         # 1
# coords[0] = 5          # Error! Immutable

# Use as dictionary keys (lists can't!)
graph = {}
graph[(0, 0)] = [(0, 1), (1, 0)]  # Adjacency list
graph[(1, 1)] = [(1, 0), (0, 1)]

# Multiple return values
def get_min_max(arr):
    return min(arr), max(arr)

minimum, maximum = get_min_max([1, 5, 3])  # Tuple unpacking

# Sets of tuples for coordinate problems
visited = set()
visited.add((0, 0))
visited.add((1, 2))
print((0, 0) in visited)  # True - O(1) lookup`}
          />
        </Box>
      </Box>

      {/* Heaps Section */}
      <Box id="heaps" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Heaps - Priority Queue Magic
        </Typography>

        <CodeBlock
          language="python"
          code={`import heapq

# Min heap by default (smallest element at index 0)
min_heap = []
heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 2)
heapq.heappush(min_heap, 8)
heapq.heappush(min_heap, 1)

print(min_heap[0])      # 1 (minimum always at index 0)
smallest = heapq.heappop(min_heap)  # Removes and returns 1

# Build heap from existing array - O(n)
nums = [5, 2, 8, 1, 9]
heapq.heapify(nums)     # Transforms in-place
print(nums)             # [1, 2, 8, 5, 9] (heap property)

# Max heap workaround (negate values)
max_heap = []
for num in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -num)  # Push negative

# Get maximum (negate when popping)
maximum = -heapq.heappop(max_heap)  # Remove negative
print(maximum)          # 5

# Heap patterns for interviews
def kth_largest(nums, k):
    heap = nums[:k]     # Take first k elements
    heapq.heapify(heap) # Min heap of size k
    
    for num in nums[k:]:
        if num > heap[0]:  # Bigger than smallest in heap
            heapq.heapreplace(heap, num)
    
    return heap[0]      # kth largest

# Merge k sorted lists pattern
def merge_k_lists(lists):
    heap = []
    result = []
    
    # Initialize heap with first element from each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        
        # Add next element from same list
        if elem_idx + 1 < len(lists[list_idx]):
            next_elem = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_elem, list_idx, elem_idx + 1))
    
    return result`}
        />

        <NoteBlock>
          <strong>Heap Interview Patterns:</strong> Use min heap for "k largest"
          problems and max heap for "k smallest" problems. Remember Python only
          has min heaps - negate values for max heap behavior!
        </NoteBlock>
      </Box>

      {/* Functions Section */}
      <Box id="functions" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Functions & Scope
        </Typography>

        <CodeBlock
          language="python"
          code={`# Basic functions
def multiply(n, m):
    return n * m

# Nested functions - great for helper functions
def has_cycle_dfs(graph, start):
    visited = set()
    
    def dfs(node, path):
        if node in path:
            return True  # Cycle detected
        if node in visited:
            return False
            
        visited.add(node)
        path.add(node)
        
        for neighbor in graph.get(node, []):
            if dfs(neighbor, path):
                return True
                
        path.remove(node)  # Backtrack
        return False
    
    return dfs(start, set())

# Scope and nonlocal - interview gotcha!
def counter():
    count = 0
    
    def increment():
        nonlocal count  # Without this, creates local variable!
        count += 1
        return count
    
    return increment

# Mutable vs immutable parameters
def modify_list(arr, val):
    arr.append(val)     # Modifies original list
    val = val * 2       # Only modifies local copy
    
    def helper():
        arr.append(999) # Can modify mutable objects
        # val += 1      # Error! Need nonlocal for reassignment
        
        nonlocal val
        val += 1        # Now this works
    
    helper()
    return arr, val

nums = [1, 2, 3]
value = 5
result_nums, result_val = modify_list(nums, value)
print(nums)         # [1, 2, 3, 5, 999] - original modified!
print(value)        # 5 - original unchanged`}
        />
      </Box>

      {/* Classes Section */}
      <Box id="classes" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Classes for Data Structure Problems
        </Typography>

        <CodeBlock
          language="python"
          code={`# Basic class - useful for custom data structures
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    
    def __repr__(self):
        return f"TreeNode({self.val})"

# Linked list node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Graph node with adjacency list
class GraphNode:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors or []

# Custom data structure example
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        if self.stack:
            val = self.stack.pop()
            if val == self.min_stack[-1]:
                self.min_stack.pop()
            return val
    
    def get_min(self):
        return self.min_stack[-1] if self.min_stack else None

# Usage in interview problems
def build_tree_from_array(arr):
    if not arr:
        return None
    
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    
    while queue and i < len(arr):
        node = queue.popleft()
        
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    
    return root`}
        />
      </Box>

      {/* Lambda Section */}
      <Box id="lambdas" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Lambda Functions - Concise Power
        </Typography>

        <ProseBlock>
          Lambda functions are anonymous, one-line functions perfect for
          sorting, filtering, and binary search predicates. Master these
          patterns for clean, Pythonic solutions.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`# Basic lambda syntax
square = lambda x: x ** 2
add = lambda x, y: x + y

# Sorting with lambdas - interview gold!
students = [('Alice', 85), ('Bob', 90), ('Charlie', 78)]
students.sort(key=lambda x: x[1])  # Sort by grade
print(students)  # [('Charlie', 78), ('Alice', 85), ('Bob', 90)]

# Multi-criteria sorting
students.sort(key=lambda x: (x[1], x[0]))  # Grade first, then name

# Binary search predicate pattern
def binary_search_left(arr, target):
    left, right = 0, len(arr)
    
    # Lambda defines "condition for going left"
    is_target_or_right = lambda x: x >= target
    
    while left < right:
        mid = (left + right) // 2
        if is_target_or_right(arr[mid]):
            right = mid
        else:
            left = mid + 1
    
    return left

# Filter with lambdas
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
squares = list(map(lambda x: x ** 2, numbers))

# Closure capture - be careful in loops!
funcs = []
for i in range(3):
    # Wrong - all lambdas capture the same 'i'
    funcs.append(lambda x: x + i)  # All will use i=2!

# Right way - capture with default argument
funcs_correct = []
for i in range(3):
    funcs_correct.append(lambda x, i=i: x + i)  # Captures current i

# Type hints for lambdas (advanced)
from typing import Callable

Predicate = Callable[[int], bool]
is_even: Predicate = lambda x: x % 2 == 0

# Factory functions returning lambdas
def make_multiplier(n):
    return lambda x: x * n

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15`}
        />

        <NoteBlock>
          <strong>Lambda Gotcha:</strong> In loops, lambdas capture variables by
          reference, not value. Use default arguments to capture the current
          value: <span className="code">lambda x, i=i: x + i</span>
        </NoteBlock>
      </Box>

      {/* Conclusion Section */}
      <BackdropSection backdrop="primary">
        <Stack gap={3} sx={{ py: 4 }}>
          <Typography
            variant="h3"
            component="h3"
            sx={{ color: 'white', textAlign: 'center' }}
          >
            Ready for the Whiteboard!
          </Typography>

          <ProseBlock backgroundColor="transparent" color="white">
            These Python fundamentals form the foundation of virtually every
            technical interview problem. From basic variable manipulation to
            advanced data structures, you now have the tools to tackle
            algorithmic challenges with confidence.
          </ProseBlock>

          <ProseBlock backgroundColor="transparent" color="white">
            Remember: the key to interview success isn't just knowing the
            syntax, but understanding <em>when</em> and <em>why</em> to use each
            pattern. Practice combining these concepts in increasingly complex
            problems, and you'll develop the intuition that separates good
            candidates from great ones.
          </ProseBlock>

          <ProseBlock backgroundColor="transparent" color="white">
            <strong>Next Steps:</strong> Take these patterns and apply them to
            real interview problems. Start with easy problems on LeetCode or
            similar platforms, focusing on writing clean, Pythonic solutions
            using the techniques covered here.
          </ProseBlock>
        </Stack>
      </BackdropSection>

      <SectionSpacer />

      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="h5" component="p" sx={{ fontStyle: 'italic' }}>
          "Beautiful is better than ugly. Explicit is better than implicit.
          Simple is better than complex."
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
          — The Zen of Python
        </Typography>
      </Box>
    </>
  );
}
