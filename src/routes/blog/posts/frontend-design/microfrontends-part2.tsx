import CallToAction from '@/components/CallToAction';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
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
      />

      {/* ### Before Micro Frontends */}
      <TitleBlock subtitle="Comparing Our Approach to Modern Alternatives">
        Decision Making
      </TitleBlock>
      <ProseBlock title="Before Micro Frontends:" />
      <ProseList items={bulletPoints1} subTitle="The Frontend Evolution:" />

      <ProseBlock>
        Before micro-frontends, our development landscape was dominated by
        monoliths and full-stack apps. Even our UI components—widely used as
        they were—lived in one big repository. While this approach worked,
        bundling everything together made scaling and maintenance a challenge.
      </ProseBlock>

      <ProseBlock dense>
        Micro-frontends changed that by letting us break the UI into smaller,
        independent pieces. This approach not only supports mixing new projects
        with legacy systems but also gives each team the freedom to choose its
        own tech stack, paving the way for a more agile and scalable process.
      </ProseBlock>

      <ProseBlock dense spacingBottom>
        In short, our evolution went from monolithic full-stack apps to distinct
        front- and back-end systems, paving the way for microservices and
        dedicated UI components—and ultimately, to the agile world of micro
        frontends.
      </ProseBlock>

      {/* ### Micro-Frontend Strategies */}
      <ProseBlock title="Micro-Frontend Strategies:" />
      <ProseList items={bulletPoints2} subTitle="The Frontend Evolution:" />

      <ProseBlock>
        Before micro-frontends, our development landscape was dominated by
        monoliths and full-stack apps. Even our UI components—widely used as
        they were—lived in one big repository. While this approach worked,
        bundling everything together made scaling and maintenance a challenge.
      </ProseBlock>

      <ProseBlock dense>
        Micro-frontend strategies offer several ways to structure your
        application. With external app bootstrapping, a main app loads code from
        different servers by fetching CSS, JS, and other assets, then stitches
        them together using the window object and an event bus for
        communication. This approach supports independent deployments while
        keeping things cohesive.
      </ProseBlock>

      <ProseBlock dense spacingBottom>
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
      <ProseBlock title="Modern Micro-Frontend libraries:" />
      <ProseList items={bulletPoints2} subTitle="The Frontend Evolution:" />

      <ProseBlock title="Module Federation:" />
      <ProseList items={bulletPointsMf1} subTitle="The Frontend Evolution:" />
      <ProseBlock dense>
        Webpack Module Federation lets you dynamically share and load modules
        across independently deployed applications at runtime. Instead of
        bundling everything upfront, modules are fetched only as needed, helping
        keep initial load times quick—think of it like ordering just the pizza
        slices you want.
      </ProseBlock>

      <ProseBlock dense spacingBottom>
        However, this flexibility requires careful management. Keeping
        dependencies in check to avoid version conflicts and duplication can get
        complex quickly. It's powerful, but balancing shared dependencies
        definitely takes some practice.
      </ProseBlock>

      <ProseBlock title="Single Spa:" />
      <ProseList
        items={bulletPointsSspa1}
        subTitle="What it Brings to the Game:"
      />
      <ProseBlock dense>
        Single-SPA takes a slightly different approach by coordinating multiple
        micro-applications on a single page—even if they're built using
        different frameworks. It manages routing, mounting, updating, and
        unmounting smoothly, ensuring each micro-app plays nicely with others on
        the page.
      </ProseBlock>

      <ProseBlock dense>
        But this flexibility brings its own challenges. Handling CSS scoping,
        managing global state, and shared assets adds complexity. It's a bit
        like juggling while riding a unicycle—impressive once mastered, but
        definitely not without a learning curve.
      </ProseBlock>

      <ProseBlock dense spacingBottom>
        Both Module Federation and Single-SPA introduce dynamic module sharing
        and independent deployments, but also require tighter integration,
        thoughtful dependency management, and increased build complexity.
        Whichever you choose, the goal remains the same: creating flexible,
        maintainable, and scalable front-end architectures.
      </ProseBlock>

      <ProseBlock title="Iframe-Based Approach:" />
      <ProseList
        items={bulletPointsIframe1}
        subTitle="Simple, Secure, and Scalable:"
      />

      <ProseBlock dense>
        Iframes offer built-in isolation, running each module in its own browser
        context. This means your JavaScript, CSS, and DOM remain separate,
        naturally avoiding conflicts and helping keep global state tidy. Plus,
        sandboxing enhances security by limiting what embedded content can
        access—a big win when integrating third-party or less-trusted sources.
      </ProseBlock>
      <ProseBlock dense>
        Thanks to this isolation, deployments become simpler and more agile.
        Modules can be updated independently, allowing for efficient caching
        strategies and quicker rollouts. Even better, if one module encounters
        an issue, the rest of your app stays safe—errors or heavy processing
        inside an iframe won’t crash or block your main page.
      </ProseBlock>

      {/* ### Pros and Cons */}
      {/* TODO: Come back and style this better */}
      <ProseBlock title="Pros and Cons:" />
      <ProseBlock
        title="Modern Micro-Frontend Frameworks (Webpack Module Federation, Single-SPA):"
        options={{ titleVariant: 'h5' }}
        dense
      />
      <ProseList items={bulletPointsMFLPros} subTitle="Pros" />
      <ProseList items={bulletPointsMFLCons} subTitle="Cons" />
      <ProseBlock
        title="Our Iframe-Based Approach:"
        options={{ titleVariant: 'h5' }}
        dense
      />
      <ProseList items={bulletPointsIframePros} subTitle="Pros" />
      <ProseList items={bulletPointsIframeCons} subTitle="Cons" />
      <ProseBlock dense>
        Modern micro-frontend frameworks like Webpack Module Federation and
        Single-SPA offer powerful dynamic integration and support multiple
        frameworks. However, they add complexity due to tricky dependency
        management, larger bundles, and tighter team coordination, all of which
        can slow things down.
      </ProseBlock>
      <ProseBlock dense spacingBottom>
        Our iframe-based approach prioritizes stability, security, and
        simplicity. While less dynamic, it gives us reliable fault isolation,
        easy deployments, and lower maintenance—benefits perfectly suited for
        our business model.
      </ProseBlock>

      {/* ### Rationale Behind Our Choice */}
      <ProseBlock title="Rationale Behind Our Choice:" />
      <ProseList
        items={bulletPointsRationale}
        subTitle="Our Decision Factors"
      />
      <ProseBlock dense>
        When we first designed our system, modern micro-frontend frameworks like
        Single-SPA and Webpack Module Federation were either unavailable or not
        mature enough. We needed something immediately that could quickly
        integrate multiple pages into various client web pages. Given our
        business requirements, iframes seemed to be the best choice at the time.
      </ProseBlock>
      <ProseBlock dense>
        Our team dynamics also played a role. With a backend-heavy group and
        full-stack developers occasionally handling front-end work, simplicity
        was key. Iframes allowed modules to be updated independently without
        requiring deep front-end expertise across the board. Ultimately, based
        on timing, business needs, and our team structure, iframes made the most
        sense.
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
  'Supports independent deployments',
  'Requires careful dependency management',
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
