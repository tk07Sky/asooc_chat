export default {
  getUser(state) {
    return state.user
  },

  getIsAuth(state) {
    return !!state.user.uid
  }
}
