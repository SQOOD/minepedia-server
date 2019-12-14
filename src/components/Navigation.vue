<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-dark.fixed-top.pt-0.pb-0
  .container
    a.navbar-brand(href='#') Minepedia
    button.navbar-toggler(type='button' data-toggle='collapse'
    data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup'
    aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarNavAltMarkup.collapse.navbar-collapse
      .navbar-nav
        a.nav-item.nav-link.active(href='#') Home
          span.sr-only (current)
        a.nav-item.nav-link(href='#') Features
        a.nav-item.nav-link(href='#') Pricing
        a.nav-item.nav-link.disabled(href='#' tabindex='-1' aria-disabled='true') Disabled
</template>


<style scoped>
  nav {
    background: #4868B1;
    border-bottom: 1px solid #EEAD2B;
  }
</style>
