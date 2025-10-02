import BackdropSection from '@/components/BackdropSection';
import CodeBlock from '@/components/CodeBlock';
import IntroBlock from '@/components/IntroBlock';
import NoteBlock from '@/components/NoteBlock';
import ProseBlock from '@/components/ProseBlock';
import ReferenceLink from '@/components/ReferenceLink';
import QuoteBlock from '@/components/QuoteBlock';
import { Spacer, SectionSpacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

const spaceSize = 8;

export const Route = createFileRoute(
  '/learn/python/whiteboarding-essentials'
)({
  component: PythonWhiteboardingGuide,
  head: () => ({
    getTitle: () => 'Whiteboarding Essentials',
    includeInDrawer: true, // Include this route in the drawer navigation
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
        title="Whiteboarding Essentials"
        subtitle="Python fundamentals for whiteboarding"
      />

      <IntroBlock>
        A Quick reference guide of basic syntax and data structures you will use
        in coding challenges.
      </IntroBlock>

      <ProseBlock>
        This isn't a comprehensive nor an authoritive guide. Nope, This is just
        a bunch of snippets to provide examples of how to code with{' '}
        <strong>Python</strong>.
      </ProseBlock>
      <ReferenceLink
        text="Inspired by Neet codes: Python for Coding."
        url="https://neetcode.io/courses/lessons/python-for-coding-interviews"
        linkText="Python for Coding"
      />

      <SectionSpacer size={spaceSize} />

      {/* Variables Section */}
      <ProseBlock
        title="Variables"
        subtitle="Dynamically typed"
        spacingBottom={false}
        anchor
        id="variables"
      >
        Meaning, we don't need to declare the type of{' '}
        <span className="code">n</span>
        It happens at runtime.
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`
n = 0
print('n =', n)  # n = 0`}
      />

      <ProseBlock subtitle="Redeclare" spacingBottom={false} spacingTop={true}>
        Because it's dynamic we can redeclare <span className="code">n</span> as
        a <span className="code">string</span>.
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`
n = 'abc'
print('n =', n)  # n = abc`}
      />

      <ProseBlock
        subtitle="Multiple Assigments"
        spacingBottom={false}
        spacingTop={true}
      >
        A clever way to swap values.
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`
n, m = 0, 'abc'
a, b = b, a  # Classic Python swap`}
      />

      <ProseBlock subtitle="Increment" spacingBottom={false} spacingTop={true}>
        Increase the value of a variable.
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`
n = n + 1  # good
n += 1     # good
# n++      # bad - syntax error!`}
      />
      <ProseBlock
        subtitle="None is null"
        spacingBottom={false}
        spacingTop={true}
      >
        None is the absence of value
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`
result = None
if result is None:
    print("No result yet")`}
      />

      <Spacer size={2} />
      <NoteBlock>
        <strong>Python</strong> doesn't have <span className="code">++</span> or{' '}
        <span className="code">--</span> operators. Use{' '}
        <span className="code">+=</span> and <span className="code">-=</span>{' '}
        instead. This is a common gotcha for developers coming from other
        languages!
      </NoteBlock>

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="If Statements & Logic"
        subtitle="Clean syntax without parentheses"
        spacingBottom={false}
        anchor
        id="conditionals"
      >
        Python's clean syntax shines in conditional statements. No parentheses
        or curly braces needed - just clean, readable logic.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`n = 1
if n > 2:
    n -= 1
elif n == 2:  # Note: elif is NOT else if
    n *= 2
else:
    n += 2

print('n =', n)  # n = 3`}
      />

      <ProseBlock
        subtitle="Multi-line conditions"
        spacingBottom={false}
        spacingTop={true}
      >
        Use <span className="code">and</span> and{' '}
        <span className="code">or</span> instead of{' '}
        <span className="code">&&</span> and <span className="code">||</span>.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`n, m = 1, 2
if ((n > 2 and
     n != m) or n == m):
    n += 1`}
      />

      <ProseBlock
        subtitle="Truthy and Falsy values"
        spacingBottom={false}
        spacingTop={true}
      >
        Understanding Python's truthiness is crucial for interviews.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`if not []:          # Empty list is falsy
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

      <Spacer size={2} />
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

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Loops & Iteration Patterns"
        subtitle="Essential patterns for algorithmic problems"
        spacingBottom={false}
        anchor
        id="loops"
      >
        Mastering Python's loop patterns is essential for algorithmic problems.
        From basic iteration to advanced techniques, these patterns appear
        constantly in interviews.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`n = 0
while n < 5:
    print(n)
    n += 1`}
      />

      <ProseBlock
        subtitle="Range iterations"
        spacingBottom={false}
        spacingTop={true}
      >
        The <span className="code">range()</span> function is an interview
        staple.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`for i in range(5):          # 0 to 4
    print(i)

for i in range(2, 6):       # 2 to 5 (6 not included)
    print(i)

for i in range(5, 1, -1):   # 5 to 2 (descending)
    print(i)`}
      />

      <ProseBlock
        subtitle="Array iteration patterns"
        spacingBottom={false}
        spacingTop={true}
      >
        Multiple ways to iterate through arrays, each with specific use cases.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`nums = [1, 2, 3, 4, 5]

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

      <Spacer size={2} />
      <NoteBlock>
        <strong>Pro Tip:</strong> <span className="code">enumerate()</span> and{' '}
        <span className="code">zip()</span> are incredibly useful in interviews.
        They often lead to cleaner solutions than manual index management!
      </NoteBlock>

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Math Operations & Edge Cases"
        subtitle="Python's unique mathematical behaviors"
        spacingBottom={false}
        anchor
        id="math"
      >
        Python's math operations have some unique behaviors that can trip you up
        in interviews. Understanding these quirks is crucial for algorithmic
        problems.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`print(5 / 2)    # 2.5 (always returns float)
print(5 // 2)   # 2 (floor division)`}
      />

      <ProseBlock
        subtitle="Negative division trap"
        spacingBottom={false}
        spacingTop={true}
      >
        This is a common interview gotcha that can break algorithms.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`print(-3 // 2)  # -2 (rounds DOWN, not toward zero!)
# Most languages would give -1, but Python gives -2

# Workaround for rounding toward zero
print(int(-3 / 2))  # -1 (what you probably expected)`}
      />

      <ProseBlock
        subtitle="Modulo with negatives"
        spacingBottom={false}
        spacingTop={true}
      >
        Another behavior that differs from other languages.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`print(10 % 3)   # 1 (normal)
print(-10 % 3)  # 2 (not -1 like other languages!)

# Consistent with other languages using math.fmod
import math
print(math.fmod(-10, 3))  # -1.0`}
      />

      <ProseBlock
        subtitle="Essential math functions"
        spacingBottom={false}
        spacingTop={true}
      >
        Functions you'll use repeatedly in algorithmic problems.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`import math

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

      <Spacer size={2} />
      <QuoteBlock>
        <strong>Critical Interview Knowledge:</strong> Python's floor division
        with negative numbers behaves differently than most languages. It always
        rounds DOWN (toward negative infinity), not toward zero. This can break
        algorithms if you're not careful!
      </QuoteBlock>

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Arrays (Lists) - The Interview Workhorse"
        subtitle="Versatile data structure for most problems"
        spacingBottom={false}
        anchor
        id="arrays"
      >
        Python lists are incredibly versatile and appear in almost every coding
        interview. From basic operations to advanced slicing, mastering lists is
        non-negotiable.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`arr = [1, 2, 3]
arr.append(4)        # Add to end - O(1)
arr.insert(1, 99)    # Insert at index - O(n)
last = arr.pop()     # Remove last - O(1)
arr.pop(0)           # Remove first - O(n)`}
      />

      <ProseBlock
        subtitle="Negative indexing"
        spacingBottom={false}
        spacingTop={true}
      >
        A powerful Python feature that makes code more readable.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`arr = [1, 2, 3, 4, 5]
print(arr[-1])      # 5 (last element)
print(arr[-2])      # 4 (second to last)`}
      />

      <ProseBlock
        subtitle="Slicing magic"
        spacingBottom={false}
        spacingTop={true}
      >
        Powerful for creating subarrays and solving subproblems.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`print(arr[1:4])     # [2, 3, 4] (index 1 to 3)
print(arr[:3])      # [1, 2, 3] (first 3)
print(arr[2:])      # [3, 4, 5] (from index 2)
print(arr[::-1])    # [5, 4, 3, 2, 1] (reverse!)`}
      />

      <ProseBlock
        subtitle="Array initialization"
        spacingBottom={false}
        spacingTop={true}
      >
        Common patterns for creating arrays of specific sizes.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`n = 5
zeros = [0] * n              # [0, 0, 0, 0, 0]
filled = [1] * n             # [1, 1, 1, 1, 1]

# 2D arrays - CAREFUL with the trap!
# Wrong way (shares references):
wrong = [[0] * 3] * 3
wrong[0][0] = 1  # Changes ALL rows!

# Correct way:
matrix = [[0] * 3 for _ in range(3)]
matrix[0][0] = 1  # Only changes first row`}
      />

      <ProseBlock
        subtitle="Essential list methods"
        spacingBottom={false}
        spacingTop={true}
      >
        Methods you'll use constantly in algorithmic problems.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`nums = [3, 1, 4, 1, 5]
nums.sort()                  # [1, 1, 3, 4, 5] - in-place
sorted_nums = sorted(nums)   # Returns new list
nums.reverse()               # Reverse in-place
nums.sort(reverse=True)      # Descending order

# Advanced sorting - interview power tool
words = ['python', 'java', 'c', 'javascript']
words.sort(key=len)          # Sort by length
words.sort(key=lambda x: x[0])  # Sort by first character`}
      />

      <ProseBlock
        subtitle="List comprehensions"
        spacingBottom={false}
        spacingTop={true}
      >
        Concise and Pythonic way to create lists.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
matrix = [[i+j for j in range(3)] for i in range(3)]`}
      />

      <Spacer size={2} />
      <NoteBlock>
        <strong>2D Array Gotcha:</strong> Never use{' '}
        <span className="code">[[0] * cols] * rows</span> - this creates shared
        references! Always use list comprehension:{' '}
        <span className="code">[[0] * cols for _ in range(rows)]</span>
      </NoteBlock>

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Strings - Immutable but Powerful"
        subtitle="Similar to arrays but with key differences"
        spacingBottom={false}
        anchor
        id="strings"
      >
        Strings in Python behave like arrays but are immutable, which has
        important implications for algorithms.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`s = 'hello'
print(len(s))      # 5
print(s[0])        # 'h'
print(s[1:4])      # 'ell'
print(s[::-1])     # 'olleh' (reverse)

# Strings are immutable - creates new string
s += ' world'      # Creates new string object`}
      />

      <ProseBlock
        subtitle="String conversions"
        spacingBottom={false}
        spacingTop={true}
      >
        Essential for many interview problems involving numbers and text.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`num_str = '123'
print(int(num_str) * 2)    # 246 (converted to int)
print(str(456) + '789')    # '456789' (concatenation)`}
      />

      <ProseBlock
        subtitle="ASCII values"
        spacingBottom={false}
        spacingTop={true}
      >
        Useful for character manipulation problems.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`print(ord('a'))    # 97
print(ord('A'))    # 65
print(chr(97))     # 'a'`}
      />

      <ProseBlock
        subtitle="String joining and methods"
        spacingBottom={false}
        spacingTop={true}
      >
        More efficient than concatenation for building strings.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`# String joining - more efficient than concatenation
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

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Essential Data Structures"
        subtitle="Core collections for algorithmic problems"
        spacingBottom={false}
        anchor
        id="data-structures"
      >
        Master these data structures to handle any interview challenge
        efficiently.
      </ProseBlock>

      <ProseBlock
        subtitle="Queues (Collections.deque)"
        spacingBottom={false}
        spacingTop={true}
        anchor
        id="queues"
      >
        Double-ended queue with O(1) operations on both ends - perfect for BFS.
      </ProseBlock>

      <CodeBlock
        border
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

      <ProseBlock
        subtitle="Sets - O(1) Lookups"
        spacingBottom={false}
        spacingTop={true}
        anchor
        id="sets"
      >
        No duplicates and constant-time operations make sets incredibly
        powerful.
      </ProseBlock>

      <CodeBlock
        border
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

      <ProseBlock
        subtitle="Dictionaries (Hash Maps)"
        spacingBottom={false}
        spacingTop={true}
        anchor
        id="dictionaries"
      >
        The interview MVP - incredibly versatile for counting, mapping, and
        caching.
      </ProseBlock>

      <CodeBlock
        border
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
my_dict.setdefault('new', []).append(1)  # Create if missing`}
      />

      <ProseBlock
        subtitle="Counter pattern"
        spacingBottom={false}
        spacingTop={true}
      >
        Extremely common in interviews for frequency counting.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`text = "hello"
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

      <ProseBlock
        subtitle="Tuples - Immutable Sequences"
        spacingBottom={false}
        spacingTop={true}
        anchor
        id="tuples"
      >
        Immutable and hashable - perfect for dictionary keys and coordinates.
      </ProseBlock>

      <CodeBlock
        border
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


      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Heaps - Priority Queue Magic"
        subtitle="Essential for top-k and priority problems"
        spacingBottom={false}
        anchor
        id="heaps"
      >
        Heaps enable efficient priority queue operations and are crucial for
        many interview problems.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`import heapq

# Min heap by default (smallest element at index 0)
min_heap = []
heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 2)
heapq.heappush(min_heap, 8)
heapq.heappush(min_heap, 1)

print(min_heap[0])      # 1 (minimum always at index 0)
smallest = heapq.heappop(min_heap)  # Removes and returns 1`}
      />

      <ProseBlock
        subtitle="Build heap from array"
        spacingBottom={false}
        spacingTop={true}
      >
        Efficient O(n) heap construction from existing data.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`nums = [5, 2, 8, 1, 9]
heapq.heapify(nums)     # Transforms in-place
print(nums)             # [1, 2, 8, 5, 9] (heap property)`}
      />

      <ProseBlock
        subtitle="Max heap workaround"
        spacingBottom={false}
        spacingTop={true}
      >
        Python only has min heaps - use negation for max heap behavior.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`max_heap = []
for num in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -num)  # Push negative

# Get maximum (negate when popping)
maximum = -heapq.heappop(max_heap)  # Remove negative
print(maximum)          # 5`}
      />

      <ProseBlock
        subtitle="Classic interview patterns"
        spacingBottom={false}
        spacingTop={true}
      >
        Kth largest and merge k sorted lists are common heap problems.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def kth_largest(nums, k):
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

      <Spacer size={2} />
      <NoteBlock>
        <strong>Heap Interview Patterns:</strong> Use min heap for "k largest"
        problems and max heap for "k smallest" problems. Remember Python only
        has min heaps - negate values for max heap behavior!
      </NoteBlock>

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Functions & Scope"
        subtitle="Essential for helper functions and recursion"
        spacingBottom={false}
        anchor
        id="functions"
      >
        Understanding function scope and nested functions is crucial for clean
        algorithmic solutions.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def multiply(n, m):
    return n * m`}
      />

      <ProseBlock
        subtitle="Nested helper functions"
        spacingBottom={false}
        spacingTop={true}
      >
        Perfect pattern for DFS, backtracking, and complex algorithms.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def has_cycle_dfs(graph, start):
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
    
    return dfs(start, set())`}
      />

      <ProseBlock
        subtitle="Scope and nonlocal"
        spacingBottom={false}
        spacingTop={true}
      >
        Understanding variable scope prevents common interview mistakes.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def counter():
    count = 0
    
    def increment():
        nonlocal count  # Without this, creates local variable!
        count += 1
        return count
    
    return increment`}
      />

      <ProseBlock
        subtitle="Mutable vs immutable parameters"
        spacingBottom={false}
        spacingTop={true}
      >
        Critical to understand how parameters are passed and modified.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def modify_list(arr, val):
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

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Classes for Data Structure Problems"
        subtitle="Custom objects for trees, graphs, and linked lists"
        spacingBottom={false}
        anchor
        id="classes"
      >
        Classes are essential for representing complex data structures in
        interviews.
      </ProseBlock>

      <CodeBlock
        border
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
        self.neighbors = neighbors or []`}
      />

      <ProseBlock
        subtitle="Custom data structure example"
        spacingBottom={false}
        spacingTop={true}
      >
        MinStack is a classic interview problem that demonstrates class usage.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`class MinStack:
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
        return self.min_stack[-1] if self.min_stack else None`}
      />

      <ProseBlock
        subtitle="Helper functions with classes"
        spacingBottom={false}
        spacingTop={true}
      >
        Building tree structures from arrays is a common interview utility.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def build_tree_from_array(arr):
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

      <SectionSpacer size={spaceSize} />
      <ProseBlock
        title="Lambda Functions - Concise Power"
        subtitle="Anonymous functions for sorting and filtering"
        spacingBottom={false}
        anchor
        id="lambdas"
      >
        Lambda functions are anonymous, one-line functions perfect for sorting,
        filtering, and binary search predicates. Master these patterns for
        clean, Pythonic solutions.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`square = lambda x: x ** 2
add = lambda x, y: x + y`}
      />

      <ProseBlock
        subtitle="Sorting with lambdas"
        spacingBottom={false}
        spacingTop={true}
      >
        Incredibly powerful for custom sorting in interviews.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`students = [('Alice', 85), ('Bob', 90), ('Charlie', 78)]
students.sort(key=lambda x: x[1])  # Sort by grade
print(students)  # [('Charlie', 78), ('Alice', 85), ('Bob', 90)]

# Multi-criteria sorting
students.sort(key=lambda x: (x[1], x[0]))  # Grade first, then name`}
      />

      <ProseBlock
        subtitle="Binary search predicates"
        spacingBottom={false}
        spacingTop={true}
      >
        Lambdas make binary search conditions clear and concise.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def binary_search_left(arr, target):
    left, right = 0, len(arr)
    
    # Lambda defines "condition for going left"
    is_target_or_right = lambda x: x >= target
    
    while left < right:
        mid = (left + right) // 2
        if is_target_or_right(arr[mid]):
            right = mid
        else:
            left = mid + 1
    
    return left`}
      />

      <ProseBlock
        subtitle="Filter and map operations"
        spacingBottom={false}
        spacingTop={true}
      >
        Functional programming patterns with lambdas.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = list(filter(lambda x: x % 2 == 0, numbers))
squares = list(map(lambda x: x ** 2, numbers))`}
      />

      <ProseBlock
        subtitle="Closure capture gotcha"
        spacingBottom={false}
        spacingTop={true}
      >
        A common lambda pitfall that can cause bugs in interviews.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`funcs = []
for i in range(3):
    # Wrong - all lambdas capture the same 'i'
    funcs.append(lambda x: x + i)  # All will use i=2!

# Right way - capture with default argument
funcs_correct = []
for i in range(3):
    funcs_correct.append(lambda x, i=i: x + i)  # Captures current i`}
      />

      <ProseBlock
        subtitle="Factory functions"
        spacingBottom={false}
        spacingTop={true}
      >
        Creating specialized functions on demand.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`def make_multiplier(n):
    return lambda x: x * n

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15`}
      />

      <Spacer size={2} />
      <NoteBlock>
        <strong>Lambda Gotcha:</strong> In loops, lambdas capture variables by
        reference, not value. Use default arguments to capture the current
        value:{' '}<span className="code">lambda x, i=i: x + i</span>
      </NoteBlock>

      {/* Conclusion Section */}
        <SectionSpacer />
      <BackdropSection backdrop="primary">
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h5" component="p" sx={{ fontStyle: 'italic' }}>
            "Beautiful is better than ugly. Explicit is better than implicit.
            Simple is better than complex."
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
            — The Zen of Python
          </Typography>
        </Box>
      </BackdropSection>
    </>
  );
}
