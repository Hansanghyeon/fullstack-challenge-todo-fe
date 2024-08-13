import { QueryClient }                from '@tanstack/react-query'
import { Link }                       from '@tanstack/react-router'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { Outlet }                     from '@tanstack/react-router'
import { pipe }                       from 'fp-ts/function'

import { AppProvider }                from '~/app/provider/app-provider'
import { FNB }                        from '~/shared/components/fnb'
import { GNB }                        from '~/shared/components/gnb'
import { ToastContainer }             from '~/shared/components/toast-container/toast-container'
import { TAuth }                      from '~/shared/hooks/use-auth'

function App() {
  return (
    <>
      <GNB />
      <div className="mt-[var(--gnb-h)]">
        <Outlet />
      </div>
      <FNB />
      <ToastContainer />
    </>
  )
}

interface MyRouterContext {
  auth: TAuth;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
