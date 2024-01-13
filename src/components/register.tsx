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
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-1/2 flex'>
        <img
          src={networkPeople}
          alt='Network People'
          className='w-full h-auto object-cover md:h-full'
        />
      </div>
      <div className='flex flex-1 items-center justify-center p-4 md:w-1/2 bg-gradient-to-r from-blue-200 to-[#240C4A] text-white'>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-60 dark:bg-gray-900 dark:bg-opacity-60'>
            <FaSpinner className='w-10 h-10 text-indigo-500 animate-spin' />
          </div>
        ) : (
          <form
            className='max-w-sm w-full space-y-5
        '
            onSubmit={handleRegister}
          >
            <div className='max-w-sm w-full'>
              <h1 className='text-2xl font-medium mb-6'>
                Crie sua conta no FarpasChat
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
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='username'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Nome de Usuário
              </label>
              <input
                type='text'
                id='username'
                placeholder='Digite seu nome de usuário'
                value={username}
                onChange={handleUsernameChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            <div className='mb-5'>
              <label
                htmlFor='file'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'
              >
                Foto de Perfil
              </label>
              <input
                type='file'
                id='file'
                onChange={handleFileChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
            </div>
            <div className=' mb-5 flex flex-col gap-2'>
              <button
                type='submit'
                className='text-blue-700 hover:text-[#240C4A] font-medium bg-purple-100 hover:bg-purple-200 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >
                Cadastrar
              </button>
              <button
                type='button'
                onClick={() => navigate('/login')}
                className='text-blue-700 hover:text-[#240C4A] font-medium bg-purple-100 hover:bg-purple-200 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
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
