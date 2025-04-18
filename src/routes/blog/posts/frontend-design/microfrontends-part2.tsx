import ModuleFederationImage from '@/assets/ModuleFederation.jpg';
import SingleSpaImage from '@/assets/SingleSpa.jpg';
import iframeImage from '@/assets/Slide-iframe.jpg';
import CallOutImage from '@/assets/Slide8.jpeg';
import MonolithImage from '@/assets/Slide9.jpeg';
import CallToAction from '@/components/CallToAction';
import { ResponsiveContentImageGrid } from '@/components/Image';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import { SectionSpacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/blog/posts/frontend-design/microfrontends-part2'
)({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Micro-Frontends Part 2',
    meta: [
      {
        name: 'Micro-Frontends Part 2',
        content: 'My Post Page 1',
      },
      {
        title: 'Micro-Frontends Part 2',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <CallToAction
        title="Not Quite Micro-Frontends"
        preSubtitle="Micro-Frontends Part 2:"
        subtitle="How We Built a Modular Front-End that Scales"
        imageAlt="Micro-Frontends Part 2"
        imageSrc={CallOutImage}
      />

      {/* ### Before Micro Frontends */}
      <TitleBlock subtitle="Comparing Our Approach to Modern Alternatives">
        Decision Making
      </TitleBlock>
      <ProseBlock title="Before Micro Frontends:" />
      <ProseList items={bulletPoints1} subTitle="The Frontend Evolution:" />
      <ResponsiveContentImageGrid
        imageSrc={MonolithImage}
        imageAlt="Monolith Image"
        imageOnRight={false}
        objectFit="cover"
        caption="The Evolution of Frontend Architecture"
        gap={2}
        aspectRatio={1 / 1.05}
      >
        <ProseBlock>
          Before micro-frontends, the development landscape was dominated by
          monoliths and full-stack apps. This eventually gave way to separate
          frontend and backend applications, which dominated for a time.
        </ProseBlock>

        <ProseBlock>
          I'm not sure exactly when, but microservices came into play along with
          component-based apps. This architecture is still popular and meets the
          needs of many applications. However, for large teams and applications,
          another option exists: micro-frontends.
        </ProseBlock>
      </ResponsiveContentImageGrid>

      {/* ### Micro-Frontend Strategies */}
      <SectionSpacer id="micro-frontend-stragegies" />
      <ProseBlock title="Micro-Frontend Strategies:" />
      <ProseList items={bulletPoints2} subTitle="The Frontend Evolution:" />

      <ProseBlock>
        Micro-frontend strategies offer several ways to structure your
        application. With external app bootstrapping, a main app loads code from
        different servers by fetching CSS, JS, and other assets, then stitches
        them together using the window object and an event bus for
        communication. This approach supports independent deployments while
        keeping things cohesive.
      </ProseBlock>

      <ProseBlock>
        Other strategies involve dedicated micro-frontend libraries and
        frameworks. For example, Single SPA provides a top-level router and lazy
        loading, allowing legacy and new projects to coexist—though all code
        lives on the same server and is bundled together. Module Federation,
        introduced in Webpack v5, dynamically shares and loads modules across
        independently deployed applications. Alternatively, iFrames host code on
        separate servers, enabling independent deployments with communication
        handled via window.postMessage method.
      </ProseBlock>

      {/* ### Modern Micro-Frontend libraries */}
      <SectionSpacer id="module-federation" />
      <ResponsiveContentImageGrid
        imageSrc={ModuleFederationImage}
        imageAlt="Module Federation"
        imageOnRight={false}
        objectFit="cover"
        caption="Module Federation: shines at dynamic, runtime modules"
        gap={2}
        aspectRatio={16 / 11}
      >
        <ProseBlock title="Module Federation:" />
        <ProseList items={bulletPointsMf1} subTitle="The Frontend Evolution:" />
      </ResponsiveContentImageGrid>
      <ProseBlock>
        Module Federation shines at dynamic, runtime module sharing. You can
        mark some modules as part of your build (local) and others as
        runtime-loaded remotes. It even supports nesting—each build becomes its
        own “container” and can consume modules from other containers. Think of
        it like an iframe inside an iframe, only without the messy postMessage
        glue.
      </ProseBlock>

      <ProseBlock>
        If you wanted to mirror our iframe framework, you'd use the “separate
        builds per page” pattern. In that setup, each page in your SPA is a
        remote container build, and your host site (the shell) is another
        container build. Each page deploys on its own schedule, just like our
        iframe modules.
      </ProseBlock>

      <ProseBlock>
        The shell build declares common libraries as shared modules, so they
        aren't duplicated in every page build. That keeps each page's bundle
        small. Our iframe approach pulls in all packages for each entry point,
        so we don't get that same savings. On paper that sounds bad, but in
        production the difference isn't so severe—and you can always use rollup
        or additional code-splitting to trim bloat.
      </ProseBlock>

      <ProseBlock>
        With Module Federation, the shell stays stable while you push updates to
        remote modules independently. That combination of independent
        deployments, shared dependencies, and runtime loading is where Module
        Federation really wins.
      </ProseBlock>

      <SectionSpacer id="single-spa" />
      <ResponsiveContentImageGrid
        imageSrc={SingleSpaImage}
        imageAlt="Single SPA"
        imageOnRight={false}
        objectFit="cover"
        caption="Single-SPA: coordinates multiple micro-apps on the same page"
        gap={2}
        aspectRatio={16 / 11}
      >
        <ProseBlock title="Single Spa:" />
        <ProseList
          items={bulletPointsSspa1}
          subTitle="What it Brings to the Game:"
        />
      </ResponsiveContentImageGrid>
      <ProseBlock>
        Single-SPA coordinates multiple micro-apps on the same page, even if
        they use different frameworks. It handles routing, mounting, updating,
        and unmounting to ensure each app runs smoothly alongside the others.
      </ProseBlock>

      <ProseBlock>
        This flexibility comes with trade-offs. CSS scoping, global state, and
        shared assets can be tricky to manage and add complexity.
      </ProseBlock>

      <SectionSpacer id="iframe" />
      <ResponsiveContentImageGrid
        imageSrc={iframeImage}
        imageAlt="Iframe"
        imageOnRight={false}
        objectFit="cover"
        caption="Iframe: isolation and independent updates"
        gap={2}
        aspectRatio={1 / 0.9}
      >
        <ProseBlock title="Iframe-Based Approach:" />
        <ProseList
          items={bulletPointsIframe1}
          subTitle="Simple, Secure, and Scalable:"
        />
      </ResponsiveContentImageGrid>

      <ProseBlock>
        Iframes provide built-in isolation. Each module runs in its own browser
        context, keeping JavaScript, CSS, and the DOM separate. This prevents
        conflicts and protects global state. Sandboxing also improves security
        by restricting iframe access.
      </ProseBlock>

      <ProseBlock>
        This isolation simplifies deployment. Modules can be updated
        independently, enabling efficient caching and faster rollouts. If one
        module fails or runs slowly, the rest of the app remains unaffected.
      </ProseBlock>

      {/* ### Pros and Cons */}
      {/* TODO: Come back and style this better */}
      <ProseBlock title="Pros and Cons:" />
      <ProseBlock
        title="Modern Micro-Frontend Frameworks (Webpack Module Federation, Single-SPA):"
        options={{ titleVariant: 'h5' }}
      />
      <ProseList items={bulletPointsMFLPros} subTitle="Pros" />
      <ProseList items={bulletPointsMFLCons} subTitle="Cons" />
      <ProseBlock
        title="Our Iframe-Based Approach:"
        options={{ titleVariant: 'h5' }}
      />
      <ProseList items={bulletPointsIframePros} subTitle="Pros" />
      <ProseList items={bulletPointsIframeCons} subTitle="Cons" />
      <ProseBlock>
        Modern micro-frontend frameworks like Webpack Module Federation and
        Single-SPA offer powerful dynamic integration and support multiple
        frameworks. However, they add complexity due to tricky dependency
        management, larger bundles, and tighter team coordination, all of which
        can slow things down.
      </ProseBlock>
      <ProseBlock>
        Our iframe-based approach prioritizes stability, security, and
        simplicity. While less dynamic, it gives us reliable fault isolation,
        easy deployments, and lower maintenance.
      </ProseBlock>

      {/* ### Rationale Behind Our Choice */}
      <ProseBlock title="Rationale Behind Our Choice:" />
      <ProseList
        items={bulletPointsRationale}
        subTitle="Our Decision Factors"
      />
      <ProseBlock>
        When we first designed the system, tools like Single-SPA and Webpack
        Module Federation were either unavailable or not mature. We needed a
        fast way to integrate multiple pages into client sites. Given our
        requirements, iframes were the most practical option.
      </ProseBlock>

      <ProseBlock>
        Team structure also influenced the decision. With a backend-heavy team
        and occasional front-end support from full-stack developers, simplicity
        was important. Iframes let us update modules independently without deep
        front-end knowledge. Based on timing, needs, and team stucture, iframes
        made the most sense.
      </ProseBlock>
    </>
  );
}

// #################################################
// ### Usuable Components
// #################################################

// ### bullet points
const bulletPoints1 = [
  'Monolith, full stack apps',
  'Frontend and Backend apps',
  'Component based Apps and Microservices',
  'Micro Frontends',
];

const bulletPoints2 = [
  'External app bootstrapping',
  'Micro-Frontend libraries and frameworks',
  'iFrames',
];

// #### Micro Frontend Libraries
// - Module Federation
const bulletPointsMf1 = [
  'Dynamic, runtime module sharing',
  'Supports separate builds per page',
  'Shared dependencies',
];
// - Single SPA
const bulletPointsSspa1 = [
  'Coordinates multiple micro-applications on one page',
  'Handles routing and lifecycle events',
  'Complex setup (CSS, global state, etc.)',
];
// - iFrames
const bulletPointsIframe1 = [
  'Isolation: Each module runs in its own browser context',
  'Independent Updates: Modules can be updated separately',
  'Simplicity: Quick deployments with reduced complexity',
  'Custom Messaging: In-house iframe messaging (based on PostRobot.js)',
];

// - Pros and Cons
const bulletPointsMFLPros = [
  'Dynamic module sharing and tighter integration (routing, lifecycle)',
  'Flexibility to work with multiple frameworks',
];

const bulletPointsMFLCons = [
  'Complex dependency management',
  'Increased coordination among teams',
  'Larger bundles and potential performance issues',
  'More challenging end-to-end testing',
];

const bulletPointsIframePros = [
  'High isolation and security (sandboxing, separate contexts)',
  'Independent deployment cycles',
  'Simpler build and maintenance processes',
  'Reduced risk of global state conflicts',
];

const bulletPointsIframeCons = [
  'Less dynamic integration compared to modern frameworks',
  'Custom messaging requires ongoing support',
];

// Rational Behind Our Choice
const bulletPointsRationale = [
  'Timeing',
  'Business Needs',
  'Team Dynamics',
  'Deployment and Maintenance',
];
