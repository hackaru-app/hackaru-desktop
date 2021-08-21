<template>
  <span :style="{ backgroundColor: color }" class="dot" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.dot {
  border-radius: 50%;
  display: inline;
  min-height: 9px;
  min-width: 9px;
}
.dot.is-large {
  height: 14px;
  width: 14px;
}
</style>
