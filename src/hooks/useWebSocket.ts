import { useEffect, useState, useRef, useCallback } from 'react'

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<string[]>([])
  const webSocket = useRef<WebSocket | null>(null)

  useEffect(() => {
    webSocket.current = new WebSocket(url)

    webSocket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((prev) => [...prev, message])
    }

    return () => {
      webSocket.current?.close()
    }
  }, [url])

  const sendMessage = useCallback((message: string) => {
    webSocket.current?.send(JSON.stringify(message))
  }, [])

  return { messages, sendMessage }
}
