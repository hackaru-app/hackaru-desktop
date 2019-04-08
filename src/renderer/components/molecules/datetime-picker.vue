<template>
  <div class="datetime-picker">
    <input
      ref="date"
      :value="date"
      type="date"
      step="1"
      @input="update"
      @focus="setCurrent"
    >
    <input
      ref="time"
      :value="time"
      type="time"
      step="1"
      @input="update"
      @focus="setCurrent"
    >
  </div>
</template>

<script>
import { parse, format } from 'date-fns'

export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    date () {
      return this.value && format(this.value, 'YYYY-MM-DD')
    },
    time () {
      return this.value && format(this.value, 'HH:mm:ss')
    }
  },
  methods: {
    update () {
      const date = parse(`${this.$refs.date.value} ${this.$refs.time.value}`)
      this.$emit('input', isNaN(date) ? undefined : `${date}`)
    },
    setCurrent () {
      this.$refs.date.value = this.date || format(new Date(), 'YYYY-MM-DD')
      this.$refs.time.value = this.time || format(new Date(), 'HH:mm:ss')
      this.update()
    }
  }
}
</script>

<style scoped lang="scss">
.datetime-picker {
  display: flex;
  flex: 1;
}
input {
  border: 0;
  width: 100%;
  height: 46px;
  border-radius: 0;
  background: none;
}
</style>
