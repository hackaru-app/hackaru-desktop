<template>
  <div class="project-name">
    <dot :color="color || '#cccfd9'" class="dot" />
    {{ name || 'No Project' }}
  </div>
</template>

<script>
import Dot from '../atoms/dot';

export default {
  components: {
    Dot
  },
  props: {
    name: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
.project-name {
  display: flex;
  align-items: baseline;
}
.dot {
  margin-right: 15px;
}
</style>
