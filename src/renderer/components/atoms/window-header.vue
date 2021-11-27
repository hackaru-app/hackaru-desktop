<template>
  <span :class="['window-header', { win: platform === 'Win32' }]">
    <slot />
  </span>
</template>

<script>
export default {
  data() {
    return {
      platform: navigator.platform
    }
  }
}
</script>

<style scoped lang="scss">
.window-header {
  align-items: center;
  -webkit-app-region: drag;
  background-color: $background-dark;
  box-sizing: border-box;
  display: flex;
  height: 30px;
  justify-content: flex-end;
  padding: 0 15px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: index($z, window-header);
  &.win {
    justify-content: flex-start;
  }
}
</style>
