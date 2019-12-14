<template lang='pug'>
#home
  Jumbotron
  Popular( title='Kategori A')
    template(v-slot:card)
      ProductCard
      ProductCard
      ProductCard
      ProductCard
</template>

<script>
// @ is an alias to /src
import Popular from '@/components/ProductRow.vue';
import Jumbotron from '@/components/Jumbotron.vue';
import ProductCard from '@/components/widgets/ProductCard.vue';

export default {
  name: 'home',
  components: {
    Popular,
    Jumbotron,
    ProductCard,
  },
};
</script>
