import React, { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { setEmail, setErrorMessage, setPassword } from '../reducers/authSlice'
import { loginUser } from '../services/auth-api'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import networkPeople from '../assets/network_people.jpg'
import { AiOutlineWechat } from 'react-icons/ai'

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
    <div className='flex min-h-screen flex-col md:flex-row'>
      <div className='flex md:w-1/2'>
        <img
          src={networkPeople}
          alt='Network People'
          className='h-auto w-full object-cover md:h-full'
        />
      </div>
      <div className='flex flex-1 items-center justify-center bg-gradient-to-r from-blue-200 to-[#240C4A] p-4 text-white md:w-1/2'>
        <form className='w-full max-w-sm space-y-5' onSubmit={handleSubmit}>
          <div className='align-center w-full max-w-sm justify-center'>
            <h1 className='text-center text-2xl font-medium'>
              FarpasChat
              <AiOutlineWechat className='ml-2 inline-block h-8 w-8' />
            </h1>
          </div>
          <div className='mb-5'>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={handleEmail}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              placeholder='Digite seu email'
              required
            />
          </div>
          <div className='mb-5'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
            >
              Senha
            </label>
            <input
              type='password'
              id='password'
              placeholder='Digite sua senha'
              value={password}
              onChange={handlePassword}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              required
            />
          </div>
          <div className=' mb-5 flex flex-col items-center justify-center gap-2'>
            <button
              type='submit'
              className='w-full rounded-lg bg-purple-100 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-purple-200 hover:text-[#240C4A] sm:w-auto'
            >
              Entrar
            </button>
            <p className='mt-8 text-sm'>
              Não tem uma conta?
              <button
                onClick={() => navigate('/register')}
                className='font-medium text-purple-700 hover:text-purple-800'
              >
                <span className='ml-1 font-medium text-white hover:text-purple-800'>
                  Registre-se aqui
                </span>
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent
