<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
    <main-header class="is-small" />
    <div class="content">
      <div class="timer-form">
        <div class="timer-form-item">
          <project-select v-model="projectId" class="project-select" />
        </div>
        <div class="timer-form-item">
          <input placeholder="作業内容や備考など" class="description" />
        </div>
      </div>
      <activity
        v-for="activity in activities"
        :key="activity.id"
        v-bind="activity"
      />

      <div class="timer">
        <time>01:23:45</time>

        <base-button type="submit" class="is-primary control-button start">
          <icon name="play-icon" />
        </base-button>
        <!-- <base-button
          v-else
          type="submit"
          class="is-danger control-button stop"
        >
          <icon name="square-icon" />
        </base-button> -->
      </div>

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
import ProjectSelect from '@/components/molecules/project-select';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseButton,
    ProjectSelect,
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
  padding-top: 30px;
}
.timer-form {
  box-shadow: 0 3px 5px #00000008;
}
.project-select {
  padding: 0 30px;
}
.timer-form-item {
  border-bottom: 1px $border solid;
  padding: 0 0;
  height: 60px;
  align-items: center;
  display: flex;
}
.description {
  height: 100%;
  width: 100%;
  padding: 0 30px;
  border: 0;
}
.timer {
  display: flex;
  position: absolute;
  top: 5px;
  width: 100%;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  z-index: -1;
  time {
    font-size: 46px;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    margin-bottom: 10px;
  }
}
.control-button {
  display: flex;
  align-self: center;
  flex-shrink: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  pointer-events: auto;
  box-shadow: 0 3px 3px #00000010;
}
.control-button .icon {
  width: 22px;
  height: 22px;
}
.control-button.start .icon {
  padding-left: 3px;
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
