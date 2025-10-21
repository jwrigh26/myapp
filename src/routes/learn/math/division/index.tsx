import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { Spacer, SectionSpacer } from '@/components/Spacer';
import {
  MathInline,
  MathBlock,
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

export const Route = createFileRoute('/learn/math/division/')({
  component: MathDivision,
  head: () => ({
    getTitle: () => 'Division',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content: 'Learn the basics of division, long division, and dividing with decimals',
      },
      {
        title: 'Division',
      },
    ],
  }),
});

const sectionSpaceSize = 12;
const blockSpaceSize = 8;

function MathDivision() {
  return (
    <PageLayout>
      <TitleBlock
        title="Division"
        subtitle="Understanding division from basics to long division"
      />
      
      <IntroBlock>
        Division is one of the four basic operations in arithmetic. It answers the question: 
        "How many times does one number fit into another?"
      </IntroBlock>

      {/* KEY VOCABULARY SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Key Vocabulary"
        id="key-vocabulary"
        subtitle="Essential terms you need to know"
      />

      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Division Formula:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\text{Dividend} \div \text{Divisor} = \text{Quotient}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <TopicBlock
        title="The four key terms"
        items={[
          <>Dividend <Arrow /> the number being divided (the "big number" you start with)</>,
          <>Divisor <Arrow /> the number you're dividing by</>,
          <>Quotient <Arrow /> the result (how many times the divisor fits)</>,
          <>Remainder <Arrow /> what's left over after division</>,
        ]}
      />

      <Spacer />
      <EquationCard
        title="Example with terms labeled"
        subtitle="36 ÷ 4 = 9"
        equations={[
          String.raw`\underbrace{36}_{\text{Dividend}} \div \underbrace{4}_{\text{Divisor}} = \underbrace{9}_{\text{Quotient}}`,
        ]}
        footer={
          <Typography variant="body2">
            "36 divided by 4 equals 9" means that 4 fits into 36 exactly 9 times.
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          Memory anchor: "Dividend ÷ Divisor = Quotient (with remainder)"
        </Typography>
      </NoteBlock>

      {/* DIVISION NOTATION SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Ways to Write Division"
        id="division-notation"
        subtitle="Different notation, same meaning"
      />

      <ProseBlock spacingTop>
        Division can be written in multiple ways. They all mean the same thing!
      </ProseBlock>

      <Spacer />
      <EquationCard
        title="Three ways to write the same division"
        subtitle="12 divided by 3 equals 4"
        equations={[
          String.raw`12 \div 3 = 4 \quad \text{(division symbol)}`,
          String.raw`\frac{12}{3} = 4 \quad \text{(fraction notation)}`,
          String.raw`3 \overline{)12} \quad \text{(long division notation)}`,
        ]}
      />

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Remember:</strong> In fraction notation, the top number is always the dividend.
          </Typography>
          <Typography variant="body2">
            Memory anchor: "Top dog (dividend) goes inside the house 🏠. Bottom dog (divisor) stays outside. 🐶"
          </Typography>
        </>
      </NoteBlock>

      {/* BASIC DIVISION SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Basic Division"
        id="basic-division"
        subtitle="Simple division without remainders"
      />

      <ProseBlock spacingTop>
        Let's start with division where the numbers divide evenly (no remainder).
      </ProseBlock>

      <Spacer />
      <EquationSteps
        title="Simple Division Example"
        subtitle="How many 5's go into 25?"
        steps={[
          String.raw`25 \div 5 = ?`,
          String.raw`25 \div 5 = 5`,
        ]}
        footer={
          <Typography variant="body2">
            This means that 5 fits into 25 exactly <strong>5 times</strong>.
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="More Basic Examples"
        equations={[
          String.raw`20 \div 4 = 5`,
          String.raw`36 \div 6 = 6`,
          String.raw`48 \div 8 = 6`,
          String.raw`81 \div 9 = 9`,
        ]}
      />

      {/* DIVISION WITH REMAINDERS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Division with Remainders"
        id="division-remainders"
        subtitle="When numbers don't divide evenly"
      />

      <ProseBlock spacingTop>
        Sometimes division doesn't work out evenly. The amount left over is called the <strong>remainder</strong>.
      </ProseBlock>

      <Spacer />
      <EquationSteps
        title="Division with Remainder Example"
        subtitle="13 ÷ 4 doesn't divide evenly"
        steps={[
          String.raw`13 \div 4 = ?`,
          String.raw`13 \div 4 = 3 \text{ R } 1`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              4 goes into 13 <strong>3 times</strong> (4 × 3 = 12)
            </Typography>
            <Typography variant="body2">
              With <strong>1 left over</strong> (13 - 12 = 1)
            </Typography>
          </>
        }
      />

      <Spacer />
      <QuoteBlock secondary>
        <>
          <Typography variant="h6" gutterBottom>
            Check your work:
          </Typography>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`(\text{Quotient} \times \text{Divisor}) + \text{Remainder} = \text{Dividend}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationCard
        title="Checking the remainder example"
        subtitle="Verify: 13 ÷ 4 = 3 R 1"
        equations={[
          String.raw`(3 \times 4) + 1 = 13`,
          String.raw`12 + 1 = 13 \quad \checkmark`,
        ]}
      />

      {/* LONG DIVISION SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Long Division"
        id="long-division"
        subtitle="The step-by-step process"
      />

      <ProseBlock spacingTop>
        Long division is a method for dividing larger numbers. It uses a systematic approach
        with steps you repeat until you're done.
      </ProseBlock>

      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            The Long Division Chant:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            Divide <Arrow /> Multiply <Arrow /> Subtract <Arrow /> Bring Down <Arrow /> Repeat
          </Typography>
        </>
      </QuoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Long Division Setup:</strong>
          </Typography>
          <Typography variant="body2" component="div" sx={{ pl: 2 }}>
            • Divisor goes <strong>outside</strong> the division bracket<br />
            • Dividend goes <strong>inside</strong> the division bracket<br />
            • Quotient goes <strong>on top</strong> of the bracket
          </Typography>
        </>
      </NoteBlock>

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Long Division Example: 156 ÷ 12"
        subtitle="Step-by-step walkthrough"
        steps={[
          String.raw`\text{Step 1: Divide} \quad 12 \text{ into } 15 = 1 \text{ time}`,
          String.raw`\text{Step 2: Multiply} \quad 1 \times 12 = 12`,
          String.raw`\text{Step 3: Subtract} \quad 15 - 12 = 3`,
          String.raw`\text{Step 4: Bring down} \quad \text{bring down the 6 to make 36}`,
          String.raw`\text{Step 5: Repeat} \quad 12 \text{ into } 36 = 3 \text{ times}`,
          String.raw`156 \div 12 = 13`,
        ]}
        footer={
          <Typography variant="body2">
            The quotient is <strong>13</strong> because 12 fits into 156 exactly 13 times.
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Long Division with Remainder: 157 ÷ 12"
        subtitle="Same problem, but with 1 extra"
        steps={[
          String.raw`\text{Following the same steps as before...}`,
          String.raw`12 \times 13 = 156`,
          String.raw`157 - 156 = 1`,
          String.raw`157 \div 12 = 13 \text{ R } 1`,
        ]}
        footer={
          <Typography variant="body2">
            There's 1 left over after fitting 12 into 157 thirteen times.
          </Typography>
        }
      />

      {/* DIVISION WITH DECIMALS */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Division with Decimals"
        id="division-decimals"
        subtitle="When you want an exact answer"
      />

      <ProseBlock spacingTop>
        Instead of leaving a remainder, we can continue dividing and express the answer as a decimal.
      </ProseBlock>

      <Spacer />
      <EquationSteps
        title="Converting Remainder to Decimal"
        subtitle="13 ÷ 4 = ?"
        steps={[
          String.raw`13 \div 4 = 3 \text{ R } 1 \quad \text{(with remainder)}`,
          String.raw`\text{Or continue: } 13.0 \div 4`,
          String.raw`13 \div 4 = 3.25 \quad \text{(as a decimal)}`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              After getting quotient 3, add a decimal point and a zero: 13.0
            </Typography>
            <Typography variant="body2">
              Bring down the 0, making 10. Then 4 goes into 10 two times (8), with 2 left.
              Continue the process: 4 goes into 20 five times exactly.
            </Typography>
          </>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="More Decimal Division Examples"
        equations={[
          String.raw`15 \div 4 = 3.75`,
          String.raw`17 \div 5 = 3.4`,
          String.raw`22 \div 8 = 2.75`,
        ]}
      />

      <Spacer />
      <NoteBlock>
        <Typography variant="body2">
          <strong>Pro Tip:</strong> You can keep adding zeros and dividing until you get an exact answer,
          or round to a certain number of decimal places (like 2 decimal places for money).
        </Typography>
      </NoteBlock>

      {/* COMMON MISTAKES SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Common Mistakes to Avoid"
        id="common-mistakes"
      />

      <Spacer />
      <QuoteBlock secondary>
        <>
          <Typography variant="h6" gutterBottom sx={{ color: 'error.main' }}>
            ❌ Wrong Order
          </Typography>
          <Typography variant="body2" gutterBottom>
            "12 divided by 3" is NOT the same as "3 divided by 12"
          </Typography>
          <Typography variant="body2">
            <MathInline math={String.raw`12 \div 3 = 4`} /> but{' '}
            <MathInline math={String.raw`3 \div 12 = 0.25`} />
          </Typography>
        </>
      </QuoteBlock>

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Memory Anchor:</strong>
          </Typography>
          <Typography variant="body2">
            When you say "12 divided by 3", think of the fraction{' '}
            <MathInline math={String.raw`\frac{12}{3}`} />
          </Typography>
          <Typography variant="body2" sx={{ pt: 1 }}>
            The first number (12) goes on top, the second number (3) goes on bottom.
          </Typography>
        </>
      </NoteBlock>

      {/* QUICK REFERENCE */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Quick Reference"
        id="quick-reference"
      />

      <Spacer />
      <TopicBlock
        title="Division Checklist"
        items={[
          'Identify the dividend (number being divided) and divisor (number dividing by)',
          'Determine if you want a remainder or decimal answer',
          'For long division: Divide, Multiply, Subtract, Bring Down, Repeat',
          'Check your work: (Quotient × Divisor) + Remainder = Dividend',
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Division is the opposite of Multiplication"
        headerColor="secondary.main"
        equations={[
          String.raw`\text{If } 4 \times 5 = 20`,
          String.raw`\text{Then } 20 \div 5 = 4 \text{ and } 20 \div 4 = 5`,
        ]}
        footer={
          <Typography variant="body2">
            You can always check division by multiplying your answer by the divisor!
          </Typography>
        }
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
