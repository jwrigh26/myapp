import ModuleFederationImage from '@/assets/ModuleFederation.jpg';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SingleSpaImage from '@/assets/SingleSpa.jpg';
import type { ProseBlockProps } from '@/components/ProseBlock';
import iframeImage from '@/assets/Slide-iframe.jpg';
import CallOutImage from '@/assets/Slide0.jpeg';
import CallOutImage2 from '@/assets/Strats.jpg';
import CallOutImage3 from '@/assets/Slide19.jpeg';
import MonolithImage from '@/assets/Slide9.jpeg';
import StratsAndChoices from '@/assets/Slide8.jpeg';
import CallToAction from '@/components/CallToAction';
import { ResponsiveContentImageGrid } from '@/components/Image';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import { SectionSpacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import { createFileRoute } from '@tanstack/react-router';
import ReferenceLink from '@/components/ReferenceLink';
import RationaleChoiceImage from '@/assets/Slide14.jpeg';
import IntroBlock from '@/components/IntroBlock';
import BlogPostNavigator from '@/components/BlogPostNavigator';

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
        imageSrc={CallOutImage2}
        date="04-21-2025"
      />

      {/* ### Before Micro Frontends */}
      <TitleBlock subtitle="Comparing Our Approach to Modern Alternatives">
        Decision Making
      </TitleBlock>
      <IntroBlock>
        In Part 2, we'll cover a quick history of micro-frontends. We'll explore
        different strategies for picking an architecture and compare the pros
        and cons of each.
      </IntroBlock>
      <SectionSpacer id="decision-making" />
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
        <ProseList items={bulletPoints1} subTitle="The Frontend Evolution" />
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
      <ResponsiveContentImageGrid
        imageSrc={StratsAndChoices}
        imageAlt="Strategies and Choices"
        imageOnRight={false}
        objectFit="cover"
        caption="Micro-Frontend Strategies: How to Choose?"
        columns="1fr 2fr"
        gap={3}
        aspectRatio={1 / 0.95}
      >
        <ProseBlock title="Micro-Frontend Strategies" />
        <ProseList
          items={bulletPoints2}
          subTitle="Three flavors to choose from"
        />

        <ProseBlock>
          To my knowledge, micro-frontend strategies come in three flavors.
          We've already covered my favorite flavor, iframes, so let's move on to
          the next one, which is actually similar to iframes. We considered
          adopting this approach, but ultimately we went with iframes.
        </ProseBlock>

        <ProseBlock>
          In a presentation I saw, the speaker called this flavor “External App
          Bootstrapping.” It uses a host application to load CSS, JS, and other
          assets from different servers. Then it stitches the code together
          using the <span className="code">window</span> object and an event
          bus, much like an iframe's messaging system. Like the other
          approaches, it supports independent deployments and is able to look
          like a single application.
        </ProseBlock>
      </ResponsiveContentImageGrid>

      <ProseBlock>
        The main reason we decided against External App Bootstrapping was the
        speed and simplicity of iframes. iFrames let us hit market faster. They
        were also the default choice for third-party integration at the time.
      </ProseBlock>

      <ReferenceLink
        url="https://youtu.be/ftBc8w-lwmY?si=O_e2mgqSao6-o3Bi"
        linkText="walkthrough on YouTube"
        text="If you'd like to see External App Bootstrapping in action, check out this walkthrough on YouTube."
      />

      <SubSectionStarter title="Micro-Frontend Libraries" />
      <ProseBlock>
        A more modern approach to micro-frontends involves using libraries.
        Single-spa, for example, provides a top-level router and built-in lazy
        loading so that legacy and new projects can coexist on the same page.
        While another library, Module Federation, is a Webpack plugin that
        enables dynamic module sharing between different applications. It allows
        you to load remote modules at runtime, making it easier to develop and
        deploy micro-frontends.
      </ProseBlock>

      <ProseBlock>
        Let's take a closer look at these two libraries and how they compare to
        our iframe approach.
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
        <ProseBlock title="Module Federation" />
        <ProseList items={bulletPointsMf1} subTitle="Shiny Happy Modules" />
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
          subTitle="What it Brings to the Game"
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
        A high-level overview of how to get started with Single-Spa:
        <ul>
          <li>
            Choose your loader. Single-Spa suggests SystemJS, but you can use
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
        linkText="recommended setup guide"
        text="Visit the recommended setup guide for full details."
      />

      <ProseBlock>
        One more thing to note: If you're feeling bold and want to get the benefits of Single-spa with Module Federation, you can
        combine the two. This lets you use Module Federation for dynamic module
        sharing while still getting the lifecycle management and routing
        benefits of Single-Spa. It's a bit more complex, but it can be a powerful
        combination.
      </ProseBlock>

      <ReferenceLink
        url="https://www.youtube.com/watch?v=wxnwPLLIJCY&t=328s"
        linkText="See this video for a practical example"
        text="It's possible to combine Single-Spa and Module Federation for advanced micro-frontend architectures. See this video for a practical example."
      />

      <SectionSpacer id="iframe" />
      <ResponsiveContentImageGrid
        imageSrc={iframeImage}
        imageAlt="iFrame"
        imageOnRight={true}
        objectFit="cover"
        caption="iFrame: isolation and independent updates"
        columns="2fr 1fr"
        gap={3}
        aspectRatio={1 / 0.9}
      >
        <ProseBlock title="iFrame-Based Approach" />
        <ProseList
          items={bulletPointsIframe1}
          subTitle="Simple, Secure, and Scalable"
        />
      </ResponsiveContentImageGrid>

      <ProseBlock>
        Coming back to where we started, iframes remain a viable option in the
        micro-frontend landscape. They lack some of the bells and whistles you
        get with, say, Single-Spa, and they aren't as efficient at tree shaking
        because each iframe runs its own browser context. At the same time, they
        can be easier to manage. Each iframe provides true isolation, making it
        ideal for embedding in third-party applications. That isolation,
        combined with the ability to update modules independently with minimal
        code changes, offers two big advantages.
      </ProseBlock>

      <ProseBlock>
        They do seem a bit “dated” compared to newer approaches. Building your
        own messaging layer and accommodating iframe quirks isn't always the
        smoothest path when developing web apps. Despite these downsides, an
        iframe approach lets you avoid lock-in to a third-party micro-frontend
        framework.
      </ProseBlock>

      <ProseBlock>
        For example, Module Federation requires you to adopt its own
        requirements and dependencies, and your project must operate within its
        constraints. That may not matter for most teams, but I've seen
        developers struggle to update package libraries and simply make things
        work. If you roll your own micro-frontend solution, you'll still face
        challenges, but you maintain full control over your domain and enjoy
        more freedom to evolve your application without being confined by
        someone else's tooling choices.
      </ProseBlock>


      {/* ### Pros and Cons */}
      {/* TODO: Come back and style this better */}
      <SectionSpacer id="pros-and-cons" />
      <ProseBlock title="Pros and Cons" />
      <SubSectionStarter title="Module Federation" />
      <ProsConsList pros={bulletPointsMFLPros} cons={bulletPointsMFLCons} />
      <SubSectionStarter title="Single-Spa" />
      <ProsConsList
        pros={bulletPointsSingleSpaPros}
        cons={bulletPointsSingleSpaCons}
      />
      <SubSectionStarter title="iFrame" />
      <ProsConsList
        pros={bulletPointsIframePros}
        cons={bulletPointsIframeCons}
      />

      {/* ### Rationale Behind Our Choice */}
      <SectionSpacer id="rantionale-behinde-our-choice" />
      <ResponsiveContentImageGrid
        imageSrc={RationaleChoiceImage}
        imageAlt="Rationale Behind Our Choice"
        imageOnRight={true}
        objectFit="cover"
        caption="Rationale Behind Our Choice"
        columns="2fr 1fr"
        gap={2}
        aspectRatio={1 / 1.32}
      >
        <ProseBlock title="Rationale Behind Our Choice" />
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
          and occasional front-end support from full-stack developers,
          simplicity was important. Iframes let us update modules independently
          without deep front-end knowledge. Based on timing, needs, and team
          stucture, iframes made the most sense.
        </ProseBlock>
      </ResponsiveContentImageGrid>

      <BlogPostNavigator
        prev={{
          title:
            'Micro-Frontends Part 1: How We Built a Modular Front-End that Scales',
          route: '/blog/posts/frontend-design/microfrontends-part1',
          image: CallOutImage,
          date: '2025-03-15',
          blurb:
            'Discover how we built a scalable modular front-end using iframes, tackled inter-module communication, and managed version drift.',
        }}
        next={{
          title: 'Micro-Frontends Part 3: Lessons Learned',
          route: '/blog/posts/frontend-design/microfrontends-part3',
          image: CallOutImage3,
          date: '2025-05-01',
          blurb:
            'Lessons from our micro-frontend journey: communication, messaging gotchas, and hard-won advice for modular front-end teams.',
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

// New ProsConsList component
function ProsConsList({
  pros,
  cons,
  prosColor = 'primary.light',
  consColor = 'secondary.main',
}: {
  pros: string[];
  cons: string[];
  prosColor?: string;
  consColor?: string;
}) {
  return (
    <Stack
      sx={{ border: '2px solid', borderColor: 'divider', p: 2, mb: 2 }}
      direction={{ xs: 'column', sm: 'row' }}
      gap={4}
    >
      <Box sx={{width: { xs: 'auto', sm: '412px', md: '512px', lg: '600px' }}}>
        <ProseList color={prosColor} items={pros} subTitle="Pros" />
      </Box>
      <Box>
        <ProseList color={consColor} items={cons} subTitle="Cons" />
      </Box>
    </Stack>
  );
}

// ### bullet points
const bulletPoints1 = [
  'Monolith, full stack apps',
  'Frontend and Backend apps',
  'Component based Apps and Microservices',
  'Micro-Frontends',
];

const bulletPoints2 = [
  'iFrames',
  'External app bootstrapping',
  'Micro-Frontend libraries',
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
];

// - iFrames
const bulletPointsIframe1 = [
  'Isolation: Each module runs in its own browser context',
  'Simplicity: Quick deployments with reduced complexity',
];

// - Pros and Cons
const bulletPointsMFLPros = [
  'Share code between modules easily',
  'Better tree shaking and smaller bundles',
  'Complements tools like Single-Spa if you need both routing and federation',
];

const bulletPointsMFLCons = [
  'Forces you to use Webpack for all apps',
  'Can be tricky to integrate legacy apps without a full rewrite',
  'Dependency conflicts can surface when versions drift',
];

const bulletPointsSingleSpaPros = [
  'Run multiple frameworks on the same page without full reloads',
  'Pick up new frameworks without rewriting existing apps',
  'Lazy load each micro-frontend for faster initial loads',
  'Independent deployments and no iframes',
];

const bulletPointsSingleSpaCons = [
  'You must implement mount and unmount lifecycles for each app',
  'CSS and font management can be tricky without an index.html',
  'Root config and import map setup add extra overhead',
];

const bulletPointsIframePros = [
  'Independent update cycles with minimal code changes',
  'No framework lock-in, you choose your own adventure',
  'Simple and easy to sandbox security risks',
];

const bulletPointsIframeCons = [
  'Less efficient tree shaking since each iframe has its own context',
  'You need to build and maintain your own messaging layer',
  'Lacks out-of-the-box lifecycle and routing helpers',
  'Feels dated compared to more modern micro-frontend methods',
];

// Rational Behind Our Choice
const bulletPointsRationale = [
  'Timeing',
  'Business Needs',
  'Team Dynamics',
  'Deployment and Maintenance',
];
