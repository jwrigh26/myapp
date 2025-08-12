import BlogSection from '@/components/blog/BlogSection';
import CallToAction from '@/components/CallToAction';
import CodeBlock from '@/components/CodeBlock';
import IntroBlock from '@/components/IntroBlock';
import ProseBlock from '@/components/ProseBlock';
import QuoteBlock from '@/components/QuoteBlock';
import TitleBlock from '@/components/TitleBlock';
import ReferenceLink from '@/components/ReferenceLink';
import { BlogLayout } from '@/layout';
import { createImageSources, getDefaultImageSrc } from '@/utils/images';
import Stack from '@mui/material/Stack';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/posts/react/memo-monster')({
  component: RouteComponent,
  head: () => ({
    staticData: {
      title: 'Attack of the Memo Monster',
      description: 'My Haunted Past with React and Memoization',
      imageKey: '20250801-image-react-monster-avatar',
      route: '/react/memo-monster',
      publishedDate: '2025-08-12',
    },
    getTitle: () => 'Attack of the Memo Monster',
    meta: [
      {
        title: 'Attack of the Memo Monster',
        description: 'My Haunted Past with React and Memoization',
        imageKey: '20250801-image-react-monster-avatar',
        content: 'Why remembering names is important',
        route: '/blog/posts/react/memo-monster',
        publishedDate: '2025-08-12',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <BlogLayout id="react-monster-post">
      <CallToAction
        title="Attack of the Memo Monster"
        subtitle="A tribute to useless useCallbacks"
        preSubtitle="My Haunted Past with React and Memoization"
        imageAlt="Attack of the Memo Monster"
        sources={createImageSources('20250801-image-react-monster-avatar')}
        imageSrc={getDefaultImageSrc('20250801-image-react-monster-avatar')}
        mobileImageSources={createImageSources('20250801-image-react-monster')}
        date="2025-08-12"
      />
      <TitleBlock>Memoization is a Monster!</TitleBlock>
      <IntroBlock>
        In this post, I share my experiences with React and the challenges I
        faced with memoization.
      </IntroBlock>
      <BlogSection
        id="introduction"
        imageAlt="React Memo Monster"
        sources={createImageSources('20250801-image-react-monster')}
        imageSrc={getDefaultImageSrc('20250801-image-react-monster')}
        aspectRatio={4 / 2.5}
        caption="It's Alive!!!"
        hideImageOnMobile={true}
      >
        <ProseBlock>
          Every couple of years in React, I look at my code and see a{' '}
          <b>monster</b>.
        </ProseBlock>

        <ProseBlock>
          Recently, I gave one design pattern a name:{' '}
          <span className="name">The Memo Monster</span>.
        </ProseBlock>

        <ProseBlock>
          It crept in bit by bit, like pieces of cadavers stitched together. I
          thought I was building something amazing, but in the end, I sadly
          admit, I created yet another monster.
        </ProseBlock>

        <ProseBlock>
          I'm not the only one. Enough React developers have been trampled by a
          common memoization pattern that, in the words of Dominik, the current
          maintainer of TanStack Query and Router, states:
        </ProseBlock>
      </BlogSection>
      <QuoteBlock>
        I thought I'd written enough about memoization by now, but I feel there
        is one pattern I'm seeing a lot lately that makes me think otherwise. So
        today, I want to look at useCallback, and to some extent useMemo, in
        situations where I think they are totally pointless.
      </QuoteBlock>
      <ProseBlock>
        While I'm not prtending to be an expert on React, please read on for a
        monsterous tail about React and memoization. If you want to learn more
        about the useless useCallback pattern, you can check out Dominik's
        original post on the topic.
      </ProseBlock>
      <ReferenceLink
        url="https://tkdodo.eu/blog/the-useless-use-callback"
        linkText="The Useless useCallback"
        text="A great article by Dominik Homberger that explains the useless useCallback pattern in detail."
      />
      <BlogSection
        id="memo-monster-example"
        title="Frankenstein's Memo Monster"
      >
        <Stack gap={2}>
          <ProseBlock>
            Let's take a closer look at this pattern and see how it can lead to
            unexpected behavior in our applications. Like Dr. Frankenstein
            stitching together body parts, we often stitch together hooks
            thinking we're creating something optimized.
          </ProseBlock>

          <ProseBlock>
            Here's a classic example of{' '}
            <span className="name">The Memo Monster</span> pattern - a component
            that appears optimized but creates unnecessary complexity:
          </ProseBlock>

          <CodeBlock
            language="javascript"
            code={`// The Frankenstein Memo Monster 🧟‍♂️
function FrankensteinComponent() {
  // Body part #1: Memoized object (the brain)
  const laboratoryEquipment = useMemo(() => ({ 
    electrodes: 'copper',
    voltage: '10000V',
    experiment: 'bring code to life'
  }), [])
  
  // Body part #2: Memoized callback (the arms)
  const onExperimentComplete = useCallback((result) => {
    console.log('IT\\'S ALIVE!', result)
    // More complex logic here...
  }, [])
  
  // Body part #3: Another memoized value (the legs)
  const monsterStats = useMemo(() => ({
    strength: 'overwhelming',
    speed: 'surprisingly fast',
    intelligence: 'questionable'
  }), [])

  // The final creation - passing all our "optimized" parts
  return (
    <MemoizedMonster 
      equipment={laboratoryEquipment}
      onComplete={onExperimentComplete}
      stats={monsterStats}
    />
  )
}`}
          />

          <ProseBlock>
            At first glance, this looks like good React optimization. We're
            using <span className="code">useMemo</span> and{' '}
            <span className="code">useCallback</span> to ensure stable
            references for our memoized component. And yes,{' '}
            <span className="code">MemoizedMonster</span> will skip
            re-rendering! But here's where the real monster lurks...
          </ProseBlock>

          <ProseBlock>
            <b>The Hidden Monster:</b> What happens when a well-meaning
            developer comes along and adds "just one little prop" from a parent
            component?
          </ProseBlock>

          <CodeBlock
            language="javascript"
            code={`// Parent component (written by a different developer)
function LaboratoryPage({ user }) {
  // Innocent-looking user info (but creates new object every render!)
  const userInfo = { name: user.name, id: user.id }
  
  return <FrankensteinComponent owner={userInfo} />
}

// Now our "optimized" component becomes a monster
function FrankensteinComponent({ owner }) {
  // Body part #1: Now depends on unstable owner object
  const laboratoryEquipment = useMemo(() => ({ 
    electrodes: 'copper',
    voltage: '10000V',
    experiment: 'bring code to life',
    owner: owner.name // The value stays the same across renders if the primitive value doesn't change
  }), [owner.name]) // ✅ Object.is(prevOwnerName, newOwnerName) === true 
  
  // Body part #2: Callback that depends on owner
  const onExperimentComplete = useCallback((result) => {
    console.log(\`IT'S ALIVE! Created by \${owner.name}\`, result)
  }, []) // Stale closure! owner is not in dependencies!
  
  // Body part #3: Stats with owner context  
  const monsterStats = useMemo(() => ({
    strength: 'overwhelming',
    speed: 'surprisingly fast',
    intelligence: owner.name === 'Dr. Frankenstein' ? 'enhanced' : 'questionable'
  }), [owner]) // 💀 Object.is(prevOwner, newOwner) === false every time! 

  // The final creation - mixed results!
  return (
    <MemoizedMonster 
      equipment={laboratoryEquipment}
      onComplete={onExperimentComplete}
      stats={monsterStats}
    />
  )
}`}
          />

          <ProseBlock>
            <span className="name-alt">The Monster's True Face:</span> Here's
            where it gets interesting. Notice how the first hook uses{' '}
            <span className="code">owner.name</span> in its dependency array,
            while the third hook uses <span className="code">owner</span>. The
            first hook will actually work correctly because{' '}
            <span className="code">owner.name</span> is a primitive that doesn't
            change. But the third hook fails because it depends on the entire{' '}
            <span className="code">owner</span> object reference.
          </ProseBlock>

          <ProseBlock>
            This is the <span className="name">Real Memo Monster</span>! It's a
            mix of working and broken optimizations in the same component. Some
            hooks work, others don't, creating inconsistent behavior that's hard
            to debug and reason about.
          </ProseBlock>

          <CodeBlock
            language="javascript"
            code={`// The cascade of mixed results:
// 1. LaboratoryPage re-renders (userInfo = new object reference)
// 2. FrankensteinComponent receives new owner object  
// 3. First hook: owner.name is stable (primitive) - works correctly!
// 4. Second hook: no dependencies - works correctly!
// 5. Third hook: owner object reference changes - fails and re-computes!
// 6. MemoizedMonster receives mix of stable and unstable props
// 7. Some optimizations work, others don't - inconsistent behavior!

// The simple fix that breaks our "optimization":
function LaboratoryPage({ user }) {
  const ownerName = user.name // Primitive value - stable reference!
  return <FrankensteinComponent ownerName={ownerName} />
}

// Or even better - the simple version fails gracefully:
function SimpleComponent({ ownerName }) {
  const equipment = { 
    electrodes: 'copper',
    voltage: '10000V', 
    experiment: 'bring code to life',
    owner: ownerName // Same "instability", same result
  }
  
  const onComplete = (result) => {
    console.log(\`IT'S ALIVE! Created by \${ownerName}\`, result)
  }
  
  const stats = {
    strength: 'overwhelming',
    speed: 'surprisingly fast', 
    intelligence: ownerName === 'Dr. Frankenstein' ? 'enhanced' : 'questionable'
  }

  return (
    <Monster 
      equipment={equipment}
      onComplete={onComplete}
      stats={stats}
    />
  )
}
// Same performance, but no illusion of optimization! 
// We're not even memoizing the monster because it's not needed!`}
          />

          <ProseBlock>
            The monster or problem isn't the memoization itself. Nope, it's the{' '}
            <b>illusion of optimization</b> hiden behind the green fleshy beast
            of our codebase that is the truly scary ghoul.
          </ProseBlock>
        </Stack>
      </BlogSection>
      <BlogSection id="conclusion" title="Conclusion">
        <Stack gap={2}>
          <ProseBlock>
            <span className="name">The Memo Monster</span> is a cautionary tale
            of how well-intentioned optimizations can lead to unexpected
            complexity. Remember, sometimes the simplest solution is the best
            one. Don't let the illusion of optimization create a <b>monster</b>{' '}
            in your codebase!
          </ProseBlock>
        </Stack>
      </BlogSection>
      <BlogSection id="refences" title="References">
        <Stack gap={2}>
          <ReferenceLink
            url="https://tkdodo.eu/blog/the-useless-use-callback"
            linkText="The Useless useCallback"
            text="A great article by Dominik Homberger that explains the useless useCallback pattern in detail."
          />
          <ReferenceLink
            url="https://github.com/jwrigh26/react-useless-usecallback"
            linkText="react-useless-usecallback"
            text="A simple React quiz app that demonstrates the useless useCallback pattern."
          />
        </Stack>
      </BlogSection>
    </BlogLayout>
  );
}
