<template>
  <div id="app">
    <router-view></router-view>
    <toast />
  </div>
</template>

<script>
import Toast from './components/molecules/toast';
import 'typeface-roboto/index.css';

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
