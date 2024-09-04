import { z } from 'zod'

export const postResSignInDto = z.object({
  accessToken: z.string(),
})
export const postPayloadSignInDto = z.any()
