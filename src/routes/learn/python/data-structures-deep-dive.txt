import ProseBlock from '@/components/ProseBlock';
import TitleBlock from '@/components/TitleBlock';
import IntroBlock from '@/components/IntroBlock';
import CodeBlock from '@/components/CodeBlock';
import { SectionSpacer } from '@/components/Spacer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/learn/posts/python/data-structures-deep-dive'
)({
  component: DataStructuresDeepDive,
  head: () => ({
    getTitle: () => 'Data Structures Deep Dive',
    meta: [
      {
        name: 'description',
        content:
          'Advanced Python data structures for competitive programming and system design',
      },
      {
        title: 'Data Structures Deep Dive',
      },
    ],
  }),
});

function DataStructuresDeepDive() {
  return (
    <>
      <TitleBlock
        title="Data Structures Deep Dive"
        subtitle="Advanced Python patterns for complex problems"
      />

      <IntroBlock>
        Beyond the basics lie powerful data structures that can make the
        difference between an elegant solution and a brute force approach. Let's
        explore advanced Python patterns used in competitive programming and
        system design.
      </IntroBlock>

      <SectionSpacer />

      {/* Trie Section */}
      <Box id="trie" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Trie (Prefix Tree) - String Search Powerhouse
        </Typography>

        <ProseBlock>
          Perfect for autocomplete, spell checkers, and any prefix-based
          operations. A trie can search, insert, and delete strings in O(m) time
          where m is the length of the string.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

# Usage in problems
trie = Trie()
words = ["apple", "app", "application", "apply"]
for word in words:
    trie.insert(word)

print(trie.search("app"))        # True
print(trie.starts_with("appl"))  # True`}
        />
      </Box>

      {/* Union Find Section */}
      <Box id="union-find" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Union-Find (Disjoint Set) - Connected Components
        </Typography>

        <ProseBlock>
          Essential for graph problems involving connectivity, cycle detection,
          and dynamic connectivity queries. Near constant time operations with
          path compression and union by rank.
        </ProseBlock>

        <CodeBlock
          language="python"
          code={`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected
        
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        self.components -= 1
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)
    
    def count_components(self):
        return self.components

# Example: Number of Islands problem
def num_islands(grid):
    if not grid or not grid[0]:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    uf = UnionFind(rows * cols)
    
    def get_id(r, c):
        return r * cols + c
    
    # Initially, count water as separate components
    water_count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '0':
                water_count += 1
    
    # Union adjacent land cells
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if (0 <= nr < rows and 0 <= nc < cols and 
                        grid[nr][nc] == '1'):
                        uf.union(get_id(r, c), get_id(nr, nc))
    
    return uf.count_components() - water_count`}
        />
      </Box>

      {/* Segment Tree Section */}
      <Box id="segment-tree" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Segment Tree - Range Query Master
        </Typography>

        <Box id="basic-segment-tree">
          <Typography variant="h4" component="h4" sx={{ mb: 2, mt: 3 }}>
            Basic Range Sum Queries
          </Typography>

          <ProseBlock>
            Perfect for problems requiring frequent range queries and updates.
            Both operations run in O(log n) time, making it ideal for
            competitive programming scenarios.
          </ProseBlock>

          <CodeBlock
            language="python"
            code={`class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2*node+1, start, mid)
            self.build(arr, 2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self.update(2*node+1, start, mid, idx, val)
            else:
                self.update(2*node+2, mid+1, end, idx, val)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0  # No overlap
        if l <= start and end <= r:
            return self.tree[node]  # Complete overlap
        
        # Partial overlap
        mid = (start + end) // 2
        left_sum = self.query(2*node+1, start, mid, l, r)
        right_sum = self.query(2*node+2, mid+1, end, l, r)
        return left_sum + right_sum
    
    def update_public(self, idx, val):
        self.update(0, 0, self.n-1, idx, val)
    
    def range_sum(self, l, r):
        return self.query(0, 0, self.n-1, l, r)

# Usage
arr = [1, 3, 5, 7, 9, 11]
seg_tree = SegmentTree(arr)
print(seg_tree.range_sum(1, 3))  # Sum from index 1 to 3: 3+5+7=15
seg_tree.update_public(1, 10)    # Update arr[1] to 10
print(seg_tree.range_sum(1, 3))  # New sum: 10+5+7=22`}
          />
        </Box>

        <Box id="lazy-propagation">
          <Typography variant="h4" component="h4" sx={{ mb: 2, mt: 3 }}>
            Lazy Propagation for Range Updates
          </Typography>

          <CodeBlock
            language="python"
            code={`class LazySegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)
    
    def push(self, node, start, end):
        if self.lazy[node] != 0:
            self.tree[node] += self.lazy[node] * (end - start + 1)
            if start != end:  # Not a leaf
                self.lazy[2*node+1] += self.lazy[node]
                self.lazy[2*node+2] += self.lazy[node]
            self.lazy[node] = 0
    
    def update_range(self, node, start, end, l, r, val):
        self.push(node, start, end)
        if start > r or end < l:
            return
        
        if start >= l and end <= r:
            self.lazy[node] += val
            self.push(node, start, end)
            return
        
        mid = (start + end) // 2
        self.update_range(2*node+1, start, mid, l, r, val)
        self.update_range(2*node+2, mid+1, end, l, r, val)
        
        self.push(2*node+1, start, mid)
        self.push(2*node+2, mid+1, end)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def query_range(self, node, start, end, l, r):
        if start > r or end < l:
            return 0
        
        self.push(node, start, end)
        if start >= l and end <= r:
            return self.tree[node]
        
        mid = (start + end) // 2
        left_sum = self.query_range(2*node+1, start, mid, l, r)
        right_sum = self.query_range(2*node+2, mid+1, end, l, r)
        return left_sum + right_sum`}
          />
        </Box>
      </Box>

      {/* Advanced Patterns Section */}
      <Box id="advanced-patterns" sx={{ mb: 4 }}>
        <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
          Advanced Problem-Solving Patterns
        </Typography>

        <Box id="fenwick-tree">
          <Typography variant="h4" component="h4" sx={{ mb: 2, mt: 3 }}>
            Fenwick Tree (Binary Indexed Tree)
          </Typography>

          <CodeBlock
            language="python"
            code={`class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
    
    def update(self, i, delta):
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add last set bit
    
    def query(self, i):
        result = 0
        while i > 0:
            result += self.tree[i]
            i -= i & (-i)  # Remove last set bit
        return result
    
    def range_query(self, l, r):
        return self.query(r) - self.query(l - 1)

# Count inversions using Fenwick Tree
def count_inversions(arr):
    # Coordinate compression
    sorted_unique = sorted(set(arr))
    coord_map = {v: i+1 for i, v in enumerate(sorted_unique)}
    
    ft = FenwickTree(len(sorted_unique))
    inversions = 0
    
    for num in reversed(arr):
        compressed = coord_map[num]
        inversions += ft.query(compressed - 1)
        ft.update(compressed, 1)
    
    return inversions`}
          />
        </Box>
      </Box>
    </>
  );
}
