<template>

    <v-flex xs12>

      <v-list subheader>
        <v-subheader v-if="section">{{section.name}}</v-subheader>
        <nuxt-link :to="item.url"
                   v-for="item in childSections"
                   :key="item.id"
        >
          <v-list-tile>

            <v-list-tile-avatar>
              <img :src="item.image">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </nuxt-link>

      </v-list>
      <catalog-item
        v-for="item in products"
        :key="item.id"
        :product="item">
      </catalog-item>
    </v-flex>

</template>

<script>
  import CatalogItem from './CatalogItem.vue'

  export default {

    components: {CatalogItem},
    name: "Category",
    props: ['id', 'type'],
    computed: {
      section() {
        return this.$store.getters.section(this.id);
      },
      childSections() {
        return this.$store.getters.childSections(this.id);
      },
      products() {
        return this.$store.getters.sectionProducts(this.id);
      }
    }
  }
</script>

<style scoped>

</style>
