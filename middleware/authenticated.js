export default ({ store, redirect }) => {
  if (!store.getters['auth/getIsAuth']) {
    return redirect('/sign-in')
  }
}
