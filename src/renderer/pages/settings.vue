<i18n src="~/assets/locales/pages/settings.json"></i18n>

<template>
  <section>
    <nav class="setting-menu">
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
    <nuxt-child class="content" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          path: this.localePath('/settings/power-monitor'),
          name: this.$t('powerMonitor'),
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.setting-menu {
  background-color: $highlight-background;
  border-right: 1px $border solid;
  height: 100vh;
  padding-top: 40px;
  position: fixed;
  width: 150px;
}

.setting-menu ul {
  list-style-position: inside;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.setting-menu li a {
  border-left: 4px transparent solid;
  color: $text;
  cursor: pointer;
  display: block;
  padding: 8px 20px;
  text-decoration: none;

  &:hover {
    border-left-color: $border;
  }

  &.selected {
    border-left-color: $cyan;
  }
}

.content {
  flex: 1;
  margin-left: 150px;
  padding: 45px 40px;
}
</style>
