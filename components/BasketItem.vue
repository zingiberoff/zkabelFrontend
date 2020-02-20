<template>
    <v-flex xs12>
        <v-card >
            <v-card-text class="basket-item">
                <div class="image"><img
                        :src="item.PICTURE.src"
                        alt=""></div>

                <div class="name">
                    <nuxt-link :to="url">{{name}}</nuxt-link>
                </div>

                <div class="article">zeta30533</div>
              <div class="price">
                <div class="title">цена</div>
                {{price}} руб/{{measure}}
              </div>
                <div class="counter">
                  <edit-cart-count :step="ratio" :product_id="id"/>

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
          ratio: function () {
            return parseInt(this.item.RATIO);
          },
            sum: function () {
                return (this.price * this.count).toFixed(2);
            }
        },
    }
</script>

<style scoped>
    .basket-item {
        display: grid;
      grid-template-columns: 80px 4fr 5fr;
      grid-template-rows: 12px 1fr auto 40px;
        grid-template-areas: 'article name name name' 'img name name name' 'amount date price price' 'counter counter sum sum';

        justify-items: stretch;
        align-items: center;
      word-break: break-word;
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
      font-size: 10px !important;
    }

    .basket-item > .image {
        grid-area: img;
      width: 100%;
      overflow: hidden;
    }

    .basket-item > .image > img {

      width: 100%;
    }

    .basket-item > .name {
        grid-area: name;
      font-size: 14px;
    }

    .basket-item > .article {
        grid-area: article;
        font-size: 11px;
    }

    .basket-item > .price {
        text-align: end;
        grid-area: price;
      font-size: 14px;
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
      font-size: 16px;
        font-weight: 700;
    }

    .basket-item .cart-counter {
        border: none;
    }

    @media (max-width: 320px) {
      .basket-item {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-template-areas: 'name name name name' 'name name name name' 'amount amount date date' 'counter counter counter counter' 'price price sum sum';
      }

      .basket-item > .image, .basket-item > .article {
        display: none;
      }

      .basket-item > .sum {
        font-size: 14px;
      }

      .basket-item > .price {
        font-size: 12px;
      }

      .title {
        font-size: 8px !important;
      }

      .basket-item > .name {
        font-size: 12px;
      }
    }
</style>
