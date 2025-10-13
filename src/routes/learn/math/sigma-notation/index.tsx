import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { Spacer, SectionSpacer } from '@/components/Spacer';
import {
  MathInline,
  EquationCard,
  EquationSteps,
} from '@/components/MathBlock';
import PageLayout from '@/layout/PageLayout';
import IntroBlock from '@/components/IntroBlock';
import QuoteBlock from '@/components/QuoteBlock';
import { TopicBlock } from '@/components/blog';
import Typography from '@mui/material/Typography';
import NoteBlock from '@/components/NoteBlock';
import Arrow from '@/components/Arrow';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/math/sigma-notation/')({
  component: SigmaNotation,
  head: () => ({
    getTitle: () => 'Sigma Notation',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content: 'Master sigma notation for mathematics and algorithm analysis',
      },
      {
        title: 'Sigma Notation',
      },
    ],
  }),
});

const sectionSpaceSize = 16;
const blockSpaceSize = 8;

function SigmaNotation() {
  return (
    <PageLayout>
      <TitleBlock
        title="Sigma Notation (Σ)"
        subtitle="Compact way to write long sums"
      />
      
      <IntroBlock>
        Sigma notation (also called summation notation) is a shorthand way to write long 
        addition problems. It's essential for mathematics, statistics, and analyzing algorithms.
      </IntroBlock>

      {/* WHAT IS SIGMA NOTATION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="What is Sigma Notation?"
        id="what-is-sigma"
        subtitle="The basics of summation"
      />

      <ProseBlock spacingTop>
        Instead of writing <MathInline math={String.raw`1 + 2 + 3 + 4 + 5`} />, we can use sigma notation.
      </ProseBlock>

      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Sigma = Sum:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\sum_{i=1}^{5} i = 1 + 2 + 3 + 4 + 5 = 15`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <TopicBlock
        title="Parts of sigma notation"
        items={[
          <>
            <MathInline bold math={String.raw`\sum`} /> <Arrow /> The sigma symbol (Greek letter for "S" = Sum)
          </>,
          <>
            <MathInline bold math={String.raw`i=1`} /> <Arrow /> Starting value (where the index begins)
          </>,
          <>
            <MathInline bold math={String.raw`5`} /> <Arrow /> Upper limit (where the index stops)
          </>,
          <>
            <MathInline bold math={String.raw`i`} /> <Arrow /> The term (what to add each time)
          </>,
        ]}
      />

      <Spacer />
      <NoteBlock>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          Memory anchor: "Sum from i=1 to 5 of i" = "Add up all values of i from 1 to 5"
        </Typography>
      </NoteBlock>

      {/* HOW TO READ IT */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="How to Read Sigma Notation"
        id="how-to-read"
        subtitle="Step-by-step process"
      />

      <Spacer />
      <EquationSteps
        title="Reading the Notation"
        subtitle="Breaking down each part"
        alignEquals={false}
        steps={[
          String.raw`\sum_{i=1}^{100} i`,
          String.raw`\text{Read: "Sum from } i=1 \text{ to } 100 \text{ of } i\text{"}`,
          String.raw`= 1 + 2 + 3 + \ldots + 99 + 100`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              • Start at <strong>i = 1</strong>
            </Typography>
            <Typography variant="body2" gutterBottom>
              • Go up to <strong>i = 100</strong>
            </Typography>
            <Typography variant="body2">
              • Add each value of <strong>i</strong>
            </Typography>
          </>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="The process"
        items={[
          <>1. Start with the bottom number (index = starting value)</>,
          <>2. Plug that number into the term</>,
          <>3. Increase the index by 1</>,
          <>4. Plug the new number into the term</>,
          <>5. Keep going until you reach the top number</>,
          <>6. Add all the results together</>,
        ]}
      />

      {/* BASIC EXAMPLES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Basic Examples"
        id="basic-examples"
        subtitle="Building intuition"
      />

      <Spacer />
      <EquationSteps
        title="Example 1: Sum of First 5 Numbers"
        subtitle="Simplest case - just add i"
        alignEquals={false}
        steps={[
          String.raw`\sum_{i=1}^{5} i = ?`,
          String.raw`= 1 + 2 + 3 + 4 + 5`,
          String.raw`= 15`,
        ]}
        footer={
          <Typography variant="body2">
            For each value from 1 to 5, we just add that number.
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Example 2: Sum of Squares"
        subtitle="Term is i², so square each index"
        alignEquals={false}
        steps={[
          String.raw`\sum_{i=1}^{4} i^2 = ?`,
          String.raw`= 1^2 + 2^2 + 3^2 + 4^2`,
          String.raw`= 1 + 4 + 9 + 16`,
          String.raw`= 30`,
        ]}
        footer={
          <Typography variant="body2">
            For each i, square it first, then add all the squares.
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Example 3: Constant Multiplier"
        subtitle="Constants stay outside each term"
        alignEquals={false}
        steps={[
          String.raw`\sum_{i=0}^{3} 2i = ?`,
          String.raw`= 2(0) + 2(1) + 2(2) + 2(3)`,
          String.raw`= 0 + 2 + 4 + 6`,
          String.raw`= 12`,
        ]}
        footer={
          <Typography variant="body2">
            Notice: We start at i=0, not i=1! Always check the starting index.
          </Typography>
        }
      />

      {/* EXPRESSIONS AS TERMS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Expressions as Terms"
        id="expressions"
        subtitle="When the term is more complex"
      />

      <ProseBlock spacingTop>
        The term can be any expression involving the index variable.
      </ProseBlock>

      <Spacer />
      <EquationSteps
        title="Example: Linear Expression"
        subtitle="3n - 1 for each value of n"
        alignEquals={false}
        steps={[
          String.raw`\sum_{n=1}^{4} (3n - 1) = ?`,
          String.raw`= [3(1)-1] + [3(2)-1] + [3(3)-1] + [3(4)-1]`,
          String.raw`= 2 + 5 + 8 + 11`,
          String.raw`= 26`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              <strong>Step by step:</strong>
            </Typography>
            <Typography variant="body2">
              • When n=1: 3(1)-1 = 2
            </Typography>
            <Typography variant="body2">
              • When n=2: 3(2)-1 = 5
            </Typography>
            <Typography variant="body2">
              • When n=3: 3(3)-1 = 8
            </Typography>
            <Typography variant="body2">
              • When n=4: 3(4)-1 = 11
            </Typography>
          </>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Example: Fraction with Expression"
        subtitle="k/(n+1) where k is a constant"
        alignEquals={false}
        steps={[
          String.raw`\sum_{n=1}^{4} \frac{k}{n+1} = ?`,
          String.raw`= \frac{k}{1+1} + \frac{k}{2+1} + \frac{k}{3+1} + \frac{k}{4+1}`,
          String.raw`= \frac{k}{2} + \frac{k}{3} + \frac{k}{4} + \frac{k}{5}`,
        ]}
        footer={
          <Typography variant="body2">
            <strong>k</strong> stays constant; only <strong>n</strong> changes with each term.
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Pro Tip:</strong> Always substitute the index value into the entire expression.
          </Typography>
          <Typography variant="body2">
            If the term is <MathInline math={String.raw`3n-1`} />, and n=2, the whole term is 3(2)-1 = 5, not 3n-2.
          </Typography>
        </>
      </NoteBlock>

      {/* CONSTANTS IN SIGMA */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Working with Constants"
        id="constants"
        subtitle="Constants can factor out"
      />

      <ProseBlock spacingTop>
        When you have a constant multiplier, you can pull it outside the sigma.
      </ProseBlock>

      <Spacer />
      <QuoteBlock secondary>
        <>
          <Typography variant="h6" gutterBottom>
            Factor out constants:
          </Typography>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`\sum_{i=1}^{n} c \cdot f(i) = c \cdot \sum_{i=1}^{n} f(i)`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Example with π"
        subtitle="π is constant, so factor it out"
        alignEquals={false}
        steps={[
          String.raw`\sum_{i=0}^{3} \pi i^2 = ?`,
          String.raw`= \pi \sum_{i=0}^{3} i^2`,
          String.raw`= \pi(0^2 + 1^2 + 2^2 + 3^2)`,
          String.raw`= \pi(0 + 1 + 4 + 9)`,
          String.raw`= 14\pi`,
        ]}
        footer={
          <Typography variant="body2">
            π doesn't change with i, so we can pull it outside and multiply the sum by π at the end.
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="More Examples with Constants"
        equations={[
          String.raw`\sum_{i=1}^{5} 3 = 3 + 3 + 3 + 3 + 3 = 15 = 3 \times 5`,
          String.raw`\sum_{i=1}^{n} c = c + c + \ldots + c = n \cdot c`,
        ]}
        footer={
          <Typography variant="body2">
            When the term is a <strong>pure constant</strong> (no i at all), you just multiply the constant by the number of terms!
          </Typography>
        }
      />

      {/* COMMON FORMULAS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Useful Formulas"
        id="formulas"
        subtitle="You don't have to add everything manually"
      />

      <ProseBlock spacingTop>
        These formulas let you calculate common sums instantly.
      </ProseBlock>

      <Spacer />
      <EquationCard
        title="Sum of First n Numbers"
        subtitle="The famous formula"
        equations={[
          String.raw`\sum_{i=1}^{n} i = 1 + 2 + 3 + \ldots + n = \frac{n(n+1)}{2}`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              <strong>Example:</strong> Sum from 1 to 100
            </Typography>
            <Typography variant="body2">
              <MathInline math={String.raw`\sum_{i=1}^{100} i = \frac{100(101)}{2} = \frac{10100}{2} = 5050`} />
            </Typography>
          </>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Sum of Squares"
        equations={[
          String.raw`\sum_{i=1}^{n} i^2 = 1^2 + 2^2 + \ldots + n^2 = \frac{n(n+1)(2n+1)}{6}`,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Sum of Cubes"
        equations={[
          String.raw`\sum_{i=1}^{n} i^3 = 1^3 + 2^3 + \ldots + n^3 = \left[\frac{n(n+1)}{2}\right]^2`,
        ]}
        footer={
          <Typography variant="body2">
            Fun fact: The sum of the first n cubes equals the square of the sum of the first n numbers!
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          You don't need to memorize these formulas initially. Understanding how to expand sigma notation is more important!
        </Typography>
      </NoteBlock>

      {/* ALGORITHM ANALYSIS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Sigma in Algorithm Analysis"
        id="algorithm-analysis"
        subtitle="Why computer scientists use sigma notation"
      />

      <ProseBlock spacingTop>
        When analyzing algorithms, we use sigma notation to count operations. This helps us 
        understand how long an algorithm takes as input size grows.
      </ProseBlock>

      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Cost × Count:
          </Typography>
          <Typography variant="body2">
            Each operation has a <strong>cost</strong> (time it takes), and we count 
            <strong> how many times</strong> it happens.
          </Typography>
        </>
      </QuoteBlock>

      <Spacer />
      <TopicBlock
        title="Common notation in algorithm analysis"
        items={[
          <>
            <MathInline bold math={String.raw`n`} /> <Arrow /> Size of input (e.g., array length)
          </>,
          <>
            <MathInline bold math={String.raw`c_i`} /> <Arrow /> Cost of operation i (a constant)
          </>,
          <>
            <MathInline bold math={String.raw`t_j`} /> <Arrow /> Number of times operation j executes
          </>,
        ]}
      />

      {/* LOOP ANALYSIS */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="loop-analysis"
        subtitle="Counting Loop Operations"
        options={{ subtitleVariant: 'h5' }}
      />

      <ProseBlock spacingTop>
        A simple loop that runs from 1 to n has a pattern we can express with sigma notation.
      </ProseBlock>

      <Spacer />
      <EquationSteps
        title="Simple Loop"
        subtitle="for (i = 1; i ≤ n; i++) { doSomething(); }"
        alignEquals={false}
        steps={[
          String.raw`\text{Total cost} = c \sum_{i=1}^{n} 1`,
          String.raw`= c \cdot n`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              <strong>c</strong> = cost of one operation
            </Typography>
            <Typography variant="body2">
              The loop executes <strong>n times</strong>, so total cost is c × n
            </Typography>
          </>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Loop with Index-Dependent Work"
        subtitle="for (i = 1; i ≤ n; i++) { work(i); }"
        alignEquals={false}
        steps={[
          String.raw`\text{Total cost} = c \sum_{i=1}^{n} i`,
          String.raw`= c \cdot \frac{n(n+1)}{2}`,
          String.raw`= c \cdot \frac{n^2 + n}{2}`,
        ]}
        footer={
          <Typography variant="body2">
            If the amount of work depends on i, the sum adds up all values of i from 1 to n.
          </Typography>
        }
      />

      {/* INSERTION SORT EXAMPLE */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="insertion-sort"
        subtitle="Real Example: Insertion Sort"
        options={{ subtitleVariant: 'h5' }}
      />

      <ProseBlock spacingTop>
        In insertion sort, we have nested loops. The inner loop's execution count depends on the outer loop index.
      </ProseBlock>

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Key insight:</strong> When a loop exits normally, the test executes one more time than the body.
          </Typography>
          <Typography variant="body2">
            If the body runs j-1 times, the test runs j times.
          </Typography>
        </>
      </NoteBlock>

      <Spacer />
      <EquationSteps
        title="Insertion Sort Analysis"
        subtitle="Cost of comparisons in the inner while loop"
        alignEquals={false}
        steps={[
          String.raw`\text{Cost} = c_7 \sum_{j=2}^{n} (j-1)`,
          String.raw`= c_7 [(2-1) + (3-1) + (4-1) + \ldots + (n-1)]`,
          String.raw`= c_7 [1 + 2 + 3 + \ldots + (n-1)]`,
          String.raw`= c_7 \cdot \frac{(n-1)n}{2}`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              <strong>c₇</strong> = constant cost of one comparison
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>j</strong> = outer loop index (position in array)
            </Typography>
            <Typography variant="body2">
              For each j from 2 to n, we do j-1 comparisons in the worst case
            </Typography>
          </>
        }
      />

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Why j=2 to n?</strong>
          </Typography>
          <Typography variant="body2">
            The outer loop typically starts at index 2 (second element) because we consider 
            the first element already "sorted."
          </Typography>
        </>
      </NoteBlock>

      {/* NESTED LOOPS */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="nested-loops"
        subtitle="Nested Loops"
        options={{ subtitleVariant: 'h5' }}
      />

      <Spacer />
      <EquationSteps
        title="Nested Sigma Notation"
        subtitle="for (i = 1; i ≤ n; i++) { for (j = 1; j ≤ i; j++) { work(); } }"
        alignEquals={false}
        steps={[
          String.raw`\text{Total} = c \sum_{i=1}^{n} \sum_{j=1}^{i} 1`,
          String.raw`= c \sum_{i=1}^{n} i`,
          String.raw`= c \cdot \frac{n(n+1)}{2}`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              The inner sum <MathInline math={String.raw`\sum_{j=1}^{i} 1`} /> counts how many times the inner loop runs.
            </Typography>
            <Typography variant="body2">
              This equals i (the inner loop runs i times for each outer i).
            </Typography>
          </>
        }
      />

      {/* SIGMA PROPERTIES */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Sigma Properties"
        id="properties"
        subtitle="Rules that make calculations easier"
      />

      <Spacer />
      <EquationCard
        title="Split a Sum"
        equations={[
          String.raw`\sum_{i=1}^{n} (a_i + b_i) = \sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i`,
        ]}
        footer={
          <Typography variant="body2">
            You can split a sum of terms into separate sums.
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Factor out Constants"
        equations={[
          String.raw`\sum_{i=1}^{n} c \cdot a_i = c \sum_{i=1}^{n} a_i`,
        ]}
        footer={
          <Typography variant="body2">
            Constants multiply the entire sum.
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Telescoping (Advanced)"
        equations={[
          String.raw`\sum_{i=1}^{n} (a_i - a_{i-1}) = a_n - a_0`,
        ]}
        footer={
          <Typography variant="body2">
            Consecutive differences cancel out, leaving only the first and last terms.
          </Typography>
        }
      />

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Quick Reference"
        id="quick-reference"
      />

      <Spacer />
      <TopicBlock
        title="How to expand sigma notation"
        items={[
          '1. Start with the bottom index value',
          '2. Plug it into the term expression',
          '3. Increment the index by 1',
          '4. Plug the new value into the term',
          '5. Repeat until you reach the top index',
          '6. Add all terms with + signs',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Common mistakes"
        items={[
          <>❌ Forgetting to check the starting index (might be 0, not 1!)</>,
          <>❌ Not plugging the index into the <em>entire</em> expression</>,
          <>❌ Confusing the index variable (i vs. j vs. n)</>,
          <>❌ Forgetting that constants stay constant</>,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Essential Formulas"
        headerColor="secondary.main"
        equations={[
          String.raw`\sum_{i=1}^{n} i = \frac{n(n+1)}{2}`,
          String.raw`\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}`,
          String.raw`\sum_{i=1}^{n} c = n \cdot c \quad \text{(constant sum)}`,
        ]}
        footer={
          <Typography variant="body2">
            These formulas save time when analyzing algorithms!
          </Typography>
        }
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
