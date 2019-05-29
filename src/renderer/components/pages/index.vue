<i18n src="../../locales/pages/index.json" />

<template>
  <section>
    <main-header>
      <button class="menu-button" @click="showEditor()">
        <feather-icon
          name="plus"
          :aria-label="$t('ariaLabels.add')"
          class="icon is-small"
        />
      </button>
    </main-header>

    <div class="content">
      <transition-group name="fade">
        <list-item
          v-for="activity in activities"
          :key="activity.id"
          class="list-item"
        >
          <div class="activity" @click="showEditor(activity)">
            <project-name v-bind="activity.project" />
            <ticker
              :started-at="activity.startedAt"
              :stopped-at="activity.stoppedAt"
              class="duration"
            />
          </div>
          <base-button
            type="button"
            class="has-icon"
            @click="stopActivity(activity.id)"
          >
            <feather-icon name="check" class="is-primary" />
          </base-button>
        </list-item>
      </transition-group>

      <p v-if="activities.length <= 0" class="empty-message">
        {{ $t('empty') }}
      </p>

      <footer class="footer">
        <div class="left">
          <base-button
            type="button"
            class="has-icon"
            :aria-label="$t('ariaLabels.settings')"
            @click="showSettings"
          >
            <feather-icon name="settings" class="icon is-small" />
          </base-button>
          <base-button
            type="button"
            class="has-icon"
            :aria-label="$t('ariaLabels.website')"
            @click="openWebsite"
          >
            <feather-icon name="globe" class="icon is-small" />
          </base-button>
        </div>
        <base-button
          type="button"
          class="has-icon"
          :aria-label="$t('ariaLabels.logout')"
          @click="logout"
        >
          <feather-icon name="log-out" class="icon is-small" />
        </base-button>
      </footer>
    </div>
  </section>
</template>

<script>
import BaseButton from '../atoms/base-button';
import MainHeader from '../molecules/main-header';
import ProjectName from '../molecules/project-name';
import ListItem from '../molecules/list-item';
import FeatherIcon from '../atoms/feather-icon';
import Ticker from '../atoms/ticker';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseButton,
    FeatherIcon,
    MainHeader,
    ListItem,
    ProjectName,
    Ticker
  },
  computed: {
    ...mapGetters({
      activities: 'activities/getWorkingActivities',
      webUrl: 'auth/getWebUrl'
    })
  },
  async mounted() {
    await this.$store.dispatchPromise('activities/getWorkingActivities');
    await this.$store.dispatchPromise('projects/getProjects');
  },
  methods: {
    openWebsite() {
      this.$electron.shell.openExternal(this.webUrl);
    },
    showEditor(activity = {}) {
      this.$electron.ipcRenderer.send('showActivityEditor', {
        id: activity.id,
        projectId: activity.project && activity.project.id,
        description: activity.description,
        startedAt: activity.startedAt,
        stoppedAt: activity.stoppedAt
      });
    },
    showSettings() {
      this.$electron.ipcRenderer.send('showSettings');
    },
    async logout() {
      if (!window.confirm(this.$t('confirms.logout'))) return;
      await this.$store.dispatchPromise('auth/logout');
      if (process.env.NODE_ENV === 'production') {
        this.$electron.remote.app.relaunch();
      }
      this.$electron.remote.app.exit(0);
    },
    async stopActivity(id) {
      const success = await this.$store.dispatchPromise(
        'activities/stopActivity',
        { id }
      );
      if (success) {
        this.$store.dispatch('toast/showSuccess', this.$t('stopped'));
      }
    }
  }
};
</script>

<style scoped lang="scss">
.project-name {
  flex: 1;
}
.duration {
  color: $text-light;
  margin-right: 15px;
}
.list-item {
  padding: 0 20px;
}
.activity {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.97);
  }
}
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
