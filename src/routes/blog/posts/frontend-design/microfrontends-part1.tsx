import CallToAction from '@/components/CallToAction';
import DisclaimerBlock from '@/components/DisclaimerBlock';
import IntroBlock from '@/components/IntroBlock';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import TitleBlock from '@/components/TitleBlock';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/blog/posts/frontend-design/microfrontends-part1'
)({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Micro-Frontends Part 1',
    meta: [
      {
        name: 'Micro-Frontends Part 1',
        content:
          'Note QUite Micro-Frontends: How we built a modular front-end that scales',
      },
      {
        title: 'Micro-Frontends Part 1',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <CallToAction
        title="Not Quite Micro-Frontends"
        preSubtitle="Micro-Frontends Part 1:"
        subtitle="How We Built a Modular Front-End that Scales"
      />
      <TitleBlock subtitle="By building a Scalable Front-End that Drives HR Innovation">
        Empowering Small Businesses
      </TitleBlock>
      <IntroBlock>
        In this post, I explore building a scalable modular front-end using
        iframes—a high-level, realistic alternative to the micro-frontend hype.
        I cover our approach to inter-module communication, compare our solution
        to other alternatives, and share lessons learned along the way, all
        designed for developers looking for practical insights that work no
        matter which front-end framework they use.
      </IntroBlock>
      <ProseList items={bulletPoints1} subTitle="The Backstory:" />
      <DisclaimerBlock title="Disclaimer:">
        Our design choices fit our development needs, but they may not be right
        for you—and that's okay. Every application is different, and there’s
        rarely a one-size-fits-all approach. My goal is to share insights,
        lessons learned, and a few ideas that might help you think about modular
        front-end design in a new way.
      </DisclaimerBlock>
      <ProseBlock
        title="The Environment and Requirements"
        options={{
          titleVariant: 'h4',
          subtitleVariant: 'subtitle1',
        }}
      />
      <ProseList items={bulletPoints2} subTitle="Host Sites:" />

      <ProseBlock title="Multiple Host Sites:">
        Serve as the backbone for displaying various front-end modules.
      </ProseBlock>

      <ProseBlock dense>
        Each host site delivers a unified experience with smooth navigation,
        ensuring users feel like they're visiting one cohesive website rather
        than multiple separate modules.
      </ProseBlock>

      <ProseBlock title="Page Management:">
        Each host site manages multiple pages, typically loading one or more
        modules inside an iframe (we aim for one iframe per page to reduce
        complexity).
      </ProseBlock>

      <ProseBlock dense>
        Although our goal is one iframe per page, there have been instances
        where several iframes are loaded on a screen. Sometimes, we even
        encounter an "inception" scenario, with an iframe nested within another
        iframe, and then within yet another.
      </ProseBlock>

      <ProseBlock dense>
        However, the goal is to have one iframe per page, with the host site.
        For every time we introduce more than one iFrame the complexity
        increases.
      </ProseBlock>

      <ProseBlock title="Core Functions:">
        Host sites handle authentication, analytics, and inter-module
        communication.
      </ProseBlock>

      <ProseBlock dense>
        By centralizing these responsibilities, each module behaves consistently
        across the application while avoiding redundancy.
      </ProseBlock>

      <ProseBlock dense>
        For communication, we employ a custom iframe messaging library (based on
        PostRobot.js, now archived) to streamline interactions between modules.
      </ProseBlock>

      <ProseBlock
        title="Module Development & Versioning"
        options={{
          titleVariant: 'h4',
          subtitleVariant: 'subtitle1',
        }}
      />
      <ProseList items={bulletPoints3} subTitle="Development:" />
    </>
  );
}

// #################################################
// ### Usuable Components
// #################################################

// ### How a Scalable Front-End Drives HR Innovation
const bulletPoints1 = [
  'My current company develops HR software tailored for small businesses.',
  'The suite covers essential functions such as time keeping, scheduling, and applicant tracking.',
  'Our product suite required a scalable front-end.',
  'We adopted a modular approach for cross-team collaboration.',
];

const bulletPoints2 = [
  'Manage page routing',
  'Embed modules within iframes',
  'Manage user authentication',
  'Deliver analytics',
  'Enable cross-module messaging via a custom library',
];

// ### Module Development & Versioning
const bulletPoints3 = [
  'Developed in separate React repositories',
  'Aimed for uniform versioning, though practical constraints did lead to some drift',
];
