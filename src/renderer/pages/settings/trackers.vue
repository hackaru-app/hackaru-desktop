<i18n src="@/assets/locales/pages/settings/trackers.json" />

<template>
  <section>
    <main-header class="is-small" />
    <setting-menu />

    <section class="content">
      <header class="content-header">
        <h1><icon name="eye-icon" />{{ $t('title') }}</h1>
        <base-button
          type="button"
          class="has-icon add-button"
          :aria-label="$t('add')"
          @click="showEditor"
        >
          <icon name="plus-icon" class="is-primary" />
        </base-button>
      </header>

      <transition-group name="fade">
        <article v-for="tracker in trackers" :key="tracker.id" class="tracker">
          <project-name
            :name="tracker.project && tracker.project.name"
            :color="tracker.project && tracker.project.color"
            class="project-name"
          />
          <span class="process">
            {{ tracker.process }}
          </span>
          <base-button
            type="button"
            class="has-icon delete-button"
            :aria-label="$t('delete')"
            @click="deleteTracker(tracker.id)"
          >
            <icon name="x-icon" class="is-danger" />
          </base-button>
        </article>
      </transition-group>

      <p v-if="trackers.length <= 0" class="empty-message">
        {{ $t('empty') }}
      </p>
    </section>
  </section>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import SettingMenu from '@/components/organisms/setting-menu';
import MainHeader from '@/components/molecules/main-header';
import ProjectName from '@/components/molecules/project-name';
import Icon from '@/components/atoms/icon';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseButton,
    SettingMenu,
    MainHeader,
    ProjectName,
    Icon
  },
  computed: {
    ...mapGetters({
      trackers: 'trackers/getTrackers'
    })
  },
  methods: {
    deleteTracker(id) {
      if (!window.confirm(this.$t('confirms.delete'))) return;
      this.$store.dispatch('trackers/deleteTracker', { id });
      this.$store.dispatch('toast/showSuccess', this.$t('deleted'));
    },
    showEditor() {
      this.$electron.ipcRenderer.send('showTrackerEditor');
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
    font-size: 16px;
    display: flex;
    align-items: center;
    font-weight: normal;
    .icon {
      margin-right: 10px;
    }
  }
}
article {
  margin: 0;
  padding: 15px 0;
  border-bottom: 1px $border solid;
  display: flex;
  .project-name {
    display: flex;
    flex: 1;
  }
  .process {
    color: $text-light;
    padding-right: 20px;
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
