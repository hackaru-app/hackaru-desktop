<template>
  <span class="window-header" />
</template>

<style scoped lang="scss">
.window-header {
  display: flex;
  position: fixed;
  top: 0;
  -webkit-app-region: drag;
  align-items: center;
  justify-content: flex-end;
  background-color: $background-dark;
  height: 45px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  z-index: index($z, window-header);
}
.is-small {
  height: 30px;
}
</style>
