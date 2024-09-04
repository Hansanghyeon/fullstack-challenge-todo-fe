import { useMutation } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

// Import the generated route tree
import { getAuthenticate } from './api/auth/authenticate'
import { QueryClientProvider, queryClient } from './app/provider/tanstack-query'
import { routeTree } from './routeTree.gen'
import { useAuth } from './shared/hooks/use-auth'


// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient,
  },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth()
  const { mutate } = useMutation({
    mutationFn: getAuthenticate(),
    onError() {
      auth.signout()
    }
  })

  
  // 앱이 실행될때 딱한번 진행한다.
  // 로그인이 되어있다면 해당 토큰이 실제로 인증처리가 가능한지 확인한다.
  React.useEffect(() => {
    if (auth.value) {
      mutate({})
    } 
  }, [])
  return <RouterProvider router={router} context={{ auth }} />
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  )
}
