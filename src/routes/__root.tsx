import { QueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { pipe } from 'fp-ts/function'

import { AppProvider } from '~/app/provider/app-provider'
import { FNB } from '~/shared/components/fnb'
import { GNB } from '~/shared/components/gnb'
import { AuthManager } from '~/shared/managers/auth'

function App() {
  return (
    <main className="mt-[var(--gnb-h)] grid min-h-[calc(100dvh-var(--gnb-h,0))] grid-rows-[1fr,auto] gap-y-[var(--space)] pt-[var(--head-area)]">
      <GNB />
      <div>
        <Outlet />
      </div>
      <FNB />
    </main>
  )
}

interface RouterContext {
  auth: typeof AuthManager;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: pipe(App, AppProvider),
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})
