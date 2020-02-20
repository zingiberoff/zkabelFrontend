<template>
  <v-layout row wrap>
    <basket-item v-for="item in basket" :item="item" @update="update()" :key="item.id"></basket-item>
      <v-flex xs6>
          <v-btn @click="$router.push('/order/');
    reachGoal('m-oformit-zakaz-v-korzine')"
                 block
                 color="success"
          >
              Оформить заказ
          </v-btn>
      </v-flex>
      <v-flex xs6>
          <v-btn @click="$router.push('/fast-order/')"
                 block
                 color="info">Быстрый заказ
          </v-btn>
      </v-flex>
      <v-divider></v-divider>
  </v-layout>

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
        return this.$store.getters.cartSumm
      }

    },
    mounted() {
      this.$store.dispatch('loadCart');
    },
  }
</script>

<style scoped>
    .v-divider {
        margin-bottom: 80px;
    }


</style>
