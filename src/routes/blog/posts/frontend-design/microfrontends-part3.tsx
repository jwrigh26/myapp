import CallToAction from '@/components/CallToAction';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import QuoteBlock from '@/components/QuoteBlock';
import ReferenceLink from '@/components/ReferenceLink';
import TitleBlock from '@/components/TitleBlock';
import { createFileRoute } from '@tanstack/react-router';
import CallOutImage from '@/assets/home_page_splash.jpg';
import Image, {
  AspectRatioContainer,
  ResponsiveContentImageGrid,
} from '@/components/Image';
import CoffeeWizard1 from '@/assets/Slide15.jpeg';
import CoffeeWizard2 from '@/assets/Slide16.jpeg';

export const Route = createFileRoute(
  '/blog/posts/frontend-design/microfrontends-part3'
)({
  component: RouteComponent,
  head: () => ({
    getTitle: () => 'Micro-Frontends Part3',
    meta: [
      {
        name: 'Micro-Frontends Part3',
        content: 'My Post Page 1',
      },
      {
        title: 'Micro-Frontends Part3',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <CallToAction
        title="Not Quite Micro-Frontends"
        preSubtitle="Micro-Frontends Part 3:"
        subtitle="Lessons Learned"
        imageAlt="Micro-Frontends Part 3"
        imageSrc={CallOutImage}
      />
      {/* ### Before Micro Frontends */}
      <TitleBlock subtitle="">
        Communication Challenges in a Modular Front-End
      </TitleBlock>
      <ResponsiveContentImageGrid
        imageOnRight
        mobileImageFirst
        gap={2}
        imageSrc={CoffeeWizard1}
        imageAlt="Coffee Wizard 1"
        aspectRatio={4 / 3}
        objectFit="cover"
        caption="Host site displaying a coffee brewing wizard"
      >
        <ProseBlock title="Why Communication Matters" />
        <ProseList items={bulletPoints1} spacingBottom />
        <QuoteBlock>
          Example: The Magic Coffee site is currently showing a coffee brewing
          wizard. The site is the “host site” and is responsible for main
          navigation, and the wizard is an iframe that manages its own
          step-by-step process.
        </QuoteBlock>
        <ProseBlock>
          The host site, without any custom messaging bus required, has the
          ability to load iframes that display various pages or modules, such as
          a wizard.
        </ProseBlock>
        <ProseBlock>
          When performing basic routing, the host site is only concerned with
          converting routes into various iframe URLs.
        </ProseBlock>
        <ProseBlock>
          If a user navigates to a wizard, such as the Magic Coffee site’s Brew
          wizard, then once the page is loaded, all user actions related to the
          wizard are managed by the iframe’s module.
        </ProseBlock>
      </ResponsiveContentImageGrid>

      <ResponsiveContentImageGrid
        imageOnRight={false}
        mobileImageFirst
        gap={2}
        imageSrc={CoffeeWizard2}
        imageAlt="Coffee Wizard 2"
        aspectRatio={4 / 3}
        objectFit="cover"
        caption="Exernal action to buy a V60 is triggered by the wizard"
      >
        <ProseBlock>
          However, what happens if the wizard wants to display an option to buy
          an item used in its brewing tutorial? If a user clicks the "buy"
          button, things get a little more complicated.
        </ProseBlock>
        <ProseBlock>
          Iframes aren't very social — they prefer to keep to themselves. To get
          our wizard's buy button to actually navigate to the shopping page's
          Hario V60 page, we need to provide a messaging layer that uses the
          window's <span className="code">postMessage</span> method so the two
          can talk and play nicely.
        </ProseBlock>
        <ProseBlock>
          You can use the window's <span className="code">postMessage</span>{' '}
          method directly, but I encourage you to either roll your own wrapper
          or piggyback off another library out there that provides one. A good
          wrapper can add some extra utility and safety checks.
        </ProseBlock>
      </ResponsiveContentImageGrid>
      {/* ### Our Current Approach */}
      <ProseBlock title="Our Current Approach" />
      <ProseList items={bulletPoints2} />
      <ProseBlock dense spacingBottom>
        Our custom iframe messaging system enables flexible module-to-module
        communication, but it isn't without its challenges. For example, if a
        module needs to trigger an action outside its iframe (like updating
        navigation or global state), careful coordination is required. Getting
        these interactions right is crucial to delivering the smooth, unified
        experience our users expect.
      </ProseBlock>
      {/* ### Iframe Messaging Gotchas */}
      <ProseBlock title="Iframe Messaging Gotchas" />
      <ProseList items={bulletPoints3} />
      <ProseBlock dense spacingBottom>
        While our iframe messaging system is powerful, it's not without its
      </ProseBlock>
      {/* ### Messaging Improvements*/}
      <ProseBlock
        title="Messaging Improvements"
        subtitle="Lessons From Post-Robot"
      />
      <ProseList items={bulletPoints4} />
      <ProseBlock dense>
        We've learned valuable lessons from working with PostRobot, especially
        around how parent and child iframes communicate. Establishing clear,
        robust handshake protocols helps prevent miscommunication between
        modules—saving us from unnecessary debugging. We’ve also seen how
        built-in error handling, like acknowledging messages and gracefully
        managing failures, can significantly enhance reliability.
      </ProseBlock>
      <ProseBlock dense spacingBottom>
        We're currently enhancing our API and documentation to meet the growing
        needs of our application. Adopting asynchronous messaging, including
        passing functions directly in messages, will simplify interactions
        between iframes and streamline navigation events. Clear listener/client
        patterns and well-defined communication channels will further reduce
        complexity, making the entire messaging system simpler, safer, and more
        maintainable.
      </ProseBlock>

      <ReferenceLink
        text="For more background on PostRobot and iframe messaging best practices, check out Daniel Brain's article on Medium: Introducing post-robot — smart cross-domain messaging, from PayPal"
        url="https://bluepnume.medium.com/introducing-post-robot-smart-cross-domain-messaging-from-paypal-bebf27c8619e"
        linkText="Brain's article on Medium: Introducing post-robot — smart cross-domain messaging, from PayPal"
        spacingBottom
      />

      {/* ### Iframe Messaging Gotchas */}
      <ProseBlock title="Tech Debt & Early Planning" />
      <ProseList items={bulletPoints5} />
      <ProseBlock dense spacingBottom>
        If we could do things again, we'd invest much earlier in creating
        shareable libraries—especially around dates, forms, and UI components.
        Developing simple wrappers around external libraries from the start
        would have made future upgrades much easier, reducing technical debt and
        simplifying maintenance.
      </ProseBlock>
      <ProseBlock dense>
        Additionally, standardizing linting, testing, and build pipelines early
        is critical. A consistent setup helps maintain a cleaner codebase,
        reduces stress, and leads to smoother deployments down the road.
        Proactively handling tech debt isn't just smart—it's essential for
        long-term success.
      </ProseBlock>
    </>
  );
}

const bulletPoints1 = [
  'Host sites manage global navigation and routing.',
  'Modules handle their own internal flows.',
  'Modules and host sites require a messaging layer.',
];

const bulletPoints2 = [
  'Leverage window.postMessage alongside Post-Robot for a custom pub/sub system.',
  'Deep Navigation: Intercepts links (e.g., a link to a shopping page) to trigger host site navigation.',
  'Action Broadcasts: User actions (like clicking "open settings") get broadcasted to subscribed modules.',
];

const bulletPoints3 = [
  'Complexity: Pub/sub can get messy—hello, spaghetti code!',
  'Memory Leaks: Debugging sessions have been real all-nighters',
];

const bulletPoints4 = [
  'Robust Handshake Protocols',
  'Enhanced Error Handling',
  'Simplified API & Documentation',
  'Leveraging Asynchronous Messaging',
];

const bulletPoints5 = [
  'Shareable Libraries',
  'Wrapper Implementation',
  'Standardized Pipelines',
];

/**
 * Passing functions directly through iframe messaging, as described in the PostRobot article, simplifies cross-context communication by allowing one iframe to directly trigger actions in another without complex state management. This means your modules can interact seamlessly without extensive custom event handling or intricate synchronization logic.

Additionally, the article emphasizes several other benefits:

    Robust Error Handling: Messages acknowledge receipt and handle failures gracefully, ensuring reliability.

    Asynchronous Flexibility: Built-in support for promises and async/await makes responses easy to manage.

    Secure Communication: Explicitly defined message channels prevent unauthorized interactions.

    Cleaner APIs: Clearly defined listener and sender patterns reduce complexity and simplify maintenance.


    In other words:

    Passing functions directly through messaging, as described in the PostRobot article, helps simplify your communication model by letting one iframe trigger behavior in another without needing to explicitly handle complex state synchronization or custom event systems. For instance, instead of relying on multiple events or message types, a parent window can simply pass a callback directly to the iframe. The iframe can then execute this callback when ready, automatically running the function back in the parent context.

This means your messaging can stay clean and intuitive, significantly reducing complexity and avoiding tight coupling or complicated state management logic.
 */
