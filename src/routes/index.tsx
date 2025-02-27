import CallToAction from '@/components/CallToAction';
import CodeBlock from '@/components/CodeBlock';
import DarkModeToggle from '@/components/DarkModeToggle';
import Tagline from '@/components/Tagline';
import TitleBlock from '@/components/TitleBlock';
import { PageLayout } from '@/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

const codeBlock = `
def binary_search(arr, target):
  left = 0
  right = len(arr) - 1
  
  while left <= right:
    mid = (left + right) // 2
    if arr[mid] == target:
      return mid
    elif arr[mid] < target:
      left = mid + 1
    else:
      right = mid - 1
      
  return -1
`;

function HomeComponent() {
  return (
    <PageLayout>
      <CallToAction title="Getting Started" />
      <TitleBlock subtitle="The Home Page">Home</TitleBlock>
      <Tagline>Tagline: Welcome to the home page!</Tagline>
      <DarkModeToggle />
      <CodeBlock code={codeBlock} language="python" />
    </PageLayout>
  );
}
