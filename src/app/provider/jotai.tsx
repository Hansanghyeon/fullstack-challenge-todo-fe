import { useAtomsDevtools } from 'jotai-devtools'
import React                from 'react'

export function JotaiProvider({ children }: React.PropsWithChildren) {
  useAtomsDevtools('fullstack-challenge-template-vite')
  return children
}
