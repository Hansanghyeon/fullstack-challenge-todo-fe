import { z }       from 'zod'

import { 상수_할일상태 } from '../@x/할일상태'

export const primitiveTaskDto = z.object({
  title: z.string().min(2),
  description: z.string().nullish(),
})

export const taskDto = primitiveTaskDto.extend({
  status: z.nativeEnum(상수_할일상태),
})

export const getResTaskDto = taskDto.extend({
  id: z.number(),
})
export const getParameterTaskDto = z.any()

export const getResTasksDto = z.array(getResTaskDto)
export const getParameterTasksDto = z.any()

export const postResTasksDto = z.any()
export const postPayloadTasksDto = primitiveTaskDto

export const deleteResTasksDto = z.any()

export const patchResTasksDto = z.string()
export const patchPayloadTasksDto = taskDto.partial()
