<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8>
      <v-card>
        <v-card-title class="headline">ようそこ、{{ userGetName }}さん！</v-card-title>
        <v-card-text>
          <p></p>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  data: () => ({
    userName: ''
  }),
  created() {
    this.userShow({ uid: this.authGetUser.uid })
  },
  computed: {
    ...mapGetters('auth', { authGetUser: 'getUser' }),
    ...mapGetters('user', { userGetName: 'getUserName' })
  },
  methods: {
    ...mapActions('user', { userShow: 'SHOW_USER' })
  }
}
</script>
