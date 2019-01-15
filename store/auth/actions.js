import {
  setUid as lsSetUid,
  setEmail as lsSetEmail
} from '~/utils/local-storage'
import { setUid as cSetUid, setEmail as cSetEmail } from '~/utils/cookie'

import firebase from '~/plugins/firebase'
const auth = firebase.auth()

export default {
  async SIGN_UP({ commit }, { params }) {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        params['email'],
        params['password']
      )
      lsSetUid(response.user.uid)
      cSetUid(response.user.uid)
      lsSetEmail(response.user.email)
      cSetEmail(response.user.email)
      commit('setUser', response.user)
      return response.user
    } catch (error) {
      throw error
    }
  },

  async SIGN_IN({ commit }, { params }) {
    try {
      const response = await auth.signInWithEmailAndPassword(
        params['email'],
        params['password']
      )
      lsSetUid(response.user.uid)
      cSetUid(response.user.uid)
      lsSetEmail(response.user.email)
      cSetEmail(response.user.email)
      commit('setUser', response.user)
      return response.user
    } catch (error) {
      throw error
    }
  },

  async SIGN_OUT({ commit }) {
    try {
      await auth.signOut()
      commit('unsetUser')
    } catch (error) {
      console.log(error)
    }
  }
}
