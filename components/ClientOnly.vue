<template>

</template>

<script>
  export default {
    name: "ClientOnly",
    computed: {},
    created() {

        this.$store.dispatch('loadSession').then(() => {
            this.$store.dispatch('loadDiscounts').then(() => {

            }).catch(() => {
            })
        }).catch();
      this.$store.dispatch('loadCart').then(() => {


      }).catch(e => {
        console.log(e)
      });
    }
  }
</script>

<style scoped>

</style>
