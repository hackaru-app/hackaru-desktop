<template>
  <header class="main-header">
    <slot />
  </header>
</template>

<style scoped lang="scss">
.main-header {
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
  z-index: 1;
}
.is-small {
  height: 30px;
}
.is-light {
  background-color: $grey-fafafa;
  border-bottom: 1px $grey-eee solid;
}
.menu-button {
  transition: all 0.2s;
  padding: 6px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  border: 0;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.97);
  }
  &:hover {
    background: darken($background-dark, 5%);
  }
  .icon {
    color: $grey-f5f5f5;
  }
}
</style>
