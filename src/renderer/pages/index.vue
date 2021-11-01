<i18n src="~/assets/locales/pages/index.json"></i18n>

<template>
  <section>
    <window-header class="is-small" />
    <timer-form class="timer-form" />
    <footer class="footer">
      <div class="footer-icons">
        <icon-button
          v-tooltip="$t('settings')"
          type="button"
          data-test-id="settings-button"
          @click="openSettings"
        >
          <icon name="settings-icon" class="icon is-small" />
        </icon-button>
        <icon-button
          v-tooltip="$t('web')"
          data-test-id="web-button"
          type="button"
          @click="openWeb"
        >
          <icon name="globe-icon" class="icon is-small" />
        </icon-button>
      </div>

      <div class="footer-icons">
        <icon-button
          v-tooltip="$t('quit')"
          data-test-id="quit-button"
          type="button"
          @click="quit"
        >
          <icon name="x-circle-icon" class="icon is-small" />
        </icon-button>
        <icon-button
          v-tooltip="$t('logout')"
          data-test-id="logout-button"
          type="button"
          @click="confirmLogout"
        >
          <icon name="log-out-icon" class="icon is-small" />
        </icon-button>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatISO, parseISO, differenceInSeconds } from 'date-fns'
import WindowHeader from '~/components/atoms/window-header'
import TimerForm from '~/components/organisms/timer-form'
import Icon from '~/components/atoms/icon'
import IconButton from '~/components/atoms/icon-button'

export default {
  components: {
    WindowHeader,
    TimerForm,
    Icon,
    IconButton,
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
    openSettings() {
      electron.menubar.openSettings()
    },
    openWeb() {
      electron.mixpanel.sendEvent('Open web', {
        component: 'index',
      })
      electron.menubar.openWeb()
    },
    quit() {
      electron.mixpanel.sendEvent('Quit app', {
        component: 'index',
      })
      electron.menubar.quit()
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
    confirmLogout() {
      this.$modal.show('dialog', {
        text: this.$t('confirms.logout'),
        buttons: [
          { title: 'Cancel', handler: () => this.$modal.hide('dialog') },
          { title: 'OK', handler: this.logout },
        ],
      })
    },
    async logout() {
      this.$modal.hide('dialog')
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
</style>
