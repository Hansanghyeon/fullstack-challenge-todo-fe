import { useMutation } from "@tanstack/react-query"
import { LuTrash } from "react-icons/lu"
import { toast } from "react-toastify"

import { 상수_할일상태 } from "~/api/@x/할일상태"
import { deleteTasks, tasksQueryOptions, TTaskDto } from "~/api/tasks"
import { queryClient } from "~/app/provider/tanstack-query"
import { Button } from "~/shared/components/ui/button"
import { Checkbox } from "~/shared/components/ui/checkbox"
import { cn } from "~/shared/utils"

export function TaskItem(task: TTaskDto) {
  const { mutate: deleteTask } = useMutation({
    mutationFn: deleteTasks({ id: task.id }),
    onSuccess() {
      // task 삭제 성공 토스트
      toast.success('할일이 삭제되었습니다')
      // tasks 쿼리 다시 불러오기
      queryClient.invalidateQueries({
        queryKey: tasksQueryOptions().queryKey
      })
    },
    onError(err) {
      toast.error('삭제 중 오류가 발생했습니다')
      console.error(err)
    }
  })
  return <div
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
      onClick={() => deleteTask()}
    >
      <LuTrash />
      <span className="sr-only">Delete</span>
    </Button>
  </div>
}