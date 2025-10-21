import { useRef } from 'react';
import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { createFileRoute } from '@tanstack/react-router';
import { Spacer } from '@/components/Spacer';
import { CompendiumButton } from '@/features/learn';
import { Invariant } from '@/features/learn/notes';
import PageLayout from '@/layout/PageLayout';
import IntroBlock from '@/components/IntroBlock';
import NoteBlock from '@/components/NoteBlock';
import QuoteBlock from '@/components/QuoteBlock';
import CodeBlock from '@/components/CodeBlock';
import CodeAnswer from '@/components/CodeAnswer';
import Typography from '@mui/material/Typography';
import Arrow from '@/components/Arrow';
import ReferenceLink from '@/components/ReferenceLink';
import ProseList from '@/components/ProseList';
import { styled } from '@mui/material';

const InstructionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

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

// Curried function to create a setter for a ref
const createCompendiumTitleRefSetter =
  (ref: React.MutableRefObject<string>) => (title: string) => {
    ref.current = title;
  };

function DsaHelloWorld() {
  const compendiumTitleRef = useRef<string>('');
  const setCompendiumTitle = createCompendiumTitleRefSetter(compendiumTitleRef);

  return (
    <PageLayout>
      <TitleBlock
        title="Binary Search"
        subtitle="It's dangerous to go alone. Learn this!"
      />
      <IntroBlock>
        Get ready, we're going to learn Binary Search right now.
      </IntroBlock>
      {/* The Basics: The Classic Way */}
      <Spacer size={sectionSpaceSize} />
      <ProseBlock
        title="Classic Binary Search"
        subtitle="The binary search algorithm everyone learns."
        anchor
        id="classic-binary-search"
      />
      <ProseBlock
        spacingTop
        subtitle="Problem"
        options={{ subtitleColor: 'primary.main' }}
      >
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
          The function found target 6 at index <code>3</code>.
        </Typography>
      </CodeAnswer>
      {/* The New way of Solving Binary Search */}
      <Spacer size={sectionSpaceSize} />
      <ProseBlock
        title="The Transition Point"
        subtitle="Nil Mamao's recipe for cracking binary search."
        anchor
        id="the-transition-point"
      />
      <ReferenceLink
        text="Nil Mamano's blog post: Get Binary Search Right Every Time,"
        url="https://nilmamano.com/blog/binary-search"
        linkText="Get Binary Search Right Every Time"
      />
      <ProseBlock
        spacingTop
        // title="Problem"
        // options={{ titleVariant: "h6" }}
        subtitle="Problem"
        options={{ subtitleColor: 'primary.main' }}
      >
        Given a sorted array, find the index of a target value, using the
        transition point recipe.
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`from typing import List, Tuple, Callable

# Binary Search: The Transition Point Recipe
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

target = 6
arr = [1, 2, 4, 6, 8, 9]

def is_before(x):
    return x < target

solution = Solution()
print(solution.binary_search(arr, is_before)) # (2,3)
        `}
      />
      <Spacer size={4} />
      <CodeAnswer subtitle="Answer">
        <Typography variant="body1" gutterBottom>
          The function returns a tuple: <code>(2, 3)</code>
        </Typography>
        <Spacer size={2} />
        <Typography variant="body2" gutterBottom>
          • <code>left index = 2</code>
          <Arrow />
          Last <code>True</code> index (value <code>4</code> is less than{' '}
          <code>6</code>)
        </Typography>
        <Typography variant="body2">
          • <code>right index = 3</code>
          <Arrow />
          First <code>False</code> index (value <code>6</code> is not less than{' '}
          <code>6</code>)
        </Typography>
      </CodeAnswer>
      <Spacer size={sectionSpaceSize} />
      <ProseBlock
        title="A Recipe for Binary Search"
        subtitle="Where does the array transition from being true to being false?"
        anchor
        id="before-vs-after"
      >
        By asking ourselves where an array goes from being{' '}
        <strong>truthy</strong> to <strong>falsey</strong>, we can form a{' '}
        <CompendiumButton title="Predicate" content={Invariant}>
          predicate
        </CompendiumButton>
        .
      </ProseBlock>
      <ProseBlock>
        The transition point recipe's predicate can be defined as the function:{' '}
        <code>is_before(x)</code>. By using this function, we can split our
        search range into two subarrays: The "before" and "after" regions.
      </ProseBlock>
      <ProseBlock>
        This is done by having <code>is_before(x)</code> take an element from
        our main array and return a <code>boolean</code> value indicating
        whether the element comes before the <code>target</code> value.
      </ProseBlock>
      <ProseBlock>
        Based on the <code>boolean</code> value being either{' '}
        <strong>True</strong> or <strong>False</strong>, we update our{' '}
        <span className="name">left</span> and{' '}
        <span className="name-alt">right</span> pointers.
      </ProseBlock>
      <ProseBlock
        spacingTop
        subtitle="Ingredients"
        anchor
        id="ingredients"
        options={{ subtitleColor: 'primary.main' }}
      >
        A list of key items to remember for binary search:
      </ProseBlock>
      <ProseList
        items={[
          <>
            The input: <code>array</code>{' '}
            <InstructionText>
              The sorted list that the entire binary search depends on.
            </InstructionText>
          </>,
          <>
            The predicate: <code>is_before(x)</code>{' '}
            <InstructionText variant="body2">
              Defines the rule that splits the array into the "before" and
              "after" regions.
            </InstructionText>
          </>,
          <>
            Left pointer: <code>-1</code>{' '}
            <InstructionText variant="body2">
              Starts before the array, always in the "before" region.
            </InstructionText>
          </>,
          <>
            Right pointer: <code>len(arr)</code>{' '}
            <InstructionText variant="body2">
              Starts just past the end of the array, always in the "after"
              region.
            </InstructionText>
          </>,
          <>
            <CompendiumButton title="Invariant" content={Invariant}>
              Invariant
            </CompendiumButton>{' '}
            <InstructionText variant="body2">
              The rule that ensures our binary search remains correct at every
              iteration.
            </InstructionText>
          </>,
          <>
            The loop condition: <code>while left + 1 &lt; right</code>{' '}
            <InstructionText variant="body2">
              The main binary search loop that moves the pointers according to
              the invariant. The loop stops when <code>left + 1 == right</code>.
            </InstructionText>
          </>,
          <>
            The output: <code>(left, right)</code>{' '}
            <InstructionText variant="body2">
              <code>left</code> will be the last <strong>True</strong> value,
              and <code>right</code> will be the first <strong>False</strong>{' '}
              value.
            </InstructionText>
          </>,
        ]}
      />
      <ProseBlock
        spacingTop
        subtitle="Instructions"
        anchor
        id="instructions"
        options={{ subtitleColor: 'primary.main' }}
      >
        The goal is to perform a reduction with code, just like you would in
        cooking:
      </ProseBlock>
      <ProseList
        ordered
        items={[
          <>
            Start by guarding against edge cases.
            <ProseList
              spacingTop
              items={[
                <>Empty Array</>,
                <>Target not defined</>,
                <>Every value is the same</>,
              ]}
            />
          </>,
          <>
            Set both pointers: <code>left = -1, right = len(arr)</code>.
          </>,
          <>
            Define the main loop's condition: <code>left + 1 &lt; right</code>.
          </>,
          <>
            Make sure the <strong>invariant</strong> keeps the left side{' '}
            <strong>True</strong> and the right side <strong>False</strong>.
          </>,
        ]}
      />
      <ProseBlock spacingTop>
        The transition point recipe doesn't require an extensive amount of
        memorization.
      </ProseBlock>{' '}
      <ProseBlock>
        By following it we can be confident that at the end, <code>left</code>{' '}
        will be the last <strong>Truthy</strong> and <code>right</code> will be
        the first <strong>Falsey</strong> value.
      </ProseBlock>
      <Spacer size={2} />
      <ProseBlock
        subtitle="Bonus"
        options={{ subtitleColor: 'secondary.main' }}
      >
        The recipe also comes pre-baked to prevent "off-by-one" errors. This
        means we never have to worry about out-of-bounds issues.{' '}
        <span className="bold-alt">Nice!</span>
      </ProseBlock>
    </PageLayout>
  );
}
