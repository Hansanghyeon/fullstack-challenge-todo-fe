import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
  MutationCache,
} from '@tanstack/react-query'
import React from 'react'
import { TanstackQueryLabel } from './tanstack-query-label'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error(error)
      // match(error.response?.data.statusCode)
      //   .with(403, () => {
      //     toast.error(__e('10006'))
      //   })
      //   .otherwise(() => undefined)
    },
  }),
})

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
      <TanstackQueryLabel />
    </OriginalQueryClientProvider>
  )
}
