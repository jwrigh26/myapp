import { useRef } from 'react';
import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import Box from '@mui/material/Box';
import { createFileRoute } from '@tanstack/react-router';
import Icon from '@/components/Icon';
import { Spacer } from '@/components/Spacer';
import { CompendiumButton } from '@/features/learn';
import { Invariant, Predicate, Sentinel } from '@/features/learn/notes';
import { MathInline } from '@/components/MathBlock';
import AnchorLink from '@/components/AnchorLink';
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
import ComplexityList from '@/components/ComplexityList';
import DsaArray from '@/components/DsaArray';
import {
  SimpleNumberArray,
  HighlightedArray,
  VerticalArray,
  BunnyArray,
  SegmentedArray,
  BinarySearchVisualization,
  CustomSizedArray,
  BunnyBinarySearchWalkthrough,
} from '@/components/DsaArray.examples';
import { styled } from '@mui/material';
import { mdiRabbit, mdiRabbitVariant } from '@mdi/js';

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

const introSpaceSize = 8;
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

      {/* ============================================
          CLASSIC BINARY SEARCH
          ============================================ */}
      <Spacer size={introSpaceSize} />
      <ProseBlock
        title="Classic Binary Search"
        subtitle="The binary search algorithm everyone learns."
        anchor
        id="classic-binary-search"
      />
      <Spacer size={2} />
      <ComplexityList
        time="O(\log n)"
        timeDescription="each step halves the range."
        space="O(1)"
        spaceDescription="constant extra space."
      />
      <Spacer size={chunkSpaceSize} />
      <ProseBlock
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

      {/* ============================================
          THE TRANSITION POINT
          ============================================ */}
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

      {/* ============================================
          A RECIPE FOR BINARY SEARCH
          ============================================ */}
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

      {/* ============================================
          INGREDIENTS
          ============================================ */}
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

      {/* ============================================
          INSTRUCTIONS
          ============================================ */}
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

      {/* ============================================
          THE WALKTHROUGH
          ============================================ */}
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

      {/* ============================================
          FIND THE HONEY BUNNY
          ============================================ */}
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
    HONEY = 1`}
      />
      <Spacer size={chunkSpaceSize} />
      <CodeBlock
        border
        language="python"
        code={`# Next, we'll create a simple struct-like Bunny class.
# We'll include a name variable just for fun visual flavor.
# The main variable we'll use is 'type'.
class Bunny:
    def __init__(self, bunny_type: BunnyType = BunnyType.NORMAL):
        self.name = "bunny"
        self.type = bunny_type`}
      />
      <Spacer size={chunkSpaceSize} />

      <CodeBlock
        border
        language="python"
        code={`# Bunny.__init__ accepts a type. 
# This allows us to populate an array of bunnies as follows:
bunnies = [Bunny(BunnyType.NORMAL) for _ in range(4)] + \
          [Bunny(BunnyType.HONEY) for _ in range(3)]`}
      />
      <Spacer size={chunkSpaceSize} />
      <ProseList
        subTitle="Setup Review"
        items={[
          <>
            <code>BunnyType</code>: allows us to search based on a bunny type
            instead of by number.
          </>,
          <>
            <code>Bunny</code>: A convenient class to organize all bunny logic.
          </>,
          <>
            <code>bunnies</code>: An array of bunnies sorted from{' '}
            <code>BunnyType.NORMAL</code> to <code>BunnyType.HONEY</code>.
          </>,
        ]}
      />
      {/* ============================================
          THE PREDICATE (Honey Bunny)
          ============================================ */}
      <Spacer size={blockSpaceSize} />

      <ProseBlock
        subtitle="Predicate"
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
      <ProseBlock
        subtitle="Are We Before Any Honey Bunnies?"
        options={{ subtitleColor: 'primary.main' }}
        spacingTop
      >
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
      {/* ============================================
          The Invariant 
          ============================================ */}
      <Spacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Invariant"
        anchor
        id="honey-bunny-invariant"
        options={{ subtitleColor: 'primary.main', subtitleVariant: 'h5' }}
      >
        The <strong>invariant</strong> is the same as defined{' '}
        <AnchorLink
          to="/learn/dsa/binary-search"
          anchorId="the-transition-point"
        >
          above in the transition point recipe
        </AnchorLink>
        :
      </ProseBlock>

      <CodeBlock
        border
        language="python"
        code={`# Define the invariant
while left + 1 < right:`}
      />

      <Spacer size={chunkSpaceSize} />
      <ProseBlock
        subtitle="Memorize it!"
        options={{ subtitleColor: 'primary.main' }}
      >
        Commit this invariant to memory.
      </ProseBlock>
      <ProseList
        items={[
          <>
            The statement <code>left + 1</code> makes sense because the{' '}
            <code>left</code> sentinel starts right before the first{' '}
            <strong>array index</strong> at <code>-1</code>.
          </>,
          <>
            The <code>right</code> sentinel, in contrast, is positioned right
            after the last <strong>array index</strong> by assigning it to{' '}
            <code>len(arr)</code>.
          </>,
          <>
            By setting <code>right</code> equal the length of the array, we
            avoid having to remember whether to add or subtract{' '}
            <code>
              <MathInline math="\pm 1" padded />
            </code>{' '}
            to prevent out-of-bounds errors.
          </>,
        ]}
      />
      {/* ============================================
    The Midpoint
    ============================================ */}
      <Spacer size={blockSpaceSize} />
      <ProseBlock
        subtitle="Midpoint"
        anchor
        id="honey-bunny-midpoint"
        options={{ subtitleColor: 'primary.main', subtitleVariant: 'h5' }}
      >
        The <strong>midpoint</strong> between two indices is key to any binary
        search recipe.
      </ProseBlock>
      <ProseBlock>
        To find the midpoint, we take the <code>left</code> and{' '}
        <code>right</code> indices and divide them using integer division.
      </ProseBlock>
      <Spacer size={2} />
      <NoteBlock title="Note:">
        Integer division means dividing and discarding the decimal part.
      </NoteBlock>
      <Spacer size={chunkSpaceSize} />
      <ProseBlock>
        Usually, in code this means using something like <code>Math.floor</code>
        . However, in <span className="bold">Python</span> we use{' '}
        <code>//</code>.
      </ProseBlock>
      <CodeBlock
        border
        language="python"
        code={`# Integer Division:
mid = (left + right) // 2

# Note: Not required in Python.
# This version is mathematically equivalent to the above.
# It prevents integer overflow in languages like C or C++
# by subtracting instead of adding two very large numbers.
mid = left + (right - left) // 2
`}
      />
      <Spacer size={chunkSpaceSize} />
      <ProseBlock
        subtitle="It's the Average!"
        options={{ subtitleColor: 'primary.main' }}
      >
        When we find the <code>mid</code> by integer division, we're just
        finding the <strong>average</strong>. This makes sense because the{' '}
        <strong>average</strong> of two numbers is the halfway point between
        them.
      </ProseBlock>
      <ProseBlock>
        This works perfectly for binary search because we're literally dividing
        our search space in half. To do that, we need to know what the middle{' '}
        <code>target</code> is so we can make decisions.
      </ProseBlock>
      <Spacer size={2} />
      <NoteBlock title="Fun Fact:">
        If you're wondering, like I was, where this midpoint formula actually
        comes from, look no further than good old <strong>geometry</strong> and{' '}
        <strong>number lines</strong> from math class.
        <Spacer size={2} />
        In geometry, the midpoint between two points{' '}
        <MathInline math="(x_{1}, x_{2})" padded /> on a line is{' '}
        <MathInline math="(x_{1} + x_{2}) \div 2" padded />.
        <Spacer size={2} />
        Binary search works the same way, except instead of applying physical
        coordinates, we use <strong>array indices</strong>.
      </NoteBlock>
      {/* ============================================
          THE Loop (Honey Bunny)
          ============================================ */}
      <Spacer size={blockSpaceSize} />

      <ProseBlock
        subtitle="Loop"
        anchor
        id="honey-bunny-loop"
        options={{ subtitleColor: 'primary.main', subtitleVariant: 'h5' }}
      >
        Let's return to the part of the walkthrough where everything gets{' '}
        <strong>looped</strong> in.
      </ProseBlock>

      <Spacer size={chunkSpaceSize} />

      {/* Simple number array example */}
      <ProseBlock subtitle="Example 1: Simple Number Array">
        A basic array of numbers with indices displayed above:
      </ProseBlock>
      <SimpleNumberArray />

      <Spacer size={chunkSpaceSize} />

      {/* Bunny array example */}
      <ProseBlock subtitle="Example 2: Bunny Array">
        An array of bunnies showing normal bunnies and honey bunnies:
      </ProseBlock>
      <BunnyArray />

      <Spacer size={chunkSpaceSize} />

      {/* Segmented array example */}
      <ProseBlock subtitle="Example 3: Segmented Array (Divide & Conquer)">
        Showing how an array can be split into segments:
      </ProseBlock>
      <BunnyBinarySearchWalkthrough />

      <Spacer size={chunkSpaceSize} />

      {/* Highlighted indices example */}
      <ProseBlock subtitle="Example 4: Binary Search Step">
        Highlighting the mid pointer during binary search:
      </ProseBlock>
      <BinarySearchVisualization />

      <Spacer size={chunkSpaceSize} />

      {/* Additional examples */}
      <ProseBlock subtitle="Example 5: Highlighted Array">
        Array with specific indices highlighted:
      </ProseBlock>
      <HighlightedArray />

      <Spacer size={chunkSpaceSize} />

      <ProseBlock subtitle="Example 6: Vertical Array">
        Arrays can also be displayed vertically:
      </ProseBlock>
      <Box sx={{ width: 80 }}>
        <VerticalArray />
      </Box>

      <Spacer size={chunkSpaceSize} />

      <ProseBlock subtitle="Example 7: Custom Sized Array">
        Custom cell sizes without borders:
      </ProseBlock>
      <CustomSizedArray />

      <Spacer size={chunkSpaceSize} />

      <ProseBlock subtitle="Example 8: Simple Segmented Array">
        Basic segmentation showing left and right halves:
      </ProseBlock>
      <SegmentedArray />
    </PageLayout>
  );
}

/**
 *
 * What a walkthrough should have:
 * 
 * <Overview>
 * DSA Visual Array Component:
 * When a loop or some other section of a DSA problem requires a list, array, stack, queue, etc, it 
 * would be awesome to show a visual representation. A visual representation could show indices, the value whether it's a number of an image. 
 * We can divide it up into sections to represent "splitting" an array or showing a step in "divide and conquer". We should also be able to higlight different items in the "array" to highlight changes in value etc. 
 * 
 * For more context in the blinary search I'm wanting to have this list take an src/components/Icon using maybe import { mdiRabbitVariant } from '@mdi/js'; with some other styles to represent normal and honey bunnies.
 * </Overview>
 * 
 * <Guidelines>
 * We should use MUI components when possible like Typography, Styles, theme spacing etc.
 * But for the main wrapper we could use a MUI stack but I'm thinking it might be easier just to roll our own using flexbox.
 * 
 * The styling could be modeled after the way we have CodeBlock border and background setup so it ties in nicely with our pages styling overall.
 * 
 * const CodeBlockContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'codeBorder',
})<{ codeBorder?: boolean }>(({ theme, codeBorder }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  display: 'block',
  '&:hover .copy-button': {
    // opacity: 1,
  },
  ...(codeBorder &&
    theme.palette.mode === 'light' && {
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1, 0),
      border: `1px solid ${theme.palette.divider}`,
    }),
  ...(codeBorder &&
    theme.palette.mode !== 'light' && {
      // Apply the glowing-border class when glow is true
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1, 0),
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: `
          0 0 0 1px ${theme.palette.primary.main}22,
          0 2px 8px ${theme.palette.primary.main}44,
          0 3px 12px ${theme.palette.primary.main}11
        `,
      transition:
        'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
      '&:hover, &:focus-within': {
        transform: 'translateY(-1px)',
        boxShadow: `
              0 0 0 1px ${theme.palette.primary.light}22,
              0 3px 12px ${theme.palette.primary.light}44,
              0 4px 16px ${theme.palette.primary.light}11
            `,
        borderColor: theme.palette.primary.main,
      },
    }),
}));
 * 
 * 
 * 
 * </Guidelines>
 * 
 * <Requirements>
 * - The wrapper or main component should take up 100% of it's parent width. 
 * - We should be able to define a set width/height for each item
 * - Or have option to just inherit width of child.
 * - We should have a default that takes a number/letter so we can make quick easy lists like | 0 | 1| 2 | 3 |...|
 * - We should have option to pass a child so we can make custom items that show images etc.
 * - Lists should beable to be displayed verticall or horizontally
 * - We should have option to show indicies above or below when displayed horizontal and left or right when vertical.
 * - We should be able to slice or split array and set a gap but have default be set too using theme.spacing of MUI
 * </Requirements>
 *
 *
 */
