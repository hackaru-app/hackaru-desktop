<i18n src="~/assets/locales/pages/auth.json"></i18n>

<template>
  <section>
    <div class="content">
      <img src="~/assets/images/logo.svg" class="logo-icon" />
      <base-button
        class="is-primary auth-button"
        data-test-id="auth-button"
        @click="authorize"
      >
        {{ $t('login') }}
      </base-button>
    </div>
  </section>
</template>

<script>
import BaseButton from '~/components/atoms/base-button'

export default {
  components: {
    BaseButton,
  },
  methods: {
    async authorize() {
      await electron.auth.authorize()
      electron.googleAnalytics.sendEvent('Accounts', 'login')
      electron.mixpanel.sendEvent('Login', { component: 'auth' })
      this.$store.dispatch('toast/success', this.$t('loggedIn'))
      this.$router.replace(this.localePath('index'))
      electron.main.show()
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  align-items: center;
  background-color: $background-dark;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
}

.logo-icon {
  height: 25px;
  margin-bottom: 25px;
  width: 25px;
}

.auth-button {
  width: 140px;
}
</style>
