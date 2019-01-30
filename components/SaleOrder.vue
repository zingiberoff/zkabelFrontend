<template>
  <thanks v-if="orderId">
  </thanks>
  <v-container grid-list-lg v-else-if="$store.getters.cartSumm">
    <v-form v-model="formValid">
      <user-type/>
      <user-profile v-if="personType" :key="'profile_'+personType"/>
      <order-properties v-if="profileID" :key="'properties_'+profileID"/>
      <delivery v-if="personType" :key="'delivery_'+personType"/>
      <payment v-if="personType" :key="'payments'+personType"/>
      <v-btn color="success" v-if="formValid&&profileID&&delivery&&payment" @click="saveOrder">Оформить заказ</v-btn>
    </v-form>
  </v-container>


  <empty-cart v-else>

  </empty-cart>

</template>

<script>
  import UserProfile from './SaleOrder/UserProfile.vue'
  import UserType from './SaleOrder/UserType.vue'
  import OrderProperties from './SaleOrder/OrderProperties.vue'
  import Delivery from './SaleOrder/Delivery.vue'
  import Payment from './SaleOrder/Payment.vue'
  import EmptyCart from './EmptyCart.vue'
  import Thanks from './SaleOrder/Thanks.vue'

  export default {
    components: {UserType, UserProfile, OrderProperties, Delivery, Payment, EmptyCart, Thanks},
    props: ['cartSum'],
    name: "SaleOrder",
    data: function () {
      return {
        formValid: false,
        profileType: "",
        orderId: null

      };
    },
    computed: {
      personType() {
        return this.$store.state.order.userType;
      },
      orderProperties() {
        return this.$store.state.order.properties;
      },
      profileID() {
        return this.$store.state.order.userProfile;
      },
      payment() {
        return this.$store.state.order.payment_id;
      },
      delivery() {
        return this.$store.state.order.delivery_id;
      }
    },
    methods: {
      saveOrder() {
        let props = this.orderProperties;
        props.payment_id = this.payment;
        props.delivery_id = this.delivery;
        this.$store.dispatch('saveOrder', props).then(orderId => {
          this.orderId = orderId
        }).catch(e => {
          console.log(e)
        });
      }
    }
  }
</script>

<style scoped>

</style>
