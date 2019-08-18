<i18n src="@/assets/locales/components/organisms/big-timer.json" />

<template>
  <form class="big-timer" @submit.prevent="submit">
    <div class="form">
      <div class="form-item">
        <project-select
          :value="projectId"
          class="project-select"
          @input="selectProject"
        />
      </div>
      <div class="form-item">
        <input
          v-model="description"
          placeholder="作業内容や備考など"
          class="description"
          @keypress.enter.prevent="enterDescription"
        />
      </div>
    </div>

    <div class="timer">
      <ticker :started-at="startedAt" :class="['ticker', { stopped: !id }]" />
      <base-button
        v-if="!id"
        type="submit"
        class="is-primary control-button start"
      >
        <icon name="play-icon" />
      </base-button>
      <base-button v-else type="submit" class="is-danger control-button stop">
        <icon name="square-icon" />
      </base-button>
    </div>

    <base-button class="trash-button">
      <icon name="trash-icon" class="is-danger" />
    </base-button>
  </form>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ProjectSelect from '@/components/molecules/project-select';
import Ticker from '@/components/atoms/ticker';
import { mapGetters } from 'vuex';

export default {
  components: {
    Ticker,
    BaseButton,
    ProjectSelect,
    Icon
  },
  data() {
    return {
      id: undefined,
      description: '',
      projectId: undefined,
      startedAt: undefined
    };
  },
  computed: {
    ...mapGetters({
      working: 'activities/working'
    })
  },
  watch: {
    working() {
      this.setWorkingProps();
    }
  },
  methods: {
    setWorkingProps() {
      const props = this.working || {};
      this.id = props.id;
      this.startedAt = props.startedAt;
      this.projectId = props.project && props.project.id;
      this.description = props.description;
    },
    submit() {
      (this.id ? this.stopActivity : this.startActivity)();
    },
    enterDescription() {
      (this.id ? this.updateActivity : this.startActivity)();
    },
    selectProject(projectId) {
      this.projectId = projectId;
      if (this.id) this.updateActivity();
    },
    async updateActivity() {
      const success = await this.$store.dispatch('activities/update', {
        id: this.id,
        description: this.description,
        projectId: this.projectId
      });
      if (success) {
        this.setWorkingProps();
        this.$store.dispatch('toast/success', this.$t('updated'));
      }
    },
    async stopActivity() {
      this.$store.dispatch('toast/success', this.$t('stopped'));
      await this.$store.dispatch('activities/update', {
        id: this.id,
        stoppedAt: `${new Date()}`
      });
      this.setWorkingProps();
    },
    async startActivity() {
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.projectId,
        startedAt: `${new Date()}`
      });
      if (success) {
        this.setWorkingProps();
        this.$store.dispatch('toast/success', this.$t('started'));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  box-shadow: 0 3px 5px #00000008;
}
.project-select {
  padding: 0 30px;
}
.form-item {
  border-bottom: 1px $border solid;
  padding: 0 0;
  height: 60px;
  align-items: center;
  display: flex;
}
.description {
  height: 100%;
  width: 100%;
  padding: 0 30px;
  border: 0;
}
.trash-button {
  position: absolute;
  bottom: 60px;
  right: 10px;
}
.timer {
  display: flex;
  padding-top: 60px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  time {
    font-size: 46px;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    margin-bottom: 10px;
  }
}
.control-button {
  display: flex;
  align-self: center;
  flex-shrink: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  pointer-events: auto;
  box-shadow: 0 3px 3px #00000010;
}
.control-button .icon {
  width: 22px;
  height: 22px;
}
.control-button.start .icon {
  padding-left: 3px;
}
</style>
