<template>
  <div class="project-select">
    <dot :color="selectedColor" />
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
import Dot from '~/components/atoms/dot'

export default {
  components: {
    Dot,
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
    selectedColor() {
      return this.selected?.color || '#cccfd9'
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
  align-items: center;
  border-right: 1px $border-dark solid;
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0 25px;
  position: relative;
}

select {
  height: 100%;
  opacity: 0%;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
