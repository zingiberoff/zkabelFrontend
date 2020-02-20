<template>
  <thanks v-if="orderId" :response="response">
  </thanks>
  <v-container grid-list-lg v-else-if="$store.getters.cartSumm">
    <v-form v-model="formValid">
        <user-type @changeUser="changeUser"/>
      <user-profile v-if="personType" :key="'profile_'+personType"/>
        <order-properties :key="'properties_'+profileID" v-if="personType"/>
        <delivery :key="'delivery_'+profileID" v-if="personType"/>
        <payment :key="'payments'+profileID" v-if="personType"/>
        <v-btn :disabled="!formValid||!delivery||!payment"
               @click="saveOrder"

               block
               class="create_order"
               color="success"
               fixed
        >
            Оформить заказ
        </v-btn>
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
        orderId: null,
        response: ''
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
          this.reachGoal('m-oformili-zakaz')
        let props = this.orderProperties;
        props.payment_id = this.payment;
        props.delivery_id = this.delivery;
        this.$store.dispatch('saveOrder', props).then(result => {
          this.orderId = result.ORDER.ID;
          this.response = result;
        }).catch(e => {
          console.log(e)
        });
      }
    }
  }
</script>

<style scoped>
    .create_order {
        width: 100%;
        color: #000;
        position: fixed;
        bottom: 67px;
        left: 0;
    }

    form {
        margin-bottom: 80px;
    }

    .create_order.theme--light.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat):not(.v-btn--outline) {
        background-color: #f5f5f5 !important;
    }
</style>
