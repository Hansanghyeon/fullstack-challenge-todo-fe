import { z } from 'zod'

import {
  getResAuthenticateDto,
  getParamsAuthenticateDto,
} from '.'

/**
 * get authenticate
 */
export type TGetResAuthenticateDto = z.infer<typeof getResAuthenticateDto>
export type TGetParamsAuthenticateDto = z.infer<typeof getParamsAuthenticateDto>