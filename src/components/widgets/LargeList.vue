<template lang="pug">
article.card.card-product-list
  .row.no-gutters
    aside.col-md-3
      a.img-wrap(href='#')
        img(src='~@/assets/images/3.jpg')
    // col.//
    .col-md-6
      .info-main
        a.h5.title(href='#')  Great product name goes here
        p Take it as demo specs,
      // info-main.//
    // col.//
    aside.col-sm-3
      .info-aside
        .price-wrap
          .price.h5  $140
          .tkdn.h6 25
        br
        p
          a.btn.btn-primary.btn-block(href='#')  Detail
</template>
