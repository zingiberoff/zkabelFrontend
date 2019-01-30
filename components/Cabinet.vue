<template>
    <nuxt-error :error="{message:'Данный раздел находится в разработке',statusCode:404}"/>
</template>

<script>

    import NuxtError from "../.nuxt/components/nuxt-error";
    export default {
        name: "Cabinet",
      components: {NuxtError}
    }
</script>

<style scoped>

</style>
