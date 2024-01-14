import React, { ChangeEvent, useState } from 'react'
import { AiOutlineWechat } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import networkPeople from '../assets/network_people.jpg'
import useAuth from '../hooks/useAuth'
import { registerUser } from '../services/auth-api'
import { useAppDispatch } from '../store/hooks'
const RegisterComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAuth()

  // Estados locais para email, senha e username
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)

  // Estados do Redux

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Atualize a verificação para lidar com undefined
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    } else {
      setFile(undefined)
    }
  }

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      registerUser({ email, password, displayName: username, file })
    ).then(() => {
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
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-60'>
            <FaSpinner className='h-10 w-10 animate-spin text-indigo-500' />
          </div>
        ) : (
          <form
            className='w-full max-w-sm space-y-5
        '
            onSubmit={handleRegister}
          >
            <div className='w-full max-w-sm'>
              <h1 className='mb-6 text-2xl font-medium'>
                Crie sua conta no FarpasChat
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
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                required
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='username'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
              >
                Nome de Usuário
              </label>
              <input
                type='text'
                id='username'
                placeholder='Digite seu nome de usuário'
                value={username}
                onChange={handleUsernameChange}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                required
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='file'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
              >
                Foto de Perfil
              </label>
              <input
                type='file'
                id='file'
                onChange={handleFileChange}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              />
            </div>
            <div className=' mb-5 flex flex-col gap-2'>
              <button
                type='submit'
                className='w-full rounded-lg bg-purple-100 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-purple-200 hover:text-[#240C4A] sm:w-auto'
              >
                Cadastrar
              </button>
              <button
                type='button'
                onClick={() => navigate('/login')}
                className='w-full rounded-lg bg-purple-100 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-purple-200 hover:text-[#240C4A] sm:w-auto'
              >
                Voltar para Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegisterComponent
