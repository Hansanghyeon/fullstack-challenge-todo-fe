import React from 'react'
import { LuTrash } from 'react-icons/lu'
import { useForm } from 'react-hook-form'
import { FaFilter } from 'react-icons/fa6'
import { Button } from '~/shared/components/ui/button'
import { Card, CardContent } from '~/shared/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/components/ui/dropdown-menu'
import { Form, FormField } from '~/shared/components/ui/form'
import { cn } from '~/shared/utils'
import { Checkbox } from '~/shared/components/ui/checkbox'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Page,
})

function Page() {
  const [filter, setFilter] = React.useState('all')
  const form = useForm()

  const { handleSubmit } = form
  const onSubmit = handleSubmit((payload) => {
    console.log(payload)
  })

  const todo: { id: number; completed: boolean; text: string }[] = [
    {
      id: 1,
      completed: false,
      text: 'Hello World',
    },
    {
      id: 2,
      completed: true,
      text: 'Hello World222',
    },
  ]

  return (
    <main>
      <div className="min-h-[calc(100dvh-var(--gnb-h))]">
        <div className="pt-[var(--head-area)]">
          <Card className="mx-auto w-full max-w-md">
            <CardContent className="space-y-4 pt-6">
              <Form {...form}>
                <form onSubmit={onSubmit}>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="name"
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
                {todo.map((todo) => (
                  <div
                    key={todo.id}
                    className="bg-muted hover:bg-muted/50 flex items-center justify-between rounded-md px-4 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={todo.completed} />
                      <span
                        className={cn('text-sm', {
                          'text-muted-foreground line-through': todo.completed,
                        })}
                      >
                        {todo.text}
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
