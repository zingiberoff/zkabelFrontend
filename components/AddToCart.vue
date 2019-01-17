<template>
    <div class="b-add-basket" @click="addToCart(moq)"></div>
</template>

<script>
    import mixins from '../mixins.js'
    export default {
        name: "AddToCart",
        props: ['product_id', 'moq'],
        data: function () {
            return {
                count: 0,
                errors: []
            }
        },
        mixins: [mixins.basketAjax]
    }
</script>

<style scoped>

</style>