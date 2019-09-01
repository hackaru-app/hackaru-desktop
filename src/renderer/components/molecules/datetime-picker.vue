<template>
  <div class="datetime-picker">
    <input
      ref="date"
      :value="date"
      class="date"
      type="date"
      step="1"
      @input="update"
      @focus="setCurrent"
    />
    <input
      ref="time"
      :value="time"
      class="time"
      type="time"
      step="1"
      @input="update"
      @focus="setCurrent"
    />
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';

const dateFormat = 'yyyy-MM-dd';
const timeFormat = 'HH:mm:ss';

export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    date() {
      return this.value && format(parseISO(this.value), dateFormat);
    },
    time() {
      return this.value && format(parseISO(this.value), timeFormat);
    }
  },
  methods: {
    update() {
      const date = parseISO(
        [this.$refs.date.value, this.$refs.time.value].join(' ')
      );
      const formatString = `${dateFormat} ${timeFormat} XXX`;
      this.$emit('input', isNaN(date) ? undefined : format(date, formatString));
    },
    setCurrent() {
      this.$refs.date.value = this.date || format(new Date(), dateFormat);
      this.$refs.time.value = this.time || format(new Date(), timeFormat);
      this.update();
    }
  }
};
</script>

<style scoped lang="scss">
.datetime-picker {
  display: flex;
  flex: 1;
}
.datetime-picker input {
  margin-right: 10px;
  border: 0;
  width: 100%;
  max-width: 160px;
  height: 46px;
  border-radius: 0;
  background: none;
  border-bottom: 1px $border solid;
  &:last-child {
    margin-right: 0;
  }
}
</style>
