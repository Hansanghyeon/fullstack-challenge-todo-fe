import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useSuspenseQuery }  from '@tanstack/react-query'
import { createFileRoute }   from '@tanstack/react-router'
import * as A                from 'fp-ts/Array'
import { pipe }              from 'fp-ts/function'
import React                 from 'react'
import { useForm }           from 'react-hook-form'
import { FaFilter }          from 'react-icons/fa6'
import { LuTrash }           from 'react-icons/lu'
import { toast } from 'react-toastify'

import { 상수_할일상태 }           from '~/api/@x/할일상태'
import { postPayloadTasksRdo, postTasks, tasksQueryOptions, TPostPayloadTasksRdo } from '~/api/tasks'
import { queryClient } from '~/app/provider/tanstack-query'
import { Button }            from '~/shared/components/ui/button'
import { Card, CardContent } from '~/shared/components/ui/card'
import { Checkbox }          from '~/shared/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu'
import { Form, FormField } from '~/shared/components/ui/form'
import { cn }              from '~/shared/utils'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Page,
  loader({ context: { queryClient } }) {
    return queryClient.ensureQueryData(tasksQueryOptions())
  }
})

function Page() {
  const [filter, setFilter] = React.useState('all')
  const form = useForm<TPostPayloadTasksRdo>({
    resolver: zodResolver(postPayloadTasksRdo),
  })
  const { handleSubmit } = form
  const { mutate } = useMutation({
    mutationFn: postTasks(),
    onSuccess() {
      // task 추가 성공 토스트
      toast.success('할일이 추가되었습니다')
      // form 초기화
      form.setValue('title', '')
      form.setValue('description', '')
      // tasks 쿼리 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: tasksQueryOptions().queryKey
      })
    },
    onError(err) {
      console.error(err)
    }
  })
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions())

  const onSubmit = handleSubmit((payload) => {
    mutate(payload)
  })

  return (
    <>
      <Card className="mx-auto w-full max-w-md">
        <CardContent className="space-y-4 pt-6">
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <input
                      placeholder="작업 이름"
                      className="w-full border-none text-xl focus:outline-none focus:ring-0"
                      {...field}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <input
                      placeholder="설명"
                      className="w-full border-none focus:outline-none focus:ring-0"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="flex justify-end">
                <div className="flex gap-x-2">
                  <Button type="reset" variant="outline">
                    취소
                  </Button>
                  <Button type="submit">작업 추가</Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
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
          <div className="space-y-2">
            {pipe(
              tasks,
              A.map(task => (
                <div
                  key={task.id}
                  className="bg-muted hover:bg-muted/50 flex items-center justify-between rounded-md px-4 py-2"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={task.status === 상수_할일상태.완료} />
                    <span
                      className={cn('text-sm', {
                        'text-muted-foreground line-through': task.status === 상수_할일상태.완료,
                      })}
                    >
                      {task.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary hover:bg-transparent"
                  >
                    <LuTrash />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
