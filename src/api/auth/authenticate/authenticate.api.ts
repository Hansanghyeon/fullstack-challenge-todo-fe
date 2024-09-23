import {
  getResAuthenticateDto,
  type TGetResAuthenticateDto,
  type TGetParamsAuthenticateDto,
} from '.'

import { ApiClient } from '~/shared/api'

const axios = ApiClient()

/**
 * @description
 */
export function getAuthenticate() {
  return async function (params?: TGetParamsAuthenticateDto) {
    const result = await axios
      .get<TGetResAuthenticateDto>(`/auth/authenticate`, { params })
      .then((res) => res.data)
  
    try {
      getResAuthenticateDto.parse(result.data)
    } catch(_error) {
    }
    return result.data
  }
}
