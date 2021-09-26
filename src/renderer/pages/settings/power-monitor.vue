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
          :checked="suspendEnabled"
          type="checkbox"
          data-test-id="suspend"
          @click="toggleSuspend"
        />{{ $t('suspend') }}
      </label>
      <label>
        <input
          class="shutdown"
          :checked="shutdownEnabled"
          data-test-id="shutdown"
          type="checkbox"
          @click="toggleShutdown"
        />{{ $t('shutdown') }}
      </label>
      <label>
        <input
          class="shutdown"
          :checked="remindTimerOnUnlockingEnabled"
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
      suspendEnabled: false,
      shutdownEnabled: false,
      remindTimerOnUnlockingEnabled: false,
    }
  },
  async mounted() {
    this.suspendEnabled = await electron.getSuspend()
    this.shutdownEnabled = await electron.getShutdown()
    this.remindTimerOnUnlockingEnabled =
      await electron.getRemindTimerOnUnlocking()
  },
  methods: {
    toggleSuspend() {
      this.suspendEnabled = !this.suspendEnabled
      electron.sendMixpanelEvent('Toggle suspend', {
        component: 'power-monitor',
        enabled: this.suspendEnabled,
      })
      electron.setSuspend(this.suspendEnabled)
    },
    toggleShutdown() {
      this.shutdownEnabled = !this.shutdownEnabled
      electron.sendMixpanelEvent('Toggle shutdown', {
        component: 'power-monitor',
        enabled: this.shutdownEnabled,
      })
      electron.setShutdown(this.shutdownEnabled)
    },
    toggleRemindTimerOnUnlocking() {
      this.remindTimerOnUnlockingEnabled = !this.remindTimerOnUnlockingEnabled
      electron.sendMixpanelEvent('Toggle remindTimerOnUnlocking', {
        component: 'power-monitor',
        enabled: this.remindTimerOnUnlockingEnabled,
      })
      electron.setRemindTimerOnUnlocking(this.remindTimerOnUnlockingEnabled)
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
