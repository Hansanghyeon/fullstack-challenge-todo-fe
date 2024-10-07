import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { LuTrash } from "react-icons/lu"
import { toast } from "react-toastify"

import { 상수_할일상태 } from "~/api/@x/할일상태"
import { deleteTasks, patchTasks, taskQueryOptions, tastksQueryKey } from "~/api/tasks"
import { queryClient } from "~/app/provider/tanstack-query"
import { Button } from "~/shared/components/ui/button"
import { Checkbox } from "~/shared/components/ui/checkbox"
import { cn } from "~/shared/utils"

export function TaskItem({ taskId }: { taskId: number }) {
  // 데이터 조회
  const { data: task } = useSuspenseQuery(taskQueryOptions({ taskId }))
  // 삭제
  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: deleteTasks({ taskId: task.id }),
    onSuccess() {
      // task 삭제 성공 토스트
      queryClient.invalidateQueries({
        queryKey: tastksQueryKey()
      })
    },
    onError(err) {
      toast.error('삭제 중 오류가 발생했습니다')
      console.error(err)
    }
  })

  const { mutate: changeStatusMutate } = useMutation({
    mutationFn: patchTasks({ taskId: task.id }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: tastksQueryKey(task.id)
      })
    }
  })

  const handleChangeStatus = () => {
    changeStatusMutate({
      ...task,
      status: task.status === 상수_할일상태.완료 ? 상수_할일상태.진행중 : 상수_할일상태.완료
    })
  }

  return <div
    className="bg-muted hover:bg-muted/50 flex items-center justify-between rounded-md px-4 py-2"
  >
    <div className="flex items-center space-x-2">
      <Checkbox checked={task.status === 상수_할일상태.완료} onClick={handleChangeStatus} />
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
      onClick={() => deleteTask()}
      disabled={isPending}
    >
      <LuTrash />
      <span className="sr-only">Delete</span>
    </Button>
  </div>
}