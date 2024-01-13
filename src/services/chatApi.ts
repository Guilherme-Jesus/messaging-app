import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Message {
  sender: string
  content: string
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      queryFn: () => ({ data: [] }), // Sem operação de fetch real
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
          // Tratamento de erros aqui
        }

        await cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})

export const { useGetMessagesQuery } = chatApi
