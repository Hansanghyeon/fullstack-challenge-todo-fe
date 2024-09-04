import { queryOptions } from '@tanstack/react-query'

import { getAuthenticate } from '.'

export function authenticateQueryOptions() {
  return queryOptions({
    queryKey: ['authenticate'],
    queryFn: getAuthenticate(),
  })
}