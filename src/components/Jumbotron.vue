<template lang="pug">
.jumbotron.jumbotron-fluid
  #logo.container.text-center
    img(src='@/assets/images/minepedia-logo.svg')
    h1.display-4 Minepedia
    p.lead Katalog TKDN Minerba
</template>

<style scoped>
  #logo {
    border-radius:20rem;
    background: rgba(255,255,255,0.7);
    width:25rem;
    padding:4rem;
  }

  #logo img{
    max-width:10rem;
  }
</style>
