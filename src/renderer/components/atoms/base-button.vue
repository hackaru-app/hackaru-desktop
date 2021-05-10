<template>
  <button class="base-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  cursor: pointer;
  padding: 0 15px;
  height: 39px;
  justify-content: center;
  align-items: center;
  display: flex;
  line-height: 1;
  border-radius: 5px;
  background: none;
  border: 0;
}
.base-button.is-primary {
  background-color: $cyan;
  color: $white;
}
.base-button.is-danger {
  background-color: $red;
  color: $white;
}
.base-button.is-rounded {
  border-radius: 99px;
  padding-right: 20px;
  padding-left: 20px;
}
.base-button.has-dropshadow {
  box-shadow: 0 2px 3px #00000010;
}
.base-button.has-icon {
  line-height: normal;
  height: auto;
  padding: 20px;
  margin: -20px;
  background: none;
  border: 0;
}
</style>
