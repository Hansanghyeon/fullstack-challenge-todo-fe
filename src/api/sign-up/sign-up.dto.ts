import { z } from 'zod'

export const postResSignUpDto = z.any()
export const postPayloadSignUpDto = z.object({
  user_email: z.string().email(),
  password: z.string().min(8),
})
