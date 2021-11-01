<template>
  <div class="dot-text">
    <dot :color="color" class="dot" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Dot from '~/components/atoms/dot'

export default {
  components: {
    Dot,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.dot-text {
  align-items: baseline;
  display: flex;
  overflow: hidden;
}

p {
  display: inline;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.dot {
  margin-right: 15px;
}
</style>
