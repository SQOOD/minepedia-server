<template lang='pug'>
  #app
    Navigation
    router-view.mt-4
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    Navigation,
  },
};
</script>

<style lang="stylus">

</style>
