<template>
  <div class="project-select">
    <project-name v-bind="selected" class="project-name" />
    <select data-test-id="select" @change="change">
      <option
        v-for="project in projects"
        :key="project.id"
        :value="project.id"
        :selected="project.id === value"
      >
        {{ project.name }}
      </option>
    </select>
  </div>
</template>

<script>
import ProjectName from '~/components/molecules/project-name'

export default {
  components: {
    ProjectName,
  },
  props: {
    value: {
      type: Number,
      default: null,
    },
    projects: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selected() {
      return this.projects.find(({ id }) => id === this.value)
    },
  },
  methods: {
    change(e) {
      this.$emit('input', Number(e.target.value))
    },
  },
}
</script>

<style scoped lang="scss">
.project-select {
  position: relative;
  height: 100%;
  flex: 1;
}
select {
  top: 0;
  width: 100%;
  position: absolute;
  opacity: 0;
  height: 100%;
}
</style>
