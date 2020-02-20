<template>

  <v-layout row wrap>
    <v-flex xs12>


      <v-card class="item">
        <nuxt-link :to="product.url" class="item_name">

          <div>
            {{product.name}}
          </div>
        </nuxt-link>
          <v-img :src="product.picture.src" alt="" contain v-if="product.picture"/>
        <div class="article">
          арт.: {{product.article}}
        </div>

        <div class="avability">

          <div v-for="(store,index) in product.stores.STORES_SORTED_BY_CITY" :key="index">
            <b>{{ store.NAME }}:</b> {{store.QUANTITY}}
          </div>
        </div>
          <div class="item_price" v-if="parseFloat(price)">
          {{price}}
        </div>
          <div class="item_buy" v-if="parseFloat(price)">
          <edit-cart-count v-if="inCart"
                           :product_id="product.id"
                           :count-in-cart="inCart"
                           v-bind:step="product.ratio"
          />
          <add-to-cart v-else
                       :product_id="product.id"
                       :moq="product.moq"
                       @click="reachGoal('m-kupit-catalog')"
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
          return this.$store.getters.prices[this.product.id]
      },
      inCart() {
        return this.$store.getters.inCart[this.product.id];
      }
    },
      methods: {
          click2add() {
              console.log(1)
          }
      }
  }
</script>

<style scoped>
  .item {
    padding: 10px 8px;
    display: grid;
    grid-template-columns: 90px 1fr 2fr 3fr;
    grid-template-rows: auto;
    grid-template-areas: 'img name name name' 'img article article price' 'avability avability buy buy';
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
    justify-self: right;
    font-size: 18px;
  }

  .avability {
    grid-area: avability;
    font-size: x-small;
  }

  .article {
    grid-area: article;
    font-size: 13px;
  }

  .item > .item_buy {
    justify-self: right;
    grid-area: buy;
  }
</style>
