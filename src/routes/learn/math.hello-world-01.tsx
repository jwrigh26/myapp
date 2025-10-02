import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/learn/math/hello-world-01')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/learn/math/hello-world-01"!</div>
}
