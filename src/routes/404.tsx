import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/404')({
  component: NotFound,
})

function NotFound() {
  return <h1>404</h1>
}
