<template>


    <v-container grid-list-md v-if="cartEmpty"
    >
      <v-layout row wrap>
        <basket-item v-for="item in basket" :item="item" @update="update()" :key="item.id"></basket-item>
      </v-layout>
      <v-btn color="success" @click="$router.push('order')">Оформить заказ</v-btn>

    </v-container>

</template>

<script>
  import BasketItem from './BasketItem.vue';
  import EmptyCart from './EmptyCart.vue';

  export default {
    name: "BasketFull",
    components: {BasketItem, EmptyCart},
    methods: {
      update: function () {
        this.$store.dispatch('loadCart');
      },
    },
    computed: {
      basket() {
        return this.$store.state.cart
      },
      cartEmpty() {
        return this.$store.state.cart
      }

    },
    mounted() {
      this.$store.dispatch('loadCart');
    },
  }
</script>

<style scoped>

</style>
