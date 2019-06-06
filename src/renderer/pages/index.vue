<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
    <main-header>
      <button class="menu-button add-button" @click="showEditor()">
        <icon name="plus-icon" class="icon is-small" />
      </button>
    </main-header>

    <div class="content">
      <activity
        v-for="activity in activities"
        :key="activity.id"
        v-bind="activity"
      />

      <p v-if="activities.length <= 0" class="empty-message">
        {{ $t('empty') }}
      </p>

      <footer class="footer">
        <div class="left">
          <base-button
            type="button"
            class="has-icon settings-button"
            @click="showSettings"
          >
            <icon name="settings-icon" class="icon is-small" />
          </base-button>
          <base-button
            type="button"
            class="has-icon web-button"
            @click="openWebsite"
          >
            <icon name="globe-icon" class="icon is-small" />
          </base-button>
        </div>
        <base-button
          type="button"
          class="has-icon logout-button"
          @click="logout"
        >
          <icon name="log-out-icon" class="icon is-small" />
        </base-button>
      </footer>
    </div>
  </section>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import MainHeader from '@/components/molecules/main-header';
import Icon from '@/components/atoms/icon';
import Activity from '@/components/organisms/activity';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseButton,
    Icon,
    MainHeader,
    Activity
  },
  computed: {
    ...mapGetters({
      activities: 'activities/workings',
      webUrl: 'auth/webUrl'
    })
  },
  mounted() {
    this.$store.dispatch('activities/fetchWorkings');
    this.$store.dispatch('projects/fetch');
  },
  methods: {
    showEditor() {
      this.$electron.ipcRenderer.send('showActivityEditor');
    },
    openWebsite() {
      this.$electron.shell.openExternal(this.webUrl);
    },
    showSettings() {
      this.$electron.ipcRenderer.send('showSettings');
    },
    async logout() {
      if (!window.confirm(this.$t('confirms.logout'))) return;
      await this.$store.dispatch('auth/logout');
      this.$electron.ipcRenderer.send('logout');
      this.$electron.remote.app.relaunch();
      this.$electron.remote.app.exit(0);
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  padding-top: 45px;
}
.footer {
  width: 100vw;
  overflow: hidden;
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  background-color: $grey-fafafa;
  border-top: 1px $grey-eee solid;
  padding: 13px 20px;
  box-sizing: border-box;
  .icon {
    color: $grey-666;
  }
}
.left {
  display: flex;
  .icon {
    margin-right: 20px;
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
