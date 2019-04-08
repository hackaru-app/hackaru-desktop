<template>
  <button @click="click">
    <slot />
  </button>
</template>

<script>
export default {
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0 15px;
  height: 38px;
  justify-content: center;
  align-items: center;
  display: flex;
  line-height: 1.5em;
  border-radius: 8px;
  background: none;
  border: 0;
  &:active {
    transform: scale(0.9);
  }
}
button.is-primary {
  background-color: $cyan;
  color: #fff;
}
button.is-rounded {
  border-radius: 99px;
  padding-right: 20px;
  padding-left: 20px;
}
button.has-dropshadow {
  box-shadow: 0 2px 3px #00000010;
}
button.has-icon {
  line-height: normal;
  height: auto;
  padding: 20px;
  margin: -20px;
  background: none;
  border: 0;
}
</style>
