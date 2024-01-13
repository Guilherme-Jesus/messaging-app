import { ReactElement } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import ChatComponent from './components/ChatComponent'
import LoginComponent from './components/login'
import RegisterComponent from './components/register'
import useAuth from './hooks/useAuth'

// Rotas públicas
const publicRoutes = [
  { path: '/login', element: <LoginComponent /> },
  { path: '/register', element: <RegisterComponent /> }, // Adicione esta linha
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

  const router = user !== null ? privateRouter : publicRouter

  return (
    <main className='w-full'>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-60'>
          <FaSpinner className='w-10 h-10 text-indigo-500 animate-spin' />
        </div>
      )}
      {!isLoading && <RouterProvider router={router} />}
    </main>
  )
}

export default App
