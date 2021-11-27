<template>
  <div>
    <transition name="fade">
      <section v-if="show" class="mini-timer" @mousemove="mousemove">
        <ticker :started-at="startedAt" class="ticker" />
      </section>
    </transition>
  </div>
</template>

<script>
import Ticker from '~/components/atoms/ticker'

export default {
  components: {
    Ticker,
  },
  data() {
    return {
      mousemoved: false,
      mouseTimer: undefined,
      startedAt: undefined,
    }
  },
  computed: {
    show() {
      return !this.mousemoved && this.startedAt
    },
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
    mousemove() {
      this.mousemoved = true
      clearTimeout(this.mouseTimer)
      this.mouseTimer = setTimeout(() => (this.mousemoved = false), 3000)
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
  padding: 10px;
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
