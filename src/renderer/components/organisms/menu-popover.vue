<i18n src="~/assets/locales/components/organisms/menu-popover.json"></i18n>

<template>
  <v-popover :open.sync="opened" offset="10" placement="top-end">
    <icon-button type="button" class="tooltip-target">
      <icon name="more-horizontal-icon" class="more-icon icon" />
    </icon-button>
    <template slot="popover">
      <ul class="popover">
        <li class="popover-item">
          <button @click="openSettings">
            <icon name="settings-icon" class="icon is-small" />
            {{ $t('settings') }}
          </button>
        </li>
        <li class="popover-item">
          <button @click="openWeb">
            <icon name="globe-icon" class="icon is-small" /> {{ $t('web') }}
          </button>
        </li>
        <li class="popover-item">
          <button @click="confirmLogout">
            <icon name="log-out-icon" class="icon is-small" />
            {{ $t('logout') }}
          </button>
        </li>
        <li class="popover-item">
          <button @click="quit">
            <icon name="x-circle-icon" class="icon is-small" /> {{ $t('quit') }}
          </button>
        </li>
      </ul>
    </template>
  </v-popover>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    openSettings() {
      this.opened = false
      electron.menubar.openSettings()
    },
    openWeb() {
      this.opened = false
      electron.mixpanel.sendEvent('Open web', {
        component: 'index',
      })
      electron.menubar.openWeb()
    },
    quit() {
      this.opened = false
      electron.mixpanel.sendEvent('Quit app', {
        component: 'index',
      })
      electron.menubar.quit()
    },
    confirmLogout() {
      this.opened = false
      this.$modal.show('dialog', {
        text: this.$t('confirms.logout'),
        buttons: [
          { title: 'Cancel', handler: () => this.$modal.hide('dialog') },
          { title: 'OK', handler: this.logout },
        ],
      })
    },
    async logout() {
      this.opened = false
      this.$modal.hide('dialog')
      electron.sentry.removeUserId()
      electron.mixpanel.removeUserId()
      electron.googleAnalytics.sendEvent('Accounts', 'logout')
      electron.googleAnalytics.removeUserId()
      this.$store.dispatch('auth/logout')
      await this.$router.replace(this.localePath('auth'))
      window.location.reload()
    },
  },
}
</script>

<style scoped lang="scss">
.timer-form {
  margin-top: 30px;
}

.footer {
  background-color: $background-light;
  border-top: 1px $border solid;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  height: 50px;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 20px;
  position: absolute;
  width: 100%;
}

.footer .icon {
  align-items: center;
  color: $text;
  display: flex;
  margin: 0 10px;
}

.footer-icons {
  display: flex;
}

.more-icon {
  color: $white;
}

.popover {
  list-style-type: none;
}

.popover-item {
  button {
    align-items: center;
    display: flex;
    padding: 10px 15px;
    width: 100%;

    &:hover {
      background-color: $background-hover;
    }

    .icon {
      margin-right: 10px;
    }
  }
}
</style>
