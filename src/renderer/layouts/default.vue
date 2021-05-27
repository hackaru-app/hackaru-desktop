<template>
  <section>
    <nuxt />
    <v-dialog width="90%" />
    <toast />
  </section>
</template>

<script>
import Toast from '~/components/organisms/toast'

export default {
  components: {
    Toast,
  },
}
</script>
