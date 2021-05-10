<template>
  <component :is="name" class="icon" />
</template>

<script>
import * as icons from 'vue-feather-icons'

export default {
  components: {
    ...icons,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.icon {
  width: 20px;
  height: 20px;
  vertical-align: bottom;
}
.icon.is-small {
  width: 16px;
  height: 16px;
}
.icon.is-medium {
  width: 18px;
  height: 18px;
}
.icon.is-large {
  width: 22px;
  height: 22px;
}
.icon.is-x-large {
  width: 24px;
  height: 24px;
}
.icon.is-primary {
  color: $text-primary;
}
.icon.is-danger {
  color: $red;
}
.feather-chevron-left {
  margin-left: -5px;
}
.feather-chevron-right {
  margin-right: -5px;
}
</style>
