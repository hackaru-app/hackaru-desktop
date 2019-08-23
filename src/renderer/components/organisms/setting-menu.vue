<i18n src="@/assets/locales/components/organisms/setting-menu.json" />

<template>
  <nav class="side-bar">
    <ul>
      <li v-for="link in links" :key="link.path">
        <router-link
          :to="link.path"
          :class="{ selected: link.path === $route.path }"
        >
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          path: '/settings/trackers',
          name: this.$t('trackers')
        },
        {
          path: '/settings/power-monitor',
          name: this.$t('powerMonitor')
        },
        {
          path: '/settings/licenses',
          name: this.$t('licenses')
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.side-bar {
  position: fixed;
  border-right: 1px $grey-eee solid;
  background-color: $grey-fafafa;
  height: 100vh;
  width: 150px;
  padding-top: 50px;
}
.side-bar ul {
  list-style-type: none;
  list-style-position: inside;
  padding: 0;
  margin: 0;
}
.side-bar li a {
  display: block;
  padding: 8px 20px;
  text-decoration: none;
  color: $text;
  margin: 4px 0;
  border-left: 4px transparent solid;
  cursor: pointer;
  &:hover {
    border-left-color: $grey-eee;
  }
  &.selected {
    border-left-color: $cyan;
  }
}
</style>
