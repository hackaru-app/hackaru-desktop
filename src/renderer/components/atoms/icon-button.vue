<template>
  <button class="icon-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.icon-button {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: opacity 0.3s, transform 0.1s;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
  &::after {
    content: '';
    height: 40px;
    left: 0;
    margin-left: -10px;
    margin-top: -20px;
    position: absolute;
    width: 40px;
  }
}
.is-primary {
  color: $cyan;
}
</style>
