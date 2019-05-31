<i18n src="@/assets/locales/pages/index.json" />

<template>
  <section>
    <main-header>
      <button class="menu-button" @click="showEditor()">
        <icon
          name="plus-icon"
          :aria-label="$t('ariaLabels.add')"
          class="icon is-small"
        />
      </button>
    </main-header>

    <div class="content">
      <article
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
          <icon name="check-icon" class="is-primary" />
        </base-button>
      </article>

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
            <icon name="settings-icon" class="icon is-small" />
          </base-button>
          <base-button
            type="button"
            class="has-icon web-button"
            :aria-label="$t('ariaLabels.website')"
            @click="openWebsite"
          >
            <icon name="globe-icon" class="icon is-small" />
          </base-button>
        </div>
        <base-button
          type="button"
          class="has-icon"
          :aria-label="$t('ariaLabels.logout')"
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
import ProjectName from '@/components/molecules/project-name';
import Icon from '@/components/atoms/icon';
import Ticker from '@/components/atoms/ticker';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseButton,
    Icon,
    MainHeader,
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
    await this.$store.dispatch('activities/getWorkingActivities');
    await this.$store.dispatch('projects/getProjects');
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
      await this.$store.dispatch('auth/logout');
      if (process.env.NODE_ENV === 'production') {
        this.$electron.remote.app.relaunch();
      }
      this.$electron.remote.app.exit(0);
    },
    async stopActivity(id) {
      const success = await this.$store.dispatch('activities/stopActivity', {
        id
      });
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px $border solid;
  &:hover {
    background: $grey-fdfdfd;
  }
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
