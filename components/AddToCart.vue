<template>
    <div class="b-add-basket" @click="$store.dispatch('addToCart',{id:product_id,count:moq})"></div>
</template>

<script>
    export default {
        name: "AddToCart",
        props: ['product_id', 'moq'],
        data: function () {
            return {
                count: 0,
                errors: []
            }
        },
    }
</script>

<style scoped>

</style>
