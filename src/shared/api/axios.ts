import axios from 'axios'

import { AuthManager } from '../managers/auth'

export function ApiClient() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(async (request) => {
    // 로그인 하는 요청에는 accessToken을 가져오지 않는다.
    if (request.url === '/auth/sign-in' || request.url === '/auth/sign-up') {
      return request
    }

    const token = AuthManager.token

    request.headers.Authorization = `Bearer ${token.accessToken}`
    return request
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
    // 401 Unauthorized
    // ====================================== 401 조회 에러 처리 ======================================
      if (error.response?.status === 401) {
        // TODO: renew token하거나 token을 삭제해야한다.
        AuthManager.clear()
      }

      throw error
    }
  )

  return instance
}
