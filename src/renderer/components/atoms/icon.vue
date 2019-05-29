<template>
  <component :is="name" class="icon" />
</template>

<script>
import * as icons from 'vue-feather-icons';

export default {
  components: {
    ...icons
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
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
.icon.is-large {
  width: 20px;
  height: 20px;
}
.icon.is-x-large {
  width: 24px;
  height: 24px;
}
.icon.is-primary {
  color: $cyan;
}
.icon.is-danger {
  color: $red;
}
</style>
