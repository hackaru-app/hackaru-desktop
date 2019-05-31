<i18n src="@/locales/pages/auth.json" />

<template>
  <section>
    <main-header />
    <form @submit.prevent="authenticate">
      <h1>{{ $t('title') }}</h1>
      <base-input
        v-model="apiUrl"
        class="has-border"
        :placeholder="$t('apiUrl')"
        :aria-label="$t('apiUrl')"
      />
      <base-button type="submit" class="is-rounded is-primary">
        {{ $t('authenticate') }}
      </base-button>
    </form>
  </section>
</template>

<script>
import BaseButton from '@/components/atoms/base-button';
import MainHeader from '@/components/molecules/main-header';
import BaseInput from '@/components/atoms/base-input';

export default {
  components: {
    BaseButton,
    BaseInput,
    MainHeader
  },
  data() {
    return {
      apiUrl: this.$store.getters['auth/getApiUrl']
    };
  },
  computed: {
    accessToken() {
      return this.$store.getters['auth/getAccessToken'];
    }
  },
  methods: {
    async fetchAppToken() {
      await this.$store.dispatchPromise('auth/fetchAppToken', this.apiUrl);
    },
    clearLocalstorage() {
      return new Promise(resolve => {
        this.$electron.remote.session.defaultSession.clearStorageData(
          {
            storages: ['localstorage']
          },
          () => resolve()
        );
      });
    },
    async openBrowser() {
      await this.clearLocalstorage();
      const browser = new this.$electron.remote.BrowserWindow({
        width: 400,
        height: 550
      });
      browser.loadURL(this.$store.getters['auth/getAuthorizeUrl']);
      browser.webContents.on('did-navigate-in-page', async (event, url) => {
        const success = await this.$store.dispatchPromise(
          'auth/storeAccessTokenByUrl',
          url
        );
        if (success) {
          this.$store.dispatch('toast/showSuccess', this.$t('loggedIn'));
          browser.close();
          this.$router.push('/');
        }
      });
    },
    async authenticate() {
      if (!this.apiUrl) return;
      await this.fetchAppToken();
      this.openBrowser();
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 16px;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
  text-align: center;
  font-weight: normal;
}
form {
  padding: 30px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
</style>
