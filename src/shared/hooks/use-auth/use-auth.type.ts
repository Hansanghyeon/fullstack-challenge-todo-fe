export interface TAuthBase {
  accessToken: string
}

export interface TAuth {
  value?: TAuthBase
  signout: () => void
  signin: (auth: TAuthBase) => void
}
