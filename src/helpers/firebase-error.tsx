interface IFirebaseError {
  code: string
  message: string
}

export const handleFirebaseError = (error: IFirebaseError): string => {
  let errorMsg = 'Erro desconhecido!'
  switch (error.code) {
    case 'auth/invalid-email':
    case 'auth/email-not-found':
    case 'auth/user-not-found':
    case 'auth/user-disabled':
    case 'auth/wrong-password':
      errorMsg = 'Email ou senha incorreta!'
      break
    case 'auth/expired-action-code':
    case 'auth/invalid-action-code':
      errorMsg = 'Código inválido!'
      break
  }
  return errorMsg
}
