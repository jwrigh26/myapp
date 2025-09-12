import { PageLayout } from '@/layout';
import { generateOpenGraphMeta } from '@/utils/openGraph';
import { createFileRoute } from '@tanstack/react-router';

// Panels
import { Panel1 } from '@/features/about';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
  head: () => ({
    title: 'About Me FAQ',
    meta: generateOpenGraphMeta({
      title: 'About Me',
      description:
        'Learn more about me through a series of fun comics and FAQs!',
      imageKey: '20250701-image-20250723-home1',
      url: '/about',
      type: 'website',
    }),
  }),
});

function AboutComponent() {
  return (
    <PageLayout>
      <Panel1 />
    </PageLayout>
  );
}
