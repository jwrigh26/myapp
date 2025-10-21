import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/learn/math/division/problems')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/learn/math/division/problems"!</div>
}
