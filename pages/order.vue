<template>

  <SaleOrder v-if="$store.state.userToken"/>
  <auth v-else/>
</template>

<script>
  import SaleOrder from "../components/SaleOrder";
  import Auth from "../components/Auth";

  export default {
    name: "order",
    components: {SaleOrder, Auth},
    computed: {
      isAuth() {
        if (this.$store.state.userToken.length > 0) {
          return true;
        }
        return false;
      }
    }

  }
</script>

<style scoped>

</style>
