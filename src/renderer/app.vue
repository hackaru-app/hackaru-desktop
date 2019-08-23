<template>
  <div id="app">
    <router-view></router-view>
    <toast />
    <v-dialog width="80%" />
  </div>
</template>

<script>
import Toast from './components/molecules/toast';

export default {
  name: 'Hackaru',
  components: {
    Toast
  },
  data() {
    return {
      animation: {}
    };
  }
};
</script>

<style lang="scss">
@import './src/renderer/assets/sass/main';
@import './src/renderer/assets/sass/v-tooltip';
</style>
