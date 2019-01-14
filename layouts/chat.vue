<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [{ icon: 'apps', title: 'Welcome', to: '/' }],
      miniVariant: false,
      title: '麻生OCチャット'
    }
  },

  created() {
    this.setLoginNavItem()
  },

  watch: {
    getIsAuth() {
      this.items.pop()
      this.setLoginNavItem()
    }
  },

  computed: {
    ...mapGetters('auth', ['getIsAuth'])
  },

  methods: {
    setLoginNavItem() {
      const loginState = {}
      if (this.getIsAuth) {
        this.$set(loginState, 'icon', 'lock')
        this.$set(loginState, 'title', 'ログアウト')
        this.$set(loginState, 'to', '/sign-out')
      } else {
        this.$set(loginState, 'icon', 'lock_open')
        this.$set(loginState, 'title', 'ログイン')
        this.$set(loginState, 'to', '/sign-in')
      }
      this.items.push(loginState)
    }
  }
}
</script>
