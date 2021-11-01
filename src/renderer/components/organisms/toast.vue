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
  align-items: flex-end;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  width: 100vw;
  z-index: index($z, toast);
}

.content {
  border-radius: 0;
  bottom: 0;
  box-sizing: border-box;
  color: $white;
  flex-direction: column;
  left: 0;
  margin: 0;
  padding: 19px 30px;
  text-align: center;
  width: 100%;
}

.success {
  background-color: $cyan;
}

.error {
  background-color: $red;
}
</style>
