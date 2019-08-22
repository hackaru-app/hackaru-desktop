<template>
  <div class="project-select">
    <project-name v-bind="selected" class="project-name" />
    <select @change="change">
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
import ProjectName from '@/components/molecules/project-name';

export default {
  components: {
    ProjectName
  },
  props: {
    value: {
      type: Number,
      default: () => null
    }
  },
  computed: {
    projects() {
      return [
        {
          id: null,
          name: 'No Project',
          color: '#ccc'
        },
        ...this.$store.getters['projects/all']
      ];
    },
    selected() {
      return this.projects.find(project => project.id === this.value);
    }
  },
  methods: {
    change(e) {
      const id = e.target.value;
      this.$emit('input', id ? Number(id) : null);
    }
  }
};
</script>

<style scoped lang="scss">
.project-select {
  position: relative;
  flex: 1;
}
select {
  top: 0;
  width: 100%;
  position: absolute;
  opacity: 0;
}
</style>
