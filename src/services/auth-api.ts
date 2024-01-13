import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { auth, storage } from '../config/firebase-config'
import { handleFirebaseError } from '../helpers/firebase-error'
import { IUserFirebase } from '../reducers/authSlice'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

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

export const registerUser = createAsyncThunk<
  IUserFirebase,
  { email: string; password: string; displayName: string; file?: File },
  { rejectValue: string }
>(
  'auth/registerUser',
  async ({ email, password, displayName, file }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      let photoURL = null
      if (file) {
        const fileRef = ref(storage, `user_images/${user.uid}`)
        const snapshot = await uploadBytes(fileRef, file)
        photoURL = await getDownloadURL(snapshot.ref)
      }

      await updateProfile(user, { displayName, photoURL })

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
  }
)
