import ModuleFederationImage from '@/assets/ModuleFederation.jpg';
import SingleSpaImage from '@/assets/SingleSpa.jpg';
import type { ProseBlockProps } from '@/components/ProseBlock';
import iframeImage from '@/assets/Slide-iframe.jpg';
import CallOutImage from '@/assets/Slide10.jpeg';
import MonolithImage from '@/assets/Slide9.jpeg';
import CallToAction from '@/components/CallToAction';
import { ResponsiveContentImageGrid } from '@/components/Image';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import { SectionSpacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import { createFileRoute } from '@tanstack/react-router';
import ReferenceLink from '@/components/ReferenceLink';

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
        preSubtitle="Micro-Frontends Part 2"
        subtitle="How We Built a Modular Front-End that Scales"
        imageAlt="Micro-Frontends Part 2"
        imageSrc={CallOutImage}
      />

      {/* ### Before Micro Frontends */}
      <TitleBlock subtitle="Comparing Our Approach to Modern Alternatives">
        Decision Making
      </TitleBlock>
      <ResponsiveContentImageGrid
        imageSrc={MonolithImage}
        imageAlt="Monolith Image"
        imageOnRight={true}
        objectFit="cover"
        caption="The Evolution of Frontend Architecture"
        columns="2fr 1fr"
        gap={3}
        aspectRatio={1 / 1.05}
      >
        <ProseBlock title="Before Micro Frontends" />
        <ProseList items={bulletPoints1} subTitle="The Frontend Evolution:" />
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
      <ProseBlock title="Micro-Frontend Strategies" />
      <ProseList items={bulletPoints2} subTitle="Three flavors to choose from:" />

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
        imageOnRight={true}
        objectFit="cover"
        caption="Module Federation: shines at dynamic, runtime modules"
        columns="2fr 1fr"
        gap={3}
        aspectRatio={16 / 11}
      >
        <ProseBlock title="Module Federation:" />
        <ProseList items={bulletPointsMf1} subTitle="Shiny Happy Modules:" />
        <ProseBlock>
          Module Federation shines at dynamic, runtime module sharing. You can
          mark some modules as part of your build (local) and others as
          runtime-loaded remotes. It even supports nesting—each build becomes
          its own "container" and can consume modules from other containers.
          Think of it like an iframe inside an iframe, only without the messy
          postMessage glue.
        </ProseBlock>
      </ResponsiveContentImageGrid>
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

      <ProseBlock>
        There are two main drawbacks to using Module Federation for your
        micro-frontend architecture. First, it locks you into Webpack for
        building all your applications. If you love Webpack, that's fine, but
        you lose the freedom to choose alternatives like Vite or Rollup for
        performance or simplicity reasons.
      </ProseBlock>

      <ProseBlock>
        Second, it constrains your development stacks. As I mentioned earlier,
        supporting multiple frameworks can be a double-edged sword. If any of
        your apps are legacy and you want to include them without a full
        rewrite, Module Federation may become a deal-breaker. You will need to
        ultimately decide if the trade-offs are worth it.
      </ProseBlock>

      <SectionSpacer id="single-spa" />
      <ResponsiveContentImageGrid
        imageSrc={SingleSpaImage}
        imageAlt="Single SPA"
        imageOnRight={false}
        objectFit="cover"
        caption="Single-SPA: coordinates multiple micro-apps on the same page"
        columns="1fr 2fr"
        gap={2}
        aspectRatio={16 / 11}
      >
        <ProseBlock title="Single Spa" />
        <ProseList
          items={bulletPointsSspa1}
          subTitle="What it Brings to the Game:"
        />
      </ResponsiveContentImageGrid>
      <ProseBlock>
        Single-Spa is currently the most popular micro-frontend solution, and
        for good reason. It avoids iframes by hosting multiple JavaScript
        frameworks together so your micro-frontends work seamlessly. I don't
        believe Single-Spa is for the faint of heart. Building a "Hello, world"
        demo or an initial proof of concept is doable, but complexity grows
        quickly. They even offer classes and tutorials because integrating it
        properly takes careful planning.
      </ProseBlock>

      <ProseBlock>
        At a high level, Single-Spa drives the entire application lifecycle. You
        create a root configuration file that renders the main HTML page and
        registers each micro-frontend.
      </ProseBlock>
      <ProseBlock>
        Each micro-frontend must know how to bootstrap, mount, and unmount
        itself from the DOM. That sounds like a regular SPA, but here you must
        coordinate multiple SPAs on the same page—none of them have their own
        standalone index.html.
      </ProseBlock>
      <ProseBlock>
        Perhaps the biggest hurdle is migrating an existing SPA into Single-Spa.
        Two challenges stand out:
        <ol>
          <li>
            Implementing the unmount lifecycle. Most SPAs aren't designed to go
            dormant and remove themselves from the DOM. Single-Spa provides
            helpers, but you still need to refactor and plan carefully.
          </li>{' '}
          <li>
            Managing dependencies. CSS and font conflicts are common because
            traditional SPAs rely on a single index.html. Single-Spa advises
            bundling as much as possible into your JavaScript bundles. If you
            must load globals in your root config, be prepared for potential CSS
            clashes.
          </li>
        </ol>
      </ProseBlock>

      <SubSectionStarter title="Getting Started">
        Here is a high-level overview of how to  get started and set up a Single-Spa app:
        <ul>
          <li>
            Choose your loader—Single-Spa suggests SystemJS, but you can use
            alternatives, even Module Federation.
          </li>
          <li>Preload shared libraries to speed up performance.</li>
          <li>
            Share code and functions via import/exports, just like in a
            monolith.
          </li>
          <li>
            Apply lazy loading wherever possible to minimize initial load time.
          </li>
          <li>
            Create an import map that routes application URLs to your local
            environment.
          </li>
        </ul>
      </SubSectionStarter>
      <ProseBlock>
        If you decide on Single-Spa, you'll need to tackle each of those areas
        in depth.
      </ProseBlock>
      <ReferenceLink
        url="https://single-spa.js.org/docs/recommended-setup"
        linkText="https://single-spa.js.org/docs/recommended-setup"
        text="Visit the recommended setup guide (https://single-spa.js.org/docs/recommended-setup) for full details."
      />

      <SectionSpacer id="iframe" />
      <ResponsiveContentImageGrid
        imageSrc={iframeImage}
        imageAlt="Iframe"
        imageOnRight={true}
        objectFit="cover"
        caption="Iframe: isolation and independent updates"
        columns="2fr 1fr"
        gap={3}
        aspectRatio={1 / 0.9}
      >
        <ProseBlock title="Iframe-Based Approach" />
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
      <ProseBlock title="Pros and Cons" />
      <ProseBlock
        title="Modern Micro-Frontend Frameworks (Webpack Module Federation, Single-SPA)"
        options={{ titleVariant: 'h5' }}
      />
      <ProseList items={bulletPointsMFLPros} subTitle="Pros" />
      <ProseList items={bulletPointsMFLCons} subTitle="Cons" />
      <ProseBlock
        title="Our Iframe-Based Approach"
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
      <ProseBlock title="Rationale Behind Our Choice" />
      <ProseList
        items={bulletPointsRationale}
        subTitle="Our Decision Factors:"
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
  'Use multiple frameworks on the same page without full reloads',
  'Adopt new frameworks without rewriting your entire application',
  'Lazy-load code for faster initial page loads',
  'Independent deployments',
  'No iframes',
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
