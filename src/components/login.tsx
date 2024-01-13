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
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-1/2 flex'>
        <img
          src={networkPeople}
          alt='Network People'
          className='w-full h-auto object-cover md:h-full'
        />
      </div>
      <div className='flex flex-1 items-center justify-center p-4 md:w-1/2 bg-gradient-to-r from-blue-200 to-[#240C4A] text-white'>
        <form className='max-w-sm w-full space-y-5' onSubmit={handleSubmit}>
          <div className='max-w-sm w-full align-center justify-center'>
            <h1 className='text-2xl font-medium text-center'>
              FarpasChat
              <AiOutlineWechat className='w-8 h-8 inline-block ml-2' />
            </h1>
          </div>
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
          <div className=' mb-5 flex flex-col gap-2 items-center justify-center'>
            <button
              type='submit'
              className='text-blue-700 hover:text-[#240C4A] font-medium bg-purple-100 hover:bg-purple-200 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Entrar
            </button>
            <p className='mt-8 text-sm'>
              Não tem uma conta?
              <button
                onClick={() => navigate('/register')}
                className='text-purple-700 hover:text-purple-800 font-medium'
              >
                <span className='text-white hover:text-purple-800 font-medium ml-1'>
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
