import { createLazyFileRoute } from '@tanstack/react-router';
import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import CodeBlock from '@/components/CodeBlock';

export const Route = createLazyFileRoute('/learn/math/dividing-fractions/examples')({
  component: MathExamples,
});

function MathExamples() {
  return (
    <>
      <TitleBlock
        title="Interactive Math Examples"
        subtitle="Real-world applications and practice problems"
      />

      <ProseBlock>
        Let's explore some practical examples that demonstrate mathematical 
        concepts in action. These examples will help solidify your understanding 
        through hands-on experience.
      </ProseBlock>

      <TitleBlock
        title="Example 1: Compound Interest"
        subtitle="Understanding exponential growth in finance"
      />

      <ProseBlock>
        Compound interest is a perfect example of exponential functions in 
        real life. Here's how your money can grow over time:
      </ProseBlock>

      <CodeBlock
        language="javascript"
        code={`// Compound Interest Calculator
function calculateCompoundInterest(principal, rate, time, compoundingFrequency) {
  // A = P(1 + r/n)^(nt)
  const amount = principal * Math.pow(
    (1 + rate / compoundingFrequency), 
    compoundingFrequency * time
  );
  
  return {
    finalAmount: amount.toFixed(2),
    interestEarned: (amount - principal).toFixed(2)
  };
}

// Example: $1000 at 5% annually for 10 years, compounded monthly
const result = calculateCompoundInterest(1000, 0.05, 10, 12);
console.log(\`Final Amount: $\${result.finalAmount}\`);
console.log(\`Interest Earned: $\${result.interestEarned}\`);`}
      />

      <TitleBlock
        title="Example 2: Fibonacci Sequence"
        subtitle="Nature's mathematical pattern"
      />

      <ProseBlock>
        The Fibonacci sequence appears everywhere in nature - from flower petals 
        to spiral galaxies. Let's implement it recursively and iteratively:
      </ProseBlock>

      <CodeBlock
        language="javascript"
        code={`// Recursive approach (elegant but inefficient for large n)
function fibonacciRecursive(n) {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// Iterative approach (efficient)
function fibonacciIterative(n) {
  if (n <= 1) return n;
  
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

// Generate the first 10 Fibonacci numbers
const fibSequence = Array.from({length: 10}, (_, i) => fibonacciIterative(i));
console.log('First 10 Fibonacci numbers:', fibSequence);
// Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`}
      />

      <ProseBlock>
        Try calculating larger Fibonacci numbers and notice how much faster 
        the iterative approach becomes compared to the recursive one!
      </ProseBlock>
    </>
  );
}
