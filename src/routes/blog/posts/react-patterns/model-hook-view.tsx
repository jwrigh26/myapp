import { BodyBlock } from '@/components/BodyBlock';
import CallToAction from '@/components/CallToAction';
import IntroBlock from '@/components/IntroBlock';
import { createFileRoute } from '@tanstack/react-router';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import { SectionSpacer } from '@/components/Spacer';
import DisclaimerBlock from '@/components/DisclaimerBlock';
import TitleBlock from '@/components/TitleBlock';
import NoteBlock from '@/components/NoteBlock';
import Box from '@mui/material/Box';
import SplashImage from '@/assets/MHVSplash.jpeg';

export const Route = createFileRoute(
  '/blog/posts/react-patterns/model-hook-view'
)({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Model Hook View',
    meta: [
      {
        name: 'Model Hook View',
        content: 'Model Hook View',
      },
      {
        title: 'Model Hook View',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <CallToAction
        title="Model Hook View (MHV)"
        subtitle="A React pattern for managing components using hooks as controllers"
        imageAlt='Model Hook View'
        imageSrc={SplashImage}
        imagePosition={{ right: 48 }}
        imageRatio={1/0.47}
      />
      <TitleBlock subtitle="Writing about what I use every day">
        Sticking with React 18
      </TitleBlock>
      <IntroBlock>
        It's April 2025, and I'm writing my first React tutorial using React 18.
        This seems a little odd since React 19 is already out, complete with new
        compilers that make some aspects of React 18 obsolete. So why am I doing
        this? The main reason is that my current employer still uses React 18
        for creating SPAs. We'll likely stay with React 18 unless a specific
        business requirement pushes us toward React 19. So because I use React
        18 everyday it made sense to write about what I know.
      </IntroBlock>
      <Box sx={{ px: 1 }}>
        <ProseBlock>
          Another reason is I'm not yet sure how I feel about React 19. I don't
          have enough experience with it to form a strong opinion. It's probably
          fine, but I need more hands-on time to be sure. Maybe once I have more
          experience with it, I'll come back and update this post to use React
          19. Until then, I thought it would be fun to start writing about what
          I know and things I've learned as a React developer since 2017.
        </ProseBlock>
      </Box>
      <BodyBlock>
        <SectionSpacer id="model-hook-controller" />
        <ProseBlock
          title="Introducing Model Hook View"
          subtitle="My spin on a common design pattern"
        />
        <ProseBlock>
          After careful consideration, my first React post will cover what I've
          dubbed the "Model Hook View" strategy.
        </ProseBlock>
        <DisclaimerBlock>
          Disclaimer: I'm confident this design pattern isn't new by any means.
          Hooks have been around since React 16, and the Model View Controller
          (MVC) pattern probably predates my own birth. By now, many React
          developers have likely combined these two ideas to create something
          similar to the Model Hook View (MHV) strategy.
        </DisclaimerBlock>
        <ProseBlock>
          While I know this design pattern isn't new, I wanted to document it
          because learning and actually applying the MHV design pattern can be
          helpful. So without further rambling, let's dive into it.
        </ProseBlock>
        <NoteBlock variant="warning">
          Work in progress...Will be slowly updating this post over the next few
          weeks.
        </NoteBlock>
      </BodyBlock>
    </>
  );
}
