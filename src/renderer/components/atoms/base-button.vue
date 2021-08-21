<template>
  <button class="base-button" v-on="$listeners">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  height: 39px;
  justify-content: center;
  line-height: 1;
  padding: 0 15px;
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
  padding-left: 20px;
  padding-right: 20px;
}
.base-button.has-dropshadow {
  box-shadow: 0 2px 3px #00000010;
}
.base-button.has-icon {
  background: none;
  border: 0;
  height: auto;
  line-height: normal;
  margin: -20px;
  padding: 20px;
}
</style>
