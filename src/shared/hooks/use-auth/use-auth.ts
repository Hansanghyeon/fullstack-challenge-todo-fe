import React from 'react'
import { LocalStorageManager } from '~/shared/managers'
import { TAuth, TAuthBase } from './use-auth.type'

export function useAuth(): TAuth {
  const state = React.useState<TAuthBase | undefined>(
    LocalStorageManager.getItem('auth'),
  )
  const signout = () => {
    LocalStorageManager.removeItem('auth')
    state[1](undefined)
  }
  const signin = (auth: TAuthBase) => {
    LocalStorageManager.setItem('auth', auth)
    state[1](auth)
  }

  return {
    value: state[0],
    signout,
    signin,
  }
}
