import { z } from 'zod'

export const 상수_할일상태 = {
  보류: 'pending',
  진행중: 'in_progress',
  완료: 'completed',
} as const

const _schema = z.nativeEnum(상수_할일상태)
export type T상수_할일상태 = z.infer<typeof _schema>
