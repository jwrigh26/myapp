import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { Spacer, SectionSpacer } from '@/components/Spacer';
import {
  ProseMathBlock,
  MathInline,
  MathBlock,
  EquationCard,
  EquationSteps,
  _DemoExamples,
} from '@/components/MathBlock';
import PageLayout from '@/layout/PageLayout';
import IntroBlock from '@/components/IntroBlock';
import QuoteBlock from '@/components/QuoteBlock';
import { TopicBlock } from '@/components/blog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ConceptCardGrid, ConceptItem } from '@/components/ConceptCards';
import { mdiAccountGroup, mdiCompare, mdiGridLarge } from '@mdi/js';
import { createFileRoute } from '@tanstack/react-router';
import NoteBlock from '@/components/NoteBlock';

// ##############################################
// ### Data
// ##############################################


const demoItems: ConceptItem[] = [
  {
    model: 'Groups',
    description: 'Repeated equal groups',
    application: 'How many groups / how big is one group',
    examples: 'sharing cookies, pouring cups',
    icon: mdiAccountGroup,
  },
  {
    model: 'Comparison',
    description: 'Scaling an amount',
    application: ['Undoing or reversing the scale', 'Finding original value'],
    examples: 'comparing heights, prices',
    icon: mdiCompare,
  },
  {
    model: 'Rectangular',
    description: 'Measuring 2D space',
    application: 'Find missing side or total area',
    examples: 'geometry, tiling, land area',
    icon: mdiGridLarge,
  },
];

// ##############################################
// ### Helper methods and variables
// ##############################################

export const Route = createFileRoute('/learn/math/dividing-fractions/')({
  component: MathDividingFractions,
  head: () => ({
    getTitle: () => 'Dividing Fractions',
    includeInDrawer: true, // Include this route in the drawer navigation
    meta: [
      {
        name: 'description',
        content:
          'Learn how to divide fractions step by step with clear explanations and examples',
      },
      {
        title: 'Dividing Fractions',
      },
    ],
  }),
});

const sectionSpaceSize = 16;
const blockSpaceSize = 8;

function MathDividingFractions() {
  return (
    <PageLayout>
      <TitleBlock
        title="Dividing Fractions"
        subtitle="Master the art of fraction division"
      />
      <IntroBlock>
        Dividing fractions is the same as multiplying by the reciprocal
        (inverse).
      </IntroBlock>

      <Spacer />
      <ProseBlock>
        To divide two fractions, you flip the second fraction and multiply.
      </ProseBlock>

      <ProseMathBlock
        equation={String.raw`\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c}`}
      />
      <SectionSpacer size={blockSpaceSize} />

      <EquationSteps
        anchor
        id="division-example"
        title="Division Example"
        subtitle="Step-by-step fraction division"
        steps={[
          String.raw`\frac{3}{4} \div \frac{2}{5}`,
          String.raw`= \frac{3}{4} \times \frac{5}{2}`,
          String.raw`= \frac{3 \times 5}{4 \times 2}`,
          String.raw`= \frac{15}{8}`,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        anchor
        id="simplifying-fractions"
        title="Simplifying with Cancellation"
        outlined={false}
        subtitle="Use cancellation to simplify before multiplying"
        steps={[
          String.raw`\frac{12}{16} \div \frac{3}{4}`,
          String.raw`= \frac{12}{16} \times \frac{4}{3}`,
          String.raw`= \frac{\require{cancel}\cancel{12} \times \cancel{4}}{\cancel{16} \times \cancel{3}}`,
          String.raw`= \frac{3 \times 1}{4 \times 1}`,
          String.raw`= \frac{3}{4}`,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        anchor
        id="mixed-numbers"
        title="Mixed Numbers"
        subtitle="Convert mixed numbers to improper fractions first"
        steps={[
          String.raw`2\frac{1}{3} \div 1\frac{1}{2}`,
          String.raw`= \frac{7}{3} \div \frac{3}{2}`,
          String.raw`= \frac{7}{3} \times \frac{2}{3}`,
          String.raw`= \frac{14}{9}`,
          String.raw`= 1\frac{5}{9}`,
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />

      <ProseBlock
        anchor
        title="Interpret Fraction Division"
        id="interpret-fractions"
      />

      <TopicBlock
        title="Three common meanings of Multiplication"
        items={[
          '(number of groups) x (size of group) = total',
          '(original value) x (comparision factor) = (new value)',
          'base x height = (new value)',
        ]}
      />

      {/* SECTION REPEATED GROUPS BLOCK */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="repeated-groups"
        subtitle="Repeated Groups"
        options={{ subtitleVariant: 'h5' }}
      />
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Formula:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\text{(number of groups)} \times \text{(group size)} = \text{total}`}
          />
        </>
      </QuoteBlock>
      <Spacer />
      <EquationCard
        title="Example (whole numbers)"
        subtitle="3 groups of 5 make 15 total"
        equations={[String.raw`3 \times 5 = 15`]}
      />
      <ProseBlock
        spacingTop
        subtitle="Why it's true"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        The meaning of mulitplication: repeated addition. You're literally
        counting up identital groups.
      </ProseBlock>

      <ProseBlock
        spacingTop
        subtitle="How it connects to division"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        Division then asks some questions:
      </ProseBlock>
      <Spacer />
      <QuoteBlock secondary>
        <Typography variant="h6" gutterBottom>
          How many groups?
        </Typography>
        <MathInline
          bold
          color="secondary.main"
          math={String.raw`\text{total} \div \text{(group size)} = \text{(number of groups)}`}
        />
      </QuoteBlock>
      <Spacer />
      <QuoteBlock secondary>
        <>
          <Typography variant="h6" gutterBottom>
            How big is one group?
          </Typography>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`\text{total} \div \text{(number of groups)} = \text{(group size)}`}
          />
        </>
      </QuoteBlock>

      <ProseBlock
        spacingTop
        subtitle="Why it matters for fractions"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        When dividing by a fraction, you're still doing repeated addition. Just
        with non-whole groups.
      </ProseBlock>

      <Spacer />
      <EquationCard
        title="Fraction Division Example"
        subtitle="How many groups fit into a whole?"
        equations={[
          String.raw`\text{How many } \frac{3}{4} \text{ sized groups fit into 2 wholes?}`,
          String.raw`2 \div \frac{3}{4} = 2 \times \frac{4}{3} = \frac{8}{3}`,
        ]}
        footer={
          <>
            <Typography variant="body2">
              In this example, 2 wholes is the total, and each group is of size
              3/4. The answer, 8/3 is the number of groups.
            </Typography>
            <Typography variant="body2">
              It's still groups and group size, just with non-whole groups.
            </Typography>
          </>
        }
      />

      {/* SECTION MULTIPLECATIVE COMPARISON BLOCK */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="multiplicative-comparision"
        subtitle="Multiplicative Comparison"
        options={{ subtitleVariant: 'h5' }}
      />
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Formula:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\text{(original value)} \times \text{(comparison factor)} = \text{new value}`}
          />
        </>
      </QuoteBlock>
      <Spacer />
      <EquationCard
        title="Example (ratio context)"
        subtitle="An adult is 160 cm. A child's height is 3/4 as tall as an adult."
        equations={[
          String.raw`\text{adult} \times \frac{3}{4} = \text{child}`,
          String.raw`\text{child} = \text{160 cm} \times \frac{3}{4} = \text{120 cm}`,
        ]}
      />
      <ProseBlock
        spacingTop
        subtitle="Why it's true"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        Multiplication isn't just for "repeated addition". It can also be used
        for <i>scaling</i>.
      </ProseBlock>
      <ProseBlock
        spacingTop
        subtitle="How it connects to division"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        To "undo" the <i>scaling</i>, divide by the factor or the number you
        multiply by to scale another number.
      </ProseBlock>
      <Spacer />
      <NoteBlock>
        The factor is the number your multiply by to scale another number.
        <Typography sx={{ pt: 2, color: 'secondary.main' }}>
          <MathInline bold math={String.raw`\frac{3}{4}`} padded /> as tall
          means: factor ={' '}
          <MathInline bold math={String.raw`\frac{3}{4}`} padded /> (scaling
          down)
        </Typography>
      </NoteBlock>
      <SectionSpacer size={blockSpaceSize} />
      <QuoteBlock secondary>
        <Typography variant="h6" gutterBottom>
          We are scaling down the child by the factor{' '}
          <MathInline bold math={String.raw`\frac{3}{4}`} /> of an adult
          (160cm).
        </Typography>
        <MathInline
          bold
          color="secondary.main"
          math={String.raw`\text{child} \div \frac{3}{4} = \text{adult}`}
        />
      </QuoteBlock>
      <ProseBlock
        spacingTop
        subtitle="Why it matters for fractions"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        It matters because it helps us decide when division is finding the{' '}
        <i>original</i> value rather than counting groups.
      </ProseBlock>
      <Spacer />
      <EquationCard
        title="Scaling Terminology"
        subtitle="Finding the original value"
        equations={[
          String.raw`\text{is } \frac{4}{5} \text{ as tall as}`,
          String.raw`\text{is } \frac{2}{3} \text{ of}`,
          String.raw`\text{scaled by } 1.5`,
        ]}
      />

      {/* SECTION RECTANGULAR AREA BLOCK */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="rectangular-area"
        subtitle="Rectangular Area (Geometric Model)"
        options={{ subtitleVariant: 'h5' }}
      />
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Formula:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\text{base} \times \text{height = area}`}
          />
        </>
      </QuoteBlock>
      <Spacer />
      <EquationCard
        title="Example (geometry)"
        subtitle="A rectangle 4cm wide and 3cm tall"
        equations={[
          String.raw`\text{4 cm} \times \text{3 cm} = \text{12 cm}^{2}`,
        ]}
        footer={
          <Typography variant="body2">
            ...has an area of 12 cm
            <MathInline math={String.raw`^{2}`} />
            {'.'}
          </Typography>
        }
      />
      <ProseBlock
        spacingTop
        subtitle="Why it's true"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        If you imagine the rectangle's base as the number of "rows" and the
        height as the number of "columns", you get <b>repeated groups</b>, but
        in two directions.
      </ProseBlock>
      <ProseBlock spacingTop>
        This connects geometry to arithmetic. Cool!
      </ProseBlock>
      <ProseBlock spacingTop subtitle="How it connects to division">
        If you know the area and one side or a rectangle, you can divide to find
        the missing side.
      </ProseBlock>
      <QuoteBlock secondary>
        <Typography gutterBottom>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`\text{area} \div \text{base} = \text{height}`}
          />
        </Typography>
        <Typography>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`\text{area} \div \text{height} = \text{base}`}
          />
        </Typography>
      </QuoteBlock>
      <ProseBlock
        spacingTop
        subtitle="Why it matters for fractions"
        options={{ subtitleVariant: 'subtitle2' }}
      >
        In word problems about <i>area</i> or <i>layouts</i>, the rectangular
        model shows how multiplying or dividing fractions affects two dimensions
        instead of one.
      </ProseBlock>

       <SectionSpacer size={sectionSpaceSize} />

      <ProseBlock
        anchor
        title="How They Fit Together"
        id="how-they-fit-together"
      />
    <ProseBlock
      spacingTop
      subtitle="A quick guide for remembering how fractions are used in word problems."
      options={{ subtitleVariant: 'subtitle2' }}
    >
        Each model uses the same multiplication symbol <b>(X)</b>, but in a slightly different way.
    </ProseBlock>
      <ConceptCardGrid items={demoItems} descriptionLabel='X means...' applicationLabel='Division means...' examplesLabel='Story Types' />
      <SectionSpacer size={sectionSpaceSize} />

      <ProseBlock
        anchor
        title="In Short"
        id="in-short"
      />

      <TopicBlock
        title="Multiplication can mean"
        items={[
          'Combining equal groups -> "How many altogether"',
          'Scaling a quantity -> "How big or small after multiplying by a factor"',
          'Finding the area -> "How much space when multiplying two measures"',
        ]}
      />
      <SectionSpacer />
    </PageLayout>
  );
}

