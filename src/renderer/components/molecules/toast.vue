<template>
  <div v-show="visible" class="toast">
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div v-if="opened" :class="['content', message.type]">
        {{ message.text }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      opened: false,
      visible: false,
      hideTimer: undefined
    };
  },
  computed: {
    ...mapGetters({
      message: 'toast/message'
    })
  },
  watch: {
    message() {
      this.visible = this.$electron.remote.getCurrentWindow().isVisible();
      this.opened = true;
      clearInterval(this.hideTimer);
      this.hideTimer = setTimeout(
        () => (this.opened = false),
        this.message.duration
      );
    }
  }
};
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: index($z, toast);
}
.content {
  animation-duration: 0.5s;
  display: flex;
  position: fixed;
  align-self: center;
  width: 100vw;
  bottom: 0;
  left: 0;
  justify-content: center;
  padding: 15px 30px;
  box-sizing: border-box;
  color: $white;
  text-align: center;
}
.success {
  background-color: $cyan;
}
.error {
  background-color: $red;
}
</style>
