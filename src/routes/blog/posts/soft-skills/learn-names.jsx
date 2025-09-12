import BackdropSection from '@/components/BackdropSection';
import BlogSection from '@/components/blog/BlogSection';
import CallToAction from '@/components/CallToAction';
import { LegacyComicStrip as ComicStrip } from '@/components/comic';
import IntroBlock from '@/components/IntroBlock';
import ProseBlock from '@/components/ProseBlock';
import QuoteBlock from '@/components/QuoteBlock';
import { SectionSpacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import { BlogLayout } from '@/layout';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';
import Stack from '@mui/material/Stack';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/blog/posts/soft-skills/learn-names')({
  component: LearnNamesPost,
  head: () => ({
    staticData: {
      title: 'Learn Names',
      description: 'Why remembering names is important',
      imageKey: '20250701-image-20250723-learnnames-avatar',
      route: '/soft-skills/learn-names',
      publishedDate: '2025-07-21',
    },
    getTitle: () => 'Learn Names',
    meta: [
      {
        title: 'Learn Names',
        description: 'Why remembering names is important',
        imageKey: '20250701-image-20250723-learnnames-avatar',
        content: 'Why remembering names is important',
        route: '/blog/posts/soft-skills/learn-names',
        publishedDate: '2025-07-21',
      },
    ],
  }),
});

function LearnNamesPost() {
  const comicFrames = useMemo(
    () => [
      {
        imageName: '20250701-image-20250712-brainfull-frame1',
        alt: 'Person introduces themselves as Jason',
      },
      {
        imageName: '20250701-image-20250712-brainfull-frame2',
        alt: "Listener's brain is already packed with information",
      },
      {
        imageName: '20250701-image-20250712-brainfull-frame3',
        alt: "Brain cramming Jason's name into overcrowded memory",
      },
      {
        imageName: '20250701-image-20250712-brainfull-frame4',
        alt: 'Person calls Jason "Jarvis" while talking about their own interests',
      },
    ],
    []
  );

  return (
    <BlogLayout id="learn-names-post">
      <CallToAction
        title="Learn Names"
        preSubtitle="Soft Skills"
        subtitle="Why Remembering Names is Important"
        imageAlt="Learn Names"
        sources={createImageSources(
          '20250701-image-20250723-learnnames-avatar'
        )}
        imageSrc={getDefaultImageSrc(
          '20250701-image-20250723-learnnames-avatar'
        )}
        mobileImageSources={createImageSources(
          '20250701-image-20250712-dumbdumber'
        )}
        date="2025-07-21"
      />
      <TitleBlock>When Harry Forgot Mary</TitleBlock>
      <IntroBlock>Maybe it's on the briefcase.</IntroBlock>
      <BlogSection
        id="introduction"
        imageAlt="Learn Names"
        hideImageOnMobile={true}
        sources={createImageSources('20250701-image-20250712-dumbdumber')}
        imageSrc={getDefaultImageSrc('20250701-image-20250712-dumbdumber')}
        aspectRatio={4 / 3}
        caption="Lloyd Christmas and Harry Dunne in Dumb and Dumber"
      >
        <ProseBlock>
          In the hit comedy of the early nineties, <b>Dumb and Dumber</b>, there
          is a famous scene when Lloyd is trying to recall Mary's last name.
        </ProseBlock>

        <ProseBlock>
          <span className="name">Harry asks</span>, "What's her last name? I'll
          look it up."
        </ProseBlock>

        <ProseBlock>
          <span className="name-alt">Lloyd responds</span>, "You know, I don't
          really recall. Starts with an <b>S!</b> Let's see. Swim? Swammi?
          Slippy? Slappy? Swenson? Swanson?"
        </ProseBlock>

        <ProseBlock>
          Lloyd cannot recall Mary's last name. She is someone whom he's willing
          to travel across America for, but can't exert enough brain power to
          retain her full name. This scene is funny! However, it creates
          discomfort for me. For, in the past, I've been someone who's suffered
          from the inability to remember names.
        </ProseBlock>
      </BlogSection>
      <BlogSection id="packed-brain" title="Packed Brain" />
      <Stack gap={2}>
        <ProseBlock>
          Remembering names has been such a challenge for me that when I
          stumbled upon a meme out in the voids of the internets, it made me
          acknowledge my own failures. The meme I believe is called: Packed
          Brain. Where someone introduces themselves as{' '}
          <span className="name">Jason</span>. The person listening, takes the
          name and crams it into their already full memory while speaking, "Say{' '}
          <span className="name-alt">Jarvis</span>, wanna hear all about...".
        </ProseBlock>

        <ProseBlock>
          The brain full person never takes time to learn names properly. Too
          busy thinking about what's important to them.
        </ProseBlock>
      </Stack>
      <SectionSpacer />
      <ComicStrip frames={comicFrames} aspectRatio={1 / 0.87} />
      <BackdropSection backdrop="primary">
        <Stack gap={2} sx={{ py: 2 }}>
          <ProseBlock backgroundColor="transparent" color="white">
            I relate so much to this meme because up to this point in my life,
            I've been horrible at remembering people's names. I'm literally the
            person with too much of a brain full of my own things I can't even
            allocate enough memory to remember other's names.
          </ProseBlock>
          <ProseBlock backgroundColor="transparent" color="white">
            Remembering and calling others by their own names is important! I
            didn't always think it was important. Talk to my team members, they
            can tell you story after story of me calling{' '}
            <span className="name">Jason</span>'s{' '}
            <span className="name-alt">Jarvis</span>.
          </ProseBlock>
        </Stack>
      </BackdropSection>
      <BlogSection id="carnagie" title="You Must Do This!">
        <Stack gap={2}>
          <ProseBlock>
            Dale Carnegie changed my mind. Reading the chapter, "If You Don't Do
            This, You Are Headed for Trouble", in his classic book, “How To Win
            Friends & Influence People,” finally struck a nerve deep somewhere
            in my nervous system to do some serious system maintenance.
          </ProseBlock>
          <ProseBlock>
            Carnegie says, “Remember that a person's name is to that person the
            sweetest and most important sound in any language.”
          </ProseBlock>
          <ProseBlock>
            I believe to make an impact for positivity when dealing with others
            at work or in our daily lives we must remember, as Carnegie stated:
          </ProseBlock>
          <QuoteBlock>
            We should be aware of the magic contained in a name… The name sets
            the individual apart; it makes him or her unique among all others.
            The information we are imparting or the request we are making takes
            on a special importance when we approach the situation with the name
            of the individual. From the waitress to the senior executive, the
            name will work magic as we deal with others.
          </QuoteBlock>

          <ProseBlock>
            Reading the passage up above makes sense. If we don't remember
            others' names, we are putting ourselves at a disadvantage. It also
            makes sense that Carnegie would give the title “If You Don't Do
            This, You Are Headed for Trouble” to his chapter on remembering
            others' names.
          </ProseBlock>

          <ProseBlock>
            In programming, you need to know a name or “key” to find a value in
            O(1) lookup time or constant time. By remembering people's names, it
            will probably help just the same.
          </ProseBlock>

          <ProseBlock>
            So figuratively speaking, I've become determined to defragment some
            memory. I'm going to make room for a database tied with a quick
            memory retrieval interface for mapping people's faces to their
            names, so I never call a <span className="name">Jason</span> a{' '}
            <span className="name-alt">Jarvis</span> again.
          </ProseBlock>
        </Stack>
      </BlogSection>
    </BlogLayout>
  );
}
