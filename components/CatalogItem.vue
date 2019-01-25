<template>

  <v-layout row wrap>
    <v-flex xs12>



        <v-card class="item">
          <nuxt-link :to="product.url">

          <div class="item_name">
          {{product.name}}
          </div></nuxt-link>
          <img :src="product.picture.src" alt="">
          <div class="article">
            Артикул:{{product.article}}
          </div>

          <div class="item_price">
            {{price}}
          </div>
          <div class="item_buy">
            <edit-cart-count v-if="$store.getters.inCart(product.id)"
                             :product_id="product.id"
                             :count-in-cart="$store.getters.inCart(product.id)"
                             @update="refreshCart()" v-bind:step="product.ratio"
            />
            <add-to-cart v-else
                         :product_id="product.id"
                         @update="refreshCart()"
                         :moq="product.moq"
            />
          </div>
        </v-card>





    </v-flex>
  </v-layout>
</template>

<script>
  import EditCartCount from './EditCartCount.vue'
  import AddToCart from './AddToCart.vue'


  export default {
    name: "CatalogItem",
    props: ['product'],
    components: {EditCartCount, AddToCart},
    computed: {
      price() {
        if (false) {
          return this.product.prices.WHOSALE.PRINT_VALUE
        }
        return this.product.prices.RETAIL.PRINT_VALUE


      }
    }
  }
</script>

<style scoped>
  .item {
    padding: 10px 8px;
    display: grid;
    grid-template-columns: 90px 1fr 1fr;
    grid-template-rows: 50px;
    grid-template-areas: 'img name name' 'img article price ' 'img avability buy';
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    justify-items: stretch;
    align-items: center;
    margin-bottom: 10px;
  }

  .item > img {
    grid-area: img;
  }

  .item > .item_name {
    grid-area: name;
    font-weight: bold;
  }

  .item > .item_price {
    grid-area: price;
    font-size: 18px;
  }

  item > .article {
    grid-area: article;
    font-size: 18px;
  }

  .item > .item_buy {
    grid-area: buy;
  }
</style>
