import { useRef } from 'react';
import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { createFileRoute } from '@tanstack/react-router';
import Icon from '@/components/Icon';
import { Spacer } from '@/components/Spacer';
import { CompendiumButton } from '@/features/learn';
import { Invariant, Predicate, Sentinel } from '@/features/learn/notes';
import { MathInline } from '@/components/MathBlock';
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
import { mdiRabbit } from '@mdi/js';

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
const chunkSpaceSize = 4;

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
        Binary search is a great starting point for learning about data
        structures and algorithms. It helps you start thinking about reasoning
        and correctness, and it introduces strategies like{' '}
        <strong>divide and conquer</strong> and <strong>reduction</strong> to
        solve problems in <MathInline math="O(\log n)" padded /> time.
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
      <Spacer size={2} />
      <CodeAnswer subtitle="Answer:">
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

      <Spacer size={6} />
      <ProseBlock
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
      <Spacer size={2} />
      <CodeAnswer subtitle="Answer:">
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
      {/* RECIPE FOR BINARY SEARCH */}
      <Spacer size={sectionSpaceSize} />
      <ProseBlock
        title="A Recipe for Binary Search"
        subtitle="Where does the array transition from being true to being false?"
        anchor
        id="before-vs-after"
      />
      <ProseBlock spacingTop>
        By asking ourselves where an array goes from being{' '}
        <strong>truthy</strong> to <strong>falsey</strong>, we can form a{' '}
        <CompendiumButton title="Predicate" content={Predicate}>
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

      {/* INGREDIENTS */}
      <Spacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Ingredients"
        anchor
        id="ingredients"
        options={{ subtitleColor: 'primary.main', subtitleVariant: 'h5' }}
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
            <CompendiumButton title="Predicate" content={Predicate}>
              The Predicate
            </CompendiumButton>
            : <code>is_before(x)</code>{' '}
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
              The Invariant
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
      <Spacer size={2} />
      <NoteBlock title="Note:">
        The transition recipe elminates the need for "edge-case" checks.
        <Spacer size={1} />
        It's pre-baked to prevent "off-by-one" errors by assigning the left and
        right pointers to use
        <CompendiumButton title="Sentinels" content={Sentinel}>
          sentinels.
        </CompendiumButton>
        <Spacer size={1} />
        This means we never have to worry about out-of-bounds issues.{' '}
      </NoteBlock>

      {/* INSTRUCTIONS */}
      <Spacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Instructions"
        anchor
        id="instructions"
        options={{ subtitleColor: 'primary.main', subtitleVariant: 'h5' }}
      >
        The goal is to perform a reduction with code, just like you would in
        cooking when making a reduction sauce:
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

      {/* Not sure we're keeping this stuff */}
      <ProseBlock spacingTop>
        The transition point recipe doesn't require an extensive amount of
        memorization. By following it we can be confident that at the end:
      </ProseBlock>
      <ProseList
        items={[
          <>
            <code>left</code> will be the last <strong>Truthy</strong>
          </>,
          <>
            <code>right</code> will be the first <strong>Falsey</strong> value.
          </>,
        ]}
      />
      <Spacer size={sectionSpaceSize} />
      <ProseBlock
        title="The Walkthrough"
        subtitle="Solving binary search using the transition point recipe"
        anchor
        id="walkthrough"
      />

      <ProseBlock spacingTop>
        Ok, we have a recipe to solve the transition problem by ensuring that{' '}
        <code>left</code> is <strong>True</strong> and <code>right</code> is{' '}
        <strong>False</strong>, but just in Nil Mamano's article, how does this
        help us solve other binary search problems?
      </ProseBlock>
      <ProseBlock subtitle="Nil Mamano states:" spacingTop />
      <QuoteBlock>
        The idea is to come up with a (problem-specific) predicate, like{' '}
        <code>&lt; target</code>, <code>&lt;= target</code>, or{' '}
        <code>x % 2 == 0</code>, which splits the search range into two regions,
        the "before" region and the "after" region.
      </QuoteBlock>
      <ProseBlock spacingTop>
        By defining a prediate that correctly splits our search range, we can
        rely on checking the result of the predicate instead of doing things
        "old school" and checking boolean values directly.
      </ProseBlock>
      <ProseBlock>
        This means the only real challenge then is choosing the right transition
        point.
      </ProseBlock>

      {/* The Walk through begins here */}
      <Spacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Find the Honey Bunny"
        anchor
        id="honey-bunny"
        options={{ subtitleColor: 'primary.main', subtitleVariant: 'h5' }}
      >
        Let's explore how we can apply this knowledge with a basic version of
        binary search using{' '}
        <Icon
          path={mdiRabbit}
          sx={{ display: 'inline-block', position: 'relative', top: 6 }}
        />{' '}
        bunnies instead of numbers.
      </ProseBlock>
      <ProseBlock>
        When setting up the problem we will follow the transition recipe by
        doing the following:
      </ProseBlock>
      <ProseList
        ordered
        items={[
          'Define the predicate (before vs after).',

          'Run the invariant (left in before, right in after).',

          'Decide whether you want left (last True) or right (first False).',
        ]}
      />
      <Spacer size={2} />
      <NoteBlock title="Remember:">
        Your predicate must produce <strong>all Trues</strong> and then{' '}
        <strong>all Falses</strong> as it scans left <Arrow /> right.
      </NoteBlock>
      <Spacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Problem"
        options={{ subtitleColor: 'primary.main' }}
      >
        Given a sorted array of bunnies, find the index of the first{' '}
        <span className="bold-alt">
          Honey Bunny.{' '}
          <Icon
            path={mdiRabbit}
            sx={{ display: 'inline-block', position: 'relative', top: 6 }}
          />{' '}
        </span>
      </ProseBlock>
      <Spacer size={chunkSpaceSize} />
      <ProseBlock subtitle="Setup" options={{ subtitleColor: 'primary.main' }}>
        Before we can start the walkthrough, we need to define a few important
        components.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`from enum import IntEnum

# BunnyType represents whether a bunny is a normal fluffy bunny or a honey bunny.
class BunnyType(IntEnum):
    NORMAL = 0
    HONEY = 1

# Next, we'll create a simple struct-like Bunny class.
# We'll include a name variable just for fun visual flavor.
# The main variable we'll use is 'type'.
class Bunny:
    def __init__(self, bunny_type: BunnyType = BunnyType.NORMAL):
        self.name = "bunny"
        self.type = bunny_type`}
      />

      <Spacer size={chunkSpaceSize} />

      <ProseBlock
        spacingTop
        subtitle="The Predicate"
        anchor
        id="honey-bunny-predicate"
        options={{ subtitleColor: 'primary.main', subtitleVariant: 'h5' }}
      >
        We need to define a yes/no question that tests whether we're still
        before the first honey bunny.
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`# Define the Predicate!
# To use the transition point recipe, we first define our predicate.
#
# The yes/no question we'll ask:
# "Have we reached the first honey bunny yet?"
def is_before(x: BunnyType): 
    return x < BunnyType.HONEY`}
      />

      <Spacer size={chunkSpaceSize} />

      <ProseBlock subtitle="Are We Before Any Honey Bunnies?" spacingTop>
        The predicate defined as <code>x &lt; BunnyType.HONEY</code> will let
        our binary search find the <strong>transition point</strong>: the index
        where the first honey bunny appears. At the end, our search will return
        a <strong>tuple</strong> representing both pointer positions:
      </ProseBlock>

      <ProseList
        items={[
          <>
            <code>left</code> is the index of the last{' '}
            <code>BunnyType.NORMAL</code> bunny.
          </>,
          <>
            <code>right</code> is the index of the first{' '}
            <code>BunnyType.HONEY</code> bunny.
          </>,
        ]}
      />
    </PageLayout>
  );
}

/**
 * Make predicate and sentinent vocab pages
 * Make a Points to remember the Reduce the sauce! aka Reduction
 *
 * What a walkthrough should have:
 *
 * I may have some time this evening after 7.
 * What about after 7 tonight?
 *
 */
