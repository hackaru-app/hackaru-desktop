<i18n src="~/assets/locales/components/organisms/timer-form.json"></i18n>

<template>
  <form @submit.prevent>
    <header class="form-header">
      <div class="form-item">
        <project-select
          :value="projectId"
          :projects="projects"
          class="project-select"
          data-test-id="project-select"
          @input="selectProject"
        />
      </div>
      <div class="form-item">
        <input
          v-model="description"
          :placeholder="$t('description')"
          class="description"
          data-test-id="description"
          @change="update"
          @focus="focus"
          @blur="blur"
          @keypress.enter.prevent="startOrUpdate"
        />
      </div>
    </header>
    <suggestion-list
      v-if="focused && !working"
      class="suggestion-list"
      data-test-id="suggestion-list"
      :query="description"
      @select="selectSuggestion"
    />
    <section class="working-timer">
      <ticker v-bind="activity" class="ticker" />
      <play-button
        :working="working"
        data-test-id="play-button"
        @start="start"
        @stop="stop"
      />
    </section>
    <icon-button
      v-if="working"
      v-tooltip="$t('delete')"
      type="button"
      data-test-id="delete-button"
      class="delete-button"
      @click="deleteWorking"
    >
      <icon name="trash-2-icon" class="icon is-danger" />
    </icon-button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatISO, parseISO, differenceInSeconds } from 'date-fns'
import Ticker from '~/components/atoms/ticker'
import ProjectSelect from '~/components/molecules/project-select'
import PlayButton from '~/components/molecules/play-button'
import SuggestionList from '~/components/organisms/suggestion-list'
import Icon from '~/components/atoms/icon'
import IconButton from '~/components/atoms/icon-button'

export default {
  components: {
    Icon,
    IconButton,
    Ticker,
    ProjectSelect,
    PlayButton,
    SuggestionList,
  },
  data() {
    return {
      projectId: undefined,
      description: '',
      focused: false,
    }
  },
  computed: {
    ...mapGetters({
      activity: 'activities/working',
    }),
    projects() {
      return [
        { id: null, name: 'No Project', color: '#cccfd9' },
        ...this.$store.getters['projects/all'],
      ]
    },
    working() {
      return !!this.activity
    },
  },
  watch: {
    activity: {
      immediate: true,
      handler() {
        if (this.activity) {
          this.description = this.activity.description
          this.projectId = this.activity.project?.id
        } else {
          this.description = ''
          this.projectId = undefined
        }
      },
    },
  },
  methods: {
    focus() {
      this.focused = true
    },
    blur() {
      this.focused = false
    },
    selectProject(id) {
      this.projectId = id
      if (this.working) {
        this.update()
        electron.mixpanel.sendEvent('Select project', {
          component: 'timer-form',
        })
      }
    },
    startOrUpdate() {
      if (this.working) {
        this.update()
      } else {
        this.start()
      }
    },
    selectSuggestion(suggestion) {
      this.description = suggestion.description
      this.projectId = suggestion.project?.id
      electron.mixpanel.sendEvent('Click suggestion', {
        component: 'timer-form',
      })
      this.start()
    },
    async start() {
      const startedAt = new Date()

      electron.googleAnalytics.sendEvent('Activities', 'start')
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.projectId,
        startedAt,
      })
      if (success) {
        electron.mixpanel.sendEvent('Start activity', {
          component: 'timer-form',
          startedAt: formatISO(startedAt),
          projectId: this.projectId,
          descriptionLength: this.description.length,
        })
        this.$store.dispatch('toast/success', this.$t('started'))
      }
    },
    async update() {
      if (!this.working) return

      electron.googleAnalytics.sendEvent('Activities', 'update')
      const success = await this.$store.dispatch('activities/update', {
        id: this.activity.id,
        description: this.description,
        projectId: this.projectId,
      })
      if (success) {
        electron.mixpanel.sendEvent('Update activity', {
          component: 'timer-form',
          projectId: this.projectId,
          descriptionLength: this.description.length,
        })
        this.$store.dispatch('toast/success', this.$t('updated'))
      }
    },
    async stop() {
      const stoppedAt = new Date()

      electron.googleAnalytics.sendEvent('Activities', 'stop')
      electron.mixpanel.sendEvent('Stop activity', {
        component: 'timer-form',
        projectId: this.projectId,
        descriptionLength: this.description.length,
        startedAt: this.activity.startedAt,
        stoppedAt: formatISO(stoppedAt),
        duration: differenceInSeconds(
          stoppedAt,
          parseISO(this.activity.startedAt)
        ),
      })

      const success = await this.$store.dispatch('activities/update', {
        id: this.activity.id,
        description: this.description,
        projectId: this.projectId,
        stoppedAt,
      })
      if (success) {
        this.$store.dispatch('toast/success', this.$t('stopped'))
      }
    },
    async deleteWorking() {
      if (!window.confirm(this.$t('confirms.delete'))) return

      electron.googleAnalytics.sendEvent('Activities', 'delete')
      electron.mixpanel.sendEvent('Delete activity', {
        component: 'timer-form',
        projectId: this.projectId,
        descriptionLength: this.description.length,
      })
      await this.$store.dispatch('activities/delete', this.activity.id)
      this.$store.dispatch('toast/success', this.$t('deleted'))
      await this.$store.dispatch('activities/fetchWorking')
    },
  },
}
</script>

<style scoped lang="scss">
.project-select {
  align-items: center;
  display: flex;
}

.form-header {
  box-shadow: 0 3px 3px $shadow;
}

.form-item {
  align-items: baseline;
  background-color: $background-translucent;
  border-bottom: 1px $border solid;
  box-sizing: border-box;
  display: flex;
  height: 60px;
  padding: 0 25px;
}

.description {
  border: 0;
  height: 100%;
  text-overflow: ellipsis;
  width: 100%;
}

.working-timer {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: $font-family-duration;
  font-size: 36px;
  font-weight: 300;
  height: calc(100vh - 120px - 30px);
  justify-content: center;
  padding-bottom: 10px;
  position: absolute;
  width: 100%;
  z-index: -1;
}

.delete-button {
  bottom: 15px;
  position: absolute;
  right: 15px;
}
</style>
