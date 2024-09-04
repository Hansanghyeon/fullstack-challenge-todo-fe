import { z }                                                            from 'zod'

import { postResSignUpDto, postPayloadSignUpDto, postPayloadSignUpRdo } from '.'

/**
 * post sign-up
 */
export type TPostResSignUpDto = z.infer<typeof postResSignUpDto>
export type TPostPayloadSignUpDto = z.infer<typeof postPayloadSignUpDto>
export type TPostPayloadSignUpRdo = z.infer<typeof postPayloadSignUpRdo>
