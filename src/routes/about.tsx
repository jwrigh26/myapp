import AboutContent from '@/components/AboutContent';
import { IndexLayout } from '@/layout';
import { generateOpenGraphMeta } from '@/utils/openGraph';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
  head: () => ({
    title: 'About Justin Wright - Frontend Engineer & Product Thinker',
    meta: generateOpenGraphMeta({
      title: 'About Justin Wright',
      description:
        'Learn more about my journey as a Senior Frontend Engineer with a passion for UX and product strategy. From Lego building blocks to modern web applications.',
      imageKey: '20250701-image-20250723-home1',
      url: '/about',
      type: 'website',
    }),
  }),
});

function AboutComponent() {
  return (
    <IndexLayout>
      <AboutContent />
    </IndexLayout>
  );
}
