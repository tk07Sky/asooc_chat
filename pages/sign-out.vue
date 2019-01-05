<template>
<p>ログアウトしています…</p>
</template>

<script>
import { mapActions } from 'vuex'
import { unsetAll as lsUnsetAll } from '~/utils/local-storage'
import { unsetAll as cUnsetAll } from '~/utils/cookie'
export default {
  async created() {
    await this.authSignOut()
    if (process.client) {
      lsUnsetAll()
    } else {
      cUnsetAll()
    }
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.$router.push('/sign-in')
  },
  methods: {
    ...mapActions('auth', { authSignOut: 'SIGN_OUT' })
  }
}
</script>
