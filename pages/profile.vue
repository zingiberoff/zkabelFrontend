<template>
    <cabinet v-if="$store.state.user.userToken"/>
  <auth v-else/>

</template>

<script>
  import Auth from "../components/Auth";
  import Cabinet from "../components/Cabinet";

  export default {
    name: "profile",
    components: {Auth,Cabinet}
  }
</script>

<style scoped>

</style>
