<i18n src="~/assets/locales/pages/settings/power-monitor.json"></i18n>

<template>
  <section>
    <header class="header">
      <h1><icon name="power-icon" />{{ $t('title') }}</h1>
    </header>
    <div class="form">
      <label>
        <input
          class="suspend"
          :checked="stopTimerOnSuspend"
          type="checkbox"
          data-test-id="suspend"
          @click="toggleSuspend"
        />{{ $t('suspend') }}
      </label>
      <label>
        <input
          class="shutdown"
          :checked="stopTimerOnShutdown"
          data-test-id="shutdown"
          type="checkbox"
          @click="toggleShutdown"
        />{{ $t('shutdown') }}
      </label>
      <label>
        <input
          class="shutdown"
          :checked="remindTimerOnUnlocked"
          data-test-id="remind-timer-on-unlocking"
          type="checkbox"
          @click="toggleRemindTimerOnUnlocking"
        />{{ $t('remindTimerOnUnlocking') }}
        <text-label class="purple">BETA</text-label>
      </label>
    </div>
  </section>
</template>

<script>
import Icon from '~/components/atoms/icon'
import TextLabel from '~/components/atoms/text-label'

export default {
  components: {
    Icon,
    TextLabel,
  },
  data() {
    return {
      stopTimerOnSuspend: false,
      stopTimerOnShutdown: false,
      remindTimerOnUnlocked: false,
    }
  },
  async mounted() {
    this.stopTimerOnSuspend = await electron.config.get('stopTimerOnSuspend')
    this.stopTimerOnShutdown = await electron.config.get('stopTimerOnShutdown')
    this.remindTimerOnUnlocked = await electron.config.get(
      'remindTimerOnUnlocked'
    )
  },
  methods: {
    toggleSuspend() {
      this.stopTimerOnSuspend = !this.stopTimerOnSuspend
      electron.mixpanel.sendEvent('Toggle suspend', {
        component: 'power-monitor',
        enabled: this.stopTimerOnSuspend,
      })
      electron.config.set('stopTimerOnSuspend', this.stopTimerOnSuspend)
    },
    toggleShutdown() {
      this.stopTimerOnShutdown = !this.stopTimerOnShutdown
      electron.mixpanel.sendEvent('Toggle shutdown', {
        component: 'power-monitor',
        enabled: this.stopTimerOnShutdown,
      })
      electron.config.set('stopTimerOnShutdown', this.stopTimerOnShutdown)
    },
    toggleRemindTimerOnUnlocking() {
      this.remindTimerOnUnlocked = !this.remindTimerOnUnlocked
      electron.mixpanel.sendEvent('Toggle remindTimerOnUnlocking', {
        component: 'power-monitor',
        enabled: this.remindTimerOnUnlocked,
      })
      electron.config.set('remindTimerOnUnlocked', this.remindTimerOnUnlocked)
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px $border solid;
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  h1 {
    align-items: center;
    display: flex;
    font-size: 18px;
    font-weight: normal;
    .icon {
      margin-right: 10px;
    }
  }
}
.form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  label {
    margin: 5px 0;
  }
  input {
    margin-right: 10px;
  }
}
</style>
