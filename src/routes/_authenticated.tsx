import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'react-toastify'

import { 상수_인증상태 } from '~/api/@x/인증상태'
import { getAuthenticate } from '~/api/auth/authenticate'
import { searchAuthState } from '~/shared/calc/search-auth-state'
import { AuthManager } from '~/shared/managers/auth'

export const Route = createFileRoute('/_authenticated')({
  async beforeLoad({ context }) {
    /**
     * @step1
     * 토큰이 없다면 로그인 페이지로 이동합니다.
     * @step2
     * 토큰이 있다면 해당 토큰으로 인증을 시도합니다.
     * TODO: 페이지마다 요청이되기 때문에 너무 많은 요청이 일어나는 것은 아닌지?
     * @step3
     * 인증이 실패하면 로그인 페이지로 이동합니다.
     */

    // 1.
    if (!context.auth.token) {
      toast.error('로그인이 필요합니다.')
      throw redirect({
        to: '/signin',
        search: {
          redirect: location.href,
        },
      })
    }

    // 2.
    await getAuthenticate()()
  },
  component() {
    return <Outlet />
  },
  onError(err: any) {
    if (err.response.data.statusCode === 401) {
      AuthManager.clear()
      throw redirect({
        to: '/signin',
        search: {
          ...searchAuthState(상수_인증상태.인증만료),
        },
      })
    }
  },
})
