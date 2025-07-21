import BlogPostNavigator from '@/components/BlogPostNavigator';
import DisclaimerBlock from '@/components/DisclaimerBlock';
import { ResponsiveContentImageGrid } from '@/components/Image';
import NoteBlock from '@/components/NoteBlock';
import ProseBlock from '@/components/ProseBlock';
import { Spacer } from '@/components/Spacer';
import { ArticleLayout, TopicBlock } from '@/components/blog';
import BlogSection from '@/components/blog/BlogSection';
import BlogSubsection from '@/components/blog/BlogSubsection';
import { PageLayout } from '@/layout';
import {
  createImageSources,
  getDefaultImageSrc,
  getThumbImageSrc,
} from '@/utils/images';
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
    <PageLayout>
      <ArticleLayout
        title="Not Quite Micro-Frontends"
        preSubtitle="Micro-Frontends Part 1:"
        subtitle="How We Built a Modular Front-End that Scales"
        imageAlt="A person typing on a laptop"
        sources={createImageSources('20250601-image-slide0')}
        imageSrc={getDefaultImageSrc('20250601-image-slide0')}
        date="2025-03-15"
        sectionTitle="Empowering Small Businesses"
        sectionSubtitle="By building a Scalable Front-End that Drives HR Innovation"
        introContent={
          <>
            In this post, we'll explore building a modular front-end using
            iframes. I'll cover the approach we took to handle inter-module
            communication. We'll also compare our solution to other alternatives
            and share lessons learned along the way.
          </>
        }
      >
        <BlogSection
          id="introduction"
          imageSrc={getDefaultImageSrc('20250601-image-slide1')}
          sources={createImageSources('20250601-image-slide1')}
          imageAlt="Empowering Small Businesses"
          imageOnRight={false}
          gap={2}
          aspectRatio={4 / 3.4}
        >
          <TopicBlock title="The Backstory" items={bulletPoints1} />
        </BlogSection>
        <DisclaimerBlock title="Disclaimer">
          Our design choices fit our development needs, but they may not be
          right for you—and that's okay. Every application is different, and
          there's rarely a one-size-fits-all approach. My goal is to share
          insights, lessons learned, and a few ideas that might help you think
          about modular front-end design in a new way.
        </DisclaimerBlock>

        {/* ### The Environment and Requirements */}
        <BlogSection
          id="environment-and-requirements"
          title="The Environment and Requirements"
          imageSrc={getDefaultImageSrc('20250601-image-slide2')}
          sources={createImageSources('20250601-image-slide2')}
          imageAlt="The Environment and Requirements"
          imageOnRight={true}
          gap={2}
          aspectRatio={15.4 / 9}
        >
          <TopicBlock title="Host Sites" items={bulletPoints2} />
        </BlogSection>

        <BlogSubsection title="Multiple Host Sites">
          We support a handful of different host sites. They serve as the
          backbone for displaying various front-end modules.
        </BlogSubsection>

        <ProseBlock>
          Each host sitess main role is to handle navigation to ensure users
          feel like they're visiting one cohesive website rather than multiple
          separate modules.
        </ProseBlock>

        <Spacer size={2} desktop />
        <ResponsiveContentImageGrid
          imageSrc={getDefaultImageSrc('20250601-image-slide3')}
          sources={createImageSources('20250601-image-slide3')}
          imageAlt="The Host Sites"
          imageOnRight={true}
          gap={2}
          aspectRatio={4 / 3}
          caption="Host sites: The backbone of our modular front-end"
        >
          <BlogSubsection title="Page Management">
            Each host site typically loads one or more modules inside an iframe
            per page. The goal is to have one iframe per page, but there have
            been instances where several iframes are loaded on a single screen.
          </BlogSubsection>
          <ProseBlock>
            Sometimes, we even encounter an "inception" scenario, with an iframe
            nested within an iframe, and then within yet another iframe. To
            reduce complexity, we aim for one iframe per page. Every additional
            iframe increases the complexity.
          </ProseBlock>

          <BlogSubsection title="Core Functions" spacingBottom>
            In addition to navigation, each host site has a few core
            responsibilities. These include authentication, analytics, and
            communication. By centralizing these functions, each module behaves
            consistently across the application.
          </BlogSubsection>
        </ResponsiveContentImageGrid>
        <NoteBlock>
          For communication, we employ a custom iframe messaging library (based
          on PostRobot.js, now archived) to bridge interactions between modules.
          While it sounds fancy, our library is just a helpful wrapper around
          the <span className="code">window.postMessage</span> API.
        </NoteBlock>

        {/* ### Module Development & Versioning */}
        <BlogSection
          id="module-development-and-versioning"
          title="Module Development & Versioning"
        >
          <TopicBlock title="Development" items={bulletPoints3} />
        </BlogSection>

        <BlogSubsection
          title="Managing Multiple Dev Stacks"
          subtitle="Lessons from React, Angular, and Beyond"
        >
          We have several large repositories that manage multiple URL entry
          points. Each entry point represents a page or module that can be
          loaded into any of our host sites. These repositories primarily use
          React, but we still maintain a few Angular modules.
        </BlogSubsection>

        <ProseBlock>
          The ability to use multiple development stacks is a double-edged
          sword. On one hand, developers enjoy the freedom to choose their
          toolsets, which initially feels empowering. On the other hand, this
          flexibility comes with risks. If developers specializing in a
          particular stack leave, remaining teams can struggle to maintain the
          codebase because they may be unfamiliar with that stack.
        </ProseBlock>

        <ProseBlock>
          As you can imagine, we've experienced both edges of this sword
          firsthand. Since we're primarily a React shop, our legacy Angular
          projects often don't get the attention they need because most of our
          Angular developers have moved on from the company.
        </ProseBlock>

        <ProseBlock subtitle="In short...">
          The moreal of the story is that if you use a modular framework
          supporting multiple development stacks, you must be prepared to manage
          both sides of this double-edged sword.
        </ProseBlock>

        <Spacer size={2} desktop />
        <ResponsiveContentImageGrid
          imageSrc={getDefaultImageSrc('20250601-image-slide4')}
          sources={createImageSources('20250601-image-slide4')}
          imageAlt="Module Development & Versioning"
          imageOnRight={false}
          gap={2}
          aspectRatio={3.8 / 3.4}
          caption="Module development: Beware of version drift"
        >
          <BlogSubsection
            title="Version Drift"
            subtitle="Racing Through Versions"
          >
            We started building our modular frontend when React was still on
            version 15. But pretty soon into development, React 16 dropped, and
            with it came hooks. A lot of our team quickly jumped ship from class
            components and lifecycle methods to functional components with
            hooks.
          </BlogSubsection>

          <ProseBlock>
            This was great in many ways. React hooks really made development
            easier for our developers, but it also spurred a race through React
            versions. While today we aim for uniform versioning across all
            projects, that wasn't always the case. At one point, we had projects
            on React 16, 17, and 18 all running at once. Version drift always
            happens to some extent, but when the gaps grow too wide problems
            quickly start to show their ugly faces. Version drifts can crash a
            modular frontend party.
          </ProseBlock>
        </ResponsiveContentImageGrid>

        <ProseBlock>
          The big party crasher for us, was a drastic differences in UI
          libraries. We had to pause development to sort these conflicts out
          first, and our initial refactoring estimates were way off. I'll spare
          you the drama and just say our team managed to overcome these
          hurrdles.
        </ProseBlock>

        <ProseBlock>
          For now, we've decided to freeze our dev stack. We're happy with our
          current patterns and don't see a strong business need to jump from
          React 18 to 19 or to switch from dynamic SPAs to SSR.
        </ProseBlock>

        {/* ### Shared Resources */}
        <BlogSection
          id="shared-resources"
          title="Shared Resources"
          imageSrc={getDefaultImageSrc('20250601-image-slide-shared-resources')}
          sources={createImageSources('20250601-image-slide-shared-resources')}
          imageAlt="Shared Resources"
          imageOnRight={false}
          mobileImageFirst={true}
          gap={2}
          aspectRatio={4 / 3}
          caption="Shared resources: UI library, utility methods, and context providers"
        >
          <TopicBlock title="Libraries" items={bulletPoints5} />

          <BlogSubsection title="Our Shared Toolkit">
            Once our version drift issues were sorted out, we started building a
            shared resource library late in the development process. This
            library focused strictly on things we identified as being valuable.
            Team buy-in was important too, since we wanted everyone using the
            shared resources. The idea being it will help keep version drift to
            a minimum.
          </BlogSubsection>

          <ProseBlock>
            The library includes a shared UI library for common components,
            various utility methods, and context providers. This setup helps
            each team stay consistent in their designs and in how they interact
            with the host sites.
          </ProseBlock>
          <ProseBlock>
            These shareable resources only emerged after our module development
            matured. This gave us enough time to spot common patterns across
            teams and add them to the shared library when there was clear
            overlap. By taking this approach, we could gradually build out our
            library and handle small, "bite-size" refactors as part of regular
            feature development.
          </ProseBlock>
        </BlogSection>

        {/* ### Service Integration & Module Autonomy */}
        <BlogSection
          id="service-integration-and-module-autonomy"
          title="Super Mods"
          imageSrc={getDefaultImageSrc('20250601-image-slide7')}
          sources={createImageSources('20250601-image-slide7')}
          imageAlt="Super Mods: Service Integration & Module Autonomy"
          imageOnRight={true}
          gap={2}
          caption="Super Mods have standalone power"
          aspectRatio={4 / 2.7}
        >
          <TopicBlock
            title="Service Integration & Module Autonomy"
            items={bulletPoints6}
          />

          <BlogSubsection
            title="Decoupled Yet Connected"
            subtitle="While modules operate autonomously, they're still tightly integrated through our APIs"
          >
            We like to think our modules have superpowers. They consume API
            requests from a host site when it is available, but if it is not,
            they morph into super modules. These super modules fetch data
            directly from our .NET backend services on their own. This lets them
            handle multiple integrations seamlessly, whether as a standalone
            application or embedded in a third-party platform.
          </BlogSubsection>
          <ProseBlock>
            But superpowers come at a price. Ensuring our modules run correctly
            in every environment takes extra work and rigorous testing. You
            might even say that the freedom to inject modules anywhere is our
            kryptonite because of the maintence that comes with it.
          </ProseBlock>
        </BlogSection>
        <ProseBlock subtitle="Example:">
          Sunsetting legacy modules is challenging because we have to track
          which clients still use each version and plan their migration to newer
          modules. Still, this balance of service integration and module
          autonomy keeps our system flexible.
        </ProseBlock>

        {/* ### Deployment Flexibility */}
        <BlogSection
          id="deployment-flexibility"
          title="Deployment"
          subtitle="Super easy, barely an inconvenience"
          titleOptions={{ titleVariant: 'h4', subtitleVariant: 'subtitle1' }}
          imageSrc={getDefaultImageSrc('20250601-image-slide5')}
          sources={createImageSources('20250601-image-slide5')}
          imageAlt="Deployment Flexibility"
          imageOnRight={true}
          gap={2}
          caption="Deployment Flexibility: Independent repositories and decoupled updates"
          aspectRatio={4 / 2.7}
        >
          <TopicBlock title="Key Benefits" items={bulletPoints7} />

          <BlogSubsection title="Modular Deployment">
            One of the best things about our modular framework is that each
            module lives in its own repository. Each module gets its own entry
            point, loaded via an iframe. This setup enables independent
            deployment cycles; we can deploy a single module without affecting
            the rest of the system. This decoupled approach ensures minimal
            disruption when other modules change. Different parts are updated at
            different times; everything runs smoothly.
          </BlogSubsection>

          <BlogSubsection title="Build Process & DevOps Excellence">
            Of course, this modular deployment couldn't happen without a few
            other critical actors: our QA team and DevOps engineers. Without
            their skills and systems in place, our bi-weekly release cycles,
            which now take only one to two hours on average, would not be
            possible. Before we fully integrated into our current module
            framework, release nights were often postponed due to critical bugs
            that impacted multiple areas of the application. Those issues and
            other factors sometimes pushed releases well into the early morning
            hours.
          </BlogSubsection>

          <ProseBlock>
            The time and investment required to move to our module framework
            have turned "release night" from a dreaded event into a smooth
            process. Our build process supports consistent release cycles and
            quick updates, which means our work-life balance has improved.
            Module frameworks for the win!
          </ProseBlock>
        </BlogSection>
      </ArticleLayout>

      <BlogPostNavigator
        next={{
          title: 'Micro-Frontends Part 2: Comparing Modern Alternatives',
          route: '/blog/posts/frontend-design/microfrontends-part2',
          image: getThumbImageSrc('20250601-image-slide10'),
          date: '2025-04-21',
          blurb:
            'Explore the pros and cons of Module Federation, Single-Spa, and iframe-based micro-frontends, and why we chose our approach.',
        }}
      />
    </PageLayout>
  );
}

// #################################################
// ### Data Arrays
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
  'Each module consumes APIs from various .NET backend services.',
  'Some modules run as independent applications outside of a host site.',
];

// ### Deployment Flexibility
const bulletPoints7 = [
  'Independent Repositories',
  'Decoupled Updates',
  'Streamlined Build Process',
];
