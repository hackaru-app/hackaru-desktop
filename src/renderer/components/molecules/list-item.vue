<template>
  <article class="list-item">
    <slot />
  </article>
</template>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  &:hover {
    background: $grey-fdfdfd;
  }
}
</style>
