<template>

</template>

<script>
  export default {
    name: "ClientOnly",
    computed:{
    },
    created() {
        this.$store.dispatch('loadCart');
    }
  }
</script>

<style scoped>

</style>
