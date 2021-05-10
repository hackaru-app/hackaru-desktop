<template>
  <button class="icon-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.icon-button {
  position: relative;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.1s;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    margin-left: -10px;
    margin-top: -20px;
    width: 40px;
    height: 40px;
  }
}
.is-primary {
  color: $cyan;
}
</style>
