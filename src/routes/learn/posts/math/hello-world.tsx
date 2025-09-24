import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { _DemoExamples } from '@/components/MathBlock';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/posts/math/hello-world')({
  component: MathHelloWorld,
  head: () => ({
    getTitle: () => 'Hello Math World',
    meta: [
      {
        name: 'description',
        content:
          'A friendly introduction to mathematical concepts and learning',
      },
      {
        title: 'Hello Math World',
      },
    ],
  }),
});

function MathHelloWorld() {
  return (
    <>
      <TitleBlock
        title="Hello Math World"
        subtitle="Welcome to our mathematical journey together"
      />

      <ProseBlock>
        Welcome to the mathematics section! This is where we'll explore the
        beautiful world of mathematical concepts, from the fundamental building
        blocks to advanced topics that power modern technology.
      </ProseBlock>

      <TitleBlock
        title="Basic Math Operations"
        subtitle="Visual representations of fundamental arithmetic"
      />

      <ProseBlock>
        Let's start with the building blocks of mathematics - the basic
        arithmetic operations. Below you'll see how these operations look when
        properly formatted, just like in traditional math textbooks.
      </ProseBlock>
      <_DemoExamples />
    </>
  );
}
