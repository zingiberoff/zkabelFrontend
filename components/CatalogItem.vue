<template>

  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="item">
        <img :src="product.picture.src" alt="">
        <div class="item_name"><a
          :href="product.link">{{product.name}}</a></div>
        <div class="item_price">{{product.price}}</div>
        <edit-cart-count v-if="$store.getters.inCart(product.id)"
                         :product_id="product.id"
                         :count-in-cart="$store.getters.inCart(product.id)"
                         @update="refreshCart()" v-bind:step="product.ratio"
        ></edit-cart-count>
        <add-to-cart v-else
                     :product_id="product.id"
                     @update="refreshCart()"
                     :moq="product.moq"></add-to-cart>
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
    components: {EditCartCount, AddToCart}
  }
</script>

<style scoped>
 .item{
   padding: 10px 8px;
   display: grid;
   grid-template-columns: 120px 1fr;
   grid-template-rows: 50px;
   grid-template-areas: 'img name name' 'img price buy';
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

 .item > .item_buy {
   grid-area: buy;
 }
</style>
