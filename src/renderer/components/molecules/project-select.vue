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
      const id = e.target.value
      this.$emit('input', id ? Number(id) : null)
    },
  },
}
</script>

<style scoped lang="scss">
.project-select {
  flex: 1;
  height: 100%;
  position: relative;
}

select {
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
