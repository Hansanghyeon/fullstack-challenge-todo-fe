import React from 'react'
import { useAtomsDevtools } from 'jotai-devtools'

export function JotaiProvider({ children }: React.PropsWithChildren) {
  useAtomsDevtools('fullstack-challenge-template-vite')
  return children
}
