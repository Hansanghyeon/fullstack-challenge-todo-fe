import { z } from 'zod'

export const 상수_인증상태 = {
  인증만료: 'expired',
} as const

const _schema = z.nativeEnum(상수_인증상태)
export type T상수_인증상태 = z.infer<typeof _schema>
