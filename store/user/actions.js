import firestore from '~/plugins/firestore'
const userRef = firestore.collection('users')
export default {
  async SHOW_USER({ commit }, { uid }) {
    const user = await userRef.doc(uid).get()
    commit('setUserName', user.data().name)
  },

  async ADD_USER({ commit }, { params }) {
    await userRef.doc(params.uid).set({
      name: params.userName
    })
    commit('setUserName', params.userName)
  }
}
