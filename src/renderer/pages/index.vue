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
        electron.menubar.startTrayTimer(this.working.startedAt)
      } else {
        electron.menubar.stopTrayTimer()
      }
    },
  },
  mounted() {
    electron.menubar.on.suspend(() => this.stopWorking())
    electron.menubar.on.shutdown(() => this.stopWorking())
    electron.menubar.on.unlockScreen(() => this.showReminder())
    electron.menubar.on.clickDuplicate(() => this.startPrevActivity())
    electron.menubar.on.showMenubar(() =>
      this.$store.dispatch('activities/fetchWorking')
    )
  },
  destroyed() {
    electron.menubar.stopTrayTimer()
  },
  methods: {
    async showReminder() {
      if (this.working) return

      await this.$store.dispatch('activities/fetchWeeklyActivities', new Date())
      electron.menubar.showReminder(this.prevDescription)
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
  },
}
</script>

<style scoped lang="scss">
.timer-form {
  margin-top: 30px;
}

.footer {
  background-color: $background-light;
  border-top: 1px $border solid;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  height: 50px;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 20px;
  position: absolute;
  width: 100%;
}

.footer .icon {
  align-items: center;
  color: $text;
  display: flex;
  margin: 0 10px;
}

.footer-icons {
  display: flex;
}

.more-icon {
  color: $white;
}
</style>
