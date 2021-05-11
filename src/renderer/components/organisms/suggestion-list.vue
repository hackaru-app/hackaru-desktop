<template>
  <section
    v-if="suggestions.length"
    data-test-id="suggestion-list"
    class="suggestion-list"
  >
    <ul class="container">
      <li v-for="(suggestion, index) in suggestions" :key="index">
        <div
          class="suggestion"
          data-test-id="suggestion"
          @mousedown="mousedown(suggestion)"
        >
          <activity-name v-bind="suggestion" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import ActivityName from '~/components/molecules/activity-name'

export default {
  components: {
    ActivityName,
  },
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      suggestions: 'suggestions/all',
    }),
  },
  watch: {
    query: {
      immediate: true,
      handler() {
        this.fetch()
      },
    },
  },
  methods: {
    mousedown(suggestion) {
      this.$emit('select', suggestion)
    },
    fetch: debounce(function () {
      this.$store.dispatch('suggestions/fetch', this.query)
    }, 500),
  },
}
</script>

<style scoped lang="scss">
.suggestion-list {
  position: fixed;
  animation-duration: 100ms;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  z-index: index($z, backdrop);
  background-color: $backdrop-color;
}
.container {
  position: fixed;
  background: $background;
  box-shadow: 0 3px 5px $shadow-dark;
  max-height: 243px;
  overflow: scroll;
  width: 100%;
}
.container::-webkit-scrollbar {
  display: none;
}
.container li {
  border-bottom: 1px $border solid;
  &:last-child {
    border: 0;
    padding-bottom: 2px;
  }
  &:hover {
    background-color: $background-hover;
  }
}
.suggestion {
  display: flex;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  padding: 0 30px;
}
</style>
