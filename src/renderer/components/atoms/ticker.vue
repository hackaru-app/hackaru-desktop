<template>
  <time>{{ fromS(duration, 'hh:mm:ss') }}</time>
</template>

<script>
import { fromS } from 'hh-mm-ss'
import { parseISO, differenceInSeconds } from 'date-fns'

export default {
  timers: {
    updateDuration: {
      time: 500,
      autostart: true,
      repeat: true,
    },
  },
  props: {
    startedAt: {
      type: String,
      default: undefined,
    },
    stoppedAt: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      fromS,
      started: parseISO(this.startedAt),
      stopped: this.stoppedAt ? parseISO(this.stoppedAt) : new Date(),
    }
  },
  computed: {
    duration() {
      return differenceInSeconds(this.stopped, this.started) || 0
    },
  },
  watch: {
    startedAt(val) {
      this.started = val ? parseISO(val) : new Date()
    },
    stoppedAt(val) {
      this.stopped = val ? parseISO(val) : new Date()
    },
  },
  methods: {
    updateDuration() {
      if (this.stoppedAt) this.$timer.stop('updateDuration')
      this.started = this.startedAt ? parseISO(this.startedAt) : new Date()
      this.stopped = this.stoppedAt ? parseISO(this.stoppedAt) : new Date()
    },
  },
}
</script>
