<template>
  <dot-text
    :color="project ? project.color : '#cccfd9'"
    :text="description || (project ? project.name : 'No Project')"
  />
</template>

<script>
import DotText from '@/components/molecules/dot-text';

export default {
  components: {
    DotText
  },
  props: {
    project: {
      type: Object,
      default: null
    },
    description: {
      type: String,
      default: null
    }
  }
};
</script>
