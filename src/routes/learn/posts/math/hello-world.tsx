import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/posts/math/hello-world')({
  component: MathHelloWorld,
  head: () => ({
    getTitle: () => 'Hello Math World',
    meta: [
      {
        name: 'description',
        content: 'A friendly introduction to mathematical concepts and learning',
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
        Welcome to the mathematics section! This is where we'll explore the beautiful 
        world of mathematical concepts, from the fundamental building blocks to 
        advanced topics that power modern technology.
      </ProseBlock>

      <ProseBlock>
        Mathematics is often seen as intimidating, but it's really just a language 
        for describing patterns and relationships in the world around us. Whether 
        you're refreshing basic concepts or diving into new territory, this space 
        is designed to make math approachable and practical.
      </ProseBlock>

      <ProseBlock>
        Some of the topics we'll cover include:
      </ProseBlock>

      <ProseBlock>
        • <strong>Discrete Mathematics</strong> - Logic, sets, combinatorics, and graph theory
        <br />
        • <strong>Calculus</strong> - Understanding change and optimization
        <br />
        • <strong>Linear Algebra</strong> - Vectors, matrices, and transformations
        <br />
        • <strong>Statistics & Probability</strong> - Making sense of data and uncertainty
        <br />
        • <strong>Applied Mathematics</strong> - Real-world problem solving
      </ProseBlock>

      <ProseBlock>
        Each topic will include clear explanations, worked examples, and connections 
        to practical applications in computer science and engineering. Let's make 
        math less mysterious and more meaningful!
      </ProseBlock>
    </>
  );
}
