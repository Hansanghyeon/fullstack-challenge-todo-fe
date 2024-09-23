import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signout')({
  beforeLoad: ({ context }) => {
    if (context.auth.token) {
      context.auth.signout()
      throw redirect({ to: '/signin' })
    }
  },
  component: () => <div>Hello /_auth/logout!</div>,
})
