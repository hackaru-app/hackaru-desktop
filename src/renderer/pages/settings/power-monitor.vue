<i18n src="@/assets/locales/pages/settings/power-monitor.json" />

<template>
  <section>
    <main-header class="is-small" />
    <setting-menu />

    <section class="content">
      <header class="content-header">
        <h1><icon name="power-icon" />{{ $t('title') }}</h1>
      </header>

      <div class="form">
        <label>
          <input v-model="stopOnSuspend" class="suspend" type="checkbox" />{{
            $t('suspend')
          }}
        </label>
        <label>
          <input v-model="stopOnShutdown" class="shutdown" type="checkbox" />{{
            $t('shutdown')
          }}
        </label>
      </div>
    </section>
  </section>
</template>

<script>
import SettingMenu from '@/components/organisms/setting-menu';
import MainHeader from '@/components/molecules/main-header';
import Icon from '@/components/atoms/icon';

export default {
  components: {
    SettingMenu,
    MainHeader,
    Icon
  },
  computed: {
    stopOnSuspend: {
      get() {
        return this.$store.getters['activities/stopOnSuspend'];
      },
      set(value) {
        this.$store.dispatch('activities/setStopOnSuspend', value);
      }
    },
    stopOnShutdown: {
      get() {
        return this.$store.getters['activities/stopOnShutdown'];
      },
      set(value) {
        this.$store.dispatch('activities/setStopOnShutdown', value);
      }
    }
  }
};
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
