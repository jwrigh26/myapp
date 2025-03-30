import CallToAction from '@/components/CallToAction';
import DisclaimerBlock from '@/components/DisclaimerBlock';
import IntroBlock from '@/components/IntroBlock';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import TitleBlock from '@/components/TitleBlock';
import { useTheme } from '@mui/material/styles';
import { createFileRoute } from '@tanstack/react-router';
import Image, {
  BackgroundImageContainer,
  ShapeOutsideContainer,
} from '@/components/Image';
import image0 from '@/assets/Slide0.jpeg';
import image1 from '@/assets/Slide1.jpeg';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

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
  const theme = useTheme();
  return (
    <Box>
      <CallToAction
        title="Not Quite Micro-Frontends"
        preSubtitle="Micro-Frontends Part 1:"
        subtitle="How We Built a Modular Front-End that Scales"
      />
      {/* <Image
        defaultSrc={image0}
        alt="Micro-Frontends Part 1"
        style={{ borderRadius: '50%', width: 140, height: 140, position: 'absolute', top: -165, right: 16 }}
      /> */}
      {/* <BackgroundImageContainer src={image0} height={200} maxWidth={1200} /> */}
      <Stack direction={{ xs: 'column', md: 'row' }} gap={1}>
        <Box sx={{ flex: '1, 1, 0' }}>
          <TitleBlock subtitle="By building a Scalable Front-End that Drives HR Innovation">
            Empowering Small Businesses
          </TitleBlock>
          <IntroBlock>
            In this post, I explore building a scalable modular front-end using
            iframes—a high-level, realistic alternative to the micro-frontend
            hype. I cover our approach to inter-module communication, compare
            our solution to other alternatives, and share lessons learned along
            the way, all designed for developers looking for practical insights
            that work no matter which front-end framework they use.
          </IntroBlock>
        </Box>
        <Image
          defaultSrc={image0}
          alt="Micro-Frontends Part 1"
          style={{ objectFit: 'contain', flex: 0, padding: theme.spacing(2) }}
        />
      </Stack>
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" gap={1}>
        <Image
          defaultSrc={image1}
          alt="Micro-Frontends Part 1"
          style={{ objectFit: 'contain', flex: 0, padding: theme.spacing(2), width: 300 }}
        />
        <Box sx={{ flex: '1, 1, 0' }}>
          <ProseList items={bulletPoints1} subTitle="The Backstory:" />
        </Box>
      </Stack>
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
        We support a handful of different host sites. They serve as the backbone
        for displaying various front-end modules.
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

      <ProseBlock dense spacingBottom>
        While it sounds cool, at its heart our communication library is just a
        helpful wrapper around the window.postMessage API.
      </ProseBlock>

      <ProseBlock
        title="Module Development & Versioning"
        options={{
          titleVariant: 'h4',
          subtitleVariant: 'subtitle1',
        }}
      />
      <ProseList items={bulletPoints3} subTitle="Development:" />

      <ProseBlock
        title="Modules:"
        subtitle="Independently Developed UI Components"
        dense
      >
        Each module is built in its own repository—mostly in React, with a
        couple of legacy Angular modules still around. While having multiple
        tech stacks can offer flexibility (imagine spinning up a React 19 repo
        if a business need arises), too much variety can make maintenance
        tricky. Most of our Angular developers have moved on, so new features
        are now primarily developed in React, which sometimes creates challenges
        for our older Angular stacks.
      </ProseBlock>

      <ProseBlock
        title="Version Drift:"
        subtitle="Racing Through Versions"
        dense
      >
        We aim for uniform versioning across projects, but practical constraints
        sometimes lead to drift. There was a time when we had projects running
        on React 16, 17, and 18 all at once. Today, nearly all our modules are
        on React 18.2. Despite this fragmentation, deployments haven't been an
        issue thanks to our independent deployment process. More on that later.
      </ProseBlock>

      <ProseBlock dense spacingBottom>
        For now, we've decided to freeze our dev stack. We're happy with our
        current development patterns and don't see a strong business need to
        jump to React 19 anytime soon. While SSR has its place, our dynamic SPAs
        get the job done perfectly. No need to fix what isn't broken, right?
      </ProseBlock>

      <ProseBlock
        title="Shared Resources:"
        options={{
          titleVariant: 'h4',
          subtitleVariant: 'subtitle1',
        }}
      />
      <ProseList items={bulletPoints5} subTitle="Libraries:" />

      <ProseBlock title="Our Shared Toolkit:" dense>
        Late in our development process, we realized consistency was crucial, so
        we began sharing core in-house front-end libraries. Our UI library
        features shared components like buttons, inputs, and modals, while we
        also share validation utilities, context providers, theme management,
        and various utility functions for dates and authentication.
      </ProseBlock>

      <ProseBlock dense>
        These shareable resources only evolved once our module development
        matured. In micro frontend design, "wet code" is expected—each repo
        handles its own stuff like API and state management. Rather than forcing
        dryness everywhere, we evaluate common patterns across teams and add
        them to our shared library when there's enough overlap.
      </ProseBlock>

      <ProseBlock spacingBottom>
        By taking this approach, we streamline development and maintain a
        consistent, efficient workflow.
      </ProseBlock>

      <ProseBlock
        title="Service Integration & Module Autonomy"
        options={{ titleVariant: 'h4', subtitleVariant: 'subtitle1' }}
      />

      <ProseList items={bulletPoints6} subTitle="Super Mods:" />

      <ProseBlock
        title="Decoupled Yet Connected"
        subtitle="While modules operate autonomously, they're still tightly integrated through our APIs."
        dense
        spacingBottom
      >
        Each module consumes APIs from various .NET backend services, and
        they're built to handle multiple integrations seamlessly. We've
        carefully designed our APIs to update the application state dynamically,
        ensuring that components lay out smoothly on the page. Plus, some
        modules even run as standalone applications outside of a host site,
        providing true autonomy when needed. This balanced approach to service
        integration and module autonomy keeps our system both flexible and
        efficient.
      </ProseBlock>

      <ProseBlock
        title="Deployment Flexibility"
        options={{ titleVariant: 'h4', subtitleVariant: 'subtitle1' }}
      />
      <ProseList
        items={bulletPoints7}
        subTitle="Super easy, barely an inconvenience"
      />

      <ProseBlock title="Modular Deployment:" dense>
        Each module is isolated in its own repository and loaded via iframes,
        allowing for independent deployment cycles. This means we can update or
        redeploy a single module without impacting the entire system. Our
        decoupled approach ensures that everything runs smoothly even when
        different parts are updated at different times.
      </ProseBlock>

      <ProseBlock
        title="Agile Build Process & DevOps Excellence:"
        dense
        spacingBottom
      >
        Our streamlined build process supports consistent release cycles and
        continuous integration, making updates quick and flexible. With an
        aggressive QA team and top-notch DevOps, we no longer need to deploy
        everything at once. Instead, our agile process delivers smooth, reliable
        updates that keep the entire system running efficiently.
      </ProseBlock>
    </Box>
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
  'Developed in separate repositories (Mostly React)',
  'Aimed for uniform versioning, though practical constraints did lead to some drift',
];

// ### Shared Resources
const bulletPoints5 = [
  'UI library with shared components',
  'Validation utilities',
  'Context providers',
  'Theme management',
  'Utility functions for dates and authentication',
];

// ### Module Autonomy
const bulletPoints6 = [
  'Consumption: Each module consumes APIs from various .NET backend services.',
  'Standalone Operation: Some modules run as independent applications outside of a host site.',
];

// ### Deployment Flexibility
const bulletPoints7 = [
  'Inndependent Repositories',
  'Decoupled Updates',
  'Streamlined Build Process',
];
