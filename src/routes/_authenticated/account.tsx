import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/account')({
  component: () => <div>Hello /_authenticated/account!</div>,
})
