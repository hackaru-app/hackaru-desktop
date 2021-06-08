<i18n src="~/assets/locales/components/organisms/timer-form.json"></i18n>

<template>
  <form @submit.prevent>
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
      @click="confirmDeleteWorking"
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
        electron.sendMixpanelEvent('Select project', {
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
      electron.sendMixpanelEvent('Click suggestion', {
        component: 'timer-form',
      })
      this.start()
    },
    async start() {
      const startedAt = new Date()

      electron.sendGaEvent('Activities', 'start')
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.projectId,
        startedAt,
      })
      if (success) {
        electron.sendMixpanelEvent('Start activity', {
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

      electron.sendGaEvent('Activities', 'update')
      const success = await this.$store.dispatch('activities/update', {
        id: this.activity.id,
        description: this.description,
        projectId: this.projectId,
      })
      if (success) {
        electron.sendMixpanelEvent('Update activity', {
          component: 'timer-form',
          projectId: this.projectId,
          descriptionLength: this.description.length,
        })
        this.$store.dispatch('toast/success', this.$t('updated'))
      }
    },
    async stop() {
      const stoppedAt = new Date()

      electron.sendGaEvent('Activities', 'stop')
      electron.sendMixpanelEvent('Stop activity', {
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
    confirmDeleteWorking() {
      this.$modal.show('dialog', {
        text: this.$t('confirms.delete'),
        buttons: [
          { title: 'Cancel' },
          { title: 'OK', handler: this.deleteWorking },
        ],
      })
    },
    async deleteWorking() {
      this.$modal.hide('dialog')
      electron.sendGaEvent('Activities', 'delete')
      electron.sendMixpanelEvent('Delete activity', {
        component: 'timer-form',
        projectId: this.projectId,
        descriptionLength: this.description.length,
      })
      await this.$store.dispatch('activities/delete', this.activity.id)
      this.$store.dispatch('toast/success', this.$t('deleted'))
    },
  },
}
</script>

<style scoped lang="scss">
.project-select {
  display: flex;
  align-items: center;
}
.form-item {
  border-bottom: 1px $border solid;
  box-sizing: border-box;
  height: 65px;
  align-items: center;
  display: flex;
  padding: 0 30px;
}
.description {
  height: 100%;
  width: 100%;
  border: 0;
}
.working-timer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 46px;
  font-family: $font-family-duration;
  font-weight: 300;
  margin-bottom: 10px;
  margin-top: 60px;
}
.ticker {
  margin-bottom: 10px;
}
.delete-button {
  float: right;
  margin-right: 30px;
  margin-top: 20px;
}
</style>
