<template>
  <v-container>
    <v-layout justify-center>
      <v-flex xs12 sm8>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>ログイン</v-toolbar-title>
        </v-toolbar>

        <v-card>
          <v-container fluid>
            <v-form ref="form">
              <v-layout row wrap>
                <v-text-field type="email" v-model="$v.email.$model" label="メールアドレス" required :error-messages="emailErrors"></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-text-field type="password" v-model="$v.password.$model" label="パスワード" required :error-messages="passwordErrors"></v-text-field>
              </v-layout>

              <v-layout row wrap justify-center>
                <v-btn block color="success" @click="signIn()">ログイン</v-btn>
              </v-layout>

              <v-layout row wrap justify-center>
                <v-btn flat color="primary" @click="goSignUp()">アカウントをお持ちでない方はこちら</v-btn>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { validateEmail, validatePassword } from '~/utils/validations'
import { mapActions } from 'vuex'
export default {
  head() {
    return {
      title: 'ログイン'
    }
  },

  data: () => ({
    email: '',
    password: ''
  }),

  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },

  computed: {
    emailErrors() {
      return validateEmail(this.$v.email)
    },

    passwordErrors() {
      return validatePassword(this.$v.password)
    }
  },

  methods: {
    ...mapActions('auth', { authSignIn: 'SIGN_IN' }),
    async signIn() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      const params = {
        email: this.email,
        password: this.password
      }
      const user = await this.authSignIn({ params: params })
      console.log(user)
    },

    goSignUp() {
      this.$router.push('/sign-up')
    }
  }
}
</script>
