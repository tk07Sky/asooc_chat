<template>
<div ref="message">
  <div
    class="message"
    v-for="(message,index) in messages"
    :class="{ own: message.uid == uid }"
    :key="index">
    <div class="username" v-if="index > 0 && messages[index - 1].user_name !== message.user_name">
      {{ message.user_name }}
    </div>
    <div class="username" v-if="index === 0">{{ message.user_name }}</div>
    <div class="content">
      {{ message.content }}
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    uid: { type: String, required: true },
    messages: { type: Array, required: false }
  },
  watch: {
    messages: {
      async handler() {
        await new Promise(resolve => setTimeout(resolve, 100))
        this.setMessageScrollHeight()
      },
      deep: true
    }
  },
  mounted() {
    this.setMessageScrollHeight()
  },
  methods: {
    setMessageScrollHeight() {
      this.$emit('set-message-scroll-height', this.$refs.message.scrollHeight)
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  margin-left: 10px;
  &.own {
    text-align: right;
    margin-right: 10px;
    margin-left: 0;
    .content {
      background: #7cee59;
    }
  }
  .content {
    max-width: 60%;
    // border: solid 1px gray;
    background: #e6e6e6;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    word-wrap: break-word;
    display: inline-block;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.3);
    @media (max-width: 480px) {
      max-width: 80%;
    }
  }
  .username {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
