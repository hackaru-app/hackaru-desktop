<template>
  <section>
    <nuxt />
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
