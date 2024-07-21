import { AxiosResponse } from 'axios'
import { ApiClient } from '~/shared/api'
import {
  type TPostResSignInDto,
  type TPostPayloadSignInDto,
  postResSignInDto,
} from '.'

const axios = ApiClient()

/**
 * @API문서
 * @description sign-in
 */
export function postSignIn() {
  return async function (body: TPostPayloadSignInDto) {
    type R = typeof body
    type T = TPostResSignInDto
    const result = await axios
      .post<T, AxiosResponse<T>, R>('/auth/sign-in', body)
      .then((res) => res.data)

    postResSignInDto.parse(result)
    return result
  }
}
