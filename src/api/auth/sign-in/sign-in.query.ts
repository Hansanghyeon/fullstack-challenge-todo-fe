import { queryOptions } from '@tanstack/react-query'

export function signInQueryOptions() {
  return queryOptions({
    queryKey: ['sign-in'],
  })
}
