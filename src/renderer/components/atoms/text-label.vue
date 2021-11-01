<template>
  <span class="label">
    <slot />
  </span>
</template>

<style scoped lang="scss">
.label {
  border-radius: 2px;
  font-size: 12px;
  margin: 0 5px;
  padding: 2px 7px;
}

.purple {
  background-color: $purple;
  color: $white;
}
</style>
