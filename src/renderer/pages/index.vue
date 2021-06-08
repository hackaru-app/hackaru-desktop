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
    }),
  },
  watch: {
    working() {
      if (this.working) {
        electron.startTrayTimer(this.working.startedAt)
      } else {
        electron.stopTrayTimer()
      }
    },
  },
  mounted() {
    electron.onSuspend(() => this.stopWorking())
    electron.onShutdown(() => this.stopWorking())
    electron.onShowMenubar(() =>
      this.$store.dispatch('activities/fetchWorking')
    )
  },
  destroyed() {
    electron.stopTrayTimer()
  },
  methods: {
    openSettings() {
      electron.openSettings()
    },
    openWeb() {
      electron.sendMixpanelEvent('Open web', {
        component: 'index',
      })
      electron.openWeb()
    },
    quit() {
      electron.sendMixpanelEvent('Quit app', {
        component: 'index',
      })
      electron.quit()
    },
    stopWorking() {
      if (!this.working) return

      const stoppedAt = new Date()
      electron.sendGaEvent('Activities', 'stop')
      electron.sendMixpanelEvent('Stop activity', {
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
        buttons: [{ title: 'Cancel' }, { title: 'OK', handler: this.logout }],
      })
    },
    async logout() {
      this.$modal.hide('dialog')
      electron.removeUserId()
      electron.sendGaEvent('Accounts', 'logout')
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
  width: 100%;
  overflow: hidden;
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: space-between;
  background-color: $background-light;
  border-top: 1px $border solid;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
}
.footer .icon {
  display: flex;
  align-items: center;
  color: $text;
  margin: 0 10px;
}
.footer-icons {
  display: flex;
}
</style>
