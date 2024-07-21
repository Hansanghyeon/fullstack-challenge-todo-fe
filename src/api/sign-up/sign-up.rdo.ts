import { z } from 'zod'
import { postPayloadSignUpDto } from '.'

export const postPayloadSignUpRdo = postPayloadSignUpDto.extend({
  terms: z.boolean(),
})
