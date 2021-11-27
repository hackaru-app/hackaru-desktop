<template>
  <section :class="['mini-timer', { hidden }]" @mousemove="hide">
    <ticker :started-at="startedAt" class="ticker" />
  </section>
</template>

<script>
import Ticker from '~/components/atoms/ticker'

export default {
  components: {
    Ticker,
  },
  data() {
    return {
      startedAt: undefined,
      hidden: false,
      showTimer: undefined,
    }
  },
  mounted() {
    electron.miniTimer.on.stop(() => {
      this.startedAt = undefined
    })
    electron.miniTimer.on.start((_, startedAt) => {
      this.startedAt = startedAt
    })
  },
  methods: {
    hide() {
      this.hidden = true
      clearTimeout(this.showTimer)
      this.showTimer = setTimeout(() => (this.hidden = false), 3000)
    },
  },
}
</script>

<style lang="scss">
body {
  background-color: transparent;
}
</style>

<style scoped lang="scss">
.mini-timer {
  height: 100vh;
  opacity: 1;
  padding: 10px;
  transition: opacity 0.15s;

  &.hidden {
    opacity: 0;
  }
}

.ticker {
  align-items: center;
  background-color: #0009;
  border-radius: 5px;
  box-shadow: 0 3px 10px $shadow-darker;
  color: $white;
  display: flex;
  filter: drop-shadow(0 2px 1px $shadow-darker);
  font-family: $font-family-duration;
  font-size: 24px;
  height: 100%;
  justify-content: center;
  padding-top: 2px;
}
</style>
