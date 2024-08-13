import { z }                                  from 'zod'

import { getResTasksDto, getPayloadTasksDto } from '.'

/**
 * get tasks
 */
export type TGetResTasksDto = z.infer<typeof getResTasksDto>
export type TGetPayloadTasksDto = z.infer<typeof getPayloadTasksDto>
