import { ArticleLayout } from '@/components/blog';
import BlogSection from '@/components/blog/BlogSection';
import BlogSubsection from '@/components/blog/BlogSubsection';
import { BlogLayout } from '@/layout';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/soft-skills/learn-names')({
  component: LearnNamesPost,
  head: () => ({
    getTitle: () => 'Learn Names',
    meta: [
      {
        name: 'description',
        content: 'Why remembering names is important',
      },
      {
        title: 'Learn Names',
      },
    ],
  }),
});

function LearnNamesPost() {
  return (
    <BlogLayout id="learn-names-post">
      <ArticleLayout
        title="Learn Names"
        preSubtitle="Foo Herp"
        imageAlt="Learn Names"
        sources={createImageSources('20250701-image-20250712-dumbdumber')}
        imageSrc={getDefaultImageSrc('20250701-image-20250712-dumbdumber')}
        date="2025-07-21"
        sectionTitle="Soft Skills"
        sectionSubtitle="Why remembering names is important"
        introContent={
          <>
            In a world of Slack handles, GitHub usernames, and video call
            avatars,
          </>
        }
      >
        <BlogSection
          id="introduction"
          title="When Harry forgot Her Mary"
          imageAlt="Learn Names"
          sources={createImageSources('20250701-image-20250712-dumbdumber')}
          imageSrc={getDefaultImageSrc('20250701-image-20250712-dumbdumber')}
          apsectRatio={4 / 3.4}
          caption="Lloyd Christmas and Harry Dunne in Dumb and Dumber"
        >
          In the hit comedy of the early nineties, Dumb and Dumber, there is a
          famous scene when Lloyd is trying to recall Mary’s last name.
        </BlogSection>

        <BlogSubsection title="Multiple Host Sites">
          We support a handful of different host sites. They serve as the
          backbone for displaying various front-end modules.
        </BlogSubsection>

        <p>Harry asks, “What's her last name? I'll look it up.”</p>

        <p>
          Lloyd responds, “You know, I don't really recall. Starts with an S!
          Let's see. Swim? Swammi? Slippy? Slappy? Swenson? Swanson?”
        </p>
      </ArticleLayout>
    </BlogLayout>
  );
}
