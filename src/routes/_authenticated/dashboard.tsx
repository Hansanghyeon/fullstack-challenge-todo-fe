import { createFileRoute }   from '@tanstack/react-router'
import React                 from 'react'
import { FaFilter }          from 'react-icons/fa6'

import { TaskForm } from './tasks/-presentation/task-form'
import { TaskList } from './tasks/-presentation/task-list'

import { tasksQueryOptions } from '~/api/tasks'
import { Button }            from '~/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Page,
  loader({ context: { queryClient } }) {
    return queryClient.ensureQueryData(tasksQueryOptions())
  }
})

function Page() {
  const [filter, setFilter] = React.useState('all')

  return (
    <section>
      <div className="flex justify-center">
        <TaskForm />
      </div>
      <div className="container mx-auto mt-10">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <FaFilter />
                    <span>
                      {filter === 'all'
                        ? 'All'
                        : filter === 'completed'
                          ? 'Completed'
                          : 'Incomplete'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setFilter('all')}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setFilter('completed')}>
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setFilter('incomplete')}
                  >
                    Incomplete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <TaskList />
        </div>
      </div>
    </section>
  )
}
