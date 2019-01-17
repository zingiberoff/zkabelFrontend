<template>
    <div class="col-12 border item">
        <img :src="src" alt="">
        <div class="item_name"><a
                :href="link">{{name}}</a></div>
        <div class="item_price">{{price}}</div>
        <edit-cart-count v-if="inCart(id)"
                         :product_id="id"
                         :count-in-cart="inCart(id)"
                         @update="refreshCart()" v-bind:step="ratio"
        ></edit-cart-count>
        <add-to-cart v-else
                     :product_id="id"
                     @update="refreshCart()"
                     :moq="moq"></add-to-cart>
    </div>
</template>

<script>
    export default {
        name: "CatalogItem",
        props:[id,
            src,
            link,
            price,
            moq,
            ratio,
            name],
    }
</script>

<style scoped>

</style>