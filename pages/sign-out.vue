<template>
<p>ログアウトしています…</p>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  async created() {
    await this.authSignOut()
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.$router.push('/sign-in')
  },
  methods: {
    ...mapActions('auth', { authSignOut: 'SIGN_OUT' })
  }
}
</script>
