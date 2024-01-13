import { configureStore } from '@reduxjs/toolkit'
import { chatApi } from '../services/chatApi'
import authSlice from '../reducers/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
