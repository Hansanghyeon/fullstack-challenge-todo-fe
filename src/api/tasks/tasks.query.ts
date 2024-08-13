import { queryOptions } from '@tanstack/react-query'

import { getTasks }     from '.'

export function tasksQueryOptions() {
  return queryOptions({
    queryKey: ['tasks'],
    queryFn: getTasks(),
  })
}
