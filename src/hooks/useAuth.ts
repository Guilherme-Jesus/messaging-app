import { useEffect, useState } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { auth } from '../config/firebase-config'
import { IUserFirebase, setToken, setUser } from '../reducers/authSlice'

interface IAuthState {
  isLoading: boolean
  token: string | unknown
  user: IUserFirebase | null
}

const useAuth = (): IAuthState => {
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector((state) => state.auth)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(false)
      if (user != null) {
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName ?? null,
            photoURL: user.photoURL ?? null,
            email: user.email,
          })
        )
        void user.getIdTokenResult().then((idTokenResult) => {
          dispatch(setToken(idTokenResult.token))
        })
      } else {
        dispatch(setUser(null))
      }
    })

    return unsubscribe
  }, [dispatch])

  return { user, isLoading, token }
}

export default useAuth
