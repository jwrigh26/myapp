import { createLazyFileRoute } from '@tanstack/react-router';
import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import CodeBlock from '@/components/CodeBlock';

export const Route = createLazyFileRoute('/learn/math/hello-world/advanced')({
  component: AdvancedMathConcepts,
});

function AdvancedMathConcepts() {
  return (
    <>
      <TitleBlock
        title="Advanced Mathematical Concepts"
        subtitle="Deep dive into complex mathematical ideas"
      />

      <ProseBlock>
        Now that you've mastered the basics, let's explore some advanced 
        mathematical concepts that will expand your understanding of the 
        mathematical universe.
      </ProseBlock>

      <TitleBlock
        title="Complex Numbers"
        subtitle="Numbers beyond the real line"
      />

      <ProseBlock>
        Complex numbers extend our number system to include the square root 
        of negative numbers. They're represented as a + bi, where i is the 
        imaginary unit.
      </ProseBlock>

      <CodeBlock
        language="latex"
        code={`i^2 = -1

z = a + bi

|z| = \\sqrt{a^2 + b^2}`}
      />

      <TitleBlock
        title="Calculus Fundamentals"
        subtitle="The mathematics of change"
      />

      <ProseBlock>
        Calculus gives us the tools to understand rates of change and 
        accumulation. Here are some fundamental concepts:
      </ProseBlock>

      <CodeBlock
        language="latex"
        code={`\\frac{d}{dx}[x^n] = nx^{n-1}

\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C

\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = f'(x)`}
      />
    </>
  );
}
