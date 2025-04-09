import CallToAction from '@/components/CallToAction';
import DisclaimerBlock from '@/components/DisclaimerBlock';
import IntroBlock from '@/components/IntroBlock';
import type { ProseBlockProps } from '@/components/ProseBlock';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import Box from '@mui/material/Box';
import TitleBlock from '@/components/TitleBlock';
import { createFileRoute } from '@tanstack/react-router';
import CallOutImage from '@/assets/Slide0.jpeg';
import IntroImage from '@/assets/Slide1.jpeg';
import EnvImage from '@/assets/Slide2.jpeg';
import HostSiteImage from '@/assets/Slide3.jpeg';
import ModuleDevImage from '@/assets/Slide4.jpeg';
import SharedResImage from '@/assets/Slide6.jpeg';
import ServiceImage from '@/assets/Slide5.jpeg';
import DeploymentImage from '@/assets/Slide7.jpeg';
import Stack from '@mui/material/Stack';
import Image, {
  AspectRatioContainer,
  ResponsiveContentImageGrid,
} from '@/components/Image';
import { SectionSpacer, Spacer } from '@/components/Spacer';

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
        imageAlt="A person typing on a laptop"
        imageSrc={CallOutImage}
      />

      {/* Intro: Empowering Small Businesses */}
      <TitleBlock subtitle="By building a Scalable Front-End that Drives HR Innovation">
        Empowering Small Businesses
      </TitleBlock>
      <IntroBlock>
        In this post, we'll explore building a modular front-end using iframes.
        I'll cover the approach we took to handle inter-module communication.
        We'll also compare our solution to other alternatives and share lessons
        learned along the way.
      </IntroBlock>
      <ResponsiveContentImageGrid
        imageSrc={IntroImage}
        imageAlt="Empowering Small Businesses"
        imageOnRight={false}
        gap={2}
        aspectRatio={4 / 3}
      >
        <Stack gap={2}>
          <ProseList items={bulletPoints1} subTitle="The Backstory:" />
        </Stack>
      </ResponsiveContentImageGrid>
      <DisclaimerBlock title="Disclaimer:">
        Our design choices fit our development needs, but they may not be right
        for you—and that's okay. Every application is different, and there's
        rarely a one-size-fits-all approach. My goal is to share insights,
        lessons learned, and a few ideas that might help you think about modular
        front-end design in a new way.
      </DisclaimerBlock>

      {/* ### The Environment and Requirements */}
      <SectionSpacer id="environment-and-requirements" />
      <ResponsiveContentImageGrid
        imageSrc={EnvImage}
        imageAlt="The Environment and Requirements"
        imageOnRight={true}
        gap={2}
        aspectRatio={16 / 9}
      >
        <ProseBlock title="The Environment and Requirements" />
        <ProseList items={bulletPoints2} subTitle="Host Sites:" />
      </ResponsiveContentImageGrid>

      <ResponsiveContentImageGrid
        imageSrc={HostSiteImage}
        imageAlt="The Host Sites"
        imageOnRight={false}
        gap={2}
        aspectRatio={4 / 3}
      >
        <SubSectionStarter title="Multiple Host Sites:">
          We support a handful of different host sites. They serve as the
          backbone for displaying various front-end modules.
        </SubSectionStarter>

        <ProseBlock>
          Each host sitess main role is to handle navigation to ensure users
          feel like they're visiting one cohesive website rather than multiple
          separate modules.
        </ProseBlock>

        <SubSectionStarter title="Page Management:">
          Each host site typically loads one or more modules inside an iframe
          per page. The goal is to have one iframe per page, but there have been
          instances where several iframes are loaded on a single screen.
        </SubSectionStarter>
        <ProseBlock>
          Sometimes, we even encounter an “inception” scenario, with an iframe
          nested within an iframe, and then within yet another iframe. To reduce
          complexity, we aim for one iframe per page. Every additional iframe
          increases the complexity.
        </ProseBlock>
      </ResponsiveContentImageGrid>

      <SubSectionStarter title="Core Functions:">
        In addition to navigation, each host site has a few core
        responsibilities. These include authentication, analytics, and
        communication. By centralizing these functions, each module behaves
        consistently across the application.
      </SubSectionStarter>

      <Box sx={{ m: 2, p: 2, border: '1px solid', borderColor: 'divider' }}>
        <ProseBlock
          subtitle="Note:"
          options={{ subtitleVariant: 'subtitle2', textVariant: 'body2' }}
        >
          For communication, we employ a custom iframe messaging library (based
          on PostRobot.js, now archived) to bridge interactions between modules.
          While it sounds fancy, our library is just a helpful wrapper around
          the <span className="code">window.postMessage</span> API.
        </ProseBlock>
      </Box>

      {/* ### Module Development & Versioning */}
      <SectionSpacer id="module-development-and-versioning" />
      <ResponsiveContentImageGrid
        imageSrc={ModuleDevImage}
        imageAlt="Module Development & Versioning"
        imageOnRight={true}
        gap={2}
        aspectRatio={4 / 3}
      >
        <ProseBlock title="Module Development & Versioning" />
        <ProseList items={bulletPoints3} subTitle="Development:" />

        <SubSectionStarter
          title="Modules:"
          subtitle="Independently Developed UI Components"
        >
          Each module is built in its own repository—mostly in React, with a
          couple of legacy Angular modules still around. While having multiple
          tech stacks can offer flexibility (imagine spinning up a React 19 repo
          if a business need arises), too much variety can make maintenance
          tricky. Most of our Angular developers have moved on, so new features
          are now primarily developed in React, which sometimes creates
          challenges for our older Angular stacks.
        </SubSectionStarter>
      </ResponsiveContentImageGrid>

      <SubSectionStarter
        title="Version Drift:"
        subtitle="Racing Through Versions"
      >
        We aim for uniform versioning across projects, but practical constraints
        sometimes lead to drift. There was a time when we had projects running
        on React 16, 17, and 18 all at once. Today, nearly all our modules are
        on React 18.2. Despite this fragmentation, deployments haven't been an
        issue thanks to our independent deployment process. More on that later.
      </SubSectionStarter>

      <ProseBlock>
        For now, we've decided to freeze our dev stack. We're happy with our
        current development patterns and don't see a strong business need to
        jump to React 19 anytime soon. While SSR has its place, our dynamic SPAs
        get the job done perfectly. No need to fix what isn't broken, right?
      </ProseBlock>

      {/* ### Shared Resources */}
      <SectionSpacer id="shared-resources" />
      <ProseBlock title="Shared Resources:" />
      <ProseList items={bulletPoints5} subTitle="Libraries:" />
      <SubSectionStarter title="Our Shared Toolkit:">
        Late in our development process, we realized consistency was crucial, so
        we began sharing core in-house front-end libraries. Our UI library
        features shared components like buttons, inputs, and modals, while we
        also share validation utilities, context providers, theme management,
        and various utility functions for dates and authentication.
      </SubSectionStarter>

      <ProseBlock>
        These shareable resources only evolved once our module development
        matured. In micro frontend design, "wet code" is expected—each repo
        handles its own stuff like API and state management. Rather than forcing
        dryness everywhere, we evaluate common patterns across teams and add
        them to our shared library when there's enough overlap.
      </ProseBlock>

      <ProseBlock>
        By taking this approach, we streamline development and maintain a
        consistent, efficient workflow.
      </ProseBlock>

      {/* ### Service Integration & Module Autonomy */}
      <SectionSpacer id="service-integration-and-module-autonomy" />
      <ProseBlock title="Service Integration & Module Autonomy" />

      <ProseList items={bulletPoints6} subTitle="Super Mods:" />

      <SubSectionStarter
        title="Decoupled Yet Connected"
        subtitle="While modules operate autonomously, they're still tightly integrated through our APIs."
      >
        Each module consumes APIs from various .NET backend services, and
        they're built to handle multiple integrations seamlessly. We've
        carefully designed our APIs to update the application state dynamically,
        ensuring that components lay out smoothly on the page. Plus, some
        modules even run as standalone applications outside of a host site,
        providing true autonomy when needed. This balanced approach to service
        integration and module autonomy keeps our system both flexible and
        efficient.
      </SubSectionStarter>

      {/* ### Deployment Flexibility */}
      <SectionSpacer id="deployment-flexibility" />
      <ProseBlock
        title="Deployment Flexibility"
        options={{ titleVariant: 'h4', subtitleVariant: 'subtitle1' }}
      />
      <ProseList
        items={bulletPoints7}
        subTitle="Super easy, barely an inconvenience"
      />

      <SubSectionStarter title="Modular Deployment:">
        Each module is isolated in its own repository and loaded via iframes,
        allowing for independent deployment cycles. This means we can update or
        redeploy a single module without impacting the entire system. Our
        decoupled approach ensures that everything runs smoothly even when
        different parts are updated at different times.
      </SubSectionStarter>

      <SubSectionStarter title="Agile Build Process & DevOps Excellence:">
        Our streamlined build process supports consistent release cycles and
        continuous integration, making updates quick and flexible. With an
        aggressive QA team and top-notch DevOps, we no longer need to deploy
        everything at once. Instead, our agile process delivers smooth, reliable
        updates that keep the entire system running efficiently.
      </SubSectionStarter>
    </>
  );
}

// #################################################
// ### Usuable Components
// #################################################

function SubSectionStarter({
  children,
  title,
  subtitle,
  dense = false,
  spacingBottom = false,
}: ProseBlockProps) {
  return (
    <ProseBlock
      title={title}
      subtitle={subtitle}
      options={{ titleVariant: 'h6', subtitleVariant: 'subtitle1' }}
      dense={dense}
      spacingBottom={spacingBottom}
    >
      {children}
    </ProseBlock>
  );
}

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
