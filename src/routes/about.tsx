import { PageLayout } from '@/layout';
import { generateOpenGraphMeta } from '@/utils/openGraph';
import { createFileRoute } from '@tanstack/react-router';
import { Spacer } from '@/components/Spacer';

// Panels
import { Panel1, Panel2 } from '@/features/about';

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
      <Spacer size={4} />
      <Panel1 id="panel1" />
      <Panel2 id="panel2" />
      <Panel1 id="panel1" />
      <Spacer size={8} />
    </PageLayout>
  );
}
