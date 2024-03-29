<template>
  <section>
    <window-header>
      <menu-popover />
    </window-header>
    <timer-form class="timer-form" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatISO, parseISO, differenceInSeconds } from 'date-fns'
import throttle from 'lodash.throttle'
import MenuPopover from '../components/organisms/menu-popover.vue'
import WindowHeader from '~/components/atoms/window-header'
import TimerForm from '~/components/organisms/timer-form'

export default {
  components: {
    WindowHeader,
    TimerForm,
    MenuPopover,
  },
  middleware: 'authenticated',
  fetch() {
    this.$store.dispatch('projects/fetch')
    this.$store.dispatch('activities/fetchWorking')
  },
  head: {
    title: 'Hackaru',
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
        electron.main.startTrayTimer(this.working.startedAt)
        electron.main.startMiniTimer(this.working.startedAt)
      } else {
        electron.main.stopTrayTimer()
        electron.main.stopMiniTimer()
      }
    },
  },
  mounted() {
    electron.main.on.suspend(() => this.stopWorking())
    electron.main.on.shutdown(() => this.stopWorking())
    electron.main.on.unlockScreen(() => this.showReminder())
    electron.main.on.clickDuplicate(() => this.startPrevActivity())
    electron.main.on.focus(() => this.fetchWorking())
    electron.mixpanel.syncConfig()
  },
  destroyed() {
    electron.main.stopTrayTimer()
  },
  methods: {
    async showReminder() {
      if (this.working) return

      await this.$store.dispatch('activities/fetchWeeklyActivities', new Date())
      electron.main.showReminder(this.prevDescription)
    },
    startPrevActivity() {
      if (!this.prevActivity || this.working) return

      const startedAt = new Date()
      electron.googleAnalytics.sendEvent('Activities', 'startPrev')
      electron.mixpanel.sendEvent('Start prev activity', {
        component: 'index',
        startedAt: formatISO(startedAt),
        descriptionLength: this.prevActivity.description.length,
        projectId: this.prevActivity.project?.id,
      })
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
    fetchWorking: throttle(function () {
      this.$store.dispatch('activities/fetchWorking')
    }, 5000),
  },
}
</script>

<style scoped lang="scss">
.timer-form {
  margin-top: 30px;
}
</style>
