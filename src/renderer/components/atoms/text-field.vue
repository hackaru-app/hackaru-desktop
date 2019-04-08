<template>
  <input
    :value="value"
    @input="input"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
input.has-border {
  display: flex;
  border-radius: 2px;
  padding: 11px 15px;
  font-size: 14px;
  border: 1px $grey-eee solid;
  transition: border-color .3s;
  margin-bottom: 15px;
  &::placeholder {
    color: $grey-ccc;
    opacity: 1;
  }
  &:focus {
    border-color: $yellow;
  }
  &:invalid {
    border-color: $red;
    box-shadow: none;
  }
  &:placeholder-shown {
    border-color: $grey-eee;
  }
  &:placeholder-shown:focus {
    border-color: $yellow;
  }
}
input.has-underline {
  display: flex;
  padding: 10px 0;
  font-size: 14px;
  transition: border-color .3s;
  border-radius: 0;
  border: 0;
  border-bottom: 1px $grey-eee solid;
  margin-bottom: 10px;
  &::placeholder {
    color: $grey-ccc;
    opacity: 1;
    padding-top: 1px;
  }
  &:focus {
    border-color: $yellow;
  }
  &:invalid {
    border-color: $red;
    box-shadow: none;
  }
  &:placeholder-shown {
    border-color: $grey-eee;
  }
  &:placeholder-shown:focus {
    border-color: $yellow;
  }
}
</style>
