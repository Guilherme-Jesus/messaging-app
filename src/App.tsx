import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginComponent from './components/login'
import ChatComponent from './components/ChatComponent'
import { ReactElement } from 'react'
import useAuth from './hooks/useAuth'

// Rotas públicas
const publicRoutes = [
  { path: '/login', element: <LoginComponent /> },
  { path: '*', element: <Navigate to='/login' replace /> },
]

// Rotas privadas
const privateRoutes = [
  {
    path: '/chat',
    element: <ChatComponent />,
  },
  { path: '*', element: <Navigate to='/chat' replace /> },
]

export const App = (): ReactElement => {
  const publicRouter = createBrowserRouter(publicRoutes)
  const privateRouter = createBrowserRouter(privateRoutes)

  const { user, isLoading } = useAuth()

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
        Carregando...
      </div>
    )

  const router = user !== null ? privateRouter : publicRouter

  return (
    <main className='w-full'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
