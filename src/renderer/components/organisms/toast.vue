<template>
  <div class="toast">
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div
        v-if="opened"
        :class="['content', message.type]"
        data-test-id="content"
        @click="hide"
      >
        {{ message.text }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      opened: false,
      hideTimer: undefined,
    }
  },
  computed: {
    ...mapGetters({
      message: 'toast/message',
    }),
  },
  watch: {
    message() {
      this.opened = true
      clearInterval(this.hideTimer)
      this.hideTimer = setTimeout(this.hide, this.message.duration)
    },
  },
  methods: {
    hide() {
      this.opened = false
    },
  },
}
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
  z-index: index($z, toast);
}
.toast {
  left: 0;
  width: 100vw;
}
.content {
  padding: 18px 30px;
  flex-direction: column;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  margin: 0;
  width: 100%;
  border-radius: 0;
  text-align: center;
  color: $white;
}
.success {
  background-color: $cyan;
}
.error {
  background-color: $red;
}
</style>
