import { z } from 'zod'

import { getResTasksDto, getPayloadTasksDto, 
  postResTasksDto,
  postPayloadTasksDto,
  postPayloadTasksRdo, } from '.'

/**
 * get tasks
 */
export type TGetResTasksDto = z.infer<typeof getResTasksDto>
export type TGetPayloadTasksDto = z.infer<typeof getPayloadTasksDto>

/**
 * post tasks
 */
export type TPostResTasksDto = z.infer<typeof postResTasksDto>
export type TPostPayloadTasksDto = z.infer<typeof postPayloadTasksDto>
export type TPostPayloadTasksRdo = z.infer<typeof postPayloadTasksRdo>
