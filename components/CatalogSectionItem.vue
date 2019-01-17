<template>
    <a :href="url">
    <v-card height="100%" min-height="200">
        <v-img :src="picture"
        aspect-ratio="1.5"
        contain
        ></v-img>

        <v-card-text class="subheading">{{name}}</v-card-text>

    </v-card>
    </a>
</template>

<script>
    export default {
        name: "CatalogSectionItem",
        props: ['url','name','picture']
    }
</script>

<style scoped>
 a{
     text-decoration: none;
     text-align: center;
 }
</style>