<template>
  <div class="dot-text">
    <dot :color="color" class="dot" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Dot from '@/components/atoms/dot';

export default {
  components: {
    Dot
  },
  props: {
    color: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.dot-text {
  display: flex;
  align-items: baseline;
  overflow: hidden;
}
p {
  width: 100%;
  display: inline;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.dot {
  margin-right: 15px;
}
</style>
