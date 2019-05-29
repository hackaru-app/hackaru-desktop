<template>
  <span class="icon">
    <i v-html="svg"></i>
  </span>
</template>

<script>
import feather from 'feather-icons';

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    svg: function() {
      return feather.icons[this.name].toSvg({
        width: '100%',
        height: '100%'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.icon {
  display: inline-block;
  width: 18px;
  height: 18px;
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
