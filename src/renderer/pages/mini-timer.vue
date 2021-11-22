<template>
  <section class="mini-timer">
    <div class="content">
      <ticker :started-at="startedAt" class="ticker" />
    </div>
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

  &:hover {
    opacity: 0;
  }
}

.content {
  align-items: center;
  background-color: #0009;
  border-radius: 5px;
  box-shadow: 0 3px 10px $shadow-darker;
  color: $white;
  display: flex;
  height: 100%;
  justify-content: center;
}

.ticker {
  filter: drop-shadow(0 2px 1px $shadow-darker);
  font-family: $font-family-duration;
  font-size: 24px;
  margin-top: 2px;
}
</style>
