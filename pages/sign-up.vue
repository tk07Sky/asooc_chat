<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm8>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>登録</v-toolbar-title>
        </v-toolbar>

        <v-card>
          <v-container fluid>
            <v-form ref="form">
              <v-layout row wrap>
                <v-text-field type="text" v-model="email" label="メールアドレス" required></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-text-field type="password" v-model="password" label="パスワード" required></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-text-field type="password" v-model="passwordConfirm" label="パスワード再入力" required></v-text-field>
              </v-layout>

              <v-layout row wrap justify-center>
                <v-btn block color="success" @click="signUp()">登録</v-btn>
              </v-layout>

              <v-layout row wrap justify-center>
                <v-btn flat color="primary" @click="goSignIn()">アカウントをお持ちの方はこちら</v-btn>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  head() {
    return {
      title: '登録'
    }
  },

  data: () => ({
    email: '',
    password: '',
    passwordConfirm: ''
  }),

  methods: {
    ...mapActions('auth', { authSignUp: 'SIGN_UP' }),
    async signUp() {
      if (this.password !== this.passwordConfirm) {
        console.log('error')
        return
      }
      const params = {
        email: this.email,
        password: this.password
      }
      const user = await this.authSignUp({ params: params })
      console.log(user)
    },

    goSignIn() {
      this.$router.push('/sign-in')
    }
  }
}
</script>
