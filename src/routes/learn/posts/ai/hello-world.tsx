import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/posts/ai/hello-world')({
  component: AiHelloWorld,
  head: () => ({
    getTitle: () => 'Hello AI World',
    meta: [
      {
        name: 'description',
        content:
          'Introduction to artificial intelligence and machine learning concepts',
      },
      {
        title: 'Hello AI World',
      },
    ],
  }),
});

function AiHelloWorld() {
  return (
    <>
      <TitleBlock
        title="Hello AI & Machine Learning World"
        subtitle="Exploring the frontiers of artificial intelligence"
      />

      <ProseBlock>
        Welcome to the AI and Machine Learning section! This is where we explore
        one of the most exciting and rapidly evolving fields in technology
        today. From basic concepts to cutting-edge techniques, we'll demystify
        artificial intelligence together.
      </ProseBlock>

      <ProseBlock>
        AI and ML can seem overwhelming with all the buzzwords and complex
        mathematics, but at its core, it's about teaching computers to recognize
        patterns and make predictions. We'll start from the ground up and build
        understanding step by step.
      </ProseBlock>

      <ProseBlock>Our journey will cover:</ProseBlock>

      <ProseBlock>
        • <strong>Machine Learning Fundamentals</strong> - Supervised,
        unsupervised, and reinforcement learning
        <br />• <strong>Neural Networks</strong> - From perceptrons to deep
        learning
        <br />• <strong>Computer Vision</strong> - Teaching machines to "see"
        <br />• <strong>Natural Language Processing</strong> - Understanding and
        generating human language
        <br />• <strong>Practical Applications</strong> - Real-world AI
        implementation
        <br />• <strong>Ethics & Future</strong> - Responsible AI development
      </ProseBlock>

      <ProseBlock>
        Each topic will include intuitive explanations, visual examples, and
        hands-on coding exercises. We'll use practical examples to illustrate
        concepts and show how AI is being used to solve real problems.
      </ProseBlock>

      <ProseBlock>
        Whether you're a complete beginner or looking to deepen your
        understanding, this section aims to make AI accessible and exciting.
        Let's explore the future of technology together!
      </ProseBlock>
    </>
  );
}
