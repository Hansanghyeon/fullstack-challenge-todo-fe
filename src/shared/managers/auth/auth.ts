import { TAuthBase } from '.'

import { LocalStorageManager } from '~/shared/managers'

export class AuthManager {
  static get token(): TAuthBase {
    return LocalStorageManager.getItem('auth')
  }
  static set(auth: TAuthBase) {
    LocalStorageManager.setItem('auth', auth)
  }
  static clear() {
    LocalStorageManager.removeItem('auth')
  }
  static signout() {
    this.clear()
  }
  static signin(auth: TAuthBase) {
    this.set(auth)
  }
}
