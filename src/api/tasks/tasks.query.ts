import { queryOptions } from '@tanstack/react-query'
import * as A from 'fp-ts/Array'
import { pipe, flow } from 'fp-ts/function'

import { getTask, getTasks, TGetResTaskDto }     from '.'

import { queryClient } from '~/app/provider/tanstack-query'

const cat = 'tasks'

export function tasksQueryOptions() {
  return queryOptions({
    queryKey: [cat],
    queryFn: getTasks(),
    select(tasks) {
      console.log(tasks)
      pipe(
        tasks,
        A.map(task => queryClient.setQueryData(tastksQueryKey(task.id), task))
      )
      return tasks
    }
  })
}

export function taskQueryOptions({ taskId }: { taskId: number }) {
  return queryOptions({
    queryKey: tastksQueryKey(taskId),
    queryFn: getTask({ taskId }),
  })
}

export function tastksQueryKey(id?: TGetResTaskDto['id']) {
  if (id === undefined) return [cat]
  return [cat, id]
}