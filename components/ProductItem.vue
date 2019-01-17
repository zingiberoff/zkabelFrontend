<template>
    <div class="col-12 border item">

        <img  :src="item.PICTURE.src" alt="">
        <div class="item_name"><a :href="item.DETAIL_PAGE_URL">{{item.NAME}}</a></div>
        <div class="item_price">{{item.PRICES.WHOLESALE}}</div>
        <edit-cart-count v-if="inCart"
                         :product_id="item.ID"
                         :count-in-cart="inCart"
                         @update="$emit('update')" v-bind:step="item.$ratio"
        ></edit-cart-count>
        <add-to-cart v-else
                     :product_id="item.ID"
                     @update="$emit('update')"
                     :moq="item.MOQ"></add-to-cart>

    </div>
</template>

<script>
    import AddToCart from './AddToCart.vue'
    import EditCartCount from './EditCartCount.vue'
    export default {
        components:{AddToCart,EditCartCount},
        name: "ProductItem",
        props:['item','inCart']
    }
</script>

<style scoped>

    .item {
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