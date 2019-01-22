<template>
  <v-container
    grid-list-lg
  >
  <v-flex xs12>
    <v-list subheader>
      <v-subheader v-if="section.NAME">{{section.NAME}}</v-subheader>
      {{type}},{{id}}

      <nuxt-link :to="item.URL"
                 v-for="item in section.SECTIONS"
                 :key="item.ID"
      >
        <v-list-tile>

          <v-list-tile-avatar>
            <!--<img :src="item.IMAGE">-->
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.NAME }}</v-list-tile-title>
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


  </v-container>
</template>

<script>
  import CatalogItem from './CatalogItem.vue'
  export default {
    components:{CatalogItem},
    name: "Category",
    props: ['id', 'type'],
    computed: {
      section() {
        if (this.$store.state.catalogTree[this.id] !== undefined) {
          return this.$store.state.catalogTree[this.id];
        } else {
          return {};
        }
      },
      countSections() {
        if (this.section.SECTIONS === undefined) {
          return 0;
        }
        let i = 0;
        for (let section in this.section.SECTIONS) {
          i++;
        }
        return i;
      },
      products() {
        return this.$store.getters.sectionProducts(this.id);
      }
    }
  }
</script>

<style scoped>

</style>
