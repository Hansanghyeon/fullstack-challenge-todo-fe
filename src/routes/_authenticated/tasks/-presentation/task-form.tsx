import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { postPayloadTasksRdo, postTasks, tasksQueryOptions, TPostPayloadTasksRdo } from "~/api/tasks"
import { queryClient } from "~/app/provider/tanstack-query"
import { Button } from "~/shared/components/ui/button"
import { Card, CardContent } from "~/shared/components/ui/card"
import { Form, FormField } from "~/shared/components/ui/form"

export function TaskForm() {
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

  const onSubmit = handleSubmit((payload) => {
    mutate(payload)
  })

  return <Card className="w-full max-w-md">
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
}