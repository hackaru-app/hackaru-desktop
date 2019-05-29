<template>
  <span :style="{ backgroundColor: color }" class="dot" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.dot {
  display: inline;
  border-radius: 50%;
  width: 9px;
  height: 9px;
}
.dot.is-large {
  width: 14px;
  height: 14px;
}
</style>
