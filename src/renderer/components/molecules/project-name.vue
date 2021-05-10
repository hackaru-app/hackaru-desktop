<template>
  <dot-text :color="color || '#cccfd9'" :text="name || 'No Project'" />
</template>

<script>
import DotText from '~/components/molecules/dot-text'

export default {
  components: {
    DotText,
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
}
</script>
