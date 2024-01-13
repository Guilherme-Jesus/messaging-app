import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from '../services/auth-api'

export interface IUserFirebase {
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}

export interface IAuthState {
  authing: boolean
  email: string
  errorMessage: string | null
  password: string
  token: string | unknown
  user: IUserFirebase | null
}

const initialState: IAuthState = {
  authing: false,
  email: '',
  errorMessage: null,
  password: '',
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: IAuthState, action: PayloadAction<IUserFirebase>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    setUser: (
      state: IAuthState,
      action: PayloadAction<IUserFirebase | null>
    ) => {
      state.user = action.payload
    },

    setEmail: (state: IAuthState, action: PayloadAction<string>) => {
      state.email = action.payload
    },

    setPassword: (state: IAuthState, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setAuthing: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.authing = action.payload
    },
    setErrorMessage: (
      state: IAuthState,
      action: PayloadAction<string | null>
    ) => {
      state.errorMessage = action.payload
    },
    setToken: (state: IAuthState, action: PayloadAction<string | unknown>) => {
      state.token = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.authing = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.authing = false
      state.user = action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.authing = false
      state.errorMessage = action.payload as string
    })
  },
})
export const {
  login,
  logout,
  setAuthing,
  setEmail,
  setErrorMessage,
  setPassword,
  setToken,
  setUser,
} = authSlice.actions

export default authSlice.reducer
