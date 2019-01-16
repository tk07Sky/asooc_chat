<template>
  <div class="chat">
    <div ref="chat" class="content-area">
      <messages
        v-if="chatGetChats"
        @set-message-scroll-height="setMessageScrollHeight"
        :uid="authGetUser.uid"
        :messages="chatGetChats" />
    </div>
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
  middleware: 'authenticated',
  data: () => ({
    content: '',
    messageScrollHeight: 0
  }),
  components: {
    Messages
  },
  created() {
    this.chatInit()
    this.userShow({ uid: this.authGetUser.uid })
  },
  watch: {
    messageScrollHeight() {
      this.scrollToEnd()
    }
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
      if (!this.content) return
      this.chatAddMessage({
        uid: this.authGetUser.uid,
        userName: this.userGetName,
        content: this.content
      })
      this.content = ''
    },
    scrollToEnd() {
      let currentHeight = this.$refs.chat.scrollHeight
      let difference = this.messageScrollHeight - this.$refs.chat.clientHeight
      var container = this.$el.querySelector('.content-area')
      container.scrollTop = difference
    },
    setMessageScrollHeight(scrollHeight) {
      this.messageScrollHeight = scrollHeight
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
