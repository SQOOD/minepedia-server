<template lang="pug">
section.section-content
  .container
    header.section-heading
      h3.section-title {{title}}
    .row
      slot(name='card')
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
