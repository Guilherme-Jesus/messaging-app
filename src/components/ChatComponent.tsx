import { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineWechat } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase-config'
import { setAuthing } from '../reducers/authSlice'
import { useGetMessagesQuery } from '../services/chatApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const ChatComponent = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const ws = useRef<WebSocket | null>(null)

  const { data: messages } = useGetMessagesQuery()
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  const initWebSocket = useCallback(() => {
    ws.current = new WebSocket('wss://messagin.onrender.com/')
    ws.current.onclose = () => {
      console.log('WebSocket closed. Reconnecting...')
      setTimeout(initWebSocket, 1000) // Tentar reconectar após 1 segundo
    }
  }, [])

  useEffect(() => {
    initWebSocket()
    return () => {
      ws.current?.close()
    }
  }, [initWebSocket])

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(() => {
    if (message && ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageData = { sender: user?.displayName, content: message }
      ws.current.send(JSON.stringify(messageData))
      setMessage('')
    }
  }, [message, user?.displayName])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        sendMessage()
      }
    },
    [sendMessage]
  )
  const handleLogout = (): void => {
    auth.signOut().then(() => {
      dispatch(setAuthing(false))
      navigate('/login')
    })
  }

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
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-1 ${msg.sender === user?.displayName ? 'justify-end' : 'justify-start'}`}
          >
            <p
              className={`rounded px-4 py-2 max-w-xs lg:max-w-md ${
                msg.sender === user?.displayName
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <strong>{msg.sender}:</strong>
              <span className='ml-2'>{msg.content}</span>
            </p>
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
            onClick={sendMessage}
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
