import { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineWechat } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase-config'
import { setAuthing } from '../reducers/authSlice'
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../services/chatApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import AvatarComponent from './avatar' // Importe o AvatarComponent

const ChatComponent = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [message, setMessage] = useState('')

  const { data: messages } = useGetMessagesQuery()
  const [sendMessage, { isLoading: isSendingMessage }] =
    useSendMessageMutation()

  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = useCallback(() => {
    if (message && !isSendingMessage) {
      sendMessage({
        sender: String(user?.displayName),
        content: message,
        photoURL: String(user?.photoURL),
        timestamp: new Date().toISOString(),
      })
      setMessage('')
    }
  }, [message, sendMessage, user?.displayName])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  const handleLogout = useCallback(() => {
    auth.signOut().then(() => {
      dispatch(setAuthing(false))
      navigate('/login')
    })
  }, [dispatch, navigate])

  return (
    <div className='flex h-screen flex-col bg-gray-100'>
      <div className='sticky top-0 flex items-center justify-between border-b border-gray-300 bg-white p-4 shadow-md'>
        <h2 className='text-2xl font-bold  text-blue-600'>
          Bora conversar?
          <AiOutlineWechat className='ml-2 inline-block h-8 w-8' />
        </h2>
        <button
          onClick={handleLogout}
          className='rounded-xl bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600'
        >
          Sair
        </button>
      </div>
      <div className='flex-1 space-y-4 overflow-y-auto p-4'>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === user?.displayName ? 'justify-end' : ''}`}
          >
            <AvatarComponent
              src={msg.photoURL}
              alt={msg.sender}
              fallbackText={msg.sender}
            />
            <div
              className={`ml-2 flex max-w-xs flex-col break-words lg:max-w-md ${msg.sender === user?.displayName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg px-4 py-2 shadow`}
            >
              <div className='text-xs font-bold'>{msg.sender}</div>
              <div className='text-sm'>{msg.content}</div>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className='sticky bottom-0 border-t border-gray-200 bg-white p-4'>
        <div className='flex gap-4'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Digite uma mensagem'
            className='flex-1 rounded-xl border p-1 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300'
          />
          <button
            onClick={handleSendMessage}
            className='rounded-xl bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600'
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
