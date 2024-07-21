import { postResSignUpDto, postPayloadSignUpDto, postPayloadSignUpRdo } from '.'
import { z } from 'zod'

/**
 * post sign-up
 */
export type TPostResSignUpDto = z.infer<typeof postResSignUpDto>
export type TPostPayloadSignUpDto = z.infer<typeof postPayloadSignUpDto>
export type TPostPayloadSignUpRdo = z.infer<typeof postPayloadSignUpRdo>
