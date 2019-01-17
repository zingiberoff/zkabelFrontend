<template>
    <v-flex xs12>
        <v-card >
            <v-card-text class="basket-item">
                <div class="image"><img
                        :src="item.PICTURE.src"
                        alt=""></div>

                <div class="name">{{name}}</div>

                <div class="article">zeta30533</div>
                <div class="price">{{price}} руб/{{measure}}</div>
                <div class="counter">
                    <edit-cart-count :product_id="id"
                                     :count-in-cart="count"
                                     @update="update()" v-bind:step="1"
                    ></edit-cart-count>
                </div>
                <div class="amount">
                    <div class="title">Наличие</div>
                    Под заказ
                </div>
                <div class="date">
                    <div class="title">Дата поступления</div>
                    20.02.2019
                </div>
                <div class="sum">
                    <div class="title">сумма</div>
                    {{sum}} руб
                </div>
            </v-card-text>
        </v-card>

    </v-flex>


</template>

<script>
    import EditCartCount from "./EditCartCount.vue";

    export default {
        name: "BasketItem",
        props: ['item'],
        components: {EditCartCount},
        computed: {
            id: function () {
                return parseInt(this.item.PRODUCT_ID);
            },
            count: function () {
                return parseInt(this.item.QUANTITY);
            },
            price: function () {
                return parseFloat(this.item.PRICE).toFixed(2);
            },
            measure: function () {
                return this.item.MEASURE_NAME;
            },
            name: function () {
                return this.item.NAME;
            },
            url: function () {
                return this.item.DETAIL_PAGE_URL;
            },
            sum: function () {
                return (this.price * this.count).toFixed(2);
            }
        },
        methods: {
            update: function () {
                this.$emit('update');
            }
        }
    }
</script>

<style scoped>
    .basket-item {
        display: grid;
        grid-template-columns: 70px 80px 1fr;
        grid-template-rows: 44px 26px 40px 40px;
        grid-template-areas: 'article name name name' 'img name name name' 'amount date price price' 'counter counter sum sum';

        justify-items: stretch;
        align-items: center;

    }

    .basket-item .title {
        font-size: x-small;
        font-weight: bold;
        color: #f0480187;
        text-transform: uppercase;
    }

    .basket-item > * {
        padding: 3px;

    }

    .title {
        font-size: x-small !important;
    }

    .basket-item > .image {
        grid-area: img;
        height: 100%;
    }

    .basket-item > .image > img {

        height: 100%;
    }

    .basket-item > .name {
        grid-area: name;
        font-size: 1rem;
    }

    .basket-item > .article {
        grid-area: article;
        font-size: 11px;
    }

    .basket-item > .price {
        text-align: end;
        grid-area: price;
        font-size: 1.1rem;
        font-weight: 700;
    }

    .basket-item > .counter {
        grid-area: counter;
        justify-self: center;
    }

    .basket-item > .amount {
        grid-area: amount;
        font-size: 11px;
    }

    .basket-item > .date {
        grid-area: date;
    }

    .basket-item > .sum {
        text-align: end;
        grid-area: sum;
        font-size: 1.3rem;
        font-weight: 700;
    }

    .basket-item .cart-counter {
        border: none;
    }
</style>