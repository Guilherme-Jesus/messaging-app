import { useCallback, useEffect, useRef, useState } from 'react'
import { useGetMessagesQuery } from '../services/chatApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { auth } from '../config/firebase-config'
import { setAuthing } from '../reducers/authSlice'
import { useNavigate } from 'react-router-dom'

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
      const messageData = { sender: user?.email, content: message }
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
    <div className='flex flex-col h-full bg-gray-100'>
      <div className='sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-center'>Bora conversar? 💬</h2>
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2'
        >
          Sair
        </button>
      </div>
      <div className='flex-1 overflow-y-auto p-4'>
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end mb-1 ${
              msg.sender === user?.email ? 'justify-end' : 'justify-start'
            }`}
          >
            <p
              className={`rounded px-4 py-2 ${
                msg.sender === user?.email
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
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
        <div className='flex gap-2'>
          <input
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Digite uma mensagem'
            className='flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={sendMessage}
            className='bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2'
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
