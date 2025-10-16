import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { createFileRoute } from '@tanstack/react-router';
import { Spacer } from '@/components/Spacer';
import Stack from '@mui/material/Stack';
import PageLayout from '@/layout/PageLayout';
import IntroBlock from '@/components/IntroBlock';
import NoteBlock from '@/components/NoteBlock';
import QuoteBlock from '@/components/QuoteBlock';
import CodeBlock from '@/components/CodeBlock';
import CodeAnswer from '@/components/CodeAnswer';
import Typography from '@mui/material/Typography';
import Arrow from '@/components/Arrow';

export const Route = createFileRoute('/learn/dsa/binary-search/')({
  component: DsaHelloWorld,
  head: () => ({
    getTitle: () => 'Binary Search',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content: 'plaeholder for binary search',
      },
      {
        title: 'Binary Search',
      },
    ],
  }),
});

const sectionSpaceSize = 12;
const blockSpaceSize = 8;

function DsaHelloWorld() {
  return (
    <PageLayout>
      <TitleBlock
        title="Binary Search"
        subtitle="A great intro to learning DSA stuff!"
      />

      <IntroBlock>
        Get ready, we're going to learn Binary Search right now.
      </IntroBlock>

      {/* The Basics: The Classic Way */}
      <Spacer size={sectionSpaceSize} />
      <ProseBlock
        title="The Old Way"
        subtitle="The classic binary search algorithm"
        anchor
        id="the-old-way"
      >
        Whether you're a true beginner or a vetran of computer science. Becoming
        a master of binary search is a great thing to learn.
      </ProseBlock>

      <ProseBlock spacingTop subtitle="Problem">
        Given a sorted array, find the index of a target value.
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`from typing import List

# Binary Search
class Solution:
    def binary_search(self, array: List[int], target: int) -> int:
        left, right = 0, len(array) - 1
        while left <= right:
            mid = (left + right) // 2
            if array[mid] == target:
                return mid
            elif array[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1

arr = [1,2,4,6,8,9]
target = 6
solution = Solution()
print(solution.binary_search(arr, target)) #3`}
      />
      <Spacer size={4} />

      <CodeAnswer subtitle="Answer">
        <Typography variant="body1">
          The algorithm found target 6 at index <code>3</code>.
        </Typography>
      </CodeAnswer>

      {/* The New way of Solving Binary Search */}
      <Spacer size={sectionSpaceSize} />
      <ProseBlock
        title="The New Way"
        subtitle="You've learned the classic way, now learn the better way!"
        anchor
        id="the-new-way"
      >
        Every binary search problem can be though of as:
      </ProseBlock>
      <QuoteBlock>
        "Where does the array transition from one condition being{' '}
        <code>true</code> to being <code>false</code>?"
      </QuoteBlock>
      <ProseBlock spacingTop subtitle="Problem">
        Given a sorted array, find the index of a target value,{' '}
        <i>uisng the new binary search</i>.
      </ProseBlock>
      <CodeBlock border language="python" code={`from typing import List, Tuple, Callable

# Binary Search: New Way
class Solution:
    def binary_search(self, arr: List[int], is_before: Callable[[int], bool]) -> Tuple[int, int]:
        # Edge case: if the array is empty, return None
        if not arr:
            return None

        left, right = -1, len(arr)  # left = "all before", right = "all after"
                                    # note these *sentinels

        while left + 1 < right:
            mid = (left + right) // 2
            if is_before(arr[mid]):
                left = mid
            else:
                right = mid

        # At this point: left is the last True, right is the first False
        return left, right

# New Binary Search
target = 6
arr = [1, 2, 4, 6, 8, 9]

def is_before(x):
    return x < target

solution = Solution()
print(solution.binary_search(arr, is_before))
        `} />
      <Spacer size={4} />
      <CodeAnswer subtitle="Answer">
        <Typography variant="body1" gutterBottom>
          The function returns a tuple: <code>(2, 3)</code>
        </Typography>
        <Spacer size={2} />
        <Typography variant="body2" gutterBottom>
          • <code>left index = 2</code><Arrow/>Last <code>True</code> index (value <code>4</code> is less than <code>6</code>)
        </Typography>
        <Typography variant="body2">
          • <code>right index = 3</code><Arrow />First <code>False</code> index (value <code>6</code> is not less than <code>6</code>)
        </Typography>
      </CodeAnswer>
    </PageLayout>
  );
}
