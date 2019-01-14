<template>
  <div class="chat">
    <messages class="content-area" v-if="chatGetChats" :uid="authGetUser.uid" :messages="chatGetChats" />
    <form class="input-message" @submit.prevent="addMessage">
      <input v-model="content" placeholder="メッセージを入力してください">
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Messages from '~/components/Messages.vue'

export default {
  layout: 'chat',
  data: () => ({
    content: ''
  }),
  components: {
    Messages
  },
  created() {
    this.chatInit()
    this.userShow({ uid: this.authGetUser.uid })
  },
  computed: {
    ...mapGetters('auth', { authGetUser: 'getUser' }),
    ...mapGetters('user', { userGetName: 'getUserName' }),
    ...mapGetters('chat', { chatGetChats: 'getChats' })
  },
  methods: {
    ...mapActions('user', { userShow: 'SHOW_USER' }),
    ...mapActions('chat', {
      chatInit: 'INIT_CHAT',
      chatAddMessage: 'ADD_MESSAGE'
    }),
    async addMessage() {
      this.chatAddMessage({
        uid: this.authGetUser.uid,
        userName: this.userGetName,
        content: this.content
      })
      this.content = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  position: relative;
  .content-area {
    height: calc(100vh - 9.8rem);
    margin-top: 5px;
    overflow-y: scroll;
    margin-bottom: 2px;
  }
  .input-message {
    bottom: 0;
    left: 0;
    width: 100%;
    // border: solid 1px gray;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
    input {
      padding: 10px;
      width: 100%;
      height: 4.6rem;
      &:focus {
        outline: 0;
        border: none;
      }
    }
  }
}
</style>
