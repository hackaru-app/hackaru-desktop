<template>
  <div class="control-button">
    <base-button
      v-if="!working"
      type="submit"
      class="is-primary control-button start"
      data-test-id="start-button"
      @click="start"
    >
      <icon name="play-icon" class="is-x-large" />
    </base-button>
    <base-button
      v-else
      type="submit"
      class="is-danger control-button stop"
      data-test-id="stop-button"
      @click="stop"
    >
      <icon name="square-icon" class="is-large" />
    </base-button>
  </div>
</template>

<script>
import BaseButton from '~/components/atoms/base-button'
import Icon from '~/components/atoms/icon'

export default {
  components: {
    BaseButton,
    Icon,
  },
  props: {
    working: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    start() {
      this.$emit('start')
    },
    stop() {
      this.$emit('stop')
    },
  },
}
</script>

<style scoped lang="scss">
.base-button.control-button {
  display: flex;
  align-self: center;
  flex-shrink: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  pointer-events: auto;
  box-shadow: 0 3px 3px #00000010;
}
.base-button.control-button.start .icon {
  padding-left: 3px;
}
</style>
