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

export const Route = createFileRoute('/learn/math/exponents/')({
  component: MathExponents,
  head: () => ({
    getTitle: () => 'Exponents & Roots',
    includeInDrawer: true,
    meta: [
      {
        name: 'description',
        content: 'Master exponents, roots, fractional exponents, and logarithmic form',
      },
      {
        title: 'Exponents & Roots',
      },
    ],
  }),
});

const sectionSpaceSize = 12;
const blockSpaceSize = 8;

function MathExponents() {
  return (
    <PageLayout>
      <TitleBlock
        title="Exponents & Roots"
        subtitle="Master repeated multiplication, roots, and their relationship"
      />
      
      <IntroBlock>
        Exponents represent repeated multiplication. Understanding them unlocks algebra, 
        calculus, and science. This guide will help you master exponents, roots, and their 
        tricky cousin: fractional exponents.
      </IntroBlock>

      {/* WHAT ARE EXPONENTS SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="What Are Exponents?"
        id="what-are-exponents"
        subtitle="Repeated multiplication made simple"
      />

      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Exponent Form:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\text{base}^{\text{exponent}} = \text{result}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationCard
        title="Basic Example"
        subtitle="2 multiplied by itself 3 times"
        equations={[
          String.raw`2^3 = 2 \times 2 \times 2 = 8`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              <MathInline math={String.raw`2`} /> is the <strong>base</strong> (the number being multiplied)
            </Typography>
            <Typography variant="body2">
              <MathInline math={String.raw`3`} /> is the <strong>exponent</strong> (how many times to multiply)
            </Typography>
          </>
        }
      />

      <Spacer />
      <TopicBlock
        title="Reading exponents"
        items={[
          <>
            <MathInline math={String.raw`2^3`} /> <Arrow /> "2 to the 3rd power" or "2 cubed"
          </>,
          <>
            <MathInline math={String.raw`5^2`} /> <Arrow /> "5 to the 2nd power" or "5 squared"
          </>,
          <>
            <MathInline math={String.raw`10^6`} /> <Arrow /> "10 to the 6th power"
          </>,
        ]}
      />

      {/* BASE CASES SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Special Cases"
        id="special-cases"
        subtitle="These show up everywhere"
      />

      <ProseBlock spacingTop>
        Before learning the rules, you need to know these fundamental cases.
      </ProseBlock>

      <Spacer />
      <EquationCard
        title="Exponent of 0"
        subtitle="Any number to the power of 0 equals 1"
        equations={[
          String.raw`x^0 = 1`,
          String.raw`5^0 = 1`,
          String.raw`1000^0 = 1`,
          String.raw`(-7)^0 = 1`,
        ]}
        footer={
          <Typography variant="body2">
            <strong>Exception:</strong> <MathInline math={String.raw`0^0`} /> is undefined (mathematicians debate this one!)
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Exponent of 1"
        subtitle="Any number to the power of 1 is itself"
        equations={[
          String.raw`x^1 = x`,
          String.raw`5^1 = 5`,
          String.raw`1000^1 = 1000`,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Base of 1"
        subtitle="1 raised to any power is always 1"
        equations={[
          String.raw`1^n = 1`,
          String.raw`1^5 = 1`,
          String.raw`1^{100} = 1`,
        ]}
      />

      <Spacer />
      <NoteBlock>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          Memory anchor: "Zero power = 1, One power = itself, Base 1 = always 1"
        </Typography>
      </NoteBlock>

      {/* EXPONENT RULES SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="The 5 Essential Rules"
        id="exponent-rules"
        subtitle="Master these and you'll handle any exponent problem"
      />

      <ProseBlock spacingTop>
        These rules work for any base <MathInline math={String.raw`x`} /> (as long as <MathInline math={String.raw`x \neq 0`} />).
      </ProseBlock>

      {/* Rule 1: Multiplication */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="rule-multiplication"
        subtitle="Rule 1: Multiplying Same Base"
        options={{ subtitleVariant: 'h5' }}
      />
      
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Add the exponents:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`x^a \cdot x^b = x^{a+b}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Example: Multiply Powers"
        subtitle="Same base? Add exponents!"
        steps={[
          String.raw`2^3 \cdot 2^4 = ?`,
          String.raw`= 2^{3+4}`,
          String.raw`= 2^7`,
          String.raw`= 128`,
        ]}
        footer={
          <Typography variant="body2">
            Think: <MathInline math={String.raw`(2 \cdot 2 \cdot 2) \times (2 \cdot 2 \cdot 2 \cdot 2) = 2^7`} />
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <Typography variant="body2">
          <strong>Common Mistake:</strong> Don't multiply the bases! <MathInline math={String.raw`2^3 \cdot 2^4 \neq 4^7`} />
        </Typography>
      </NoteBlock>

      {/* Rule 2: Division */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="rule-division"
        subtitle="Rule 2: Dividing Same Base"
        options={{ subtitleVariant: 'h5' }}
      />
      
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Subtract the exponents:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\frac{x^a}{x^b} = x^{a-b}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Example: Divide Powers"
        subtitle="Same base? Subtract exponents!"
        steps={[
          String.raw`\frac{5^7}{5^3} = ?`,
          String.raw`= 5^{7-3}`,
          String.raw`= 5^4`,
          String.raw`= 625`,
        ]}
      />

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Why does this work?</strong>
          </Typography>
          <Typography variant="body2">
            <MathInline math={String.raw`\frac{5^7}{5^3} = \frac{5 \cdot 5 \cdot 5 \cdot 5 \cdot 5 \cdot 5 \cdot 5}{5 \cdot 5 \cdot 5}`} />
          </Typography>
          <Typography variant="body2" sx={{ pt: 1 }}>
            Three 5's cancel out, leaving <MathInline math={String.raw`5^4`} />
          </Typography>
        </>
      </NoteBlock>

      {/* Rule 3: Power of a Power */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="rule-power-of-power"
        subtitle="Rule 3: Power of a Power"
        options={{ subtitleVariant: 'h5' }}
      />
      
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Multiply the exponents:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`(x^a)^b = x^{a \cdot b}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Example: Power of a Power"
        subtitle="Raising a power to another power"
        steps={[
          String.raw`(3^2)^4 = ?`,
          String.raw`= 3^{2 \cdot 4}`,
          String.raw`= 3^8`,
          String.raw`= 6561`,
        ]}
        footer={
          <Typography variant="body2">
            Think: <MathInline math={String.raw`(3^2)^4 = 3^2 \cdot 3^2 \cdot 3^2 \cdot 3^2 = 3^{2+2+2+2} = 3^8`} />
          </Typography>
        }
      />

      {/* Rule 4: Power of a Product */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="rule-power-of-product"
        subtitle="Rule 4: Power of a Product"
        options={{ subtitleVariant: 'h5' }}
      />
      
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Apply exponent to each factor:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`(xy)^a = x^a \cdot y^a`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Example: Power of a Product"
        subtitle="Distribute the exponent"
        steps={[
          String.raw`(2 \cdot 5)^3 = ?`,
          String.raw`= 2^3 \cdot 5^3`,
          String.raw`= 8 \cdot 125`,
          String.raw`= 1000`,
        ]}
      />

      {/* Rule 5: Power of a Quotient */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="rule-power-of-quotient"
        subtitle="Rule 5: Power of a Quotient"
        options={{ subtitleVariant: 'h5' }}
      />
      
      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Apply exponent to numerator and denominator:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`\left(\frac{x}{y}\right)^a = \frac{x^a}{y^a}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Example: Power of a Quotient"
        subtitle="Distribute the exponent to top and bottom"
        steps={[
          String.raw`\left(\frac{3}{4}\right)^2 = ?`,
          String.raw`= \frac{3^2}{4^2}`,
          String.raw`= \frac{9}{16}`,
        ]}
      />

      {/* NEGATIVE EXPONENTS SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Negative Exponents"
        id="negative-exponents"
        subtitle="Flip it and make it positive"
      />

      <ProseBlock spacingTop>
        A negative exponent means "reciprocal" (flip the fraction). This is where many people get stuck!
      </ProseBlock>

      <Spacer />
      <QuoteBlock secondary>
        <>
          <Typography variant="h6" gutterBottom>
            Flip and make positive:
          </Typography>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`x^{-n} = \frac{1}{x^n}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Simple Negative Exponent"
        subtitle="Move to denominator and flip the sign"
        steps={[
          String.raw`2^{-3} = ?`,
          String.raw`= \frac{1}{2^3}`,
          String.raw`= \frac{1}{8}`,
        ]}
        footer={
          <Typography variant="body2">
            <strong>Memory anchor:</strong> Negative exponent = "send to the basement" (denominator)
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Negative Exponent in Denominator"
        subtitle="Flip brings it to the numerator!"
        steps={[
          String.raw`\frac{1}{5^{-2}} = ?`,
          String.raw`= 5^2`,
          String.raw`= 25`,
        ]}
        footer={
          <Typography variant="body2">
            If it's already in the denominator with negative exponent, flipping moves it up!
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Complex Example"
        subtitle="With coefficients and negative exponents"
        steps={[
          String.raw`3x^{-2} = ?`,
          String.raw`= 3 \cdot \frac{1}{x^2}`,
          String.raw`= \frac{3}{x^2}`,
        ]}
        footer={
          <Typography variant="body2">
            Only the <MathInline math={String.raw`x`} /> moves! The 3 stays where it is.
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Common Mistake:</strong>
          </Typography>
          <Typography variant="body2">
            <MathInline math={String.raw`2^{-3} \neq -2^3`} /> and <MathInline math={String.raw`2^{-3} \neq -8`} />
          </Typography>
          <Typography variant="body2" sx={{ pt: 1 }}>
            The negative is on the exponent, not the answer!
          </Typography>
        </>
      </NoteBlock>

      {/* FRACTIONAL EXPONENTS SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Fractional Exponents (Roots)"
        id="fractional-exponents"
        subtitle="The secret connection between exponents and roots"
      />

      <ProseBlock spacingTop>
        This is the most confusing topic for most people, but once you get it, everything clicks!
      </ProseBlock>

      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Denominator = Root:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`x^{\frac{1}{n}} = \sqrt[n]{x}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <TopicBlock
        title="Understanding the fraction"
        items={[
          <>
            <strong>Denominator</strong> <Arrow /> which root (square root, cube root, etc.)
          </>,
          <>
            <strong>Numerator</strong> <Arrow /> power to raise the result to
          </>,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Simple Fractional Exponents"
        subtitle="Just the root (numerator = 1)"
        equations={[
          String.raw`4^{\frac{1}{2}} = \sqrt{4} = 2`,
          String.raw`8^{\frac{1}{3}} = \sqrt[3]{8} = 2`,
          String.raw`16^{\frac{1}{4}} = \sqrt[4]{16} = 2`,
        ]}
        footer={
          <Typography variant="body2">
            <MathInline math={String.raw`\frac{1}{2}`} /> <Arrow /> square root, <MathInline math={String.raw`\frac{1}{3}`} /> <Arrow /> cube root, <MathInline math={String.raw`\frac{1}{4}`} /> <Arrow /> fourth root
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          Memory anchor: "Denominator is the root number on the radical sign"
        </Typography>
      </NoteBlock>

      {/* FRACTIONAL EXPONENTS WITH NUMERATOR */}
      <SectionSpacer size={blockSpaceSize} />
      <ProseBlock
        anchor
        id="fractional-with-power"
        subtitle="When the Numerator Isn't 1"
        options={{ subtitleVariant: 'h5' }}
      />

      <Spacer />
      <QuoteBlock secondary>
        <>
          <Typography variant="h6" gutterBottom>
            Root first, then power:
          </Typography>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`x^{\frac{m}{n}} = \sqrt[n]{x^m} = (\sqrt[n]{x})^m`}
          />
        </>
      </QuoteBlock>

      <ProseBlock spacingTop>
        You can do it either way (power then root, or root then power), but <strong>root first</strong> keeps numbers smaller!
      </ProseBlock>

      <Spacer />
      <EquationSteps
        title="Method 1: Root First (Easier!)"
        subtitle="27 to the 2/3 power"
        steps={[
          String.raw`27^{\frac{2}{3}} = ?`,
          String.raw`= (\sqrt[3]{27})^2`,
          String.raw`= (3)^2`,
          String.raw`= 9`,
        ]}
        footer={
          <Typography variant="body2">
            Take the cube root first (27 → 3), then square it (3 → 9)
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Method 2: Power First (Harder)"
        subtitle="Same problem, different order"
        steps={[
          String.raw`27^{\frac{2}{3}} = ?`,
          String.raw`= \sqrt[3]{27^2}`,
          String.raw`= \sqrt[3]{729}`,
          String.raw`= 9`,
        ]}
        footer={
          <Typography variant="body2">
            Square first (27 → 729), then take cube root (729 → 9). Same answer, bigger numbers!
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Pro Tip:</strong> Always do root first! Smaller numbers = less chance of error.
          </Typography>
          <Typography variant="body2" sx={{ color: 'secondary.main', pt: 1 }}>
            <MathInline bold math={String.raw`x^{\frac{m}{n}}`} /> <Arrow /> "Root (denominator) first, power (numerator) second"
          </Typography>
        </>
      </NoteBlock>

      {/* MORE FRACTIONAL EXAMPLES */}
      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="More Fractional Exponent Examples"
        equations={[
          String.raw`16^{\frac{3}{4}} = (\sqrt[4]{16})^3 = 2^3 = 8`,
          String.raw`32^{\frac{2}{5}} = (\sqrt[5]{32})^2 = 2^2 = 4`,
          String.raw`125^{\frac{2}{3}} = (\sqrt[3]{125})^2 = 5^2 = 25`,
        ]}
      />

      {/* COMBINING NEGATIVE AND FRACTIONAL */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Negative Fractional Exponents"
        id="negative-fractional"
        subtitle="The final boss"
      />

      <ProseBlock spacingTop>
        This combines everything: negative exponent + fractional exponent. Handle the fraction first, then flip!
      </ProseBlock>

      <Spacer />
      <QuoteBlock>
        <>
          <Typography variant="h6" gutterBottom>
            Flip after finding the root and power:
          </Typography>
          <MathInline
            bold
            color="primary.main"
            math={String.raw`x^{-\frac{m}{n}} = \frac{1}{x^{\frac{m}{n}}} = \frac{1}{(\sqrt[n]{x})^m}`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <EquationSteps
        title="Negative Fractional Exponent"
        subtitle="Step by step breakdown"
        steps={[
          String.raw`8^{-\frac{2}{3}} = ?`,
          String.raw`= \frac{1}{8^{\frac{2}{3}}}`,
          String.raw`= \frac{1}{(\sqrt[3]{8})^2}`,
          String.raw`= \frac{1}{2^2}`,
          String.raw`= \frac{1}{4}`,
        ]}
        footer={
          <Typography variant="body2">
            Handle the fraction first: cube root of 8 = 2, then square = 4, then flip = 1/4
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="More Complex Examples"
        equations={[
          String.raw`16^{-\frac{3}{4}} = \frac{1}{(\sqrt[4]{16})^3} = \frac{1}{2^3} = \frac{1}{8}`,
          String.raw`27^{-\frac{4}{3}} = \frac{1}{(\sqrt[3]{27})^4} = \frac{1}{3^4} = \frac{1}{81}`,
        ]}
      />

      {/* ROOTS IN FRACTIONS SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Roots in Fractions"
        id="roots-in-fractions"
        subtitle="Rationalizing the denominator"
      />

      <ProseBlock spacingTop>
        When you have a root in the denominator, you usually want to "rationalize" it (get rid of the root).
      </ProseBlock>

      <Spacer />
      <EquationSteps
        title="Rationalizing Square Roots"
        subtitle="Multiply by the root over itself"
        steps={[
          String.raw`\frac{1}{\sqrt{2}} = ?`,
          String.raw`= \frac{1}{\sqrt{2}} \cdot \frac{\sqrt{2}}{\sqrt{2}}`,
          String.raw`= \frac{\sqrt{2}}{2}`,
        ]}
        footer={
          <Typography variant="body2">
            Multiply by <MathInline math={String.raw`\frac{\sqrt{2}}{\sqrt{2}} = 1`} />, which doesn't change the value!
          </Typography>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="With Coefficients"
        subtitle="Simplify after rationalizing"
        steps={[
          String.raw`\frac{5}{\sqrt{3}} = ?`,
          String.raw`= \frac{5}{\sqrt{3}} \cdot \frac{\sqrt{3}}{\sqrt{3}}`,
          String.raw`= \frac{5\sqrt{3}}{3}`,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Cube Roots"
        subtitle="Same idea, but square the root"
        steps={[
          String.raw`\frac{1}{\sqrt[3]{2}} = ?`,
          String.raw`= \frac{1}{\sqrt[3]{2}} \cdot \frac{\sqrt[3]{4}}{\sqrt[3]{4}}`,
          String.raw`= \frac{\sqrt[3]{4}}{\sqrt[3]{8}}`,
          String.raw`= \frac{\sqrt[3]{4}}{2}`,
        ]}
        footer={
          <Typography variant="body2">
            For cube roots, multiply by <MathInline math={String.raw`\sqrt[3]{4}`} /> to make the denominator <MathInline math={String.raw`\sqrt[3]{8} = 2`} />
          </Typography>
        }
      />

      {/* LOGARITHMS INTRO SECTION */}
      <SectionSpacer size={sectionSpaceSize} />
      <ProseBlock
        anchor
        title="Introduction to Logarithms"
        id="logarithms"
        subtitle="The inverse of exponents"
      />

      <ProseBlock spacingTop>
        A logarithm answers the question: "What power do I raise the base to, to get this number?"
      </ProseBlock>

      <Spacer />
      <QuoteBlock secondary>
        <>
          <Typography variant="h6" gutterBottom>
            Logarithm = Exponent Finder:
          </Typography>
          <MathInline
            bold
            color="secondary.main"
            math={String.raw`\log_b(a) = c \quad \Leftrightarrow \quad b^c = a`}
          />
        </>
      </QuoteBlock>

      <Spacer />
      <TopicBlock
        title="Parts of a logarithm"
        items={[
          <>
            <MathInline bold math={String.raw`b`} /> <Arrow /> Base (the number being raised to a power)
          </>,
          <>
            <MathInline bold math={String.raw`a`} /> <Arrow /> Argument (the result we're trying to reach)
          </>,
          <>
            <MathInline bold math={String.raw`c`} /> <Arrow /> The answer (the exponent/power)
          </>,
        ]}
      />

      <Spacer />
      <EquationSteps
        title="Converting Between Forms"
        subtitle="Two ways to say the same thing"
        steps={[
          String.raw`2^4 = 16 \quad \text{(exponential form)}`,
          String.raw`\log_2(16) = 4 \quad \text{(logarithmic form)}`,
        ]}
        footer={
          <>
            <Typography variant="body2" gutterBottom>
              Both say: "2 raised to the 4th power equals 16"
            </Typography>
            <Typography variant="body2">
              Log form isolates the exponent: "2 to <strong>what power</strong> equals 16? Answer: 4"
            </Typography>
          </>
        }
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationCard
        title="Practice Converting"
        subtitle="From exponential to logarithmic form"
        equations={[
          String.raw`3^5 = 243 \quad \Rightarrow \quad \log_3(243) = 5`,
          String.raw`10^2 = 100 \quad \Rightarrow \quad \log_{10}(100) = 2`,
          String.raw`5^3 = 125 \quad \Rightarrow \quad \log_5(125) = 3`,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <EquationSteps
        title="Solving a Logarithm"
        subtitle="What power makes this true?"
        steps={[
          String.raw`\log_4(64) = x`,
          String.raw`4^x = 64 \quad \text{(convert to exponential)}`,
          String.raw`4^x = 4^3 \quad \text{(recognize } 64 = 4^3)`,
          String.raw`x = 3`,
        ]}
        footer={
          <Typography variant="body2">
            Ask yourself: "4 to what power gives 64?" Answer: 3, because <MathInline math={String.raw`4^3 = 64`} />
          </Typography>
        }
      />

      <Spacer />
      <NoteBlock>
        <>
          <Typography variant="body2" gutterBottom>
            <strong>Common Logarithms:</strong>
          </Typography>
          <Typography variant="body2">
            • <MathInline math={String.raw`\log_{10}`} /> (base 10) <Arrow /> Called "common log," written as just <MathInline math={String.raw`\log`} />
          </Typography>
          <Typography variant="body2">
            • <MathInline math={String.raw`\log_e`} /> (base <em>e</em> ≈ 2.718) <Arrow /> Called "natural log," written as <MathInline math={String.raw`\ln`} />
          </Typography>
          <Typography variant="body2">
            • <MathInline math={String.raw`\log_2`} /> (base 2) <Arrow /> Common in computer science
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
        title="Exponent Rules Cheat Sheet"
        items={[
          <>Multiply: <MathInline math={String.raw`x^a \cdot x^b = x^{a+b}`} /></>,
          <>Divide: <MathInline math={String.raw`\frac{x^a}{x^b} = x^{a-b}`} /></>,
          <>Power of power: <MathInline math={String.raw`(x^a)^b = x^{ab}`} /></>,
          <>Negative: <MathInline math={String.raw`x^{-n} = \frac{1}{x^n}`} /></>,
          <>Fraction: <MathInline math={String.raw`x^{\frac{m}{n}} = (\sqrt[n]{x})^m`} /></>,
        ]}
      />

      <SectionSpacer size={blockSpaceSize} />
      <TopicBlock
        title="Common Mistakes to Avoid"
        items={[
          <>❌ <MathInline math={String.raw`x^a \cdot x^b \neq x^{ab}`} /> (Don't multiply exponents when multiplying same base)</>,
          <>❌ <MathInline math={String.raw`(x+y)^2 \neq x^2 + y^2`} /> (Must use FOIL: <MathInline math={String.raw`(x+y)^2 = x^2 + 2xy + y^2`} />)</>,
          <>❌ <MathInline math={String.raw`x^{-2} \neq -x^2`} /> (Negative exponent ≠ negative answer)</>,
          <>❌ <MathInline math={String.raw`\sqrt{x^2 + y^2} \neq x + y`} /> (Can't split the root across addition)</>,
        ]}
      />

      <SectionSpacer size={sectionSpaceSize} />
    </PageLayout>
  );
}
