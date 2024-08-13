import { z }       from 'zod'

import { 상수_할일상태 } from '../@x/할일상태'

const taskDto = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(상수_할일상태),
})
export const getResTasksDto = z.array(taskDto)
export const getPayloadTasksDto = z.any()