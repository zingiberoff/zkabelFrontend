<template>

    <SaleOrder v-if="$store.state.userId"/>
  <auth v-else/>
</template>

<script>
    import SaleOrder from "../components/SaleOrder";
    import Auth from "../components/Auth";
    export default {
        name: "order",
      components: {SaleOrder, Auth}
    }
</script>

<style scoped>

</style>
