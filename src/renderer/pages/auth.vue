<i18n src="@/assets/locales/pages/auth.json" />

<template>
  <section>
    <main-header />
    <form @submit.prevent="authenticate">
      <h1>{{ $t('title') }}</h1>
      <base-input
        v-model="apiUrl"
        class="has-border api-url"
        :placeholder="$t('apiUrl')"
        required
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
      apiUrl: this.$store.getters['auth/apiUrl']
    };
  },
  methods: {
    async authenticate() {
      if (!(await this.$store.dispatch('auth/fetchAppToken', this.apiUrl)))
        return;
      this.$electron.ipcRenderer.send('showAuthentication');
      this.$electron.ipcRenderer.on('authenticated', () => {
        this.$store.dispatch('toast/success', this.$t('loggedIn'));
        this.$router.push('/');
      });
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
