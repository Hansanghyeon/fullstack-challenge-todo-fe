import { T상수_인증상태 } from '~/api/@x/인증상태'

export interface T_searchAuthState {
  authState?: T상수_인증상태;
}

export function searchAuthState(e: T상수_인증상태) {
  return {
    authState: e,
  }
}
