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
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm
} from '~/utils/validations'
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

  validations: {
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
    ...mapActions('auth', { authSignUp: 'SIGN_UP' }),
    async signUp() {
      this.$v.$touch()
      if (this.$v.$invalid) return
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
