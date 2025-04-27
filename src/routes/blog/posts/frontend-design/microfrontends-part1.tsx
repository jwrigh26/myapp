import SharedResImage from '@/assets/Slide-shared-resources.jpeg';
import CallOutImage from '@/assets/Slide0.jpeg';
import IntroImage from '@/assets/Slide1.jpeg';
import EnvImage from '@/assets/Slide2.jpeg';
import HostSiteImage from '@/assets/Slide3.jpeg';
import ModuleDevImage from '@/assets/Slide4.jpeg';
import DeploymentImage from '@/assets/Slide5.jpeg';
import SuperModsImage from '@/assets/Slide7.jpeg';
import CallOutImage2 from '@/assets/Slide10.jpeg';
import CallToAction from '@/components/CallToAction';
import DisclaimerBlock from '@/components/DisclaimerBlock';
import { ResponsiveContentImageGrid } from '@/components/Image';
import IntroBlock from '@/components/IntroBlock';
import type { ProseBlockProps } from '@/components/ProseBlock';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import { SectionSpacer, Spacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import NoteBlock from '@/components/NoteBlock';
import Stack from '@mui/material/Stack';
import { createFileRoute } from '@tanstack/react-router';
import BlogPostNavigator from '@/components/BlogPostNavigator';

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
          'Not Quite Micro-Frontends: How we built a modular front-end that scales',
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
      <SectionSpacer id="introduction" />
      <ResponsiveContentImageGrid
        imageSrc={IntroImage}
        imageAlt="Empowering Small Businesses"
        imageOnRight={false}
        gap={2}
        aspectRatio={4 / 3}
      >
        <Stack gap={2}>
          <ProseList items={bulletPoints1} subTitle="The Backstory" />
        </Stack>
      </ResponsiveContentImageGrid>
      <DisclaimerBlock title="Disclaimer">
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
        <ProseList items={bulletPoints2} subTitle="Host Sites" />
      </ResponsiveContentImageGrid>

      <SubSectionStarter title="Multiple Host Sites">
        We support a handful of different host sites. They serve as the backbone
        for displaying various front-end modules.
      </SubSectionStarter>

      <ProseBlock>
        Each host sitess main role is to handle navigation to ensure users feel
        like they're visiting one cohesive website rather than multiple separate
        modules.
      </ProseBlock>

      <Spacer size={2} desktop />
      <ResponsiveContentImageGrid
        imageSrc={HostSiteImage}
        imageAlt="The Host Sites"
        imageOnRight={true}
        gap={2}
        aspectRatio={4 / 3}
        caption="Host sites: The backbone of our modular front-end"
      >
        <SubSectionStarter title="Page Management">
          Each host site typically loads one or more modules inside an iframe
          per page. The goal is to have one iframe per page, but there have been
          instances where several iframes are loaded on a single screen.
        </SubSectionStarter>
        <ProseBlock>
          Sometimes, we even encounter an "inception" scenario, with an iframe
          nested within an iframe, and then within yet another iframe. To reduce
          complexity, we aim for one iframe per page. Every additional iframe
          increases the complexity.
        </ProseBlock>

        <SubSectionStarter title="Core Functions" spacingBottom>
          In addition to navigation, each host site has a few core
          responsibilities. These include authentication, analytics, and
          communication. By centralizing these functions, each module behaves
          consistently across the application.
        </SubSectionStarter>
      </ResponsiveContentImageGrid>
      <NoteBlock>
        For communication, we employ a custom iframe messaging library (based on
        PostRobot.js, now archived) to bridge interactions between modules.
        While it sounds fancy, our library is just a helpful wrapper around the{' '}
        <span className="code">window.postMessage</span> API.
      </NoteBlock>

      {/* ### Module Development & Versioning */}
      <SectionSpacer id="module-development-and-versioning" />
      <ProseBlock title="Module Development & Versioning" />
      <ProseList items={bulletPoints3} subTitle="Development" />

      <SubSectionStarter
        title="Managing Multiple Dev Stacks"
        subtitle="Lessons from React, Angular, and Beyond"
      >
        We have several large repositories that manage multiple URL entry
        points. Each entry point represents a page or module that can be loaded
        into any of our host sites. These repositories primarily use React, but
        we still maintain a few Angular modules.
      </SubSectionStarter>

      <ProseBlock>
        The ability to use multiple development stacks is a double-edged sword.
        On one hand, developers enjoy the freedom to choose their toolsets,
        which initially feels empowering. On the other hand, this flexibility
        comes with risks. If developers specializing in a particular stack
        leave, remaining teams can struggle to maintain the codebase because
        they may be unfamiliar with that stack.
      </ProseBlock>

      <ProseBlock>
        As you can imagine, we've experienced both edges of this sword
        firsthand. Since we're primarily a React shop, our legacy Angular
        projects often don't get the attention they need because most of our
        Angular developers have moved on from the company. So in short, the
        moreal of the story is that if you adopt a modular frameowkr supporting
        multiple development stacks, you must be prepared to manage both sides
        of this powerful developer sword.
      </ProseBlock>

      <Spacer size={2} desktop />
      <ResponsiveContentImageGrid
        imageSrc={ModuleDevImage}
        imageAlt="Module Development & Versioning"
        imageOnRight={false}
        gap={2}
        aspectRatio={4 / 3}
        caption="Module development: Beware of version drift"
      >
        <SubSectionStarter
          title="Version Drift"
          subtitle="Racing Through Versions"
        >
          We started building our modular frontend when React was still on
          version 15. But pretty soon into development, React 16 dropped, and
          with it came hooks. A lot of our team quickly jumped ship from class
          components and lifecycle methods to functional components with hooks.
        </SubSectionStarter>

        <ProseBlock>
          This was great in many ways. React hooks really made development
          easier for our developers, but it also spurred a race through React
          versions. While today we aim for uniform versioning across all
          projects, that wasn't always the case. At one point, we had projects
          on React 16, 17, and 18 all running at once. Version drift always
          happens to some extent, but when the gaps grew too wide, working
          together got tricky, especially when we tried building shared
          libraries. That's when library conflicts decided to show their ugly
          faces and crash our modular frontend party.
        </ProseBlock>
      </ResponsiveContentImageGrid>

      <ProseBlock>
        A big reason for this mess was drastic differences in UI libraries. We
        had to pause shared-library development to sort these conflicts out
        first. Our initial refactoring estimates were way off, and before we
        knew it, we were knocking right on refactor hell's door.
      </ProseBlock>

      <ProseBlock>
        I'll spare you the drama and just say our team managed to overcome these
        hurdles. For now, we've decided to freeze our dev stack. We're happy
        with our current patterns and don't see a strong business need to jump
        from React 18 to 19 or to switch from dynamic SPAs to SSR. We're totally
        fine being a little behind the latest and greatest for now. It lets us
        focus on feature-driven development and keeps our developers trained up
        on the best practices that matter most for our team.
      </ProseBlock>

      {/* ### Shared Resources */}
      <SectionSpacer id="shared-resources" />
      <ProseBlock title="Shared Resources" />
      <ProseList items={bulletPoints5} subTitle="Libraries" />

      <ResponsiveContentImageGrid
        imageSrc={SharedResImage}
        imageAlt="Shared Resources"
        imageOnRight={false}
        mobileImageFirst={true}
        gap={2}
        aspectRatio={4 / 3}
        caption="Shared resources: UI library, utility methods, and context providers"
      >
        <SubSectionStarter title="Our Shared Toolkit">
          Once our version drift issues were sorted out, we started building our
          shared resource library late in the development process. This library
          focused strictly on things we identified as being valuable. Team
          buy-in was important too, since we wanted everyone using the shared
          resources instead of teams going rogue and doing their own thing.
        </SubSectionStarter>

        <ProseBlock>
          The library includes a shared UI library for common components,
          various utility methods, and context providers. This setup helps each
          team stay consistent in their designs and in how they interact with
          the host sites.
        </ProseBlock>

        <ProseBlock>
          The utility methods are somewhat unique because we only share them in
          specific areas of development: safety, validation, date handling,
          messaging, and authentication. This approach simplifies debugging and
          establishes unified standards around code we deem critical.
        </ProseBlock>
      </ResponsiveContentImageGrid>

      <ProseBlock>
        These shareable resources only emerged after our module development
        matured. This gave us enough time to spot common patterns across teams
        and add them to the shared library when there was clear overlap. By
        taking this approach, we could gradually build out our library and
        handle small, "bite-size" refactors as part of regular feature
        development.
      </ProseBlock>

      {/* ### Service Integration & Module Autonomy */}
      <SectionSpacer id="service-integration-and-module-autonomy" />

      <ResponsiveContentImageGrid
        imageSrc={SuperModsImage}
        imageAlt="Super Mods: Service Integration & Module Autonomy"
        imageOnRight={true}
        gap={2}
        caption="Super Mods have standalone power"
        aspectRatio={4 / 3}
      >
        <ProseBlock title="Super Mods" />

        <ProseList
          items={bulletPoints6}
          subTitle="Service Integration & Module Autonomy"
        />

        <SubSectionStarter
          title="Decoupled Yet Connected"
          subtitle="While modules operate autonomously, they're still tightly integrated through our APIs"
        >
          We like to think our modules have superpowers. They consume API
          requests from a host site when it is available, but if it is not, they
          morph into super modules. These super modules fetch data directly from
          our .NET backend services on their own. This lets them handle multiple
          integrations seamlessly, whether as a standalone application or
          embedded in a third-party platform.
        </SubSectionStarter>
      </ResponsiveContentImageGrid>
      <ProseBlock>
        But superpowers come at a price. Ensuring our modules run correctly in
        every environment takes extra work and rigorous testing. You might even
        say that the freedom to inject modules anywhere is our kryptonite.
        Sunsetting legacy modules is challenging because we have to track which
        clients still use each version and plan their migration to newer
        modules. Still, this balance of service integration and module autonomy
        keeps our system flexible.
      </ProseBlock>

      {/* ### Deployment Flexibility */}
      <SectionSpacer id="deployment-flexibility" />
      <ProseBlock
        title="Deployment"
        subtitle="Super easy, barely an inconvenience"
        options={{ titleVariant: 'h4', subtitleVariant: 'subtitle1' }}
      />
      <ProseList items={bulletPoints7} subTitle="Key Benefits" />

      <SubSectionStarter title="Modular Deployment">
        One of the best things about our modular framework is that each module
        lives in its own repository. Each module gets its own entry point,
        loaded via an iframe. This setup enables independent deployment cycles;
        we can deploy a single module without affecting the rest of the system.
        This decoupled approach ensures minimal disruption when other modules
        change. Different parts are updated at different times; everything runs
        smoothly.
      </SubSectionStarter>

      <Spacer size={2} desktop />
      <ResponsiveContentImageGrid
        imageSrc={DeploymentImage}
        imageAlt="Deployment Flexibility"
        imageOnRight={true}
        gap={2}
        caption="Deployment Flexibility: Independent repositories and decoupled updates"
        aspectRatio={4 / 3}
      >
        <SubSectionStarter title="Build Process & DevOps Excellence">
          Of course, this modular deployment couldn't happen without a few other
          critical actors: our QA team and DevOps engineers. Without their
          skills and systems in place, our bi-weekly release cycles, which now
          take only one to two hours on average, would not be possible. Before
          we fully integrated into our current module framework, release nights
          were often postponed due to critical bugs that impacted multiple areas
          of the application. Those issues and other factors sometimes pushed
          releases well into the early morning hours.
        </SubSectionStarter>

        <ProseBlock>
          The time and investment required to move to our module framework have
          turned "release night" from a dreaded event into a smooth process. Our
          build process supports consistent release cycles and quick updates,
          which means our work-life balance has improved. Module frameworks for
          the win!
        </ProseBlock>
      </ResponsiveContentImageGrid>

      <Spacer size={2} desktop />
      <BlogPostNavigator
        next={{
          title: 'Micro-Frontends Part 2: Comparing Modern Alternatives',
          route: '/blog/posts/frontend-design/microfrontends-part2',
          image: CallOutImage2,
          blurb:
            'Explore the pros and cons of Module Federation, Single-Spa, and iframe-based micro-frontends, and why we chose our approach.',
        }}
      />
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
  'Separate repos, primarily React (some legacy Angular)',
  'Rapid React upgrades caused version drift, complicating shared libraries',
];

// ### Shared Resources
const bulletPoints5 = [
  'UI Library with Shared Components',
  'Utility Methods',
  'Context Providers',
];

// ### Module Autonomy
const bulletPoints6 = [
  'Consumption: Each module consumes APIs from various .NET backend services.',
  'Standalone Operation: Some modules run as independent applications outside of a host site.',
];

// ### Deployment Flexibility
const bulletPoints7 = [
  'Independent Repositories',
  'Decoupled Updates',
  'Streamlined Build Process',
];
