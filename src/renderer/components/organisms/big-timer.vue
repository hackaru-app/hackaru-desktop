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
          :placeholder="$t('descriptionPlaceholder')"
          class="description"
          @focus="focus"
          @blur="blur"
          @input="input"
          @change="change"
          @keypress.enter.prevent="enterDescription"
        />
      </div>
    </div>

    <div class="content">
      <transition>
        <div
          v-if="focused && !id && suggestions.length > 0"
          class="suggestion-list-wrapper"
        >
          <ul class="suggestion-list">
            <li
              v-for="suggestion in suggestions"
              :key="suggestion.id"
              class="suggestion"
              @click="clickSuggestion(suggestion)"
            >
              <activity-name v-bind="suggestion" />
            </li>
          </ul>
        </div>
      </transition>
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
    </div>

    <base-button
      v-if="id"
      v-tooltip="$t('delete')"
      type="button"
      class="delete-button"
      @click="confirmDeleteActivity"
    >
      <icon name="trash-icon" class="is-danger" />
    </base-button>
  </form>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import Icon from '@/components/atoms/icon';
import ProjectSelect from '@/components/molecules/project-select';
import ActivityName from '@/components/molecules/activity-name';
import Ticker from '@/components/atoms/ticker';
import { mapGetters } from 'vuex';
import debounce from 'lodash.debounce';

export default {
  components: {
    Ticker,
    BaseButton,
    ProjectSelect,
    ActivityName,
    Icon
  },
  data() {
    return {
      id: undefined,
      description: '',
      projectId: undefined,
      startedAt: undefined,
      focused: false
    };
  },
  computed: {
    ...mapGetters({
      working: 'activities/working',
      suggestions: 'suggestions/all'
    })
  },
  watch: {
    working() {
      if (this.working.id) {
        this.setWorkingProps();
      }
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
    confirmDeleteActivity() {
      this.$modal.show('dialog', {
        text: this.$t('confirms.delete'),
        buttons: [
          { title: 'Cancel' },
          { title: 'OK', handler: this.deleteActivity }
        ]
      });
    },
    async deleteActivity() {
      await this.$store.dispatch('activities/delete', this.id);
      this.$store.dispatch('toast/success', this.$t('deleted'));
      this.setWorkingProps();
      this.$modal.hide('dialog');
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
    },
    fetchSuggestions: debounce(function() {
      if (!this.id) {
        this.$store.dispatch('suggestions/fetch', this.description);
      }
    }, 1000),
    input(e) {
      this.description = e.target.value;
      this.fetchSuggestions();
    },
    focus() {
      this.focused = true;
      this.fetchSuggestions();
    },
    blur() {
      this.focused = false;
    },
    change() {
      if (this.id) this.updateActivity();
    },
    clickSuggestion(activity) {
      this.description = activity.description;
      this.projectId = activity.project && activity.project.id;
      this.startActivity();
    }
  }
};
</script>

<style scoped lang="scss">
.big-timer {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}
.project-select {
  padding: 0 30px;
}
.form {
  position: fixed;
  top: 30px;
  width: 100%;
  background: #fff;
  box-shadow: 0 3px 5px #00000005;
}
.form-item {
  border-bottom: 1px $border solid;
  box-sizing: border-box;
  padding: 0 0;
  height: 65px;
  align-items: center;
  display: flex;
}
.description {
  height: 100%;
  width: 100%;
  padding: 0 30px;
  border: 0;
}
.content {
  margin-top: 160px;
  position: relative;
}
.suggestion-list-wrapper {
  position: absolute;
  animation-duration: 150ms;
  width: 100%;
  background-color: #00000050;
  height: 100vh;
}
.suggestion-list {
  list-style-type: none;
  list-style-position: inside;
  padding: 0;
  background-color: #fffffffe;
  box-shadow: 0 3px 5px #00000010;
  margin: 0;
  max-height: calc(60px * 4);
  overflow: hidden;
  overflow-y: scroll;
}
.suggestion {
  display: flex;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  padding: 0 30px;
  border-bottom: 1px $border solid;
  &:last-child {
    border: 0;
    padding-bottom: 2px;
  }
  &:hover {
    background-color: lighten($grey-f5f5f5, 2%);
  }
}
.delete-button {
  position: absolute;
  bottom: 15px;
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
    font-family: $font-family-duration;
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
