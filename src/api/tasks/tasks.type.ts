import { z } from 'zod'

import {
  getResTasksDto,
  getParameterTasksDto,
  postResTasksDto,
  postPayloadTasksDto,
  postPayloadTasksRdo,
  deleteResTasksDto,
  patchResTasksDto,
  patchPayloadTasksDto,
  patchPayloadTasksRdo,
  getResTaskDto,
  getParameterTaskDto,
} from '.'

/**
 * get tasks
 */
export type TGetResTasksDto = z.infer<typeof getResTasksDto>
export type TGetPayloadTasksDto = z.infer<typeof getParameterTasksDto>

/**
 * get task
 */
export type TGetResTaskDto = z.infer<typeof getResTaskDto>
export type TGetPayloadTaskDto = z.infer<typeof getParameterTaskDto>

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

/**
 * patch tasks
 */
export type TPatchResTasksDto = z.infer<typeof patchResTasksDto>
export type TPatchPayloadTasksDto = z.infer<typeof patchPayloadTasksDto>
export type TPatchPayloadTasksRdo = z.infer<typeof patchPayloadTasksRdo>
