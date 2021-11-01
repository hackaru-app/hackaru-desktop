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
          data-test-id="stop-timer-on-suspend"
          @click="toggleChecked('stopTimerOnSuspend')"
        />{{ $t('stopTimerOnSuspend') }}
      </label>
      <label>
        <input
          class="shutdown"
          :checked="stopTimerOnShutdown"
          data-test-id="stop-timer-on-shutdown"
          type="checkbox"
          @click="toggleChecked('stopTimerOnShutdown')"
        />{{ $t('stopTimerOnShutdown') }}
      </label>
      <label>
        <input
          class="shutdown"
          :checked="remindTimerOnUnlocked"
          data-test-id="remind-timer-on-unlocked"
          type="checkbox"
          @click="toggleChecked('remindTimerOnUnlocked')"
        />{{ $t('remindTimerOnUnlocked') }}
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
    toggleChecked(key) {
      this[key] = !this[key]
      electron.config.set(key, this[key])
      electron.mixpanel.sendEvent(`Toggle ${key}`, {
        component: 'power-monitor',
        enabled: this[key],
      })
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
