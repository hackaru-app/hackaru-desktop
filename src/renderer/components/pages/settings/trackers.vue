<i18n src="../../../locales/pages/settings/trackers.json" />

<template>
  <section>
    <main-header class="is-small" />
    <setting-menu />

    <section class="content">
      <header class="content-header">
        <h1>
          <feather-icon name="eye" />{{ $t('title') }}
        </h1>
        <btn
          type="button"
          class="has-icon"
          :aria-label="$t('add')"
          @click="showEditor"
        >
          <feather-icon
            name="plus"
            class="is-primary"
          />
        </btn>
      </header>

      <transition-group name="fade">
        <article
          v-for="tracker in trackers"
          :key="tracker.id"
        >
          <project-name
            :name="tracker.project && tracker.project.name"
            :color="tracker.project && tracker.project.color"
            class="project-name"
          />
          <span class="process">
            {{ tracker.process }}
          </span>
          <btn
            type="button"
            class="has-icon"
            :aria-label="$t('delete')"
            @click="deleteTracker(tracker.id)"
          >
            <feather-icon
              name="x"
              class="is-danger"
            />
          </btn>
        </article>
      </transition-group>

      <transition name="fade">
        <empty-message
          v-if="trackers.length <= 0"
          :message="$t('empty')"
        />
      </transition>
    </section>
  </section>
</template>

<script>
import Btn from '../../atoms/btn'
import SettingMenu from '../../organisms/setting-menu'
import MainHeader from '../../molecules/main-header'
import EmptyMessage from '../../atoms/empty-message'
import ProjectName from '../../molecules/project-name'
import FeatherIcon from '../../atoms/feather-icon'
import { mapGetters } from 'vuex'

export default {
  components: {
    Btn,
    SettingMenu,
    MainHeader,
    EmptyMessage,
    ProjectName,
    FeatherIcon
  },
  computed: {
    ...mapGetters({
      trackers: 'trackers/getTrackers'
    })
  },
  methods: {
    deleteTracker (id) {
      if (!window.confirm(this.$t('confirms.delete'))) return
      this.$store.dispatch('trackers/deleteTracker', { id })
      this.$store.dispatch('toast/showSuccess', this.$t('deleted'))
    },
    showEditor () {
      this.$electron.ipcRenderer.send('showTrackerEditor')
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
</style>
