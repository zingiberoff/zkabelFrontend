<template>

  <div class="katalog"
       row
       v-touch="{right: () => goUp()}">

    <category v-if="isCat"
              :key="'cat_'+entity.id"
              :id="entity.id"
              :type="entity.type"/>
    <product v-if="isProduct"
             :key="'product_'+entity.id"
             :id="entity.id"
    ></product>
  </div>
</template>

<script>
  import Category from '../../components/Category.vue'
  import Product from '../../components/Product.vue'
  import Search from '../../components/Search.vue'

  export default {
    name: "catalog",
    components: {Category, Product, Search},
    data: function () {
      return {
        entity: {}
      }
    },
    methods: {
      goUp() {
        let parent = this.$store.getters.section(this.entity.parent);
        if (parent !== undefined) {
          this.$router.push(parent.url)
        }

      }
    },
    computed: {
      isCat() {
        if (this.entity === undefined) {
          return false;
        }
        if (this.entity.type === undefined) {
          return false;
        }
        return true
      },
      isProduct() {
        if (this.isCat) {
          return false;
        }
        if (this.entity === undefined) {
          return false;
        }
        if (this.entity.id === undefined) {
          return false;
        }
        return true;
      }
    },

    created() {

      this.entity = this.$store.getters.catFromSlug(this.$route.path);

      if (this.entity === undefined) {
        this.entity = this.$store.getters.productFromSlug(this.$route.path);
      }
      if (this.entity === undefined) {
        this.entity = "404"
      }
    },

    fetch({store, params}) {
      return store.dispatch('loadCatalogAll', '/catalog/' + params.pathMatch);
    },

  }
</script>

<style scoped>
  .katalog {
    min-height: 100%;
    padding-bottom: 40px;
  }
</style>
