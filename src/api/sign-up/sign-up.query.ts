import { queryOptions } from '@tanstack/react-query'

export function signUpQueryOptions() {
  return queryOptions({
    queryKey: ['sign-up'],
  })
}
