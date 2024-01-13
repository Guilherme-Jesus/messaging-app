import { signInWithEmailAndPassword } from 'firebase/auth'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { auth } from '../config/firebase-config'
import { handleFirebaseError } from '../helpers/firebase-error'
import { IUserFirebase } from '../reducers/authSlice'

export const loginUser = createAsyncThunk<
  IUserFirebase,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    }
  } catch (error) {
    return rejectWithValue(
      handleFirebaseError(error as { code: string; message: string })
    )
  }
})
