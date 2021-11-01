<template>
  <span class="window-header" />
</template>

<style scoped lang="scss">
.window-header {
  align-items: center;
  -webkit-app-region: drag;
  background-color: $background-dark;
  box-sizing: border-box;
  display: flex;
  height: 45px;
  justify-content: flex-end;
  padding: 0 15px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: index($z, window-header);
}

.is-small {
  height: 30px;
}
</style>
