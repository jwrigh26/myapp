import TitleBlock from '@/components/TitleBlock';
import ProseBlock from '@/components/ProseBlock';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/learn/posts/dsa/hello-world')({
  component: DsaHelloWorld,
  head: () => ({
    getTitle: () => 'Hello DSA World',
    meta: [
      {
        name: 'description',
        content: 'Introduction to data structures and algorithms learning journey',
      },
      {
        title: 'Hello DSA World',
      },
    ],
  }),
});

function DsaHelloWorld() {
  return (
    <>
      <TitleBlock 
        title="Hello Data Structures & Algorithms World" 
        subtitle="Beginning our journey through computational problem-solving"
      />
      
      <ProseBlock>
        Welcome to the Data Structures and Algorithms section! This is the heart 
        of computer science - where we learn to think computationally and solve 
        problems efficiently.
      </ProseBlock>

      <ProseBlock>
        Whether you're preparing for technical interviews, wanting to write better 
        code, or simply curious about how computers solve complex problems, this 
        section will guide you through the fundamental concepts and advanced 
        techniques.
      </ProseBlock>

      <ProseBlock>
        What we'll explore together:
      </ProseBlock>

      <ProseBlock>
        • <strong>Basic Data Structures</strong> - Arrays, linked lists, stacks, and queues
        <br />
        • <strong>Trees & Graphs</strong> - Hierarchical and network data organization
        <br />
        • <strong>Sorting & Searching</strong> - Fundamental algorithms every developer should know
        <br />
        • <strong>Dynamic Programming</strong> - Breaking down complex problems
        <br />
        • <strong>Graph Algorithms</strong> - Shortest paths, network flows, and more
        <br />
        • <strong>Advanced Topics</strong> - Heaps, tries, and specialized structures
      </ProseBlock>

      <ProseBlock>
        Each topic includes clear explanations, code examples, time/space complexity 
        analysis, and practical applications. We'll start with the basics and 
        gradually build up to more sophisticated algorithms.
      </ProseBlock>

      <ProseBlock>
        Remember: understanding algorithms isn't just about memorizing solutions - 
        it's about developing the problem-solving mindset that makes you a better 
        programmer. Let's dive in!
      </ProseBlock>
    </>
  );
}
