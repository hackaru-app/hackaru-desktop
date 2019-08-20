<template>
  <div id="app">
    <router-view></router-view>
    <toast />
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
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400');
@import '~normalize.css/normalize.css';
@import './src/renderer/assets/sass/modules/variables';

html {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-user-select: none;
  background: $background;
}
body,
select,
input,
button {
  color: $text;
}
body {
  background-color: $background;
  font-family: $font-family;
  font-size: $font-size;
  line-height: $line-height;
}
input[type='text'],
input[type='time'],
input[type='date'],
input[type='email'],
input[type='password'] {
  -webkit-appearance: none;
  box-sizing: border-box;
}
input::placeholder {
  color: $grey-ccc;
  opacity: 1;
  padding-top: 2px;
}
input:focus,
button:focus {
  outline: none;
}

$animationDuration: $animation-duration;
@import '~vue2-animate/src/sass/vue2-animate.scss';

@import '~vue-multiselect/dist/vue-multiselect.min.css';
</style>
