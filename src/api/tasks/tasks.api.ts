
import { AxiosResponse } from 'axios'

import {
  getResTasksDto,
  TGetResTasksDto,
  type TGetPayloadTasksDto,
  postResTasksDto,
  type TPostResTasksDto,
  type TPostPayloadTasksDto,
  deleteResTasksDto,
  type TDeleteResTasksDto,
} from '.'

import { ApiClient } from '~/shared/api'


const axios = ApiClient()

export function getTasks() {
  return async function (params: TGetPayloadTasksDto) {
    const result = await axios
      .get<TGetResTasksDto>(`/tasks`, { params })
      .then((res) => res.data)
  
    try {
      getResTasksDto.parse(result)
    } catch (error) {
      console.error(error)
    }
    return result
  }
}

export function postTasks() {
  return async function (body: TPostPayloadTasksDto) {
    type R = typeof body
    type T = TPostResTasksDto
    const result = await axios
      .post<T, AxiosResponse<T>, R>(`/tasks`, body)
      .then(res => res.data)

    try {
      postResTasksDto.parse(result.data)
    } catch (error) {
      console.error(error)
    }
    return result
  }
}


/**
 * @API문서
 * @description tasks
 */
export function deleteTasks({ id }: { id: number }) {
  return async function() {
    type T = TDeleteResTasksDto
    const result = await axios
      .delete<T, AxiosResponse<T>>(`/tasks/${id}`)
      .then(res => res.data)
  
    try {
      deleteResTasksDto.parse(result.data)
    } catch(error) {
      console.log(error)
    }
    return result
  }
}
