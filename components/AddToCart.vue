<template>

    <v-btn color='accent' @click="$store.dispatch('addToCart',{id:product_id,count:moq})">Купить</v-btn>
</template>

<script>
    export default {
        name: "AddToCart",
        props: ['product_id', 'moq']

    }
</script>

<style scoped>

</style>
