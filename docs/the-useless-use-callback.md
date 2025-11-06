https://tkdodo.eu/blog/the-useless-use-callback

Why memoize?

There's usually only two reasons to create a memoized version of a function with useCallback or a value with useMemo:
Performance optimization

Something is slow, and slow is usually bad. Ideally, we'd make it faster, but we can't always do that. Instead, we can try to do that slow thing less often.

In React, a lot of the time, the slow thing is re-rendering of a sub-tree, so we'd like to ideally avoid that if we think it's "not necessary".

That's why we sometimes wrap components in React.memo, which is an uphill battle mostly not worth fighting, but still, it's a thing that exists.

If we pass a function or a non-primitive value to a memoized component, we need to make sure that references to those are stable. That's because React compares the props of a memoized component with Object.is to check if it can skip rendering that sub-tree. So if the reference isn't stable, e.g. because it's newly created in each render, our memoization "breaks":

function Meh() {
return (
<MemoizedComponent
value={{ hello: 'world' }}
onChange={(result) => console.log('result')}
/>
)
}

function Okay() {
const value = useMemo(() => ({ hello: 'world' }), [])
const onChange = useCallback((result) => console.log(result), [])

return <MemoizedComponent value={value} onChange={onChange} />
}

Yes, sometimes the computation inside useMemo itself is slow, and we memoize to avoid those recomputations. Those useMemo calls are perfectly fine, too, but I don't think they are the majority of use-cases.
Prevent effects from firing too often

If not passed as a prop to a memoized component, chances are our memoized value gets eventually passed as a dependency to an effect (sometimes through some layers of custom hooks).

Effect dependencies follow the same rules as React.memo - they are compared one by one with Object.is to see if the effect needs to re-run. So if we are not careful about memoizing the effect's dependencies, it might run on every render.

Now, if we think for a bit, we might notice that the two scenarios are actually exactly the same. They try to avoid something from happening by keeping the same reference around through caching. So the common reason to apply useCallback or useMemo is just:
I need referential stability.

I think we could all use some stability in our lives, so what's the cases where striving for stability is, as I said initially, pointless?

1. No memo - no perf gains
   Let's take the example from above and change a tiny thing:

function Okay() {
const value = useMemo(() => ({ hello: 'world' }), [])
const onChange = useCallback((result) => console.log(result), [])

return <Component value={value} onChange={onChange} />
}

Can you spot the difference? Exactly - we are not passing value and onChange to a memoized component anymore - it's just a regular functional react component now. I see this happening a lot when values get, at the end, passed to React built-in components:

function MyButton() {
const onClick = useCallback(
(event) => console.log(event.currentTarget.value),
[]
)

return <button onClick={onClick} />
}

Here, memoizing onClick achieves nothing, as button doesn't care if onClick is referentially stable or not.

Achieves nothing?

"Achieves nothing" is a slightly wrong, because there is of course something happening here under the hood. React will have to create a cache to keep the onClick function around. It will have to keep track of dependencies, and compare them on every render. The inline function passed to useCallback will also be re-created every render, it's just that it will be thrown away immediately if the cached version gets returned.

So, this technically creates some more overhead internally. I don't want to focus too much on this though because that "overhead" isn't the problem.

So if your custom component is not memoized, it hopefully doesn't care about referential stability either!

Hold on - but what if that Component uses those props internally for a useEffect, or to create further memoized values that are then passed to a memoized component for its own children? I might break something if I remove those memoizations now!

That brings us right to the second point:

2. Using props as dependencies
   Adding non-primitive props you get passed into your component to internal dependency arrays is rarely right, because this component has no control over the referential stability of those props. A common example is:

function OhNo({ onChange }) {
const handleChange = useCallback((e: React.ChangeEvent) => {
trackAnalytics('changeEvent', e)
onChange?.(e)
}, [onChange])

return <SomeMemoizedComponent onChange={handleChange} />
}

This useCallback is likely useless, or at best, it depends on how consumers will use this component. In all likeliness, there is a call-side that just invokes an inline function:
<OhNo onChange={() => props.doSomething()} />

This is an innocent usage. There is nothing wrong with it. In fact, it's great. It co-locates what it wants to do with the event handler. It avoids extracting things to the top of the file with the gnarly handleChange naming.

The only way a developer who writes this code could know that it breaks some memoization is if they drill down into the component to see how the props are being used. That's horrible.

Other ways to fix this include a "we memoize everything all the time" policy, or to have strictly enforced naming convention like a "mustBeMemoized" prefix for props that need to be referentially stable. Both of these aren't great.
A Real Life Example
Since I'm working on the sentry codebase now, which is open source 🎉, I have a lot of real life usages to link towards. One situation that I found is our useHotkeys custom hook. The important bits look something like this:

export function useHotkeys(hotkeys: Hotkey[]): {
const onKeyDown = useCallback(() => ..., [hotkeys])

useEffect(() => {
document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }

}, [onKeyDown])
}

This custom hook takes an Array of hotkeys as input, and then creates a memoized onKeyDown function, which is passed to an effect. The function is clearly memoized to prevent the effect from firing too often, but the hotkeys being an Array means consumers must memoize them manually.

I set out to find all usages of useHotkeys, and was positively surprised to see that all but one of them memoize the input. However, that's not the whole story, because if we look deeper, things still tend to fall apart. Let's take, for example, this usage:

const paginateHotkeys = useMemo(() => {
return [
{ match: 'right', callback: () => paginateItems(1) },
{ match: 'left', callback: () => paginateItems(-1) },
]
}, [paginateItems])

useHotkeys(paginateHotkeys)

useHotKeys passes paginateHotkeys, which is memoized, but it depends on paginateItems. Where does that come from? Well, it's another useCallback that depends on screenshots and currentAttachmentIndex. And where does screenshots come from?

const screenshots = attachments.filter(({ name }) =>
name.includes('screenshot')
)

It's a non-memoized attachments.filter function, which will always create a new Array, which breaks all the downstream memoizations. With that, they all become useless. paginateItems, paginateHotkeys, onKeyDown. Three memoizations that are guaranteed to re-run every render as if we hadn't written them at all!

I hope this example shows why I'm passionately against applying memoizations. In my experience, it breaks way too often. It's not worth it. And it adds so much overhead and complexity to all the code we have to read.

The fix here isn't to memoize screenshots too. That would just shift the responsibility to attachments, which is a prop to the component. At all the three call-sides, we would be at least two levels away from where the actual memoization is needed (useHotkeys). This becomes a nightmare to navigate, and eventually, no one will dare to remove a single memoization because we can't know what it's actually doing.

If anything, we have to outsource all of this to a compiler, which is great once we have it working everywhere. But until then, we have to find patterns to work around the limitation of needing referential stability:

The Latest Ref Pattern

I wrote about this pattern before; what we do is we basically store the value we want to gain imperative access to inside our effect in a ref, and then update the value with another effect that purposefully runs on every render:

export function useHotkeys(hotkeys: Hotkey[]): {
const hotkeysRef = useRef(hotkeys)

useEffect(() => {
hotkeysRef.current = hotkeys
})

const onKeyDown = useCallback(() => ..., [])

useEffect(() => {
document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }

}, [])
}

Then, we can use the hotkeysRef inside our effect without having to add it to the dependency array and without having to worry about stale closures that we could run into if we just ignored the linter.

React Query also uses this pattern for keeping track of the latest options being passed in, e.g. in the PersistQueryClientProvider or in useMutationState, so I'd say it's a tried an true pattern. Imagine if the library would need consumers to memoize their options manually...

UseEffectEvent

More good news: React has realized that oftentimes, we need imperative access to the latest value of something during a reactive effect without explicitly re-triggering it, so they are going to add this pattern for exactly this use-case as a first class primitive, useEffectEvent.

Once that ships, we can refactor the code towards:

export function useHotkeys(hotkeys: Hotkey[]): {
const onKeyDown = useEffectEvent(() => ...)

useEffect(() => {
document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }

}, [])
}

This would make onKeyDown not reactive, it would get able to always "see" the latest values of hotkeys, and it would be referentially stable between renders. The best of all worlds, without having to write a single useless useCallback or useMemo.

That's it for today. Feel free to reach out to me on bluesky 🦋 if you have any questions, or just leave a comment below. ⬇️
