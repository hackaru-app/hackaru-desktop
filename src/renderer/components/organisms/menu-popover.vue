<i18n src="~/assets/locales/components/organisms/menu-popover.json"></i18n>

<template>
  <v-popover :open.sync="opened" offset="10" placement="top-end">
    <icon-button
      data-test-id="more-button"
      type="button"
      class="more-button tooltip-target"
    >
      <icon name="more-horizontal-icon" class="icon" />
    </icon-button>
    <template slot="popover">
      <ul class="popover">
        <li class="popover-item">
          <button data-test-id="settings-button" @click="openSettings">
            <icon name="settings-icon" class="icon is-small" />
            {{ $t('settings') }}
          </button>
        </li>
        <li class="popover-item">
          <button data-test-id="web-button" @click="openWeb">
            <icon name="globe-icon" class="icon is-small" /> {{ $t('web') }}
          </button>
        </li>
        <li class="popover-item">
          <button data-test-id="logout-button" @click="logout">
            <icon name="log-out-icon" class="icon is-small" />
            {{ $t('logout') }}
          </button>
        </li>
        <li class="popover-item">
          <button data-test-id="quit-button" @click="quit">
            <icon name="x-circle-icon" class="icon is-small" /> {{ $t('quit') }}
          </button>
        </li>
      </ul>
    </template>
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip'
import Icon from '~/components/atoms/icon'
import IconButton from '~/components/atoms/icon-button'

export default {
  components: {
    Icon,
    IconButton,
    VPopover,
  },
  data() {
    return {
      opened: false,
    }
  },
  methods: {
    openSettings() {
      this.opened = false
      electron.main.openSettings()
    },
    openWeb() {
      this.opened = false
      electron.mixpanel.sendEvent('Open web', {
        component: 'index',
      })
      electron.main.openWeb()
    },
    quit() {
      this.opened = false
      electron.mixpanel.sendEvent('Quit app', {
        component: 'index',
      })
      electron.main.quit()
    },
    async logout() {
      if (!window.confirm(this.$t('confirms.logout'))) return

      this.opened = false
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
.more-button {
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
