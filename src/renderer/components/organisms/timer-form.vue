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
      projects: 'projects/all',
    }),
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
      this.start()
    },
    async start() {
      electron.sendGaEvent('Activities', 'start')
      const success = await this.$store.dispatch('activities/add', {
        description: this.description,
        projectId: this.projectId,
        startedAt: new Date(),
      })
      if (success) {
        this.$store.dispatch('toast/success', this.$t('started'))
      }
    },
    async update() {
      if (this.working) {
        electron.sendGaEvent('Activities', 'update')
        const success = await this.$store.dispatch('activities/update', {
          id: this.activity.id,
          description: this.description,
          projectId: this.projectId,
        })
        if (success) {
          this.$store.dispatch('toast/success', this.$t('updated'))
        }
      }
    },
    async stop() {
      electron.sendGaEvent('Activities', 'stop')
      const success = await this.$store.dispatch('activities/update', {
        id: this.activity.id,
        description: this.description,
        projectId: this.projectId,
        stoppedAt: new Date(),
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
