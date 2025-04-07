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
import { BodyBlock } from '@/components/BodyBlock';
import CoffeeWizard1 from '@/assets/Slide15.jpeg';
import CoffeeWizard2 from '@/assets/Slide16.jpeg';
import { Spacer } from '@/components/Spacer';

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
      <BodyBlock>
        <ResponsiveContentImageGrid
          imageOnRight
          mobileImageFirst
          imageSrc={CoffeeWizard1}
          imageAlt="Coffee Wizard 1"
          aspectRatio={4 / 3}
          objectFit="cover"
          caption="Host site displaying a coffee brewing wizard"
        >
          <ProseBlock title="Why Communication Matters" />
          <ProseList items={bulletPoints1} />
          <QuoteBlock>
            Example: The Magic Coffee site is currently showing a coffee brewing
            wizard. The site is the “host site” and is responsible for main
            navigation, and the wizard is an iframe that manages its own
            step-by-step process.
          </QuoteBlock>
        </ResponsiveContentImageGrid>
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

        <ResponsiveContentImageGrid
          imageOnRight={false}
          mobileImageFirst
          imageSrc={CoffeeWizard2}
          imageAlt="Coffee Wizard 2"
          aspectRatio={4 / 3}
          objectFit="cover"
          caption="Exernal action to buy a V60 is triggered by the wizard"
        >
          <ProseBlock>
            However, what happens if the wizard wants to display an option to
            buy an item used in its brewing tutorial? If a user clicks the "buy"
            button, things get a little more complicated.
          </ProseBlock>
          <ProseBlock>
            Iframes aren't very social — they prefer to keep to themselves. To
            get our wizard's buy button to actually navigate to the shopping
            page's Hario V60 page, we need to provide a messaging layer that
            uses the window's <span className="code">postMessage</span> method
            so the two can talk and play nicely.
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
        <ProseBlock>
          By using custom messaging, deep navigation, and event broadcasting
          through a message bus, we can handle tricky iframe communication
          between modules.
        </ProseBlock>
        {/* ### Iframe Messaging Gotchas */}
        <ProseBlock title="Iframe Messaging Gotchas" />
        <ProseBlock>
          While iframe messaging helps glue everything together, it's important
          to plan ahead. If you don't, you'll end up with a rushed arts and
          crafts project covered in Elmer’s glue.
        </ProseBlock>
        <ProseBlock>
          To help you create a work of art, might I suggest avoiding some of the
          same mistakes we made along the way?
        </ProseBlock>
        <ProseList
          subTitle="Our Biggest Iframe Messaging Gotchas"
          items={bulletPoints3}
        />
        {/* ### Messaging Improvements*/}
        <ProseBlock
          title="Messaging Improvements"
          subtitle="Lessons From Post-Robot"
        />
        <ProseList items={bulletPoints4} />
        <ProseBlock>
          We've learned valuable lessons from working with PostRobot, especially
          around how parent and child iframes communicate. Establishing clear,
          robust handshake protocols helps prevent miscommunication between
          modules—saving us from unnecessary debugging. We’ve also seen how
          built-in error handling, like acknowledging messages and gracefully
          managing failures, can significantly enhance reliability.
        </ProseBlock>
        <ProseBlock>
          We're currently enhancing our API and documentation to meet the
          growing needs of our application. Adopting asynchronous messaging,
          including passing functions directly in messages, will simplify
          interactions between iframes and streamline navigation events. Clear
          listener/client patterns and well-defined communication channels will
          further reduce complexity, making the entire messaging system simpler,
          safer, and more maintainable.
        </ProseBlock>

        <ReferenceLink
          text="For more background on PostRobot and iframe messaging best practices, check out Daniel Brain's article on Medium: Introducing post-robot — smart cross-domain messaging, from PayPal"
          url="https://bluepnume.medium.com/introducing-post-robot-smart-cross-domain-messaging-from-paypal-bebf27c8619e"
          linkText="Daniel Brain's article on Medium: Introducing post-robot — smart cross-domain messaging, from PayPal"
        />

        {/* ### Iframe Messaging Gotchas */}
        <ProseBlock title="Tech Debt & Early Planning" />
        <ProseList items={bulletPoints5} />
        <ProseBlock>
          If we could do things again, we'd invest much earlier in creating
          shareable libraries—especially around dates, forms, and UI components.
          Developing simple wrappers around external libraries from the start
          would have made future upgrades much easier, reducing technical debt
          and simplifying maintenance.
        </ProseBlock>
        <ProseBlock>
          Additionally, standardizing linting, testing, and build pipelines
          early is critical. A consistent setup helps maintain a cleaner
          codebase, reduces stress, and leads to smoother deployments down the
          road. Proactively handling tech debt isn't just smart—it's essential
          for long-term success.
        </ProseBlock>
      </BodyBlock>
    </>
  );
}

const bulletPoints1 = [
  'Host sites manage global navigation and routing.',
  'Modules handle their own internal flows.',
  'Modules and host sites require a messaging layer.',
];

const bulletPoints2 = [
  'Leverage window.postMessage with Post-Robot to create a custom message bus.',
  'Intercept deep navigation links (e.g., a link to a shopping page) and trigger host site navigation.',
  'Broadcast user events (like clicking "open settings") to subscribed modules.',
];

const bulletPoints3 = [
  'Using Post-Robot in a "fire and forget" fashion. We sent messages out but had no idea if the window receiving them was still around. This led to memory leaks.',
  'Not setting standards or rules for our messaging bus. Our code quickly became spread out and hard to manage. This made debugging and iterating on feature requests much more difficult.',
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
