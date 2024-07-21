import { AxiosResponse } from 'axios'
import { ApiClient } from '~/shared/api'
import {
  type TPostResSignUpDto,
  type TPostPayloadSignUpDto,
  postResSignUpDto,
} from '.'

const axios = ApiClient()

/**
 * @API문서
 * @description sign-up
 */
export function postSignUp() {
  return async function (body: TPostPayloadSignUpDto) {
    type R = typeof body
    type T = TPostResSignUpDto
    const result = await axios
      .post<T, AxiosResponse<T>, R>('/auth/sign-up', body)
      .then((res) => res.data)

    postResSignUpDto.parse(result)
    return result
  }
}
