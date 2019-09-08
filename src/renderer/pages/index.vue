<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section class="index">
    <main-header class="is-small" />
    <div class="content">
      <big-timer />
    </div>
    <footer class="footer">
      <div class="left">
        <base-button
          type="button"
          class="has-icon settings-button"
          @click="showSettings"
        >
          <icon
            v-tooltip="{ content: $t('settings'), offset: 10 }"
            name="settings-icon"
            class="icon is-small"
          />
        </base-button>
        <base-button
          type="button"
          class="has-icon web-button"
          @click="openWebsite"
        >
          <icon
            v-tooltip="{ content: $t('website'), offset: 10 }"
            name="globe-icon"
            class="icon is-small"
          />
        </base-button>
      </div>

      <div class="right">
        <base-button type="button" class="has-icon quit-button" @click="quit">
          <icon
            v-tooltip="{ content: $t('quit'), offset: 10 }"
            name="x-circle-icon"
            class="icon is-small"
          />
        </base-button>
        <base-button
          type="button"
          class="has-icon logout-button"
          @click="confirmLogout"
        >
          <icon
            v-tooltip="{ content: $t('logout'), offset: 10 }"
            name="log-out-icon"
            class="icon is-small"
          />
        </base-button>
      </div>
    </footer>
  </section>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import MainHeader from '@/components/molecules/main-header';
import Icon from '@/components/atoms/icon';
import BigTimer from '@/components/organisms/big-timer';
import { mapGetters } from 'vuex';

export default {
  components: {
    BigTimer,
    BaseButton,
    Icon,
    MainHeader
  },
  computed: {
    ...mapGetters({ webUrl: 'auth/webUrl' })
  },
  methods: {
    openWebsite() {
      this.$electron.shell.openExternal(this.webUrl);
    },
    showSettings() {
      this.$electron.ipcRenderer.send('showSettings');
    },
    confirmLogout() {
      this.$modal.show('dialog', {
        text: this.$t('confirms.logout'),
        buttons: [{ title: 'Cancel' }, { title: 'OK', handler: this.logout }]
      });
    },
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$electron.ipcRenderer.send('logout');
      this.$electron.remote.app.relaunch();
      this.$electron.remote.app.exit(0);
    },
    quit() {
      this.$electron.remote.app.quit();
    }
  }
};
</script>

<style scoped lang="scss">
.index {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.footer {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  background-color: $grey-fafafa;
  border-top: 1px $grey-eee solid;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  .icon {
    color: $text;
  }
}
.left {
  display: flex;
  .icon {
    margin-right: 20px;
  }
}
.right {
  display: flex;
  .quit-button {
    z-index: 1;
  }
  .icon {
    margin-left: 20px;
  }
}
.empty-message {
  display: flex;
  flex: 1;
  width: 100%;
  padding: 10px 0;
  justify-content: center;
  color: $text-light;
}
</style>
