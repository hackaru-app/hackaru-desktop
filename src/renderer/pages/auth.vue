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
      await electron.authorize()
      electron.sendGaEvent('Accounts', 'login')
      electron.sendMixpanelEvent('Login', { component: 'auth' })
      this.$store.dispatch('toast/success', this.$t('loggedIn'))
      this.$router.replace(this.localePath('index'))
      electron.showMenubar()
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  background-color: $background-dark;
  align-items: center;
}
.logo-icon {
  width: 25px;
  height: 25px;
  margin-bottom: 40px;
}
.auth-button {
  width: 140px;
}
</style>
