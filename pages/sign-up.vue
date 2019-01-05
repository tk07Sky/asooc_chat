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
                <v-text-field type="text" v-model="$v.userName.$model" label="ユーザー名" required :error-messages="userNameErrors"></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-text-field type="text" v-model="$v.email.$model" label="メールアドレス" required :error-messages="emailErrors"></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-text-field type="password" v-model="$v.password.$model" label="パスワード" required :error-messages="passwordErrors"></v-text-field>
              </v-layout>

              <v-layout row wrap>
                <v-text-field type="password" v-model="$v.passwordConfirm.$model" label="パスワード再入力" required :error-messages="passwordConfirmErrors"></v-text-field>
              </v-layout>

              <v-layout row wrap justify-center>
                <v-btn block color="success" @click="signUp()">登録</v-btn>
              </v-layout>

              <v-layout row wrap justify-center>
                <v-btn flat color="primary" @click="goSignIn()">アカウントをお持ちの方はこちら</v-btn>
              </v-layout>
            </v-form>
          </v-container>
          <v-snackbar v-model="snackbar" bottom right color="error">
            既に登録されているメールアドレスです
            <v-btn flat color="white" @click="snackClose()">閉じる</v-btn>
          </v-snackbar>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import {
  validateUserName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm
} from '~/utils/validations'
import { mapActions, mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: '登録'
    }
  },

  data: () => ({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    snackbar: false
  }),

  validations: {
    userName: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      min: minLength(8)
    },
    passwordConfirm: {
      required,
      confirm: sameAs('password')
    }
  },

  computed: {
    ...mapGetters('auth', { authGetUser: 'getUser' }),
    userNameErrors() {
      return validateUserName(this.$v.userName)
    },

    emailErrors() {
      return validateEmail(this.$v.email)
    },

    passwordErrors() {
      return validatePassword(this.$v.password)
    },

    passwordConfirmErrors() {
      return validatePasswordConfirm(this.$v.passwordConfirm)
    }
  },

  methods: {
    ...mapActions('user', { userAdd: 'ADD_USER' }),
    ...mapActions('auth', { authSignUp: 'SIGN_UP' }),
    async signUp() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (this.password !== this.passwordConfirm) {
        console.log('error')
        return
      }
      const signInParams = {
        email: this.email,
        password: this.password
      }
      await this.authSignUp({ params: signInParams }).catch(e => {
        if (e.code === 'auth/email-already-in-use') {
          this.snackShow()
          throw new Error('Email already in use.')
        }
        throw new Error('Sign up error.')
      })
      const addUserParams = {
        uid: this.authGetUser.uid,
        userName: this.userName
      }
      await this.userAdd({ params: addUserParams })
      this.$router.push('/')
    },

    goSignIn() {
      this.$router.push('/sign-in')
    },

    snackShow() {
      this.snackbar = true
    },

    snackClose() {
      this.snackbar = false
    }
  }
}
</script>
