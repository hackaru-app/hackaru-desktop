import Vue from 'vue'
import { VTooltip, VPopover } from 'v-tooltip'

Vue.use(VTooltip, {
  defaultOffset: 5,
  defaultDelay: { show: 500 },
})

Vue.component('VPopover', VPopover)
