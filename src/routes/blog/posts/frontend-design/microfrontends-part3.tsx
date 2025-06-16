import CoffeeWizard1 from '@/assets/Slide15.jpeg';
import CoffeeWizard2 from '@/assets/Slide16.jpeg';
import MemoryLeak from '@/assets/Slide17.a.jpeg';
import PostRobot from '@/assets/Slide18.jpeg';
import IntroBlock from '@/components/IntroBlock';
import TechDebt from '@/assets/Slide19.jpeg';
import HardLessons from '@/assets/Slide21.jpeg';
import CallOutImage2 from '@/assets/Slide10.jpeg';
import { BodyBlock } from '@/components/BodyBlock';
import CallToAction from '@/components/CallToAction';
import { ResponsiveContentImageGrid } from '@/components/Image';
import ProseBlock from '@/components/ProseBlock';
import ProseList from '@/components/ProseList';
import QuoteBlock from '@/components/QuoteBlock';
import ReferenceLink from '@/components/ReferenceLink';
import { SectionSpacer, Spacer } from '@/components/Spacer';
import TitleBlock from '@/components/TitleBlock';
import BlogPostNavigator from '@/components/BlogPostNavigator';
import BlogSection from '@/components/blog/BlogSection';
import BlogSubsection from '@/components/blog/BlogSubsection';
import { createFileRoute } from '@tanstack/react-router';
import Gooddbye from '@/assets/Slide20.png';

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
        imageSrc={TechDebt}
        date="2025-05-01"
      />
      {/* ### Before Micro Frontends */}
      <TitleBlock subtitle="Lessons learned from our micro-frontend journey">
        Communication Challenges in a Modular Front-End
      </TitleBlock>
      <IntroBlock>
        In Part 3, We'll talk about how to use a messaging layer to act as a
        glue for iframes. How to avoid over-engineering when it comes to routing
        and navigation. And other lessons learned along the way.
      </IntroBlock>
      <BodyBlock>
        {/* ### Why Communication Matters */}
        <BlogSection 
          id="why-communication-matters"
          title="Why Communication Matters"
          imageOnRight
          mobileImageFirst
          imageSrc={CoffeeWizard1}
          imageAlt="Coffee Wizard 1"
          aspectRatio={4 / 3}
          objectFit="cover"
          caption="Host site displaying a coffee brewing wizard"
        >
          <ProseList items={bulletPoints1} />
          <QuoteBlock>
            Example: The Magic Coffee site is currently showing a coffee brewing
            wizard. The site is the "host site" and is responsible for main
            navigation, and the wizard is an iframe that manages its own
            step-by-step process.
          </QuoteBlock>
        </BlogSection>
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

        <Spacer size={2} desktop />
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
        <BlogSection id="our-current-approach" title="Our Current Approach">
          <ProseList items={bulletPoints2} />
          <ProseBlock>
            By using custom messaging, deep navigation, and event broadcasting
            through a message bus, we can handle tricky iframe communication
            between modules.
          </ProseBlock>
        </BlogSection>

        {/* ### Iframe Messaging Gotchas */}
        <BlogSection 
          id="iframe-messaging-gotchas"
          title="Iframe Messaging Gotchas"
          imageSrc={MemoryLeak}
          imageAlt="Memory Leak"
          aspectRatio={4 / 3}
          objectFit="cover"
          caption="Memory Leaks from Iframe Messaging can flood your app. Be careful!"
        >
          <ProseBlock>
            While iframe messaging helps glue everything together, it's important
            to plan ahead. If you don't, you'll end up with a rushed arts and
            crafts project covered in Elmer's glue.
          </ProseBlock>
          <ProseBlock>
            To help you create a work of art, might I suggest avoiding some of the
            same mistakes we made along the way?
          </ProseBlock>
          <ProseList
            subTitle="Our Biggest Iframe Messaging Gotchas"
            items={bulletPoints3}
          />
        </BlogSection>

        {/* ### Messaging Improvements*/}
        <BlogSection 
          id="messaging-improvements"
          title="Messaging Improvements"
          subtitle="Lessons From Post-Robot"
          imageOnRight={false}
          imageSrc={PostRobot}
          imageAlt="Post Robot"
          aspectRatio={1 / 1}
          objectFit="cover"
          caption="Post-Robot: reliable messaging between iframes"
        >
          <ProseList items={bulletPoints4} />
          <ProseBlock>
            Let's talk more about those memory leaks. When we first started
            working with Post-Robot to create our messaging app, we didn't
            account for all the ways things could fail. While Post-Robot
            provides what I call a "robust handshake protocol," we used it more
            like a quick high-five because, in some instances, we assumed it
            would just work.
          </ProseBlock>
          <ProseBlock>
            This caused an intense week of bug fixing after a major refactor. We
            discovered our navigation was loading pages slower and slower
            because the host site kept trying to send messages to clients that
            no longer existed.
          </ProseBlock>
          <ProseBlock>
            To fix the problem, we made use of everything Post-Robot offers for
            error handling. We implemented a way for the sender to recover when
            it fails to send messages, and for the client to fail gracefully
            when needed. Since making these changes, our iframe messaging is
            operating like a brand-new faucet — no more leaks.
          </ProseBlock>
        </BlogSection>

        <ReferenceLink
          text="For more information on PostRobot and iframe messaging best practices, check out Daniel Brain's article on Medium: Introducing post-robot — smart cross-domain messaging, from PayPal"
          url="https://bluepnume.medium.com/introducing-post-robot-smart-cross-domain-messaging-from-paypal-bebf27c8619e"
          linkText="Daniel Brain's article on Medium: Introducing post-robot — smart cross-domain messaging, from PayPal"
        />

        {/* ### Hard Lessons */}
        <BlogSection 
          id="hard-lessons"
          title="Hard Lessons in Micro-Frontend Development"
          columns="2fr 1fr"
          imageSrc={HardLessons}
          imageAlt="Hard Lessons in Micro-Frontend Development"
          aspectRatio={4 / 3}
          objectFit="cover"
          caption="Hard Lessons: Are you sure you want to go down this path?"
        >
          <BlogSubsection title="Standardize Your Navigation Patterns">
            One area where we could have been more consistent is how we route
            dropdown navigation lists in drawers. From settings to admin pages,
            we use this kind of navigation everywhere. In each app, we
            approached it differently, and this made it challenging to
            standardize how things are done.
          </BlogSubsection>

          <BlogSubsection title="Beware of Over-Engineering">
            In addition to navigation and routing, we also overcomplicated parts
            of our apps by trying to "future-proof" them. This created a lot of
            unused spaghetti code and unnecessary layers that now make very
            little sense.
          </BlogSubsection>

          <ProseBlock>
            One example: in one app, we set up dynamic routing to handle various
            payloads and display different navigation drawers. The code is
            impressive and works well to this day. The only issue is that we
            only use it for a single list. It's like designing a warehouse to
            store amazing Hot Wheels collections — but only using it to park
            your sedan.
          </ProseBlock>
        </BlogSection>

        <BlogSubsection title="Accept That Some Wet Code Is Okay">
          After over-engineering ourselves into a corner a few times, we learned
          an important lesson: a little bit of "wet code" is not the end of the
          world. In a micro-frontend, some messiness is expected. Each team will
          do things a little differently, no matter how many guardrails you set
          up along the path to deployment.
        </BlogSubsection>

        <BlogSubsection title="The Fallacy of Staying Current">
          The final lesson learned is about what I call the fallacy of staying
          current.
        </BlogSubsection>
        <ProseBlock>
          This is something I had to learn the hard way: you don't always need
          to use bleeding-edge frameworks. Early in my career, I was
          hyper-focused on avoiding "static" projects. I pushed myself — and
          sometimes the companies I worked for — to update packages and
          libraries constantly.
        </ProseBlock>
        <ProseBlock>
          But there's an art to updating. After doing several big refactor
          projects in our micro-frontend, I've learned that sometimes it's
          better to freeze a project and create a new repo if business needs
          drive updating to the latest and greatest JS framework.
        </ProseBlock>
        <ProseBlock>
          It's important to remember that while getting up-to-date libraries
          feels good, it also comes with a cost. Training developers, especially
          those who primarily focus on backend tasks, takes time and effort.
          That's not always ideal for a feature-driven development shop.
        </ProseBlock>
        {/* ### Thank You */}
        <BlogSection 
          id="thank-you"
          title="The Summary"
          imageSrc={Gooddbye}
          imageAlt="Thanks for reading!"
          aspectRatio={4 / 3}
          objectFit="cover"
          columns="2fr 1fr"
          caption="If you made it this far, thanks for reading!"
        >
          <BlogSubsection title="Micro-Frontends Are Not for Everyone">
            If you made it this far, thanks for reading! I hope you found this
            post helpful. I know I learned a lot writing it. I also hope you
            learned something new about micro-frontends and how to use them
            effectively.
          </BlogSubsection>
        </BlogSection>
      </BodyBlock>
      <BlogPostNavigator
        prev={{
          title: 'Micro-Frontends Part 2: Comparing Modern Alternatives',
          route: '/blog/posts/frontend-design/microfrontends-part2',
          image: CallOutImage2,
          date: '2025-04-21',
          blurb:
            'Explore the pros and cons of Module Federation, Single-Spa, and iframe-based micro-frontends, and why we chose our approach.',
        }}
        // suggested={{
        //   title: 'Another Blog Post',
        //   route: '/blog/posts/other-topic',
        //   image: SomeOtherImage,
        //   blurb: 'A suggested next read for you.',
        // }}
      />
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
  'Not setting standards or rules for our messaging bus. Our code quickly became spread out and hard to manage. This made debugging and iterating on feature requests much more difficult.',
  'Using Post-Robot in a "fire and forget" fashion. We sent messages out but had no idea if the window receiving them was still around. This led to memory leaks.',
];

const bulletPoints4 = ['Robust Handshake Protocols', 'Enhanced Error Handling'];

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
