<template>
    <v-container grid-list-md v-if="!cartEmpty"
    >
        <v-layout row wrap>
                <basket-item v-for="item in basket" :item="item" @update="update()" :key="item.id"></basket-item>
        </v-layout>
        <v-btn color="success" @click="goToOrder">Оформить заказ</v-btn>

    </v-container>
    <empty-cart v-else>

    </empty-cart>
</template>

<script>
    import BasketItem from './BasketItem.vue';
    import EmptyCart from './EmptyCart.vue';

    export default {
        name: "BasketFull",
        props: ['basket'],
        components: {BasketItem, EmptyCart},
        data: function () {
            return {
                cartEmpty: false
            }
        },
        methods: {
            update: function () {
                this.$emit('update');
            },
            goToOrder() {
                window.location = '/personal/order/make/';
            }
        },
        mounted() {
            console.log(this.basket);
            for (item in this.basket) {
                console.log(item);
                if (!this.cartEmpty) {
                    break;
                }
                else {
                    this.cartEmpty = false
                }
            }
        }
    }
</script>

<style scoped>

</style>