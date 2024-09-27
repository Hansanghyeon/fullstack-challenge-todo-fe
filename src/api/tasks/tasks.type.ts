import { z } from 'zod'

import {
  getResTasksDto,
  getParameterTasksDto,
  postResTasksDto,
  postPayloadTasksDto,
  postPayloadTasksRdo,
  deleteResTasksDto,
  taskDto
} from '.'

export type TTaskDto = z.infer<typeof taskDto>
/**
 * get tasks
 */
export type TGetResTasksDto = z.infer<typeof getResTasksDto>
export type TGetPayloadTasksDto = z.infer<typeof getParameterTasksDto>

/**
 * post tasks
 */
export type TPostResTasksDto = z.infer<typeof postResTasksDto>
export type TPostPayloadTasksDto = z.infer<typeof postPayloadTasksDto>
export type TPostPayloadTasksRdo = z.infer<typeof postPayloadTasksRdo>

/**
 * delete tasks
 */
export type TDeleteResTasksDto = z.infer<typeof deleteResTasksDto>
