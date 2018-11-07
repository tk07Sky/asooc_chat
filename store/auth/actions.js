import firebase from '~/plugins/firebase'
import 'firebase/firestore'
const auth = firebase.auth()

export default {
  async SIGN_UP({ commit }, { params }) {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        params['email'],
        params['password']
      )
      commit('setUser', response.user)
      return response.user
    } catch (error) {
      console.log('登録失敗')
      console.log(error)
    }
  },

  async SIGN_IN({ commit }, { params }) {
    try {
      const response = await auth.signInWithEmailAndPassword(
        params['email'],
        params['password']
      )
      commit('setUser', response.user)
      return response.user
    } catch (error) {
      console.log('認証失敗')
      console.log(error)
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
