import { useSuspenseQuery } from "@tanstack/react-query"
import * as A from 'fp-ts/Array'
import { pipe, flow } from 'fp-ts/function'

import { TaskItem } from './task-item'

import { tasksQueryOptions } from "~/api/tasks"


export function TaskList() {

  const { data: tasks } = useSuspenseQuery(tasksQueryOptions())

  return <ul className="space-y-2">
    {pipe(
      tasks,
      A.map(task => (
        <li key={task.id}>
          <TaskItem taskId={task.id} />
        </li>
      ))
    )}
  </ul>
  
}