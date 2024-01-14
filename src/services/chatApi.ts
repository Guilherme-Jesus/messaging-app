import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Message {
  sender: string
  content: string
  timestamp: string
  photoURL: string
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://messagin.onrender.com/' }),
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket('wss://messagin.onrender.com/')

        try {
          await cacheDataLoaded

          ws.onmessage = (event) => {
            const message: Message = JSON.parse(event.data)
            updateCachedData((draft) => {
              draft.push(message)
            })
          }
        } catch {
          ws.close()
        }

        await cacheEntryRemoved
        ws.close()
      },
    }),
    sendMessage: builder.mutation<void, Message>({
      query: (message) => ({
        url: '/send-message',
        method: 'POST',
        body: message,
      }),
    }),
  }),
})

export const { useGetMessagesQuery, useSendMessageMutation } = chatApi
