<template>
  <div>
  <catalog :slug="$route.params.pathMatch"/>

  </div>
</template>

<script>

    import Catalog from '~/components/Catalog';
    export default {
      name: "_",
      components: {Catalog},

    }
</script>

<style scoped>

</style>
