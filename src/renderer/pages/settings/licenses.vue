<i18n src="@/assets/locales/pages/settings/licenses.json" />

<template>
  <section>
    <main-header class="is-small" />
    <setting-menu />

    <section class="content">
      <header class="content-header">
        <h1><icon name="gift-icon" />{{ $t('title') }}</h1>
      </header>

      <ul>
        <li v-for="(license, key) in licenses" :key="key">
          <button @click="openWebsite(license.licenseUrl)">
            {{ key }}
            <span> - {{ license.licenses }}</span>
          </button>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import licenses from '@/components/../assets/licenses';
import SettingMenu from '@/components/organisms/setting-menu';
import MainHeader from '@/components/molecules/main-header';
import Icon from '@/components/atoms/icon';

export default {
  components: {
    SettingMenu,
    MainHeader,
    Icon
  },
  data() {
    return {
      licenses
    };
  },
  methods: {
    openWebsite(url) {
      this.$electron.shell.openExternal(url);
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
ul {
  margin-top: 30px;
  padding: 0;
  list-style-type: disc;
  list-style-position: inside;
}
li button {
  text-decoration: none;
  border: 0;
  background: none;
  padding: 0;
  cursor: pointer;
  color: $text;
  &:hover {
    text-decoration: underline;
  }
  span {
    padding: 0;
    margin: 0;
    color: $text-light;
  }
}
</style>
