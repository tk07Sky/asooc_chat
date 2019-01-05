import {
  getUid as lsGetUid,
  getEmail as lsGetEmail
} from '~/utils/local-storage'
import { getUid as cGetUid, getEmail as cGetEmail } from '~/utils/cookie'
export default ({ store, req }) => {
  if (process.server && !req) return
  const uid = process.server ? cGetUid(req) : lsGetUid()
  const email = process.server ? cGetEmail(req) : lsGetEmail()
  if (typeof uid !== 'undefined' && typeof email !== 'undefined') {
    const auth = {
      uid: uid,
      email: email
    }
    store.commit('auth/setUser', auth, { root: true })
  }
}
