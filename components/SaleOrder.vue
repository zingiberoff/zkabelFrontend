<template>
    <thanks v-if="orderId">
    </thanks>
    <v-container grid-list-lg v-else-if="cartSum">
        <v-form v-model="formValid">
            <user-type @change="setType"></user-type>

            <user-profile v-if="profileType"
                          :personType="profileType"
                          @change="setProfile">

            </user-profile>

            <order-properties v-if="profileType"
                              :personType="profileType"
                              :profileID="profileID"
                              :key="profileID">

            </order-properties>

            <delivery :personType="profileType" @update="updateDelivery">

            </delivery>
            <payment :personType="profileType" @update="updatePayment">

            </payment>
        </v-form>
        <v-btn color="success" v-if="formValid&&profileID&&delivery&&payment" @click="saveOrder">Оформить заказ</v-btn>

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
                profileID: "",
                orderProperties: {},
                payment: '',
                delivery: '',
                orderId: null

            };
        },
        methods: {
            updatePayment(val) {
                this.payment = val
            },
            updateDelivery(val) {
                this.delivery = val
            },
            saveOrder() {
                let props = this.orderProperties;
                props.payment_id = this.payment;
                props.delivery_id = this.delivery;
                this.$axios.post('/api/order/saveOrder/', props)
                    .then(response => {
                        if (response.status == '200' && response.data != "") {
                            if (response.data.result > 0) {
                                this.orderId = response.data.result;
                                this.bus.$emit('orderSuccess', this.orderId);
                            }
                            console.log(response.data.result);
                        }
                    })

            },
            setType(type) {
                this.profileType = type
            },
            setProfile(type) {
                this.profileID = type;
            }
        },
        created() {
            this.bus.$on('changeOrderProperty', (props) => {
                this.orderProperties = props;
            })
        }
    }
</script>

<style scoped>

</style>