export const unsetAll = () => {
  localStorage.clear()
}

export const getUid = () => {
  return localStorage.getItem('uid')
}

export const setUid = uid => {
  localStorage.setItem('uid', uid)
}

export const getEmail = () => {
  return localStorage.getItem('email')
}

export const setEmail = email => {
  localStorage.setItem('email', email)
}
