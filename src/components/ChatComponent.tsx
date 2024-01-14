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
  const [sendMessage] = useSendMessageMutation()

  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = useCallback(() => {
    if (message) {
      sendMessage({ sender: String(user?.displayName), content: message })
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
    <div className='flex flex-col h-screen bg-gray-100'>
      <div className='sticky top-0 bg-white p-4 border-b border-gray-300 flex justify-between items-center shadow-md'>
        <h2 className='text-2xl font-bold text-blue-600'>
          Bora conversar?
          <AiOutlineWechat className='w-8 h-8 inline-block ml-2' />
        </h2>
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2 shadow'
        >
          Sair
        </button>
      </div>
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === user?.displayName ? 'justify-end' : ''}`}
          >
            <AvatarComponent
              src={user?.photoURL}
              alt={msg.sender}
              fallbackText={msg.sender?.[0]}
            />
            <div
              className={`flex flex-col ml-2 max-w-xs lg:max-w-md break-words ${msg.sender === user?.displayName ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-lg px-4 py-2 shadow`}
            >
              <div className='text-xs font-bold'>{msg.sender}</div>
              <div className='text-sm'>{msg.content}</div>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className='sticky bottom-0 p-4 border-t border-gray-200 bg-white'>
        <div className='flex gap-4'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Digite uma mensagem'
            className='flex-1 p-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md'
          />
          <button
            onClick={handleSendMessage}
            className='bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-4 py-2 shadow'
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
