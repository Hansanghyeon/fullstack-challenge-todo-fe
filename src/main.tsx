import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'

// Import the generated route tree
import { QueryClientProvider, queryClient } from './app/provider/tanstack-query'
import { routeTree } from './routeTree.gen'
import { ToastContainer } from './shared/components/toast-container/toast-container'
import { AuthManager } from './shared/managers/auth'


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
  const auth = AuthManager
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
        <ToastContainer />
      </QueryClientProvider>
    </StrictMode>,
  )
}
