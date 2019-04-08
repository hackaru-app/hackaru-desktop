<template>
  <notifications
    class="notifications"
    position="center bottom"
    width="100%"
  />
</template>

<style lang="scss">
.notifications .vue-notification {
  border: none;
  border-radius: 3px;
  &.error {
    background: $red;
  }
  &.success {
    background: $cyan;
  }
}
.notifications .notification-title {
  font-weight: normal;
  font-size: 13px;
  text-align: center;
}
</style>


<script>
import Vue from 'vue'
import Notifications from 'vue-notification'
import { mapGetters } from 'vuex'

Vue.use(Notifications)

export default {
  computed: {
    ...mapGetters({
      message: 'toast/getMessage'
    })
  },
  watch: {
    message () {
      this.$notify({
        type: this.message.type,
        title: this.message.title
      })
    }
  }
}
</script>

<style scoped lang="scss">
.notifications .vue-notification {
  border: none;
  border-radius: 3px;
  &.error {
    background: $red;
  }
  &.success {
    background: $cyan;
  }
}
.notifications .notification-title {
  font-weight: normal;
  font-size: 13px;
  text-align: center;
}
</style>
