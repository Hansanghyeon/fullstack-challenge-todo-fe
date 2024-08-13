import {
  getResTasksDto,
  TGetResTasksDto,
  type TGetPayloadTasksDto,
} from '.'

import { ApiClient } from '~/shared/api'


const axios = ApiClient()

/**
 * @API문서
 * @description {__kebabCaseName__}
 */
export function getTasks() {
  return async function (params: TGetPayloadTasksDto) {
    const result = await axios
      .get<TGetResTasksDto>(`/tasks`, { params })
      .then((res) => res.data)
  
    getResTasksDto.parse(result)
    return result
  }
}
