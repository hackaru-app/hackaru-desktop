<template>
  <dot-text
    :color="project ? project.color : '#cccfd9'"
    :text="description || (project ? project.name : 'No Project')"
  />
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
}
</script>
