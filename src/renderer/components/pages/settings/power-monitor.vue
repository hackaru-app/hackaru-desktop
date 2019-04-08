<i18n src="../../../locales/pages/settings/power-monitor.json" />

<template>
  <section>
    <main-header class="is-small" />
    <setting-menu />

    <section class="content">
      <header class="content-header">
        <h1>
          <feather-icon name="power" />{{ $t('title') }}
        </h1>
      </header>

      <div class="form">
        <label>
          <input
            type="checkbox"
            v-model="suspend"
          />{{ $t('suspend') }}
        </label>
        <label>
          <input
            type="checkbox"
            v-model="shutdown"
          />{{ $t('shutdown') }}
        </label>
      </div>
    </section>
  </section>
</template>

<script>
import SettingMenu from '../../organisms/setting-menu'
import MainHeader from '../../molecules/main-header'
import FeatherIcon from '../../atoms/feather-icon'

export default {
  components: {
    SettingMenu,
    MainHeader,
    FeatherIcon
  },
  computed: {
    config () {
      return this.$store.getters['config/getConfig']
    },
    suspend: {
      get () { return this.config.powerMonitor.suspend },
      set (value) { this.setConfig('powerMonitor.suspend', value) }
    },
    shutdown: {
      get () { return this.config.powerMonitor.shutdown },
      set (value) { this.setConfig('powerMonitor.shutdown', value) }
    }
  },
  methods: {
    setConfig (path, value) {
      this.$store.dispatch('config/setConfig', { path, value })
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  flex: 1;
  margin-left: 150px;
  padding: 50px 40px;
  padding-top: 50px;
}
.content-header {
  display: flex;
  padding-bottom: 20px;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  h1 {
    font-size: 16px;
    display: flex;
    align-items: center;
    font-weight: normal;
    .icon {
      margin-right: 10px;
    }
  }
}
.form {
  margin-top: 30px;
  label {
    display: flex;
    align-items: baseline;
    margin: 3px 0;
  }
  input {
    margin-right: 10px;
  }
}
</style>
