import React, { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { setEmail, setErrorMessage, setPassword } from '../reducers/authSlice'
import { loginUser } from '../services/auth-api'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const LoginComponent: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { email, password } = useAppSelector((state) => state.auth)
  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEmail(e.target.value))
  }
  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPassword(e.target.value))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(setErrorMessage(null))
    dispatch(loginUser({ email, password })).then(() => {
      navigate('/chat')
    })
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmail}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Digite seu email'
            required
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
          >
            Senha
          </label>
          <input
            type='password'
            id='password'
            placeholder='Digite sua senha'
            value={password}
            onChange={handlePassword}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginComponent
