<template>
  <article class="activity">
    <div class="content" @click="showEditor">
      <project-name v-bind="project" />
      <ticker
        :started-at="startedAt"
        :stopped-at="stoppedAt"
        class="duration"
      />
    </div>
    <base-button
      type="button"
      class="has-icon stop-button"
      @click="stopActivity(id)"
    >
      <icon name="check-icon" class="is-primary" />
    </base-button>
  </article>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import ProjectName from '@/components/molecules/project-name';
import Icon from '@/components/atoms/icon';
import Ticker from '@/components/atoms/ticker';

export default {
  components: {
    BaseButton,
    Icon,
    ProjectName,
    Ticker
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    startedAt: {
      type: String,
      required: true
    },
    stoppedAt: {
      type: String,
      default: undefined
    },
    project: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    showEditor() {
      this.$electron.ipcRenderer.send('showActivityEditor', {
        id: this.id,
        projectId: this.project && this.project.id,
        description: this.description,
        startedAt: this.startedAt
      });
    },
    async stopActivity(id) {
      const success = await this.$store.dispatch('activities/stop', id);
      if (success) {
        this.$store.dispatch('toast/showSuccess', this.$t('stopped'));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.project-name {
  flex: 1;
}
.duration {
  color: $text-light;
  margin-right: 15px;
}
.activity {
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  &:hover {
    background: $grey-fdfdfd;
  }
}
.content {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.97);
  }
}
</style>
