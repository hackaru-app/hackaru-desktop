<i18n src="../../locales/pages/activity-editor.json" />

<template>
  <section>
    <main-header class="is-small is-light" />
    <form @submit.prevent="saveActivity">
      <div class="item">
        <label>{{ $t('project') }}</label>
        <project-select v-model="projectId" class="project-select" />
      </div>
      <div class="item">
        <label>{{ $t('description') }}</label>
        <input
          v-model="description"
          :placeholder="$t('description')"
          :aria-label="$t('description')"
        />
      </div>
      <div class="item">
        <label>{{ $t('startedAt') }}</label>
        <datetime-picker v-model="startedAt" />
      </div>
      <div class="item">
        <label>{{ $t('stoppedAt') }}</label>
        <datetime-picker v-model="stoppedAt" />
      </div>
      <footer>
        <base-button class="is-rounded is-primary" type="submit">{{
          $t(id ? 'update' : 'start')
        }}</base-button>
        <base-button
          v-if="id"
          type="button"
          class="has-icon"
          :aria-label="$t('delete')"
          @click="deleteActivity"
        >
          <feather-icon name="trash" class="is-danger" />
        </base-button>
      </footer>
    </form>
  </section>
</template>

<script>
import BaseButton from '../atoms/base-button';
import DatetimePicker from '../molecules/datetime-picker';
import MainHeader from '../molecules/main-header';
import ProjectSelect from '../molecules/project-select';
import FeatherIcon from '../atoms/feather-icon';

export default {
  components: {
    BaseButton,
    FeatherIcon,
    MainHeader,
    DatetimePicker,
    ProjectSelect
  },
  data() {
    return {
      id: this.$route.query.id,
      projectId: this.$route.query.projectId,
      description: this.$route.query.description,
      startedAt: this.$route.query.startedAt || new Date().toString(),
      stoppedAt: this.$route.query.stoppedAt
    };
  },
  methods: {
    async saveActivity() {
      const success = await this.$store.dispatchPromise(
        `activities/${this.id ? 'updateActivity' : 'addActivity'}`,
        {
          id: this.id,
          projectId: this.projectId,
          description: this.description,
          startedAt: this.startedAt,
          stoppedAt: this.stoppedAt
        }
      );
      if (success) {
        this.$store.dispatch(
          'toast/showSuccess',
          this.$t(this.id ? 'updated' : 'started')
        );
        this.$electron.remote.getCurrentWindow().close();
      }
    },
    async deleteActivity() {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      const success = await this.$store.dispatchPromise(
        'activities/deleteActivity',
        this.id
      );
      if (success) {
        this.$store.dispatch('toast/showSuccess', this.$t('deleted'));
        this.$electron.remote.getCurrentWindow().close();
      }
    },
    back() {
      this.$emit('pop', '/');
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  border-bottom: 1px $border solid;
  padding: 0 20px;
  min-height: 60px;
  transition: all 0.3s ease;
  label {
    color: $text-light;
    margin-right: 20px;
  }
  input {
    border: 0;
    height: 100%;
    min-height: 36px;
  }
}
form {
  margin-top: 30px;
}
footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
