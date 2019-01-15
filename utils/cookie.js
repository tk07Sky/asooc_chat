import Cookie from 'js-cookie'

export const unsetAll = () => {
  Cookie.remove('uid')
  Cookie.remove('email')
}

export const getUid = req => {
  if (!req.headers.cookie) return
  const uidCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('uid='))
  if (!uidCookie) return
  const uid = uidCookie.split('=')[1]
  return uid
}

export const setUid = uid => {
  Cookie.set('uid', uid)
}

export const getEmail = req => {
  if (!req.headers.cookie) return
  const emailCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('email='))
  if (!emailCookie) return
  const email = emailCookie.split('=')[1]
  return email
}

export const setEmail = email => {
  Cookie.set('email', email)
}
