<template>

</template>

<script>
  export default {
    name: "ClientOnly",
    computed: {},
    created() {
      this.$store.commit('loading', true);
      this.$store.dispatch('loadSession');
      this.$store.dispatch('loadCart').then(() => {
        this.$store.commit('loading', false)
      }).catch(e=>{console.log(e)});
    }
  }
</script>

<style scoped>

</style>
