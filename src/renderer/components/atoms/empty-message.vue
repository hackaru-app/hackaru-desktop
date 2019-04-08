<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
p {
  display: flex;
  flex: 1;
  width: 100%;
  padding: 10px 0;
  justify-content: center;
  color: $text-light;
  &.fade-leave-active {
    animation-duration: 0s;
  }
  &.fade-enter-active {
    animation-delay: .5s;
    animation-duration: 1s;
  }
}
</style>
