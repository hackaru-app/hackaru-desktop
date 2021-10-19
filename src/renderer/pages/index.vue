<i18n src="~/assets/locales/pages/index.json"></i18n>

<template>
  <section>
    <window-header class="is-small" />
    <timer-form class="timer-form" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatISO, parseISO, differenceInSeconds } from 'date-fns'
import WindowHeader from '~/components/atoms/window-header'
import TimerForm from '~/components/organisms/timer-form'

export default {
  components: {
    WindowHeader,
    TimerForm,
  },
  middleware: 'authenticated',
  fetch() {
    this.$store.dispatch('projects/fetch')
    this.$store.dispatch('activities/fetchWorking')
  },
  computed: {
    ...mapGetters({
      working: 'activities/working',
      prevActivity: 'activities/prev',
      prevDescription: 'activities/prevDescription',
    }),
  },
  watch: {
    working() {
      if (this.working) {
        electron.index.startTrayTimer(this.working.startedAt)
      } else {
        electron.index.stopTrayTimer()
      }
    },
  },
  mounted() {
    electron.index.on.suspend(() => this.stopWorking())
    electron.index.on.shutdown(() => this.stopWorking())
    electron.index.on.unlockScreen(() => this.showReminder())
    electron.index.on.clickDuplicate(() => this.startPrevActivity())
    electron.index.on.logout(() => this.logout())
  },
  destroyed() {
    electron.index.stopTrayTimer()
  },
  methods: {
    async showReminder() {
      if (this.working) return

      await this.$store.dispatch('activities/fetchWeeklyActivities', new Date())
      electron.index.showReminder(this.prevDescription)
    },
    startPrevActivity() {
      if (!this.prevActivity || this.working) return

      this.$store.dispatch('activities/add', {
        description: this.prevActivity.description,
        projectId: this.prevActivity.project?.id,
        startedAt: new Date(),
      })
    },
    stopWorking() {
      if (!this.working) return

      const stoppedAt = new Date()
      electron.googleAnalytics.sendEvent('Activities', 'stop')
      electron.mixpanel.sendEvent('Stop activity', {
        component: 'index',
        projectId: this.working.project?.id,
        descriptionLength: this.working.description.length,
        startedAt: this.working.startedAt,
        stoppedAt: formatISO(stoppedAt),
        duration: differenceInSeconds(
          stoppedAt,
          parseISO(this.working.startedAt)
        ),
      })
      this.$store.dispatch('activities/update', {
        id: this.working.id,
        stoppedAt,
      })
    },
    async logout() {
      electron.sentry.removeUserId()
      electron.mixpanel.removeUserId()
      electron.googleAnalytics.sendEvent('Accounts', 'logout')
      electron.googleAnalytics.removeUserId()
      this.$store.dispatch('auth/logout')
      await this.$router.replace(this.localePath('auth'))
      window.location.reload()
    },
  },
}
</script>

<style scoped lang="scss">
.footer {
  bottom: 15px;
  position: absolute;
  right: 15px;
}
.icon-button {
  margin-left: 5px;
}
</style>
