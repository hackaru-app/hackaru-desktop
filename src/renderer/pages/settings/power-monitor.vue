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
    </div>
  </section>
</template>

<script>
import Icon from '~/components/atoms/icon'

export default {
  components: {
    Icon,
  },
  data() {
    return {
      suspendEnabled: false,
      shutdownEnabled: false,
    }
  },
  async mounted() {
    this.suspendEnabled = await electron.getSuspend()
    this.shutdownEnabled = await electron.getShutdown()
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
  },
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  h1 {
    font-size: 18px;
    display: flex;
    align-items: center;
    font-weight: normal;
    .icon {
      margin-right: 10px;
    }
  }
}
.form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  label {
    margin: 5px 0;
  }
  input {
    margin-right: 10px;
  }
}
</style>
